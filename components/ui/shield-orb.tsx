"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Escudo de fuerza con un modelo 3D dentro.
 *
 * Port a three.js puro del efecto de `cortiz2894/flow-shield-effect`, que en
 * origen usa React Three Fiber, drei, postprocessing y leva. Aquí solo hacía
 * falta el escudo, así que se porta el shader (rejilla hexagonal triplanar +
 * fresnel + parpadeo por celda) y se dejan fuera esas cuatro dependencias,
 * siguiendo el patrón de `glsl-hills.tsx`.
 *
 * La malla del escudo no escribe en el buffer de profundidad y se dibuja
 * después del modelo, para que el objeto de dentro se vea a través de ella.
 */

export interface ShieldOrbProps {
  /** Ruta del modelo glTF/GLB que va dentro del escudo. */
  modelUrl: string;
  /** Color del escudo. Crimson de marca por defecto. */
  color?: string;
  /** Tamaño de la rejilla hexagonal (mayor = celdas más pequeñas). */
  hexScale?: number;
  /** Proporción de hexágonos encendidos como panel rojo (0–1). */
  panelDensity?: number;
  /** Opacidad global del escudo. */
  opacity?: number;
  className?: string;
}

const VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vPosW = worldPosition.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uHexScale;
  uniform float uOpacity;
  uniform float uPanelCut;

  varying vec3 vNormalW;
  varying vec3 vPosW;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  /* Teselado hexagonal: devuelve xy = posición dentro de la celda,
     z = distancia al borde, w = identificador de celda. */
  vec4 hexTile(vec2 uv) {
    vec2 r = vec2(1.0, 1.7320508);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    vec2 id = uv - gv;
    vec2 p = abs(gv);
    float edge = 0.5 - max(dot(p, normalize(vec2(1.0, 1.7320508))), p.x);
    return vec4(gv, edge, hash21(id));
  }

  void main() {
    vec3 normal = normalize(vNormalW);

    /* En las caras traseras la normal apunta hacia fuera de la esfera, o sea en
       sentido contrario al observador: sin invertirla, dot(N,V) sale negativo,
       el fresnel se satura a 1 y el hemisferio de atrás se pinta entero. */
    if (!gl_FrontFacing) normal = -normal;

    vec3 viewDir = normalize(cameraPosition - vPosW);

    /* Proyección triplanar por cara de cubo: evita que los hexágonos se
       estiren en los polos, que es lo que pasa con UV esféricas. */
    vec3 an = abs(normal);
    vec2 uv;
    if (an.x > an.y && an.x > an.z) uv = vPosW.zy;
    else if (an.y > an.z) uv = vPosW.xz;
    else uv = vPosW.xy;

    vec4 hex = hexTile(uv * uHexScale);

    /* Rejilla de fondo: solo insinuada, para que el escudo se lea como vidrio. */
    float line = (1.0 - smoothstep(0.0, 0.035, hex.z)) * 0.22;

    /* Solo una parte de las celdas se enciende como panel sólido. El corte va
       sobre el hash del identificador, así que el reparto es estable: los
       mismos hexágonos siempre, no un hervidero aleatorio cada fotograma. */
    float isPanel = step(uPanelCut, hex.w);
    float wave = 0.5 + 0.5 * sin(vPosW.y * 2.2 - uTime * 1.1 + hex.w * 3.0);
    float pulse = 0.25 + 0.75 * smoothstep(0.35, 1.0, wave);
    float panelBody = 1.0 - smoothstep(0.04, 0.13, hex.z);
    float panel = isPanel * panelBody * pulse;

    /* Fresnel: el borde visto de canto brilla más que el frente. */
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.8);

    float alpha = (line + panel * 0.8 + fresnel * 0.5) * uOpacity;
    vec3 color = mix(uColor, vec3(1.0), fresnel * 0.3);

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`;

export function ShieldOrb({
  modelUrl,
  color = "#C41E3A",
  hexScale = 7.0,
  panelDensity = 0.22,
  opacity = 0.9,
  className,
}: ShieldOrbProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Sin WebGL no hay nada que hacer: se cae al estado estático.
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
      setFailed(true);
      return;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let width = container.clientWidth || 1;
    let height = container.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    /* El GLB no trae texturas y sus materiales son PBR: sin luces se vería
       completamente negro. */
    scene.add(new THREE.AmbientLight(0xffffff, 1.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(new THREE.Color(color), 1.4);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uHexScale: { value: hexScale },
      uOpacity: { value: opacity },
      uPanelCut: { value: 1 - panelDensity },
    };

    const shieldGeometry = new THREE.IcosahedronGeometry(1.5, 12);
    const shieldMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shield.renderOrder = 2; // después del modelo, para verlo a través
    scene.add(shield);

    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    let disposed = false;
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        /* Centrar y escalar el modelo a un tamaño conocido: el GLB puede venir
           con cualquier escala y origen desde el editor 3D. */
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;
        const scale = 1.9 / maxAxis;

        model.position.sub(center);
        model.scale.setScalar(scale);
        model.position.multiplyScalar(scale);
        modelPivot.add(model);
      },
      undefined,
      () => {
        if (!disposed) setFailed(true);
      },
    );

    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;
      modelPivot.rotation.y = elapsed * 0.35;
      shield.rotation.y = elapsed * 0.08;
      renderer.render(scene, camera);
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (visible) renderFrame();
    };

    let clearStatic: (() => void) | undefined;
    if (reduceMotion) {
      // Un único fotograma estático, sin bucle de animación.
      const stop = setTimeout(renderFrame, 120);
      clearStatic = () => clearTimeout(stop);
    } else {
      frame = requestAnimationFrame(loop);
    }

    /* Fuera de pantalla no se dibuja: el hero deja de gastar GPU al bajar. */
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth || 1;
      height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (reduceMotion) renderFrame();
    });
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      clearStatic?.();
      io.disconnect();
      resizeObserver.disconnect();

      shieldGeometry.dispose();
      shieldMaterial.dispose();
      modelPivot.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material?.dispose();
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [modelUrl, color, hexScale, panelDensity, opacity]);

  if (failed) return null;

  return <div ref={containerRef} className={className} aria-hidden />;
}

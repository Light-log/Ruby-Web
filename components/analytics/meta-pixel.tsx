"use client";

import * as React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

/** Conjunto de datos «DEVRUBY Web» del negocio Devruby en Meta. */
export const META_PIXEL_ID = "2628770170895951";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Píxel de Meta. Solo se monta con el consentimiento de publicidad (ver ConsentBanner). */
export function MetaPixel() {
  const pathname = usePathname();
  const firstView = React.useRef(true);

  // La primera vista la envía el script; aquí solo las navegaciones internas de Next.
  React.useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('set', 'autoConfig', false, '${META_PIXEL_ID}');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}

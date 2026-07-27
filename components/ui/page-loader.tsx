"use client";

export function PageLoader() {
  return (
    <div
      className="grid min-h-[100svh] place-items-center bg-[#F5F1EC]"
      role="status"
      aria-label="Cargando página"
    >
      <div className="relative h-12 w-12">
        <div className="absolute left-0 top-[60px] h-[5px] w-12 rounded-[50%] bg-[rgba(196,30,58,0.30)] animate-[devruby-shadow_0.5s_linear_infinite]" />
        <div className="absolute inset-0 rounded bg-crimson animate-[devruby-jump_0.5s_linear_infinite]" />
      </div>
      <style jsx>{`
        @keyframes devruby-jump {
          15% { border-bottom-right-radius: 3px; }
          25% { transform: translateY(9px) rotate(22.5deg); }
          50% { transform: translateY(18px) scale(1, .9) rotate(45deg); border-bottom-right-radius: 40px; }
          75% { transform: translateY(9px) rotate(67.5deg); }
          100% { transform: translateY(0) rotate(90deg); }
        }
        @keyframes devruby-shadow {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(1.2, 1); }
        }
      `}</style>
    </div>
  );
}

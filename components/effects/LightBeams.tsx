'use client';

export function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal light beams - increased width and opacity */}
      <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-accent-400/40 to-transparent transform -skew-x-12 animate-pulse"
           style={{ animationDuration: '3s' }} />
      <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-accent-300/30 to-transparent transform skew-x-12 animate-pulse"
           style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute top-0 left-2/3 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent transform -skew-x-12 animate-pulse"
           style={{ animationDuration: '5s', animationDelay: '2s' }} />

      {/* Horizontal subtle lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

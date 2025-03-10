
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface AnimatedGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedGradientBackground({
  className,
  children,
}: AnimatedGradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-background",
        className
      )}
      style={{
        backgroundImage: `
          radial-gradient(
            circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
            rgba(139, 92, 246, 0.1) 0%,
            rgba(59, 130, 246, 0.08) 40%,
            rgba(236, 72, 153, 0.06) 60%,
            rgba(0, 0, 0, 0) 100%
          )
        `,
      }}
    >
      {/* Subtle animated background */}
      <div 
        className="absolute inset-0 opacity-10 bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%',
          filter: 'blur(30px)',
          transform: 'translateZ(0)',
          animation: 'floating 20s ease-in-out infinite alternate'
        }}
      />
      
      {children}
    </div>
  );
}

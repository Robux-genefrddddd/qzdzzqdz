import { ReactNode, useRef, useEffect, useState } from "react";

export interface LogoItem {
  node?: ReactNode;
  src?: string;
  alt?: string;
  title: string;
  href: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  direction?: "left" | "right" | "up" | "down";
  speed?: number; // pixels per second
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number; // 0 = pause on hover
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  useCustomRender?: boolean;
}

export default function LogoLoop({
  logos,
  direction = "left",
  speed = 100,
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = false,
  fadeOutColor = "#000000",
  ariaLabel = "Logo carousel",
  useCustomRender = false,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const isHorizontal = direction === "left" || direction === "right";
  const isVertical = direction === "up" || direction === "down";

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setContainerWidth(
          isHorizontal ? containerRef.current.clientWidth : containerRef.current.clientHeight
        );
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isHorizontal]);

  const isReverse = direction === "right" || direction === "down";

  const getTotalWidth = () => {
    if (isHorizontal) {
      return (
        logos.reduce((sum) => sum + logoHeight + gap, 0) - gap
      );
    }
    return containerWidth;
  };

  const getTotalHeight = () => {
    if (isVertical) {
      return (
        logos.reduce((sum) => sum + logoHeight + gap, 0) - gap
      );
    }
    return 0;
  };

  const animationDuration = isHorizontal
    ? getTotalWidth() / (speed / 1000)
    : getTotalHeight() / (speed / 1000);

  const dynamicSpeed = hoverSpeed > 0 ? hoverSpeed : speed;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${isHorizontal ? "w-full" : "flex flex-col"}`}
      role="region"
      aria-label={ariaLabel}
      style={{
        position: "relative",
        height: isHorizontal ? "auto" : "400px",
      }}
    >
      {/* Fade gradient overlay */}
      {fadeOut && isHorizontal && (
        <>
          <div
            className="absolute top-0 left-0 h-full z-10 pointer-events-none"
            style={{
              width: "60px",
              backgroundImage: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute top-0 right-0 h-full z-10 pointer-events-none"
            style={{
              width: "60px",
              backgroundImage: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      {fadeOut && isVertical && (
        <>
          <div
            className="absolute top-0 left-0 w-full z-10 pointer-events-none"
            style={{
              height: "60px",
              backgroundImage: `linear-gradient(to bottom, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
            style={{
              height: "60px",
              backgroundImage: `linear-gradient(to top, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      <div
        className={`flex ${isVertical ? "flex-col" : ""} items-center`}
        style={{
          gap: `${gap}px`,
          animation: `scroll-${direction} ${animationDuration}s linear infinite`,
          animationPlayState: "running",
        }}
        onMouseEnter={(e) => {
          if (hoverSpeed === 0) {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        {/* Duplicate logos for seamless loop */}
        {[...logos, ...logos].map((logo, idx) => (
          <a
            key={idx}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center group transition-all duration-300"
            title={logo.title}
            style={{
              height: `${logoHeight}px`,
              minWidth: `${logoHeight}px`,
            }}
          >
            {logo.node ? (
              <div
                className={`${scaleOnHover ? "group-hover:scale-125" : ""} transition-transform duration-300`}
                style={{
                  fontSize: `${logoHeight * 0.7}px`,
                }}
              >
                {logo.node}
              </div>
            ) : logo.src ? (
              <img
                src={logo.src}
                alt={logo.alt || logo.title}
                className={`h-full object-contain ${
                  scaleOnHover ? "group-hover:scale-125" : ""
                } transition-transform duration-300`}
              />
            ) : null}
          </a>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - ${gap / 2}px));
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-50% - ${gap / 2}px));
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-50% - ${gap / 2}px));
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(calc(-50% - ${gap / 2}px));
          }
          100% {
            transform: translateY(0);
          }
        }

        [style*="scroll-left"] {
          will-change: transform;
          transform: translateZ(0);
        }

        [style*="scroll-right"] {
          will-change: transform;
          transform: translateZ(0);
        }

        [style*="scroll-up"] {
          will-change: transform;
          transform: translateZ(0);
        }

        [style*="scroll-down"] {
          will-change: transform;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}

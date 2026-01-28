import { ReactNode } from "react";

export interface LogoItem {
  node?: ReactNode;
  src?: string;
  alt?: string;
  title: string;
  href: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  direction?: "horizontal" | "vertical";
  speed?: "slow" | "normal" | "fast";
  onHoverDecelerate?: boolean;
}

export default function LogoLoop({
  logos,
  direction = "horizontal",
  speed = "normal",
  onHoverDecelerate = true,
}: LogoLoopProps) {
  const speedClass = {
    slow: "duration-20",
    normal: "duration-10",
    fast: "duration-5",
  }[speed];

  const isVertical = direction === "vertical";

  return (
    <div
      className={`overflow-hidden ${isVertical ? "h-96" : "w-full"}`}
      role="region"
      aria-label="Technology logos"
    >
      <div
        className={`flex gap-8 items-center ${
          isVertical ? "flex-col animate-scroll-vertical" : "animate-scroll-horizontal"
        } ${onHoverDecelerate ? "hover:pause" : ""} ${speedClass}`}
        style={{
          animation: isVertical
            ? `scrollVertical ${
                speed === "slow" ? "20s" : speed === "normal" ? "10s" : "5s"
              } linear infinite`
            : `scrollHorizontal ${
                speed === "slow" ? "20s" : speed === "normal" ? "10s" : "5s"
              } linear infinite`,
        }}
      >
        {/* Duplicate logos for seamless loop */}
        {[...logos, ...logos].map((logo, idx) => (
          <a
            key={idx}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center p-4 rounded-lg glass hover:glass-dark transition-all duration-300 group"
            title={logo.title}
          >
            {logo.node ? (
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {logo.node}
              </div>
            ) : logo.src ? (
              <img
                src={logo.src}
                alt={logo.alt || logo.title}
                className="h-8 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            ) : null}
            <span className="text-xs text-muted-foreground ml-2 hidden group-hover:block">
              {logo.title}
            </span>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes scrollHorizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollVertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll-horizontal {
          animation: scrollHorizontal 10s linear infinite;
        }
        .animate-scroll-vertical {
          animation: scrollVertical 10s linear infinite;
        }
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

import React, { useRef, useEffect } from 'react';

interface GooeyButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

const GooeyButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, GooeyButtonProps>(
  ({ children, onClick, className = '', as: Component = 'button', ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLSpanElement>(null);

    const particleCount = 12;
    const colors = [1, 2, 3, 1, 2, 3];

    const noise = (n = 1) => n / 2 - Math.random() * n;
    
    const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
      const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    const createParticle = (i: number, t: number) => {
      let rotate = noise(100 / 10);
      return {
        start: getXY(90, particleCount - i, particleCount),
        end: getXY(10 + noise(7), particleCount - i, particleCount),
        time: t,
        scale: 1 + noise(0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: rotate > 0 ? (rotate + 100 / 20) * 10 : (rotate - 100 / 20) * 10
      };
    };

    const makeParticles = () => {
      if (!filterRef.current) return;
      
      const animationTime = 400;
      const timeVariance = 200;

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const p = createParticle(i, t);

        setTimeout(() => {
          const particle = document.createElement('span');
          const point = document.createElement('span');
          particle.classList.add('gooey-particle');
          particle.style.setProperty('--start-x', `${p.start[0]}px`);
          particle.style.setProperty('--start-y', `${p.start[1]}px`);
          particle.style.setProperty('--end-x', `${p.end[0]}px`);
          particle.style.setProperty('--end-y', `${p.end[1]}px`);
          particle.style.setProperty('--time', `${p.time}ms`);
          particle.style.setProperty('--scale', `${p.scale}`);
          particle.style.setProperty('--color', `var(--color-${p.color}, #00d4ff)`);
          particle.style.setProperty('--rotate', `${p.rotate}deg`);
          
          point.classList.add('gooey-point');
          particle.appendChild(point);
          filterRef.current?.appendChild(particle);

          setTimeout(() => {
            try {
              filterRef.current?.removeChild(particle);
            } catch {}
          }, t);
        }, 30);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      makeParticles();
      if (onClick) {
        onClick(e as React.MouseEvent<HTMLButtonElement>);
      }
    };

    useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        :root {
          --color-1: #00d4ff;
          --color-2: #00ff88;
          --color-3: #0084ff;
        }
        .gooey-particle,
        .gooey-point {
          display: block;
          opacity: 0;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          transform-origin: center;
        }
        .gooey-particle {
          --time: 5s;
          position: absolute;
          pointer-events: none;
          animation: gooey-particle calc(var(--time)) ease 1 -250ms;
        }
        .gooey-point {
          background: var(--color);
          opacity: 1;
          animation: gooey-point calc(var(--time)) ease 1 -250ms;
        }
        @keyframes gooey-particle {
          0% {
            transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
            opacity: 1;
            animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
          }
          70% {
            transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
            opacity: 1;
            animation-timing-function: ease;
          }
          85% {
            transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
            opacity: 1;
          }
          100% {
            transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
            opacity: 0;
          }
        }
        @keyframes gooey-point {
          0% {
            transform: scale(0);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
          }
          25% {
            transform: scale(calc(var(--scale) * 0.25));
          }
          38% {
            opacity: 1;
          }
          65% {
            transform: scale(var(--scale));
            opacity: 1;
            animation-timing-function: ease;
          }
          85% {
            transform: scale(var(--scale));
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }, []);

    return (
      <div ref={containerRef} className="relative inline-block">
        <Component
          {...props}
          ref={ref}
          onClick={handleClick}
          className={className}
        >
          {children}
        </Component>
        <div
          ref={filterRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </div>
    );
  }
);

GooeyButton.displayName = 'GooeyButton';

export default GooeyButton;

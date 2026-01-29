import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Transition overlay - wipe from right to left */}
      {isTransitioning && (
        <div
          className="fixed inset-0 bg-black pointer-events-none z-50"
          style={{
            animation: "transitionWipeLeft 0.6s ease-in-out",
          }}
        />
      )}
    </>
  );
}

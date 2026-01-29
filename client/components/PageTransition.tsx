import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Déclencher la transition
    setIsTransitioning(true);

    // Masquer l'overlay après 300ms
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div
      className="fixed inset-0 bg-black pointer-events-none z-50"
      style={{
        animation: "fadeIn 0.15s ease-in forwards, fadeOut 0.15s ease-out 0.15s forwards",
      }}
    />
  );
}

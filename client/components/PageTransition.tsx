import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const [displayTransition, setDisplayTransition] = useState(false);

  useEffect(() => {
    // Déclencher l'animation au changement de route
    setDisplayTransition(true);

    // Garder l'overlay pendant toute l'animation (0.8s total)
    const timer = setTimeout(() => {
      setDisplayTransition(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {displayTransition && (
        <div
          className="fixed inset-0 bg-black pointer-events-none z-50"
          style={{
            animation:
              "transitionWipeComplete 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          }}
        />
      )}
    </>
  );
}

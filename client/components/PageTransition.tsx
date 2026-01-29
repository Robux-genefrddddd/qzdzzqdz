import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const [displayTransition, setDisplayTransition] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animation de sortie
    setIsExiting(true);

    // Afficher l'écran de transition au point milieu de la fade-out
    const showTransitionTimer = setTimeout(() => {
      setDisplayTransition(true);
      setIsExiting(false);
    }, 150);

    // Masquer la transition après la fade-in
    const hideTransitionTimer = setTimeout(() => {
      setDisplayTransition(false);
    }, 450);

    return () => {
      clearTimeout(showTransitionTimer);
      clearTimeout(hideTransitionTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {displayTransition && (
        <div
          className="fixed inset-0 bg-black pointer-events-none z-50"
          style={{
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        />
      )}
    </>
  );
}

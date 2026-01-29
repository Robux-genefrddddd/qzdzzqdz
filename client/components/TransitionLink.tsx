import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({
  to,
  children,
  className,
}: TransitionLinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Navigate au moment où le fade-out est terminé (0.15s)
    // et avant le fade-in (0.15s delay + 0.4s duration)
    setTimeout(() => {
      navigate(to);
    }, 150);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

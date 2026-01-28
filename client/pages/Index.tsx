import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  MessageSquare,
  Cpu,
  Code2,
  Sparkles,
} from "lucide-react";
import LogoLoop from "@/components/LogoLoop";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border/30 backdrop-blur-md sticky top-0 z-40 bg-background/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-xl font-bold gradient-text">PinIA</div>
          </Link>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 leading-tight tracking-tight text-white/95">
            PinIA
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/70 mb-8 leading-relaxed max-w-xl mx-auto font-normal">
            AI assistant for Roblox creators
          </p>

          {/* CTA - subtle */}
          <Link
            to="/chat"
            className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-md bg-primary/8 border border-primary/20 text-primary/90 hover:bg-primary/15 hover:border-primary/40 transition-all duration-500 text-sm font-medium group"
          >
            Start chatting
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/30 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {/* Feature 1 */}
            <div>
              <h3 className="font-bold text-sm mb-3 text-white">Scripting</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Optimized Lua patterns and best practices
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <h3 className="font-bold text-sm mb-3 text-white">Performance</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Optimization and architecture guidance
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <h3 className="font-bold text-sm mb-3 text-white">Design</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Game mechanics and system design
              </p>
            </div>

            {/* Feature 4 */}
            <div>
              <h3 className="font-bold text-sm mb-3 text-white">Support</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Instant answers whenever you need help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - minimal */}
      <section className="border-t border-border/30 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-white/40 uppercase tracking-widest mb-12">
            Built with modern technology
          </p>

          <LogoLoop
            logos={[
              {
                src: "https://raw.githubusercontent.com/react-icons/react-icons/master/demo/Fa.js",
                alt: "React",
                title: "React",
                href: "https://react.dev",
              },
              {
                src: "https://www.svgrepo.com/show/303157/typescript-new-logo.svg",
                alt: "TypeScript",
                title: "TypeScript",
                href: "https://www.typescriptlang.org",
              },
              {
                src: "https://www.svgrepo.com/show/374118/tailwind.svg",
                alt: "Tailwind CSS",
                title: "Tailwind CSS",
                href: "https://tailwindcss.com",
              },
              {
                src: "https://www.svgrepo.com/show/373595/node.svg",
                alt: "Node.js",
                title: "Node.js",
                href: "https://nodejs.org",
              },
            ]}
            speed="slow"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

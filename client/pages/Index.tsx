import { Link } from "react-router-dom";
import { ArrowRight, Zap, MessageSquare, Cpu, Code2, Sparkles } from "lucide-react";
import LogoLoop from "@/components/LogoLoop";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border/30 backdrop-blur-md sticky top-0 z-40 bg-background/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-xl font-bold gradient-text">RobloxAI</div>
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
      <section className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-secondary/20 backdrop-blur-sm mb-8">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground">The smarter way to build on Roblox</span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Your AI Assistant
            <br />
            <span className="gradient-text">for Roblox</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            Expert guidance on scripting, game design, and optimization. Available whenever you need it.
          </p>

          {/* CTA - subtle */}
          <Link
            to="/chat"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 font-medium group"
          >
            Start chatting
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/30 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {/* Feature 1 */}
            <div className="group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Code2 className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-sm mb-2">Scripting</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Optimized Lua patterns and best practices for Roblox development
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-sm mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Optimization strategies and architecture guidance
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Cpu className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-sm mb-2">Design</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Game mechanics and system design for scalability
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-sm mb-2">Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Instant answers available whenever you need help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built with Modern Tech</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade technology powering intelligent assistance
            </p>
          </div>

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

      {/* CTA Section */}
      <section className="border-t border-border py-16 sm:py-24 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to build something amazing?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of Roblox developers using RobloxAI to create better games faster.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-medium"
          >
            Get Started for Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

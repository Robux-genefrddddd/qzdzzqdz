import { Link } from "react-router-dom";
import { ArrowRight, Zap, MessageSquare, Cpu, Code2 } from "lucide-react";
import LogoLoop from "@/components/LogoLoop";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border backdrop-blur-sm sticky top-0 z-40 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">RobloxAI</div>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center justify-center">
        <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your AI Assistant for
            <br />
            <span className="gradient-text">Roblox Game Development</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            Build faster with intelligent guidance on scripting, game design, monetization strategies,
            and everything you need to create successful games on Roblox.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-medium flex items-center gap-2"
            >
              Start Free <ArrowRight size={20} />
            </Link>
            <button className="px-6 py-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors font-medium">
              Learn More
            </button>
          </div>
        </div>

        {/* Feature preview */}
        <div className="w-full max-w-3xl mb-12 rounded-lg border border-border bg-secondary/30 p-6 sm:p-8 glass backdrop-blur-sm">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p>Chat Interface Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border py-16 sm:py-24 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to develop, optimize, and launch successful Roblox games
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="p-6 sm:p-8 rounded-lg border border-border glass hover:glass-dark transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Code2 className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lua Scripting Guide</h3>
              <p className="text-muted-foreground">
                Expert guidance on writing optimized Lua scripts for Roblox games
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 sm:p-8 rounded-lg border border-border glass hover:glass-dark transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Performance Tips</h3>
              <p className="text-muted-foreground">
                Optimize your game's performance with best practices and architecture advice
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 sm:p-8 rounded-lg border border-border glass hover:glass-dark transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Cpu className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Game Architecture</h3>
              <p className="text-muted-foreground">
                Learn scalable design patterns and architecture for complex Roblox projects
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 sm:p-8 rounded-lg border border-border glass hover:glass-dark transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-muted-foreground">
                Get instant answers whenever you need help with your Roblox projects
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

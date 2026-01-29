import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  MessageSquare,
  Cpu,
  Code2,
  Sparkles,
} from "lucide-react";
import LogoCarousel from "@/components/LogoCarousel";
import Aurora from "@/components/Aurora";
import CardNav from "@/components/CardNav";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Aurora
          colorStops={['#5227FF', '#00ff88', '#5227FF']}
          amplitude={0.8}
          blend={0.6}
          speed={0.8}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Card Navigation */}
        <CardNav
          logo="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='32' font-weight='bold' font-family='Inter, sans-serif' fill='%2300d4ff'%3EPinIA%3C/text%3E%3C/svg%3E"
          logoAlt="PinIA"
          items={[
            {
              label: 'Features',
              bgColor: 'rgba(82, 39, 255, 0.1)',
              textColor: '#ffffff',
              links: [
                { label: 'Scripting', href: '#scripting', ariaLabel: 'Learn about scripting' },
                { label: 'Performance', href: '#performance', ariaLabel: 'Learn about performance' }
              ]
            },
            {
              label: 'Resources',
              bgColor: 'rgba(0, 255, 136, 0.1)',
              textColor: '#ffffff',
              links: [
                { label: 'Documentation', href: '#docs', ariaLabel: 'View documentation' },
                { label: 'Community', href: '#community', ariaLabel: 'Join community' }
              ]
            },
            {
              label: 'Company',
              bgColor: 'rgba(0, 212, 255, 0.1)',
              textColor: '#ffffff',
              links: [
                { label: 'About', href: '#about', ariaLabel: 'Learn about us' },
                { label: 'Contact', href: '#contact', ariaLabel: 'Get in touch' }
              ]
            }
          ]}
          baseColor='rgba(255, 255, 255, 0.05)'
          menuColor='#ffffff'
          buttonBgColor='#00d4ff'
          buttonTextColor='#000000'
          className='mt-2'
        />

        {/* Navigation */}
        <nav className="border-b border-border/20 backdrop-blur-md sticky top-0 z-40 bg-background/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-lg font-semibold gradient-text">PinIA</div>
            </Link>
            <div className="flex gap-3">
              <Link
                to="/login"
                className="link-smooth text-xs"
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

            {/* CTA - Enhanced Button */}
            <Link
              to="/chat"
              className="btn-smooth-primary"
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
        <section className="border-t border-border/20 py-14 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {/* Feature 1 */}
              <div className="group">
                <h3 className="font-medium text-xs mb-2 text-white/80 uppercase tracking-wide">
                  Scripting
                </h3>
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  Optimized Lua patterns and best practices
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <h3 className="font-medium text-xs mb-2 text-white/80 uppercase tracking-wide">
                  Performance
                </h3>
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  Optimization and architecture guidance
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group">
                <h3 className="font-medium text-xs mb-2 text-white/80 uppercase tracking-wide">
                  Design
                </h3>
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  Game mechanics and system design
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group">
                <h3 className="font-medium text-xs mb-2 text-white/80 uppercase tracking-wide">
                  Support
                </h3>
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  Instant answers whenever you need help
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section - minimal */}
        <section className="border-t border-border/20 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-normal text-white/30 uppercase tracking-widest mb-8">
              Built with modern technology
            </p>

            <LogoCarousel
              logos={[
                {
                  src: "https://i.ibb.co/KppBPM9s/react-1-logo-black-and-white-removebg-preview.png",
                  alt: "React",
                  title: "React",
                  href: "https://react.dev",
                },
                {
                  src: "https://i.ibb.co/TqBgb3HQ/images.png",
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
                  src: "https://i.ibb.co/VY9VcypN/nodejs-Hex.png",
                  alt: "Node.js",
                  title: "Node.js",
                  href: "https://nodejs.org",
                },
              ]}
              logoHeight={56}
              autoPlayInterval={3000}
              ariaLabel="Technology stack"
            />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

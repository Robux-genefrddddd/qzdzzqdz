import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StarBorder from "@/components/StarBorder";
import GooeyButton from "@/components/GooeyButton";
import LogoCarousel from "@/components/LogoCarousel";
import Squares from "@/components/Squares";
import GradualBlur from "@/components/GradualBlur";
import Footer from "@/components/Footer";
import TransitionLink from "@/components/TransitionLink";

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Squares */}
      <div className="fixed inset-0 z-0 opacity-80">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="#333"
          squareSize={50}
          hoverFillColor="#1a1a2e"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Navigation */}
        <nav className="border-b border-gray-800/30 backdrop-blur-sm sticky top-0 z-40 bg-black/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-white">PinIA</div>
            </Link>
            <TransitionLink
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
            >
              Sign in
            </TransitionLink>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 flex flex-col items-center justify-center">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Main title */}
            <div className="space-y-4">
              <h1 className="text-hero">
                AI Assistant
                <br />
                <span className="text-white underline decoration-1 underline-offset-8 opacity-90">
                  FOR Roblox Creators
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-subheader mx-auto max-w-2xl">
                An intelligent AI designed specifically for Roblox creators to
                design, optimize, and scale your games with professional
                guidance and industry best practices.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <GooeyButton as={Link} to="/chat">
                <StarBorder
                  as="span"
                  className="w-full sm:w-auto cursor-pointer"
                  color="#00d4ff"
                  speed="5s"
                >
                  Start Building
                </StarBorder>
              </GooeyButton>
              <GooeyButton as={Link} to="/register">
                <StarBorder
                  as="span"
                  className="w-full sm:w-auto cursor-pointer"
                  color="#00ff88"
                  speed="5s"
                >
                  Get Started
                </StarBorder>
              </GooeyButton>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-gray-800/30 py-20 sm:py-28 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Comprehensive Features
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to create professional Roblox experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Scripting",
                  desc: "Optimized Lua patterns and best practices",
                },
                {
                  title: "Performance",
                  desc: "Optimization and architecture guidance",
                },
                { title: "Design", desc: "Game mechanics and system design" },
                {
                  title: "Support",
                  desc: "Instant answers whenever you need help",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="card-premium group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="border-t border-gray-800/30 py-20 sm:py-28 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Built with Modern Tech
              </h2>
              <p className="text-gray-400">
                Industry-leading tools and frameworks
              </p>
            </div>

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

        {/* CTA Section */}
        <section className="border-t border-gray-800/30 py-20 sm:py-28 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  Ready to Create?
                </h2>
                <p className="text-gray-400">
                  Join creators building the next generation of Roblox games
                </p>
              </div>
              <GooeyButton as={Link} to="/chat">
                <StarBorder
                  as="span"
                  className="inline-block cursor-pointer"
                  color="#00d4ff"
                  speed="5s"
                >
                  Start Free
                </StarBorder>
              </GooeyButton>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Bottom Gradient Blur Fade */}
      <GradualBlur
        preset="page-footer"
        position="bottom"
        height="80px"
        strength={1.2}
        curve="ease-out"
        zIndex={20}
      />
    </div>
  );
}

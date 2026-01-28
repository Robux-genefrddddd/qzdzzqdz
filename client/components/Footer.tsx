import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/20 bg-background py-8 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Brand section */}
          <div className="flex flex-col items-start">
            <div className="text-sm font-semibold text-white/90 mb-3">
              PinIA
            </div>
            <p className="text-xs text-white/50 mb-3">
              AI assistant for Roblox creators
            </p>
            {/* Roblox logo attribution */}
            <div className="flex items-center gap-2 mt-3">
              <img
                src="https://i.ibb.co/B531Dsh6/roblox-logo-roblox-symbol-meaning-history-and-evolution-3-removebg-preview.png"
                alt="Roblox"
                className="h-5 object-contain"
              />
              <p className="text-xs text-white/40">
                Not an official Roblox site
              </p>
            </div>
          </div>

          {/* Links section */}
          <div>
            <h3 className="font-medium text-xs mb-3 text-white/70 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources section */}
          <div>
            <h3 className="font-medium text-xs mb-3 text-white/70 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
                >
                  Keyboard Shortcuts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-white/50 hover:text-white/70 transition-colors duration-300"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 mb-4" />

        {/* Bottom section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/40">
          <p>© 2026 PinIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

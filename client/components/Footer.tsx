import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background py-12 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand section */}
          <div className="flex flex-col items-start">
            <div className="text-lg font-bold text-white mb-4">PinIA</div>
            <p className="text-sm text-white/60 mb-4">
              AI assistant for Roblox creators
            </p>
            {/* Roblox logo attribution */}
            <div className="flex items-center gap-2 mt-4">
              <img
                src="https://i.ibb.co/B531Dsh6/roblox-logo-roblox-symbol-meaning-history-and-evolution-3-removebg-preview.png"
                alt="Roblox"
                className="h-6 object-contain"
              />
              <p className="text-xs text-white/50">
                Not an official Roblox site
              </p>
            </div>
          </div>

          {/* Links section */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources section */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Keyboard Shortcuts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 mb-6" />

        {/* Bottom section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-white/50">
          <p>© 2026 PinIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand section */}
          <div className="flex flex-col items-start">
            <div className="text-lg font-bold gradient-text mb-4">PinIA</div>
            <p className="text-sm text-muted-foreground mb-4">
              An advanced AI assistant designed for the Roblox creator community.
            </p>
            {/* Roblox logo attribution */}
            <div className="flex items-center gap-2 mt-4">
              <img
                src="https://i.ibb.co/B531Dsh6/roblox-logo-roblox-symbol-meaning-history-and-evolution-3-removebg-preview.png"
                alt="Roblox"
                className="h-6 object-contain"
              />
              <p className="text-xs text-muted-foreground">Not an official Roblox site</p>
            </div>
          </div>

          {/* Links section */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources section */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Keyboard Shortcuts
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-6" />

        {/* Bottom section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>© 2026 RobloxAI. All rights reserved.</p>
          <p className="text-xs leading-relaxed max-w-md">
            <strong>Disclaimer:</strong> This project is not affiliated with or endorsed by Roblox Corporation.
            RobloxAI is an independent AI assistant created for the Roblox creator community.
          </p>
        </div>
      </div>
    </footer>
  );
}

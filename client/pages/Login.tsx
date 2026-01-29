import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Github } from "lucide-react";
import Squares from "@/components/Squares";
import GradualBlur from "@/components/GradualBlur";
import TransitionLink from "@/components/TransitionLink";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate("/chat");
    }, 500);
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">
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

      {/* Login form */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center px-6 sm:px-8 animate-page-enter">
        <div className="w-full max-w-sm space-y-4">
          {/* Logo */}
          <div className="mb-4 text-center" style={{ animationDelay: "0.1s" }}>
            <Link
              to="/"
              className="text-lg font-bold text-white inline-block hover:text-cyan-400 transition-colors duration-300"
            >
              PinIA
            </Link>
          </div>

          <div style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold text-white mb-1">Sign in</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Sign in to your account to access PinIA
            </p>
          </div>

          {/* Login form */}
          <form
            onSubmit={handleLogin}
            className="space-y-4"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-white mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-500"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-white mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-500"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Remember me & forgot password */}
            <div className="flex items-center justify-between text-xs mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900"
                />
                <span className="text-gray-400 hover:text-white">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 mt-2 text-sm bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 text-white rounded-lg font-medium hover:border-gray-700 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div
            className="my-4 flex items-center gap-4"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-500">Or continue with</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* OAuth buttons */}
          <div className="space-y-2" style={{ animationDelay: "0.4s" }}>
            {/* Google OAuth */}
            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full py-2 px-4 text-sm border border-gray-800 rounded-lg font-medium text-white hover:bg-gray-900/50 hover:border-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            {/* GitHub OAuth */}
            <button
              onClick={() => handleOAuthLogin("github")}
              className="w-full py-2 px-4 text-sm border border-gray-800 rounded-lg font-medium text-white hover:bg-gray-900/50 hover:border-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Github size={16} />
              GitHub
            </button>
          </div>

          {/* Sign up link */}
          <p
            className="text-center text-xs text-gray-400 mt-4"
            style={{ animationDelay: "0.45s" }}
          >
            Don't have an account?{" "}
            <TransitionLink
              to="/register"
              className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-300"
            >
              Sign up
            </TransitionLink>
          </p>
        </div>
      </div>

      {/* Bottom Gradient Blur */}
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

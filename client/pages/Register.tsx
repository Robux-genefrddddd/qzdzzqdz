import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Github, Check } from "lucide-react";
import Squares from "@/components/Squares";
import GradualBlur from "@/components/GradualBlur";
import TransitionLink from "@/components/TransitionLink";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = (password: string) => {
    if (!password) return { level: 0, label: "", color: "" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 1)
      return { level: 1, label: "Faible", color: "bg-red-500" };
    if (strength <= 2)
      return { level: 2, label: "Moyen", color: "bg-orange-500" };
    if (strength <= 3)
      return { level: 3, label: "Bon", color: "bg-yellow-500" };
    return { level: 4, label: "Très fort", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.password && formData.confirmPassword === formData.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate("/chat");
    }, 500);
  };

  const handleOAuthRegister = (provider: string) => {
    console.log(`Registering with ${provider}`);
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

      {/* Registration form */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center px-6 sm:px-8 animate-page-enter">
        <div className="w-full max-w-sm">
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
            <h2 className="text-2xl font-bold text-white mb-1">
              Create account
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
              Get started with PinIA today
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs animate-page-enter">
              {error}
            </div>
          )}

          {/* Registration form */}
          <form
            onSubmit={handleRegister}
            className="space-y-3"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Name input */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-white mb-1"
              >
                Full Name
              </label>
              <div className="relative group">
                <User
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-300"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:border-gray-700 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-white mb-1"
              >
                Email
              </label>
              <div className="relative group">
                <Mail
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-300"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:border-gray-700 transition-all duration-300"
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
              <div className="relative group">
                <Lock
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-300"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:border-gray-700 transition-all duration-300"
                  required
                />
              </div>
              {formData.password && (
                <div className="mt-1 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                          i < passwordStrength.level
                            ? passwordStrength.color
                            : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    Force:{" "}
                    <span
                      className={`font-medium ${passwordStrength.color.replace("bg-", "text-")}`}
                    >
                      {passwordStrength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-white mb-1"
              >
                Confirm Password
              </label>
              <div className="relative group">
                <Lock
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-300"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:border-gray-700 transition-all duration-300"
                  required
                />
                {formData.confirmPassword && passwordsMatch && (
                  <Check
                    size={16}
                    className="absolute right-3 top-2.5 text-green-500 animate-in fade-in scale-in duration-300"
                  />
                )}
              </div>
              {formData.confirmPassword && (
                <p
                  className={`text-xs mt-1 transition-colors duration-300 ${
                    passwordsMatch
                      ? "text-green-400 animate-in fade-in slide-in-from-top-2 duration-300"
                      : "text-red-400 animate-in fade-in slide-in-from-top-2 duration-300"
                  }`}
                >
                  {passwordsMatch
                    ? "✓ Les mots de passe correspondent"
                    : "✗ Les mots de passe ne correspondent pas"}
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                className="w-3 h-3 rounded border-gray-700 bg-gray-900 mt-0.5"
                required
              />
              <span className="text-xs text-gray-400">
                I agree to the{" "}
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  Privacy
                </a>
              </span>
            </label>

            {/* Sign up button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 text-sm bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 text-white rounded-lg font-medium hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-2"
            >
              {isLoading ? "Creating..." : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div
            className="my-3 flex items-center gap-4"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-500">Or sign up with</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* OAuth buttons */}
          <div className="space-y-2" style={{ animationDelay: "0.4s" }}>
            {/* Google OAuth */}
            <button
              type="button"
              onClick={() => handleOAuthRegister("google")}
              className="w-full py-2 px-4 text-sm border border-gray-800 rounded-lg font-medium text-white hover:bg-gray-900/50 hover:border-gray-700 hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
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
              type="button"
              onClick={() => handleOAuthRegister("github")}
              className="w-full py-2 px-4 text-sm border border-gray-800 rounded-lg font-medium text-white hover:bg-gray-900/50 hover:border-gray-700 hover:shadow-lg hover:shadow-gray-500/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Github size={16} />
              GitHub
            </button>
          </div>

          {/* Sign in link */}
          <p
            className="text-center text-xs text-gray-400 mt-4"
            style={{ animationDelay: "0.45s" }}
          >
            Already have an account?{" "}
            <TransitionLink
              to="/login"
              className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-300"
            >
              Sign in
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

import { useState, useRef, useEffect } from "react";
import { Send, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Squares from "@/components/Squares";
import GradualBlur from "@/components/GradualBlur";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function Chat() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm PinIA, your dedicated assistant for Roblox game development. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }

    const userMessage: Message = {
      id: Math.random().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: Math.random().toString(),
        text: `Thanks for asking about "${input}". This is a simulated response from PinIA. In a production environment, this would be connected to an actual AI service to provide expert guidance on Roblox game development.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-black text-white relative overflow-hidden">
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

      {/* Sidebar */}
      <div className="relative z-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col relative z-0">
        {/* Header */}
        <header className="border-b border-gray-800/30 backdrop-blur-md py-4 px-4 sm:px-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-black/40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-900/60 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-200"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-semibold text-white flex-1 text-center lg:text-left">
            Chat with PinIA
          </h1>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-200">
            U
          </div>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Start a new conversation
              </h2>
              <p className="text-gray-400 max-w-md">
                Ask me anything about Roblox game development, scripting,
                design, monetization, and more.
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex animate-fade-in-up gap-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "ai" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        P
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    {message.sender === "ai" && (
                      <span className="text-xs text-gray-400 ml-0.5">PinIA</span>
                    )}
                    <div
                      className={`max-w-xs sm:max-w-md lg:max-w-2xl px-4 py-3 rounded-xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-br-none shadow-lg shadow-cyan-500/20"
                          : "bg-gray-900/80 text-white rounded-bl-none border border-gray-800/50"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className={`text-xs mt-1.5 block ${message.sender === "user" ? "opacity-70" : "opacity-60 text-gray-400"}`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  {message.sender === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        U
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="bg-gray-900 text-white rounded-lg rounded-bl-none border border-gray-800 px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-200" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-400" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-gray-800/30 bg-black/50 p-4 sm:p-6 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                rows={1}
                className="flex-1 px-4 py-2.5 bg-gray-900/60 border border-gray-800 rounded-xl text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-3 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 group"
                title="Send message (Enter)"
              >
                <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full animate-fade-in-up">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/10 mb-6">
              <Sparkles className="text-cyan-400" size={24} />
            </div>

            <h2 className="text-2xl font-semibold text-white mb-2">
              Sign in to continue
            </h2>
            <p className="text-gray-400 mb-8">
              Create an account to start chatting with PinIA.
            </p>

            <div className="space-y-3 mb-6">
              <Link
                to="/register"
                className="block w-full py-3 px-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-center font-medium"
              >
                Create Account
              </Link>
              <button
                onClick={() => {
                  setShowAuthPrompt(false);
                  setIsAuthenticated(true);
                }}
                className="block w-full py-3 px-4 border border-gray-800 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Demo (No signup)
              </button>
            </div>

            <button
              onClick={() => setShowAuthPrompt(false)}
              className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}

      <style>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

import {
  ArrowLeft,
  Send,
  Bug,
  Lightbulb,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Squares from "@/components/Squares";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function Feedback() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedback"), {
        userId: user.uid,
        userEmail: user.email,
        type: feedbackType,
        title,
        description,
        createdAt: serverTimestamp(),
      });
      toast.success("Feedback submitted successfully!");
      setTitle("");
      setDescription("");
      setFeedbackType("bug");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
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
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800/30 backdrop-blur-md py-4 px-6 bg-gradient-to-b from-black/80 to-black/40">
          <div className="flex items-center gap-4">
            <Link
              to="/chat"
              className="p-2 hover:bg-gray-900/60 rounded-lg transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold">Help & Feedback</h1>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-2">Help & Feedback</h2>
              <p className="text-gray-400">
                Help us improve PinIA by sharing your feedback and suggestions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 p-8 rounded-2xl bg-gradient-to-br from-gray-900/40 to-gray-950/40 border border-gray-800/50 backdrop-blur-sm"
                >
                  {/* Feedback Type */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare size={16} className="text-cyan-400" />
                      Feedback Type
                    </label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    >
                      <option value="bug">🐛 Bug Report</option>
                      <option value="feature">✨ Feature Request</option>
                      <option value="suggestion">💡 Suggestion</option>
                      <option value="other">📝 Other</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Brief description of your feedback"
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please provide detailed information..."
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-lg hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-cyan-500/25 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </form>
              </div>

              {/* Info Section */}
              <div className="space-y-4">
                {/* FAQ Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-yellow-400" />
                    FAQ
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-800/30 hover:border-blue-500/30 transition-all duration-200">
                      <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                        <Clock size={14} />
                        Response Time
                      </h4>
                      <p className="text-xs text-gray-400">
                        We review feedback within 24-48 hours.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-900/20 to-green-950/20 border border-green-800/30 hover:border-green-500/30 transition-all duration-200">
                      <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle size={14} />
                        Tracking
                      </h4>
                      <p className="text-xs text-gray-400">
                        Get email updates on your feedback status.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-red-900/20 to-red-950/20 border border-red-800/30 hover:border-red-500/30 transition-all duration-200">
                      <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                        <AlertCircle size={14} />
                        Security
                      </h4>
                      <p className="text-xs text-gray-400">
                        Mark urgent security issues clearly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

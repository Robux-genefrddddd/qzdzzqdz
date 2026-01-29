import { ArrowLeft, Save, Mail, Bell, Palette, Lock, Shield, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Squares from "@/components/Squares";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

interface UserPreferences {
  emailNotifications: boolean;
  chatNotifications: boolean;
  theme: "dark" | "light";
  apiAccess: boolean;
}

export default function Settings() {
  const navigate = useNavigate();
  const { user: authUser, isLoading } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({
    emailNotifications: true,
    chatNotifications: true,
    theme: "dark",
    apiAccess: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingPrefs, setIsLoadingPrefs] = useState(true);

  useEffect(() => {
    if (!isLoading && !authUser) {
      navigate("/login");
    }
  }, [authUser, isLoading, navigate]);

  useEffect(() => {
    const loadPreferences = async () => {
      if (!authUser) return;
      try {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists() && userDoc.data().preferences) {
          setPreferences(userDoc.data().preferences);
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      } finally {
        setIsLoadingPrefs(false);
      }
    };
    loadPreferences();
  }, [authUser]);

  const handleSave = async () => {
    if (!authUser) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, "users", authUser.uid), {
        preferences,
        updatedAt: new Date().toISOString(),
      });
      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const togglePreference = (key: keyof UserPreferences) => {
    if (typeof preferences[key] === "boolean") {
      setPreferences((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
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
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {/* Account Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Account</h2>
              <div className="p-6 rounded-lg bg-gradient-to-br from-gray-900/40 to-gray-950/40 border border-gray-800/50 space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email Address</p>
                  <p className="font-medium">{authUser?.email}</p>
                </div>
                <div className="pt-4 border-t border-gray-700/30">
                  <p className="text-sm text-gray-400 mb-2">Account Created</p>
                  <p className="font-medium">
                    {authUser?.metadata?.creationTime
                      ? new Date(authUser.metadata.creationTime).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <div className="space-y-3 p-6 rounded-lg bg-gradient-to-br from-gray-900/40 to-gray-950/40 border border-gray-800/50">
                {/* Email Notifications */}
                <div className="flex items-center justify-between py-3 border-b border-gray-700/30">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Receive updates about your account and chats
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("emailNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.emailNotifications
                        ? "bg-cyan-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.emailNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Chat Notifications */}
                <div className="flex items-center justify-between py-3 border-b border-gray-700/30">
                  <div>
                    <p className="font-medium">Chat Notifications</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Get notified when you receive new messages
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("chatNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.chatNotifications
                        ? "bg-cyan-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.chatNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* API Access */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">API Access</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Enable API access for integrations
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("apiAccess")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.apiAccess ? "bg-cyan-500" : "bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.apiAccess ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Appearance</h2>
              <div className="p-6 rounded-lg bg-gradient-to-br from-gray-900/40 to-gray-950/40 border border-gray-800/50">
                <div>
                  <p className="font-medium mb-3">Theme</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        setPreferences((prev) => ({ ...prev, theme: "dark" }))
                      }
                      className={`px-4 py-2 rounded-lg transition-all ${
                        preferences.theme === "dark"
                          ? "bg-cyan-500 text-white"
                          : "bg-gray-900/40 text-gray-400 hover:bg-gray-900/60"
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      disabled
                      className="px-4 py-2 rounded-lg bg-gray-900/20 text-gray-500 cursor-not-allowed opacity-50"
                    >
                      Light (Coming Soon)
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-lg hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-cyan-500/25 active:scale-95 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

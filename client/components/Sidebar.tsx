import { useState, useEffect } from "react";
import {
  ChevronLeft,
  Plus,
  Search,
  Settings,
  LogOut,
  MessageCircle,
  MoreVertical,
  Trash2,
  Share2,
  Clock,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "sonner";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentChatId?: string;
}

interface ChatItem {
  id: string;
  title: string;
  date: string;
  timestamp?: Date;
}

export default function Sidebar({ isOpen = true, onClose, currentChatId }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userInitial, setUserInitial] = useState("U");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);
  const [newChatName, setNewChatName] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserEmail(user.email || "");
      setUserInitial(user.email?.charAt(0).toUpperCase() || "U");

      // Fetch recent chats from Firebase
      const chatsRef = collection(db, "users", user.uid, "chats");
      const q = query(chatsRef, orderBy("updatedAt", "desc"), limit(10));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chats: ChatItem[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const date = data.updatedAt?.toDate?.() || new Date();
          return {
            id: doc.id,
            title: data.title || "Untitled Chat",
            date: formatDate(date),
            timestamp: date,
          };
        });
        setChatHistory(chats);
      });

      return unsubscribe;
    }
  }, [user]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return `${Math.floor(days / 7)} weeks ago`;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const handleNewChat = () => {
    navigate("/chat?new=true");
    onClose?.();
  };

  const handleDeleteChat = async (chatId: string) => {
    if (!user) return;
    try {
      const chatRef = doc(db, "users", user.uid, "chats", chatId);
      await deleteDoc(chatRef);
      toast.success("Chat deleted");
      setOpenMenuId(null);
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete chat");
    }
  };

  const handleRenameChat = async () => {
    if (!user || !renamingChatId || !newChatName.trim()) return;
    try {
      const chatRef = doc(db, "users", user.uid, "chats", renamingChatId);
      const { updateDoc, serverTimestamp } = await import("firebase/firestore");
      await updateDoc(chatRef, {
        title: newChatName,
        updatedAt: serverTimestamp(),
      });
      toast.success("Chat renamed");
      setRenameModalOpen(false);
      setRenamingChatId(null);
      setNewChatName("");
      setOpenMenuId(null);
    } catch (error) {
      console.error("Error renaming chat:", error);
      toast.error("Failed to rename chat");
    }
  };

  const handleShareChat = (chatId: string, title: string) => {
    const shareText = `Check out this chat: ${title}`;
    if (navigator.share) {
      navigator.share({
        title: "PinIA Chat",
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Chat link copied to clipboard");
    }
    setOpenMenuId(null);
  };

  const openRenameModal = (chatId: string, currentTitle: string) => {
    setRenamingChatId(chatId);
    setNewChatName(currentTitle);
    setRenameModalOpen(true);
    setOpenMenuId(null);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-950 to-black border-r border-gray-800/50 transition-all duration-300 z-50 flex flex-col pointer-events-auto ${
          isCollapsed ? "w-20" : "w-64"
        } ${!isOpen && "max-lg:-translate-x-full"}`}
      >
        {/* Header */}
        <div
          className={`flex items-center border-b border-gray-800/30 transition-all duration-300 ${isCollapsed ? "p-2 justify-center" : "p-3 justify-between"}`}
        >
          {!isCollapsed && (
            <Link
              to="/"
              className="font-bold text-base text-white hover:opacity-80 transition-opacity"
            >
              PinIA
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-gray-900/60 rounded-lg transition-all duration-200 text-gray-400 hover:text-cyan-400 relative z-50"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <ChevronLeft
              size={18}
              className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* New Chat Button */}
        <div
          className={`border-b border-gray-800/30 transition-all duration-300 ${isCollapsed ? "p-2" : "p-3"}`}
        >
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-cyan-500/40 hover:border-cyan-400/60 text-cyan-400 hover:text-cyan-300 transition-all duration-200 font-medium text-xs active:scale-95 hover:bg-cyan-500/10"
          >
            <Plus size={16} />
            {!isCollapsed && "New Chat"}
          </button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-3 border-b border-gray-800/30">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full relative flex items-center gap-2.5"
            >
              <Search size={14} className="text-gray-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-0 pr-2.5 py-1.5 bg-transparent border-b border-gray-800 rounded-none text-gray-300 text-xs placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all duration-200 pointer-events-none"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSearchOpen(true);
                }}
              />
            </button>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-500 uppercase px-2 mb-2 tracking-wider">
              Recent
            </p>
          )}
          {chatHistory.map((chat) => (
            <div key={chat.id} className="group relative">
              <button
                onClick={() => {
                  navigate(`/chat?chat=${chat.id}`);
                  onClose?.();
                }}
                className={`w-full text-left px-2 py-1.5 rounded-lg transition-all duration-200 ${
                  currentChatId === chat.id
                    ? "bg-cyan-500/20 border-l-2 border-cyan-500 text-cyan-300 hover:bg-cyan-500/30"
                    : "hover:bg-gray-900/40 text-gray-300 hover:text-gray-100"
                }`}>
                <div className="flex items-start gap-2">
                  <MessageCircle
                    size={14}
                    className="mt-0.5 text-gray-600 group-hover:text-cyan-500 flex-shrink-0 transition-colors duration-200"
                  />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-300 truncate group-hover:text-gray-100">
                        {chat.title}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock size={10} className="text-gray-600" />
                        <p className="text-xs text-gray-500">{chat.date}</p>
                      </div>
                    </div>
                  )}
                </div>
              </button>
              {!isCollapsed && (
                <div className="absolute right-2 top-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === chat.id ? null : chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300"
                  >
                    <MoreVertical size={14} />
                  </button>
                  {openMenuId === chat.id && (
                    <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => openRenameModal(chat.id, chat.title)}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors rounded-t-lg flex items-center gap-2"
                      >
                        <MessageCircle size={12} />
                        Rename
                      </button>
                      <button
                        onClick={() => handleShareChat(chat.id, chat.title)}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors flex items-center gap-2"
                      >
                        <Share2 size={12} />
                        Share
                      </button>
                      <button
                        onClick={() => handleDeleteChat(chat.id)}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-red-400 hover:bg-red-900/20 transition-colors rounded-b-lg flex items-center gap-2"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          className={`border-t border-gray-800/30 transition-all duration-300 ${isCollapsed ? "p-1.5 space-y-1" : "p-2.5 space-y-0.5"}`}
        >
          {!isCollapsed && (
            <>
              <Link
                to="/resources"
                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-900/40 transition-all duration-200 text-gray-400 hover:text-cyan-400"
              >
                <BookOpen size={16} />
                <span className="text-xs">Resources</span>
              </Link>
              <Link
                to="/feedback"
                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-900/40 transition-all duration-200 text-gray-400 hover:text-cyan-400"
              >
                <HelpCircle size={16} />
                <span className="text-xs">Help & Feedback</span>
              </Link>
            </>
          )}
          <Link
            to="/settings"
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-900/40 transition-all duration-200 text-gray-400 hover:text-cyan-400 group"
          >
            <Settings
              size={16}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            {!isCollapsed && <span className="text-xs">Settings</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-red-950/30 transition-all duration-200 text-gray-400 hover:text-red-400"
          >
            <LogOut size={16} />
            {!isCollapsed && <span className="text-xs">Sign Out</span>}
          </button>

          {!isCollapsed && (
            <div className="pt-2 border-t border-gray-800/30">
              <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-900/40 rounded-lg transition-all duration-200">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                  {userInitial}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-medium text-gray-300 truncate">
                    {user?.email?.split("@")[0] || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content offset */}
      {!isCollapsed && (
        <div className="hidden lg:block w-64" aria-hidden="true" />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        chatHistory={chatHistory}
      />

      {/* Rename Modal */}
      {renameModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-950 to-black border border-gray-800/50 rounded-2xl p-6 max-w-sm w-full animate-fade-in-up shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Rename Chat
            </h2>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Enter new chat name"
              className="w-full px-4 py-2.5 bg-gray-900/60 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all mb-4"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameChat();
                }
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleRenameChat}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-lg hover:from-cyan-500 hover:to-cyan-400 transition-all duration-200 font-medium shadow-lg hover:shadow-cyan-500/25 active:scale-95"
              >
                Rename
              </button>
              <button
                onClick={() => {
                  setRenameModalOpen(false);
                  setRenamingChatId(null);
                  setNewChatName("");
                }}
                className="flex-1 py-2.5 px-4 border border-gray-700 text-white rounded-lg hover:bg-gray-900/50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

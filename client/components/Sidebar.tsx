import { useState } from "react";
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
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const chatHistory = [
    { id: 1, title: "Roblox Game Design Tips", date: "Today" },
    { id: 2, title: "Lua Scripting Optimization", date: "Yesterday" },
    { id: 3, title: "Asset Development Pipeline", date: "2 days ago" },
    { id: 4, title: "Monetization Strategies", date: "1 week ago" },
  ];

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
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-950 to-black border-r border-gray-800/50 transition-all duration-300 z-50 flex flex-col ${
          isCollapsed ? "w-20" : "w-64"
        } ${!isOpen && "max-lg:-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800/30">
          {!isCollapsed && (
            <Link to="/" className="font-bold text-lg gradient-text hover:opacity-80 transition-opacity">
              PinIA
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-900/60 rounded-lg transition-all duration-200 text-gray-400 hover:text-cyan-400"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <ChevronLeft size={20} className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-800/30">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 text-white hover:from-cyan-500 hover:to-cyan-400 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-cyan-500/25 active:scale-95">
            <Plus size={18} />
            {!isCollapsed && "New Chat"}
          </button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-800/30">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-300 text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-3 tracking-wider">
              Recent
            </p>
          )}
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="group relative"
            >
              <button
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-900/40 transition-all duration-200 text-gray-300 hover:text-gray-100"
              >
                <div className="flex items-start gap-2.5">
                  <MessageCircle
                    size={16}
                    className="mt-1 text-gray-600 group-hover:text-cyan-500 flex-shrink-0 transition-colors duration-200"
                  />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate group-hover:text-gray-100">
                        {chat.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock size={12} className="text-gray-600" />
                        <p className="text-xs text-gray-500">
                          {chat.date}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </button>
              {!isCollapsed && (
                <button className="absolute right-2 top-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300">
                  <MoreVertical size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/30 p-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-900/40 transition-all duration-200 text-gray-400 hover:text-cyan-400 group">
            <Settings size={18} className="transition-transform duration-200 group-hover:rotate-90" />
            {!isCollapsed && <span className="text-sm">Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-900/40 transition-all duration-200 text-gray-400 hover:text-red-400">
            <LogOut size={18} />
            {!isCollapsed && <span className="text-sm">Sign Out</span>}
          </button>

          {!isCollapsed && (
            <div className="pt-2 border-t border-gray-800/30">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-900/40 rounded-lg transition-all duration-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  U
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-300 truncate">
                    User
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    user@example.com
                  </p>
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
    </>
  );
}

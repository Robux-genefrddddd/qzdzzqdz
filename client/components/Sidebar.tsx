import { useState } from "react";
import { Menu, Plus, Search, Settings, LogOut, MessageCircle } from "lucide-react";
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
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50 flex flex-col ${
          isCollapsed ? "w-20" : "w-64"
        } ${!isOpen && "max-lg:-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <Link to="/" className="font-bold text-lg gradient-text">
              PinIA
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-sidebar-accent rounded-md transition-colors"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <Menu size={20} className="text-sidebar-foreground" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-sidebar-border">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90 transition-opacity font-medium">
            <Plus size={20} />
            {!isCollapsed && "New Chat"}
          </button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-sidebar-foreground/40"
              />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-10 pr-4 py-2 bg-sidebar-accent border border-sidebar-border rounded-lg text-sidebar-foreground text-sm placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-sidebar-primary"
              />
            </div>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase px-2 mb-3">
            {!isCollapsed && "Chat History"}
          </p>
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group"
            >
              <div className="flex items-start gap-2">
                <MessageCircle size={16} className="mt-1 text-sidebar-foreground/60 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-sidebar-foreground truncate group-hover:text-sidebar-primary-foreground">
                      {chat.title}
                    </p>
                    <p className="text-xs text-sidebar-foreground/40">{chat.date}</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground/80 hover:text-sidebar-foreground">
            <Settings size={20} />
            {!isCollapsed && <span className="text-sm">Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground/80 hover:text-sidebar-foreground">
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm">Sign Out</span>}
          </button>

          {!isCollapsed && (
            <div className="pt-2 border-t border-sidebar-border">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-semibold text-sm">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    User
                  </p>
                  <p className="text-xs text-sidebar-foreground/50 truncate">
                    user@example.com
                  </p>
                </div>
              </div>
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

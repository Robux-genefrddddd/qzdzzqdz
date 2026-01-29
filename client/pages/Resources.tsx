import { ArrowLeft, ExternalLink, BookOpen, Code, Zap, Users, Package, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Squares from "@/components/Squares";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const resources = [
  {
    title: "Roblox Studio Documentation",
    description: "Official Roblox Studio documentation and tutorials",
    url: "https://create.roblox.com/docs",
    category: "Documentation",
    icon: BookOpen,
  },
  {
    title: "Luau Programming Guide",
    description: "Learn Luau, the scripting language for Roblox",
    url: "https://roblox.github.io/luau/",
    category: "Programming",
    icon: Code,
  },
  {
    title: "Roblox Creator Exchange (DevEx)",
    description: "Monetize your games and earn real money",
    url: "https://devex.roblox.com",
    category: "Monetization",
    icon: Zap,
  },
  {
    title: "Developer Forum",
    description: "Connect with other Roblox developers and get help",
    url: "https://devforum.roblox.com",
    category: "Community",
    icon: Users,
  },
  {
    title: "Asset Library",
    description: "Browse and download assets for your games",
    url: "https://www.roblox.com/catalog",
    category: "Assets",
    icon: Package,
  },
  {
    title: "Game Design Best Practices",
    description: "Tips and tricks for designing engaging Roblox games",
    url: "https://create.roblox.com/docs/building-experiences/design",
    category: "Design",
    icon: Palette,
  },
];

export default function Resources() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const categories = Array.from(new Set(resources.map((r) => r.category)));

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
            <h1 className="text-2xl font-bold">Resources</h1>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-2">Resources</h2>
              <p className="text-gray-400 text-lg">
                Essential guides and tools for Roblox game development
              </p>
            </div>

            {categories.map((category) => {
              const categoryResources = resources.filter((r) => r.category === category);
              const categoryColors: { [key: string]: { bg: string; text: string; icon: string } } = {
                "Documentation": { bg: "from-blue-900/20 to-blue-950/20", text: "text-blue-400", icon: "bg-blue-500/20" },
                "Programming": { bg: "from-purple-900/20 to-purple-950/20", text: "text-purple-400", icon: "bg-purple-500/20" },
                "Monetization": { bg: "from-green-900/20 to-green-950/20", text: "text-green-400", icon: "bg-green-500/20" },
                "Community": { bg: "from-pink-900/20 to-pink-950/20", text: "text-pink-400", icon: "bg-pink-500/20" },
                "Assets": { bg: "from-yellow-900/20 to-yellow-950/20", text: "text-yellow-400", icon: "bg-yellow-500/20" },
                "Design": { bg: "from-orange-900/20 to-orange-950/20", text: "text-orange-400", icon: "bg-orange-500/20" },
              };

              const colors = categoryColors[category] || { bg: "from-gray-900/20 to-gray-950/20", text: "text-gray-400", icon: "bg-gray-500/20" };

              return (
                <div key={category} className="mb-12">
                  <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${colors.text}`}>
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {categoryResources.map((resource, idx) => {
                      const Icon = resource.icon;
                      return (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-6 rounded-xl bg-gradient-to-br ${colors.bg} border border-gray-800/50 hover:border-cyan-500/50 hover:bg-gray-900/40 transition-all duration-300 group`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${colors.icon} flex-shrink-0`}>
                              <Icon size={24} className={colors.text} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                {resource.title}
                              </h4>
                              <p className="text-sm text-gray-400 mt-2">
                                {resource.description}
                              </p>
                              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <span className="text-xs text-cyan-400 font-medium">Visit →</span>
                                <ExternalLink
                                  size={14}
                                  className="text-cyan-400"
                                />
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

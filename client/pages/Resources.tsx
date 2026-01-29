import { ArrowLeft, ExternalLink } from "lucide-react";
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
  },
  {
    title: "Luau Programming Guide",
    description: "Learn Luau, the scripting language for Roblox",
    url: "https://roblox.github.io/luau/",
    category: "Programming",
  },
  {
    title: "Roblox Creator Exchange (DevEx)",
    description: "Monetize your games and earn real money",
    url: "https://devex.roblox.com",
    category: "Monetization",
  },
  {
    title: "Developer Forum",
    description: "Connect with other Roblox developers and get help",
    url: "https://devforum.roblox.com",
    category: "Community",
  },
  {
    title: "Asset Library",
    description: "Browse and download assets for your games",
    url: "https://www.roblox.com/catalog",
    category: "Assets",
  },
  {
    title: "Game Design Best Practices",
    description: "Tips and tricks for designing engaging Roblox games",
    url: "https://create.roblox.com/docs/building-experiences/design",
    category: "Design",
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
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 mb-8">
              Explore essential resources for Roblox game development, including
              documentation, tutorials, and community forums.
            </p>

            {categories.map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources
                    .filter((r) => r.category === category)
                    .map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-lg bg-gradient-to-br from-gray-900/40 to-gray-950/40 border border-gray-800/50 hover:border-cyan-500/50 hover:bg-gray-900/60 transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-2">
                              {resource.description}
                            </p>
                          </div>
                          <ExternalLink
                            size={16}
                            className="ml-2 text-gray-500 group-hover:text-cyan-400 transition-colors flex-shrink-0"
                          />
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

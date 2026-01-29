import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchResult {
  id: number;
  title: string;
  date: string;
  preview?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: SearchResult[];
}

export default function SearchModal({
  isOpen,
  onClose,
  chatHistory,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = chatHistory.filter((chat) =>
      chat.title.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered);
  }, [query, chatHistory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-gray-950 to-black border border-gray-800/50 rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-in-up max-h-[70vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800/30 p-4">
          <div className="flex items-center gap-3">
            <Search size={20} className="text-cyan-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversations..."
              autoFocus
              className="flex-1 bg-transparent text-white text-lg placeholder:text-gray-500 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-900/60 rounded-lg transition-colors text-gray-400 hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Search size={32} className="mb-3 opacity-50" />
              <p className="text-sm">
                {query ? "No conversations found" : "Start typing to search"}
              </p>
            </div>
          ) : (
            results.map((result) => (
              <button
                key={result.id}
                onClick={() => {
                  // Handle click
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-900/60 transition-all duration-200 group border border-gray-800/0 hover:border-gray-800/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-300 group-hover:text-cyan-400 truncate transition-colors">
                      {result.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{result.date}</p>
                  </div>
                  <span className="text-xs text-cyan-400/60 ml-2 flex-shrink-0">
                    →
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        {query && results.length > 0 && (
          <div className="border-t border-gray-800/30 px-4 py-2 text-xs text-gray-500 text-center">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </div>
        )}
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { Search, Box, Menu, X } from "lucide-react";
import { useState } from "react";
import { searchModels } from "@/data/models";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = query.length > 1 ? searchModels(query) : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Box className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-lg font-bold tracking-tight">
            Resource<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
          <Link to="/models" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Models</Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 glass-card p-3 shadow-xl">
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search models..."
                  className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {results.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto space-y-1">
                    {results.map(m => (
                      <button
                        key={m.id}
                        onClick={() => { navigate(`/model/${m.slug}`); setSearchOpen(false); setQuery(""); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/60 text-sm transition-colors"
                      >
                        <span className="text-foreground">{m.name}</span>
                        <span className="text-muted-foreground ml-2 text-xs">{m.category}</span>
                      </button>
                    ))}
                  </div>
                )}
                {query.length > 1 && results.length === 0 && (
                  <p className="text-xs text-muted-foreground mt-2 px-1">No models found</p>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-glass-border/30 px-4 py-4 space-y-2">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/categories" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-foreground">Categories</Link>
          <Link to="/models" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-foreground">All Models</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

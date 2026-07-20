import { useState } from "react";
import { Search, X } from "lucide-react";
import { useLang } from "../lib/LangContext";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const { lang } = useLang();

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const clear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative max-w-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={lang === "es" ? "Buscar series, categorías, proveedores…" : "Search series, categories, providers…"}
        className="w-full h-10 pl-9 pr-9 rounded-full border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
      />
      {query && (
        <button onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

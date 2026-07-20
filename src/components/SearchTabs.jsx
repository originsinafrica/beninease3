import { useState } from "react";
import { Search, X, SlidersHorizontal, Play, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { SUYUS } from "../lib/data";
import { useLang } from "../lib/LangContext";

const ALL_SERIES = SUYUS.flatMap(s =>
  s.series.map(sr => ({ ...sr, suyuId: s.id, suyuName: s.name, suyuColor: s.color, type: "story" }))
);

const MOCK_SERVICES = [
  { name: "Atelier de cuisine béninoise", provider: "Adjovi Kossou Ahyi", providerId: "provider-adjovi", price: 40, currency: "EUR", category: "Gastronomie", duration: "3h", keywords: ["cuisine", "gastronomie", "atelier", "recette", "food"] },
  { name: "Dîner chez Adjovi", provider: "Adjovi Kossou Ahyi", providerId: "provider-adjovi", price: 60, currency: "EUR", category: "Gastronomie", duration: "2h", keywords: ["dîner", "cuisine", "gastronomie", "repas", "food"] },
  { name: "Tour du marché Dantokpa", provider: "Adjovi Kossou Ahyi", providerId: "provider-adjovi", price: 25, currency: "EUR", category: "Visite", duration: "2h", keywords: ["marché", "Dantokpa", "visite", "épices", "shopping"] },
  { name: "Visite guidée du Palais Royal", provider: "Koffi Dossou Bossou", providerId: "provider-koffi", price: 35, currency: "EUR", category: "Patrimoine", duration: "2h", keywords: ["palais", "histoire", "Abomey", "Dahomey", "patrimoine"] },
  { name: "Conférence privée sur le Dahomey", provider: "Koffi Dossou Bossou", providerId: "provider-koffi", price: 80, currency: "EUR", category: "Patrimoine", duration: "1 journée", keywords: ["Dahomey", "histoire", "conférence", "patrimoine", "culture"] },
  { name: "Atelier de batik", provider: "Aïssatou Gandonou Sèdégbé", providerId: "provider-aissatou", price: 45, currency: "EUR", category: "Artisanat", duration: "3h", keywords: ["batik", "tissu", "textile", "artisanat", "indigo"] },
  { name: "Tour textile de Porto-Novo", provider: "Aïssatou Gandonou Sèdégbé", providerId: "provider-aissatou", price: 30, currency: "EUR", category: "Artisanat", duration: "2h", keywords: ["textile", "Porto-Novo", "tissu", "wax", "artisanat"] },
  { name: "Mini-textile personnalisé", provider: "Aïssatou Gandonou Sèdégbé", providerId: "provider-aissatou", price: 80, currency: "EUR", category: "Artisanat", duration: "1 semaine", keywords: ["textile", "personnalisé", "batik", "sur-mesure", "artisanat"] },
];

const PRODUCTION_TYPES = [
  { key: "all", fr: "Tous", en: "All" },
  { key: "gastronomie", fr: "Gastronomie", en: "Gastronomy" },
  { key: "musique", fr: "Musique & Arts", en: "Music & Arts" },
  { key: "artisanat", fr: "Artisanat", en: "Crafts" },
  { key: "patrimoine", fr: "Patrimoine", en: "Heritage" },
  { key: "spiritualite", fr: "Spiritualité", en: "Spirituality" },
  { key: "nature", fr: "Nature", en: "Nature" },
  { key: "mode", fr: "Mode & Textile", en: "Fashion & Textile" },
  { key: "entrepreneuriat", fr: "Entrepreneuriat", en: "Entrepreneurship" },
];

const SUYUS_FILTER = [
  { key: "all", fr: "Toutes régions", en: "All regions" },
  ...SUYUS.map(s => ({ key: s.id, fr: s.name, en: s.name, color: s.color }))
];

function getProductionType(series) {
  const text = (series.name + " " + (series.keywords || []).join(" ")).toLowerCase();
  if (/cuisine|gastrono|recette|table|saveur|brasseur|sodabi/.test(text)) return "gastronomie";
  if (/musique|voix|chant|tam|jazz|concert/.test(text)) return "musique";
  if (/batik|tissu|textile|indigo|poterie|forge|bronze|sculpteur|appliqué/.test(text)) return "artisanat";
  if (/palais|histoire|roi|dahomey|mémoire|griot|patrimoine|maison|frontière/.test(text)) return "patrimoine";
  if (/vodoun|masque|rite|esprit|python|feticheur|herbier|plante|passage/.test(text)) return "spiritualite";
  if (/pendjari|ganvié|cascade|colline|nature|eau|plage|rivière/.test(text)) return "nature";
  if (/couleur|mode|couture|wax|bogolan|fashion/.test(text)) return "mode";
  if (/digital|startup|entrepreneur|femme/.test(text)) return "entrepreneuriat";
  return "patrimoine";
}

export default function SearchTabs() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [suyuFilter, setSuyuFilter] = useState("all");
  const [productionType, setProductionType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const q = query.trim().toLowerCase();

  // Unified search: stories + services
  const matchedStories = q || suyuFilter !== "all" || productionType !== "all"
    ? ALL_SERIES.filter(s => {
        const matchQuery = !q ||
          s.name.toLowerCase().includes(q) ||
          (s.keywords && s.keywords.some(k => k.toLowerCase().includes(q))) ||
          (s.synopsis && s.synopsis.toLowerCase().includes(q));
        const matchSuyu = suyuFilter === "all" || s.suyuId === suyuFilter;
        const matchType = productionType === "all" || getProductionType(s) === productionType;
        return matchQuery && matchSuyu && matchType;
      })
    : [];

  const matchedServices = q
    ? MOCK_SERVICES.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.keywords && s.keywords.some(k => k.toLowerCase().includes(q)))
      )
    : [];

  const isFiltered = suyuFilter !== "all" || productionType !== "all";
  const hasResults = matchedStories.length > 0 || matchedServices.length > 0;
  const showResults = q || isFiltered;

  return (
    <div className="px-4 md:px-0 mb-6 text-left">
      {/* Search input + filter toggle */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={lang === "fr" ? "Chercher une histoire, un artisan, un service..." : "Search stories, artisans, services..."}
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(f => !f)}
          className={`flex items-center gap-1.5 px-3 h-11 rounded-xl border text-sm font-semibold transition-colors flex-shrink-0 cursor-pointer ${
            showFilters || isFiltered
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">{lang === "fr" ? "Filtres" : "Filters"}</span>
          {isFiltered && <span className="w-2 h-2 rounded-full bg-white/70 inline-block" />}
        </button>
      </div>

      {/* Advanced filters panel */}
      {showFilters && (
        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              {lang === "fr" ? "Région / Thématique" : "Region / Theme"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUYUS_FILTER.map(s => (
                <button
                  key={s.key}
                  onClick={() => setSuyuFilter(s.key)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                    suyuFilter === s.key
                      ? "text-white border-transparent"
                      : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                  style={suyuFilter === s.key ? { backgroundColor: s.color || "hsl(var(--primary))" } : {}}
                >
                  {lang === "fr" ? s.fr : s.en}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              {lang === "fr" ? "Type de production culturelle" : "Cultural production type"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {PRODUCTION_TYPES.map(pt => (
                <button
                  key={pt.key}
                  onClick={() => setProductionType(pt.key)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                    productionType === pt.key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {lang === "fr" ? pt.fr : pt.en}
                </button>
              ))}
            </div>
          </div>
          {isFiltered && (
            <button
              onClick={() => { setSuyuFilter("all"); setProductionType("all"); }}
              className="text-xs text-destructive hover:underline font-semibold cursor-pointer"
            >
              {lang === "fr" ? "Réinitialiser les filtres" : "Reset filters"}
            </button>
          )}
        </div>
      )}

      {/* Unified results */}
      {showResults && (
        <div className="space-y-5">
          {!hasResults && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              {lang === "fr" ? "Aucun résultat trouvé" : "No results found"}
            </p>
          )}

          {/* Stories results */}
          {matchedStories.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {lang === "fr" ? "Histoires & Vidéos" : "Stories & Videos"} ({matchedStories.length})
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedStories.slice(0, 6).map((s, i) => (
                  <Link
                    key={i}
                    to={`/series/${encodeURIComponent(s.name)}`}
                    className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 hover:shadow-md transition-all group"
                  >
                    <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: s.suyuColor }}
                      >
                        {s.suyuName}
                      </span>
                      <p className="font-semibold text-sm text-foreground mt-1 truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{s.synopsis}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Services results */}
          {matchedServices.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {lang === "fr" ? "Services & Produits" : "Services & Products"} ({matchedServices.length})
                </p>
              </div>
              <div className="space-y-2">
                {matchedServices.map((s, i) => (
                  <Link
                    key={i}
                    to={`/provider/${s.providerId}`}
                    className="flex items-center justify-between bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all group"
                  >
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {s.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{s.duration}</span>
                      </div>
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {s.name}
                      </p>
                      <p className="text-xs text-muted-foreground">avec {s.provider}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-lg font-bold text-primary">${s.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useLang } from "../lib/LangContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Map, Compass, Grid, Sparkles, MapPin, ExternalLink, RefreshCw } from "lucide-react";

// Fix default leaflet icon safely
try {
  if (L && L.Icon && L.Icon.Default) {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }
} catch (e) {
  console.warn("Leaflet default icon customization skipped:", e);
}

const ZONE_COORDS = {
  "Cotonou, Littoral": [6.3654, 2.4183],
  "Porto-Novo, Ouémé": [6.4969, 2.6289],
  "Ouidah, Atlantique": [6.3617, 2.0836],
  "Abomey, Zou": [7.1827, 1.9912],
  "Ganvié, Lac Nokoüé": [6.4625, 2.4097],
  "Parakou, Borgou": [9.3378, 2.6283],
  "Natitingou, Atacora": [10.3073, 1.3800],
};

const ALL_ZONES = Object.keys(ZONE_COORDS);

const ZONE_PROVIDERS = {
  "Cotonou, Littoral": { 
    series: ["La Table Béninoise", "Dantokpa", "Nuit Béninoise"], 
    count: 12,
    description: "La capitale économique vibrante, entre marchés d'épices géants et design contemporain.",
    descriptionEn: "The vibrant economic capital, between giant spice markets and contemporary design."
  },
  "Porto-Novo, Ouémé": { 
    series: ["La Cité des Rois", "Batik & Indigo"], 
    count: 8,
    description: "La capitale administrative, riche en architectures coloniales, musées et artisanat textile.",
    descriptionEn: "The administrative capital, rich in colonial architecture, museums, and textile crafts."
  },
  "Ouidah, Atlantique": { 
    series: ["Gardiens du Vodoun", "La Route des Esclaves"], 
    count: 7,
    description: "Cité historique, berceau mondial du Vodoun et lieu de mémoire incontournable de la traite.",
    descriptionEn: "Historic city, global birthplace of Vodoun and essential place of remembrance."
  },
  "Abomey, Zou": { 
    series: ["Le Palais du Dahomey", "Femmes Amazones"], 
    count: 6,
    description: "Ancienne capitale du grand royaume du Dahomey, célèbre pour ses palais d'argile rouge.",
    descriptionEn: "Former capital of the great Dahomey Kingdom, famous for its red clay palaces."
  },
  "Ganvié, Lac Nokoüé": { 
    series: ["Ganvié, Cité sur l'Eau"], 
    count: 3,
    description: "La Venise de l'Afrique, cité lacustre légendaire bâtie entièrement sur pilotis de bambou.",
    descriptionEn: "The Venice of Africa, a legendary lake city built entirely on bamboo stilts."
  },
  "Parakou, Borgou": { 
    series: ["Cavaliers du Borgou", "Gardiens de la Terre"], 
    count: 5,
    description: "Le carrefour du Nord béninois, riche de cultures équestres de l'ethnie Bariba.",
    descriptionEn: "The crossroads of Northern Benin, rich in equestrian traditions of the Bariba people."
  },
  "Natitingou, Atacora": { 
    series: ["La Pendjari", "Cascades du Bénin"], 
    count: 4,
    description: "Porte d'entrée vers les montagnes de l'Atacora, les Tata Somba et la réserve de faune de la Pendjari.",
    descriptionEn: "Gateway to the Atacora mountains, Tata Somba fortresses, and Pendjari wildlife reserve."
  },
};

// Error Boundary for Map Rendering
class SafeMapBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Leaflet Map failed to render. Activating interactive grid fallback.", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function ProvidersMap() {
  const { lang } = useLang();
  const [activeZone, setActiveZone] = useState(null);
  const [useMapFallback, setUseMapFallback] = useState(false);
  const navigate = useNavigate();

  const filteredZones = activeZone ? [activeZone] : ALL_ZONES;

  // Premium Interactive Bento Grid as robust fallback/default choice
  const renderBentoFallback = () => (
    <div className="space-y-6">
      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
        <Compass className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0 animate-spin-slow" />
        <div className="text-left">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            {lang === "fr" ? "Explorateur de Régions" : "Region Explorer Active"}
          </p>
          <p className="text-xs text-amber-700/90 mt-0.5">
            {lang === "fr" 
              ? "Découvrez notre carte interactive simplifiée optimisée pour votre écran." 
              : "Explore our streamlined interactive region grid fully optimized for your browser."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredZones.map(zone => {
          const info = ZONE_PROVIDERS[zone];
          return (
            <div 
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                activeZone === zone 
                  ? "bg-slate-950 border-slate-800 text-white shadow-lg scale-[1.01]" 
                  : "bg-white border-slate-100 hover:border-slate-200 text-slate-800 hover:shadow-md"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-3 w-3" />
                    {zone.split(",")[1]}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeZone === zone ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-600"}`}>
                    {info.count} {lang === "fr" ? "prestataires" : "providers"}
                  </span>
                </div>

                <h3 className={`text-base font-black font-display mt-2 ${activeZone === zone ? "text-amber-400" : "text-slate-900"}`}>
                  {zone.split(",")[0]}
                </h3>

                <p className={`text-xs leading-relaxed ${activeZone === zone ? "text-slate-300" : "text-slate-500"}`}>
                  {lang === "fr" ? info.description : info.descriptionEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-slate-100/10">
                <p className={`text-[10px] uppercase tracking-wider font-bold ${activeZone === zone ? "text-amber-500" : "text-slate-400"} mb-1`}>
                  {lang === "fr" ? "Thématiques phares" : "Key Themes"}
                </p>
                <div className="flex flex-wrap gap-1">
                  {info.series.map(s => (
                    <span 
                      key={s} 
                      className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                        activeZone === zone ? "bg-white/10 text-white border border-white/10" : "bg-slate-50 text-slate-600 border border-slate-100"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="px-4 md:px-0 mb-10 text-left">
      <div className="mb-6 flex items-start justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-black text-slate-900 font-display">
              {lang === "fr" ? "Cartographie & Terroirs" : "Mapping & Territories"}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === "fr" 
              ? "Explorez les richesses culturelles par pôle d'attraction touristique" 
              : "Explore cultural riches by designated tourist attraction hubs"}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setUseMapFallback(false)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              !useMapFallback ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
            <span>{lang === "fr" ? "Régions" : "Regions"}</span>
          </button>
          <button
            onClick={() => setUseMapFallback(true)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              useMapFallback ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Map className="h-3.5 w-3.5" />
            <span>{lang === "fr" ? "Carte" : "Map"}</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setActiveZone(null)}
          className={`text-xs px-3 py-1.5 font-bold rounded-full border transition-all cursor-pointer ${
            !activeZone 
              ? "bg-slate-950 text-white border-slate-950" 
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
          }`}
        >
          {lang === "fr" ? "Toutes les zones" : "All zones"}
        </button>
        {ALL_ZONES.map(z => (
          <button
            key={z}
            onClick={() => setActiveZone(activeZone === z ? null : z)}
            className={`text-xs px-3 py-1.5 font-bold rounded-full border transition-all cursor-pointer ${
              activeZone === z 
                ? "bg-primary text-primary-foreground border-primary" 
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {z.split(",")[0]}
          </button>
        ))}
      </div>

      {/* Fallback boundary for rendering Leaflet safely */}
      {!useMapFallback ? (
        renderBentoFallback()
      ) : (
        <SafeMapBoundary fallback={renderBentoFallback()}>
          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative" style={{ height: 400 }}>
            <MapContainer
              center={[7.5, 2.2]}
              zoom={7}
              style={{ width: "100%", height: "100%", zIndex: 1 }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
              />
              {filteredZones.map(zone => {
                const coords = ZONE_COORDS[zone];
                const info = ZONE_PROVIDERS[zone];
                if (!coords) return null;
                return (
                  <Marker key={zone} position={coords}>
                    <Popup>
                      <div className="text-sm min-w-[200px] text-left p-1">
                        <p className="font-bold text-slate-900 mb-0.5">{zone}</p>
                        <p className="text-muted-foreground text-xs mb-2 font-semibold">
                          {info?.count} {lang === "fr" ? "prestataires locaux" : "local providers"}
                        </p>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          {lang === "fr" ? info.description : info.descriptionEn}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {info?.series.map(s => (
                            <span key={s} className="text-[9px] font-bold px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </SafeMapBoundary>
      )}
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SUYUS } from "../lib/data";
import { getProvidersForSeries } from "../lib/providers";
import Header from "../components/Header";
import BookingModal from "../components/BookingModal";
import { MapPin, ArrowLeft, BookOpen } from "lucide-react";
import { useLang, T } from "../lib/LangContext";

export default function SeriesDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const t = T[lang];

  const seriesName = decodeURIComponent(name);

  // Find series and parent Suyu
  let suyu = null;
  let series = null;
  for (const s of SUYUS) {
    const found = s.series.find(sr => sr.name === seriesName);
    if (found) {
      suyu = s;
      series = found;
      break;
    }
  }

  if (!series) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <p className="text-lg font-semibold text-slate-800">Série introuvable</p>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-[#008751] text-white rounded-lg cursor-pointer">Retour</button>
      </div>
    );
  }

  const providers = getProvidersForSeries(series.name);
  const seriesEpisodes = series.episodes || providers[0]?.episodes || [];

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  return (
    <div className="min-h-screen bg-[#fafaf9] pb-16">
      <Header />
      
      {/* Lighter, Premium Cover Banner */}
      <div className="relative pt-24 pb-12 px-4 md:px-8 bg-[#f5f3ef] border-b border-slate-200/50">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 text-left items-start">
          <div className="flex-1 space-y-4">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#008751] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" /> {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: suyu.color }}
              >
                {suyu.name}
              </span>
              <span className="text-[10px] font-bold text-[#008751] bg-[#008751]/10 border border-[#008751]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {series.category || "Authentique"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-display">{series.name}</h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl font-medium">{series.synopsis_larga || series.synopsis}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {series.keywords?.map((kw) => (
                <span key={kw} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white text-slate-600 border border-slate-200">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Body: Simplified Chapters / Episodes List */}
      <div className="max-w-screen-xl mx-auto pt-10 px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="flex items-center gap-2 mb-2 border-b border-slate-200/60 pb-3">
            <BookOpen className="h-5 w-5 text-[#008751]" />
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 font-display">
              {lang === "fr" ? "Épisodes de la série" : "Series Episodes"}
            </h2>
          </div>
          
          <div className="space-y-4">
            {seriesEpisodes.map((ep, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-100 bg-white text-left transition-all duration-300 hover:border-slate-200 hover:shadow-sm"
              >
                <div className="mb-2">
                  <span className="text-xs font-extrabold text-[#008751] uppercase tracking-wider bg-[#008751]/10 px-2.5 py-1 rounded-full">
                    {lang === "fr" ? `Épisode ${idx + 1}` : `Episode ${idx + 1}`}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900 leading-snug font-display">
                  {ep.title}
                </h3>
              </div>
            ))}
          </div>

        </div>

        {/* Full-width Section: Meet the Protagonists (Large Portrait cards) */}
        <div className="mt-16 pt-10 border-t border-slate-200/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-left">
            <div>
              <span className="text-[10px] font-black text-[#008751] uppercase tracking-widest bg-[#008751]/10 px-2.5 py-1 rounded-full">
                {lang === "fr" ? "Artisans & Gardiens" : "Artisans & Keepers"}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display mt-2">
                {lang === "fr" ? "Rencontrez les protagonistes" : "Meet the protagonists"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {lang === "fr" 
                  ? "Découvrez l'humain derrière l'art : visitez leur profil certifié et explorez leurs projets"
                  : "Discover the human behind the art: visit their certified profile and explore their projects"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/provider/${p.id}`)}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100"
              >
                <img
                  src={p.poster_url || p.avatar_url}
                  alt={p.full_name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Visual Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                
                {/* Card Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left space-y-1">
                  <h3 className="font-extrabold text-lg text-white font-display tracking-tight leading-snug group-hover:text-[#008751] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1">
                    {lang === "fr" 
                      ? `Protagoniste de la série « ${series.name} »`
                      : `Protagonist of the series "${series.name}"`}
                  </p>
                  <p className="text-[10px] text-slate-300 font-semibold flex items-center gap-1 pt-1">
                    <MapPin className="h-3 w-3 text-[#008751]" /> {p.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {selectedProvider && (
        <BookingModal
          provider={selectedProvider}
          open={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}

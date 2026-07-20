import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProviderById, getEpisodesForProvider } from "../lib/providers";
import Header from "../components/Header";
import { ArrowLeft, Play, Sparkles, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { useLang } from "../lib/LangContext";

export default function EpisodeDetail() {
  const { providerId, episodeIndex } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { lang } = useLang();

  const provider = getProviderById(providerId);
  const activeSeries = searchParams.get("series") || (provider ? provider.series : "");
  const epIdx = parseInt(episodeIndex) || 0;

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#121110] text-stone-200 flex flex-col items-center justify-center p-6">
        <p className="text-lg font-bold text-stone-300">Prestataire introuvable</p>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-[#008751] text-white rounded-lg cursor-pointer">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const episodes = getEpisodesForProvider(provider, activeSeries);
  const episode = episodes[epIdx];

  if (!episode) {
    return (
      <div className="min-h-screen bg-[#121110] text-stone-200 flex flex-col items-center justify-center p-6">
        <p className="text-lg font-bold text-stone-300">Épisode introuvable</p>
        <button onClick={() => navigate(`/provider/${providerId}`)} className="mt-4 px-4 py-2 bg-[#008751] text-white rounded-lg cursor-pointer">
          Retour au profil
        </button>
      </div>
    );
  }

  // Live sliders state
  const [auth, setAuth] = useState(75);
  const [orig, setOrig] = useState(80);
  const [impact, setImpact] = useState(85);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live average score calculated from sliders
  const liveAverage = Math.round((auth + orig + impact) / 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#f5f5f4] pb-24 font-sans selection:bg-[#008751]/30">
      <Header />

      {/* Main Container */}
      <div className="max-w-xl mx-auto px-4 pt-24 space-y-6">
        
        {/* Sub-Header Navigation */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <button
            onClick={() => navigate(`/provider/${providerId}`)}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-stone-300 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
            title={lang === "fr" ? "Retour au profil" : "Back to profile"}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <span className="text-xs font-black uppercase tracking-widest text-[#008751] bg-[#008751]/10 px-3 py-1.5 rounded-full border border-[#008751]/20">
            {episode.subtitle || `Épisode ${epIdx + 1}`}
          </span>

          <div className="w-10 h-10" /> {/* Spacer for symmetry */}
        </div>

        {/* Video Player Card */}
        <div className="bg-[#1c1a19] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Main aspect ratio container */}
          <div className="relative aspect-[16/9] bg-stone-950 overflow-hidden group">
            {isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
                {/* Active Player Simulator */}
                <div className="w-12 h-12 rounded-full border-4 border-[#008751] border-t-transparent animate-spin" />
                <p className="text-xs text-stone-400 font-mono animate-pulse">
                  {lang === "fr" ? "Lecture en cours du flux patrimoine béninois..." : "Streaming Beninese heritage feed..."}
                </p>
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-[10px] uppercase font-bold tracking-widest rounded-full text-stone-300 transition-colors cursor-pointer"
                >
                  {lang === "fr" ? "Pause" : "Pause Video"}
                </button>
              </div>
            ) : (
              <>
                <img
                  src={episode.thumbnail_url}
                  alt={episode.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />
                
                {/* Centered big play button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-white/10 hover:bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 transform group-hover:scale-110 shadow-xl">
                    <Play className="h-7 w-7 text-white fill-white ml-1" />
                  </div>
                </button>
              </>
            )}

            {/* Duration Tag overlay */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-[10px] font-mono px-2 py-0.5 rounded text-stone-300 font-bold">
              {episode.duration}
            </div>
          </div>

          {/* Episode Info Panel */}
          <div className="p-6 text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#008751] uppercase tracking-wider bg-[#008751]/10 px-2 py-0.5 rounded">
                {activeSeries}
              </span>
              <span className="text-[10px] font-bold text-stone-400">
                · {provider.full_name}
              </span>
            </div>
            
            <h1 className="text-xl font-black text-white tracking-tight leading-snug font-display">
              {episode.title}
            </h1>
            
            <p className="text-xs text-stone-400 leading-relaxed font-medium">
              {episode.description}
            </p>
          </div>
        </div>

        {/* Evaluation Dashboard Card */}
        <div className="bg-[#1c1a19] border border-white/10 rounded-3xl p-6 shadow-2xl text-left space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#008751]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-white font-display">
                {lang === "fr" ? "Évaluez cet épisode" : "Rate this episode"}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                {lang === "fr" ? "Moyenne" : "Average"}
              </span>
              <span className="text-sm font-black text-[#008751] font-display">
                {liveAverage}/100
              </span>
            </div>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-[#008751]/10 border border-[#008751]/20 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="h-8 w-8 text-[#008751] mx-auto animate-bounce" />
              <div className="space-y-1">
                <p className="text-sm font-extrabold text-white">
                  {lang === "fr" ? "Évaluation enregistrée avec succès !" : "Evaluation recorded successfully!"}
                </p>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  {lang === "fr"
                    ? "Vos retours permettent de certifier l'authenticité culturelle de nos artisans d'art."
                    : "Your feedback helps certify the cultural authenticity of our art practitioners."}
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 px-4 py-1.5 bg-[#008751] text-white text-xs font-bold rounded-lg hover:bg-[#006e40] transition-colors cursor-pointer"
              >
                {lang === "fr" ? "Évaluer à nouveau" : "Evaluate again"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Authenticity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-stone-300">
                    {lang === "fr" ? "Authenticité" : "Authenticity"}
                  </label>
                  <span className="font-mono font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
                    {auth}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={auth}
                  onChange={(e) => setAuth(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-white/5 rounded-full outline-none cursor-pointer"
                />
                <p className="text-[10px] text-stone-500">
                  {lang === "fr" ? "Respect des traditions et de l'histoire" : "Respect for traditions and history"}
                </p>
              </div>

              {/* Originality Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-stone-300">
                    {lang === "fr" ? "Originalité" : "Originality"}
                  </label>
                  <span className="font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                    {orig}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={orig}
                  onChange={(e) => setOrig(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-white/5 rounded-full outline-none cursor-pointer"
                />
                <p className="text-[10px] text-stone-500">
                  {lang === "fr" ? "Singularité de l'expression et de l'œuvre" : "Uniqueness of expression and work"}
                </p>
              </div>

              {/* Impact Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-stone-300">
                    {lang === "fr" ? "Impact" : "Impact"}
                  </label>
                  <span className="font-mono font-bold text-[#008751] bg-[#008751]/10 px-2 py-0.5 rounded">
                    {impact}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={impact}
                  onChange={(e) => setImpact(Number(e.target.value))}
                  className="w-full accent-[#008751] h-1.5 bg-white/5 rounded-full outline-none cursor-pointer"
                />
                <p className="text-[10px] text-stone-500">
                  {lang === "fr" ? "Influence et préservation du patrimoine" : "Influence and heritage preservation"}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 mt-4 text-xs font-black uppercase tracking-widest rounded-xl bg-red-700 text-white hover:bg-red-800 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <ShieldCheck className="h-4 w-4" />
                {lang === "fr" ? "Envoyer l'évaluation" : "Send Evaluation"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}

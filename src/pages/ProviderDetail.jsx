import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProviderById, getEpisodesForProvider } from "../lib/providers";
import Header from "../components/Header";
import BookingModal from "../components/BookingModal";
import ProjectPanel from "../components/ProjectPanel";
import ServiceReviews from "../components/ServiceReviews";
import { MapPin, Globe, Star, Calendar, ArrowLeft, Heart, Award, ShieldCheck, Sparkles, Eye, MessageSquare, ShoppingBag, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { useLang, T } from "../lib/LangContext";

// Pure seeded helper for realistic metrics
function seededValue(str, min, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 997;
  }
  return min + (Math.abs(hash) % (max - min));
}

export default function ProviderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const t = T[lang];

  const provider = getProviderById(id);

  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <p className="text-lg font-semibold text-slate-800">Prestataire introuvable</p>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-[#008751] text-white rounded-lg cursor-pointer">Retour</button>
      </div>
    );
  }

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [modalMode, setModalMode] = useState("book"); // "book" | "purchase"
  const [modalInitialItem, setModalInitialItem] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [activeSeries, setActiveSeries] = useState(provider.seriesList?.[0] || provider.series);

  // States to expand specific services or products to view details/reviews
  const [expandedServiceIdx, setExpandedServiceIdx] = useState(0); // expand first service by default
  const [expandedProductIdx, setExpandedProductIdx] = useState(null);

  // Seeded metrics as requested in screenshots / user message
  const views = seededValue(provider.name + "views", 6000, 12000);
  const evaluationsCount = seededValue(provider.name + "evals", 80, 210);
  const authenticity = seededValue(provider.name + "auth", 85, 98);
  const originality = seededValue(provider.name + "orig", 78, 95);
  const impact = seededValue(provider.name + "impact", 65, 92);
  const overallScore = Math.round((authenticity + originality + impact) / 3);

  const episodes = getEpisodesForProvider(provider, activeSeries);
  const services = provider.services || [];
  const products = provider.products || [];

  // Open booking modal prefilled
  const handleOpenBook = (service) => {
    setModalMode("book");
    setModalInitialItem(service);
    setIsBookingOpen(true);
  };

  // Open purchase modal prefilled
  const handleOpenPurchase = (product) => {
    setModalMode("purchase");
    setModalInitialItem(product);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pb-16">
      <Header />
      
      {/* Light-Themed, Highly Legible Cover Banner */}
      <div className="relative pt-24 pb-12 px-4 md:px-8 bg-[#f5f3ef] border-b border-slate-200/50">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 text-left items-start">
          
          {/* Avatar Profile Picture with standard error fallback to guarantee visibility */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-4 border-white bg-white flex-shrink-0 shadow-lg">
            <img 
              src={provider.avatar_url} 
              alt={provider.full_name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
              }}
            />
          </div>

          {/* Core Identification Details */}
          <div className="flex-1 space-y-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#008751] transition-colors cursor-pointer mb-1"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> {t.back}
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold text-[#008751] bg-[#008751]/10 border border-[#008751]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {provider.title || "Artisan Certifié"}
              </span>
              <span className="text-[10px] font-extrabold text-[#008751] bg-[#008751]/10 border border-[#008751]/20 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> {lang === "fr" ? "Vérifié par l'État" : "State Verified"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display">{provider.full_name}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap font-medium font-sans">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#008751]" />{provider.location}</span>
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-slate-400" />{provider.languages.join(", ")}</span>
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />{provider.rating} ({evaluationsCount} {lang === "fr" ? "avis" : "reviews"})</span>
            </div>
          </div>

          {/* Like/Favorite Interaction Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-2xl border shadow-sm transition-all cursor-pointer ${
              isLiked
                ? "bg-red-50 border-red-200 text-red-500"
                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-screen-xl mx-auto pt-10 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Left Column: Bio, Metrics, Crowdfunding, Episodes */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Bio & Storytelling */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 font-display">
                {lang === "fr" ? "À propos du protagoniste" : "About the protagonist"}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {provider.bio}
              </p>
            </div>

            {/* Metrics & Scores Dashboard (Authenticity, Originality, Impact with Benin Flag Colors) */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 font-display">
                    {lang === "fr" ? "Indicateurs de confiance" : "Trust Metrics"}
                  </h2>
                  <span className="text-xs font-bold text-[#008751] bg-[#008751]/10 px-2 py-0.5 rounded-full">
                    Score: {overallScore}/100
                  </span>
                </div>
              </div>

              {/* Seeded Counters Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                  <Eye className="h-5 w-5 text-slate-500 mx-auto mb-1.5" />
                  <p className="text-lg font-black text-slate-900 font-display">{views.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">
                    {lang === "fr" ? "Vues" : "Views"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mx-auto mb-1.5" />
                  <p className="text-lg font-black text-slate-900 font-display">{evaluationsCount}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">
                    {lang === "fr" ? "Évaluations" : "Ratings"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                  <Award className="h-5 w-5 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-lg font-black text-slate-900 font-display">{overallScore}%</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">
                    {lang === "fr" ? "Confiance" : "Trust Score"}
                  </p>
                </div>
              </div>

              {/* Progress Bars for Specific Cultural Criteria themed like the Benin Flag */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#008751] inline-block" />
                      {lang === "fr" ? "Authenticité" : "Authenticity"}
                    </span>
                    <span className="text-[#008751]">{authenticity}/100</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#008751] rounded-full transition-all duration-500" style={{ width: `${authenticity}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FCD116] inline-block" />
                      {lang === "fr" ? "Originalité" : "Originality"}
                    </span>
                    <span className="text-yellow-600">{originality}/100</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FCD116] rounded-full transition-all duration-500" style={{ width: `${originality}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E8112D] inline-block" />
                      {lang === "fr" ? "Impact" : "Impact"}
                    </span>
                    <span className="text-red-600">{impact}/100</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8112D] rounded-full transition-all duration-500" style={{ width: `${impact}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* SERIES & EPISODES SECTION */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-5 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 font-display">
                    {lang === "fr" ? "SÉRIES & ÉPISODES" : "SERIES & EPISODES"}
                  </h2>
                </div>
                
                {provider.seriesList && provider.seriesList.length > 1 && (
                  <div className="flex flex-wrap gap-1">
                    {provider.seriesList.map((ser) => (
                      <button
                        key={ser}
                        onClick={() => {
                          setActiveSeries(ser);
                        }}
                        className={`px-3 py-1 text-[10px] font-black rounded-full border transition-all cursor-pointer uppercase tracking-wider ${
                          activeSeries === ser
                            ? "bg-[#008751] border-[#008751] text-white"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {ser}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title indicating currently active series with episode count */}
              <div className="flex items-center gap-1.5 text-slate-700 text-xs font-bold px-1">
                <Sparkles className="h-3.5 w-3.5 text-[#008751]" />
                <span>{activeSeries} — {episodes.length} {lang === "fr" ? "épisodes disponibles" : "episodes available"}</span>
              </div>

              <div className="space-y-4">
                {episodes.map((ep, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-100 bg-[#fafaf9] text-left transition-all duration-300 hover:border-slate-200 hover:shadow-sm"
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

            {/* Crowdfunding Projects Panel - displays active campaigns in progress */}
            <ProjectPanel provider={provider} lang={lang} />
          </div>

          {/* Right Column: Unified, Clear separation of Reservable Services & Handcrafted Products */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Economic and Fair Model Intro card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#008751]" />
                <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider font-display">
                  {lang === "fr" ? "Modèle Économique Équitable" : "Fair Economic Model"}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === "fr"
                  ? "Soutenez directement les artisans du Bénin. 100% des fonds de réservation ou d'achat leur reviennent directement, sans commission."
                  : "Directly support the artisans of Benin. 100% of booking or purchase funds go directly to them, without commissions."}
              </p>
            </div>

            {/* 1. RESERVABLE SERVICES SECTION (Appears only once) */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5 text-[#008751]" />
                  <h3 className="font-black text-sm text-slate-800 font-display">
                    {lang === "fr" ? "Expériences Réservables" : "Reservable Experiences"}
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  {services.length} {lang === "fr" ? "offres" : "offers"}
                </span>
              </div>

              <div className="space-y-3 font-sans">
                {services.map((service, index) => {
                  const isExpanded = expandedServiceIdx === index;
                  // Dynamic rating seeded from service name
                  const sHash = service.name.charCodeAt(0) + service.name.length;
                  const rating = 4.4 + (sHash % 6) / 10;
                  const reviewCount = 8 + (sHash % 12);

                  return (
                    <div 
                      key={index} 
                      className={`rounded-2xl border transition-all ${
                        isExpanded ? "border-[#008751] bg-[#008751]/[0.01]" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
                      }`}
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => setExpandedServiceIdx(isExpanded ? null : index)}
                        className="w-full p-4 flex items-start justify-between gap-2 text-left cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-800 text-xs leading-tight">{service.name}</h4>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="font-extrabold text-[#008751]">{service.price} {service.currency}</span>
                            <span className="text-slate-400 font-medium">• {service.duration}</span>
                            <span className="flex items-center gap-0.5 text-amber-500 font-bold ml-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="p-1 rounded-full bg-slate-100/50 text-slate-400 flex-shrink-0 mt-0.5">
                          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </div>
                      </button>

                      {/* Accordion Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-slate-100/60 pt-3 space-y-3 text-xs animate-fade-in">
                          <p className="text-slate-600 leading-relaxed font-medium">{service.description}</p>
                          
                          {/* Stars, evaluations and reviews integrated below */}
                          <div className="bg-white rounded-xl p-3 border border-slate-100">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 font-display">
                              {lang === "fr" ? "Évaluations reçues" : "Reviews received"} ({reviewCount})
                            </p>
                            <ServiceReviews serviceName={service.name} />
                          </div>

                          <button
                            onClick={() => handleOpenBook(service)}
                            className="w-full h-10 text-xs font-black uppercase tracking-wider rounded-xl bg-[#008751] text-white hover:bg-[#006e40] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <Calendar className="h-4 w-4" />
                            {lang === "fr" ? "Réserver cette expérience" : "Book this experience"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. HANDCRAFTED PRODUCTS SECTION (Boutique / Shop) */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4.5 w-4.5 text-amber-500" />
                  <h3 className="font-black text-sm text-slate-800 font-display">
                    {lang === "fr" ? "Boutique d'Artisanat" : "Craft Shop Products"}
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  {products.length} {lang === "fr" ? "articles" : "items"}
                </span>
              </div>

              <div className="space-y-3 font-sans">
                {products.map((product, index) => {
                  const isExpanded = expandedProductIdx === index;
                  // Dynamic rating seeded from product name
                  const pHash = product.name.charCodeAt(0) + product.name.length;
                  const rating = 4.5 + (pHash % 5) / 10;
                  const reviewCount = 5 + (pHash % 10);

                  return (
                    <div 
                      key={index} 
                      className={`rounded-2xl border transition-all ${
                        isExpanded ? "border-amber-500 bg-amber-500/[0.01]" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
                      }`}
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => setExpandedProductIdx(isExpanded ? null : index)}
                        className="w-full p-4 flex items-start justify-between gap-2 text-left cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-800 text-xs leading-tight">{product.name}</h4>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="font-extrabold text-amber-600">{product.price} {product.currency}</span>
                            <span className="text-slate-400 font-medium">• {lang === "fr" ? "Envoi postal" : "Postal delivery"}</span>
                            <span className="flex items-center gap-0.5 text-amber-500 font-bold ml-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="p-1 rounded-full bg-slate-100/50 text-slate-400 flex-shrink-0 mt-0.5">
                          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </div>
                      </button>

                      {/* Accordion Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-slate-100/60 pt-3 space-y-3 text-xs animate-fade-in">
                          <p className="text-slate-600 leading-relaxed font-medium">{product.description}</p>
                          <p className="text-[10px] text-slate-400 font-semibold italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                            📦 {product.shipping}
                          </p>

                          {/* Stars, evaluations and reviews integrated below */}
                          <div className="bg-white rounded-xl p-3 border border-slate-100">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 font-display">
                              {lang === "fr" ? "Évaluations reçues" : "Reviews received"} ({reviewCount})
                            </p>
                            <ServiceReviews serviceName={product.name} />
                          </div>

                          <button
                            onClick={() => handleOpenPurchase(product)}
                            className="w-full h-10 text-xs font-black uppercase tracking-wider rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            {lang === "fr" ? "Acheter cet article" : "Purchase this item"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Shared Booking and Purchasing Modal */}
      <BookingModal
        provider={provider}
        open={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setModalInitialItem(null);
        }}
        mode={modalMode}
        initialItem={modalInitialItem}
      />
    </div>
  );
}

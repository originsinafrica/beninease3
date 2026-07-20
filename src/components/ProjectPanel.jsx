import { useState } from "react";
import { Sparkles, Users, Clock, TrendingUp, Gift, ArrowRight, Play, ImageIcon, X, CheckCircle2, ShieldCheck } from "lucide-react";

function ProjectVideo({ videoId, lang }) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="relative rounded-xl overflow-hidden bg-black animate-fade-in" style={{ aspectRatio: "16/9" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Présentation du projet"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative w-full rounded-xl overflow-hidden group bg-black cursor-pointer border border-slate-100"
      style={{ aspectRatio: "16/9" }}
    >
      <img
        src={thumbnail}
        alt="Vidéo de présentation"
        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        onError={(e) => { e.target.style.display = "none"; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
          <Play className="h-5 w-5 text-white fill-white ml-0.5" />
        </div>
        <span className="text-white text-xs font-semibold drop-shadow">
          {lang === "fr" ? "Vidéo de présentation" : "Presentation video"}
        </span>
      </div>
    </button>
  );
}

function ProjectGallery({ photos }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "thin" }}>
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border border-slate-200 hover:border-[#008751] transition-colors cursor-pointer"
          >
            <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
            <X className="h-5 w-5 text-white" />
          </button>
          <img
            src={photos[lightbox]}
            alt={`Photo ${lightbox + 1}`}
            className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function ProgressBar({ raised, goal }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-[#008751] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
    </div>
  );
}

function formatNumber(n) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function daysLeft(deadline) {
  const now = new Date();
  const d = new Date(deadline);
  const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function ProjectCard({ project, lang }) {
  const [currentRaised, setCurrentRaised] = useState(project.raised);
  const [currentBackers, setCurrentBackers] = useState(project.backers);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  
  // Modal fields
  const [selectedReward, setSelectedReward] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [backerName, setBackerName] = useState("");
  const [backerEmail, setBackerEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const pct = Math.min(100, Math.round((currentRaised / project.goal) * 100));
  const left = daysLeft(project.deadline);

  // Helper to extract min required amount from tier string
  const getMinAmount = (tier) => {
    if (!tier) return 5;
    const match = tier.match(/\d+/);
    return match ? parseInt(match[0], 10) : 5;
  };

  const handleOpenModal = () => {
    setSelectedReward(project.rewards[0] || null);
    setCustomAmount(project.rewards[0] ? String(getMinAmount(project.rewards[0].tier)) : "10");
    setBackerName("");
    setBackerEmail("");
    setIsSuccess(false);
    setIsSubmitting(false);
    setErrorMsg("");
    setIsSupportModalOpen(true);
  };

  const handleSelectReward = (reward) => {
    setSelectedReward(reward);
    if (reward) {
      setCustomAmount(String(getMinAmount(reward.tier)));
    } else {
      setCustomAmount("10"); // default for custom don libre
    }
  };

  const handleConfirmSupport = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const amountNum = parseFloat(customAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMsg(lang === "fr" ? "Veuillez entrer un montant valide supérieur à 0." : "Please enter a valid amount greater than 0.");
      return;
    }

    if (selectedReward) {
      const minRequired = getMinAmount(selectedReward.tier);
      if (amountNum < minRequired) {
        setErrorMsg(
          lang === "fr"
            ? `Le montant minimum pour cette contrepartie est de ${minRequired} €.`
            : `The minimum amount for this reward is ${minRequired} €.`
        );
        return;
      }
    }

    if (!backerName.trim()) {
      setErrorMsg(lang === "fr" ? "Veuillez entrer votre nom." : "Please enter your name.");
      return;
    }

    if (!backerEmail.trim() || !backerEmail.includes("@")) {
      setErrorMsg(lang === "fr" ? "Veuillez entrer une adresse e-mail valide." : "Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setCurrentRaised(prev => prev + amountNum);
      setCurrentBackers(prev => prev + 1);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col text-left">
      {/* Header */}
      <div className="bg-[#008751]/5 px-6 py-5 border-b border-slate-100 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#008751]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#008751] font-display">
            {lang === "fr" ? "Financement participatif" : "Crowdfunding Project"}
          </span>
        </div>
        <h3 className="font-extrabold text-sm text-slate-800 leading-tight font-display">{project.name}</h3>
      </div>
      
      <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Presentation video */}
          {project.video_id && <ProjectVideo videoId={project.video_id} lang={lang} />}
          <p className="text-xs text-slate-500 leading-relaxed text-left font-sans">{project.description}</p>
          
          {/* Photo gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-display flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-slate-400" />
                {lang === "fr" ? "Photos du projet" : "Project photos"}
              </p>
              <ProjectGallery photos={project.gallery} />
            </div>
          )}

          {/* Progress */}
          <div className="space-y-2 pt-2">
            <div className="flex items-end justify-between">
              <div className="text-left">
                <p className="text-xl font-black text-slate-800 font-display">
                  {formatNumber(currentRaised)}{" "}
                  <span className="text-xs font-bold text-slate-500 font-mono">{project.currency}</span>
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {lang === "fr" ? "collectés sur" : "raised of"} {formatNumber(project.goal)}{" "}
                  {project.currency}
                </p>
              </div>
              <span className="text-lg font-black text-[#008751] font-display">{pct}%</span>
            </div>
            <ProgressBar raised={currentRaised} goal={project.goal} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1 font-sans">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl py-2.5">
              <Users className="h-4 w-4 text-[#008751] mx-auto mb-1" />
              <p className="text-sm font-black text-slate-800">{formatNumber(currentBackers)}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{lang === "fr" ? "donateurs" : "backers"}</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl py-2.5">
              <Clock className="h-4 w-4 text-[#008751] mx-auto mb-1" />
              <p className="text-sm font-black text-slate-800">{left}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{lang === "fr" ? "jours restants" : "days left"}</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl py-2.5">
              <TrendingUp className="h-4 w-4 text-[#008751] mx-auto mb-1" />
              <p className="text-sm font-black text-slate-800">{pct}%</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{lang === "fr" ? "financé" : "funded"}</p>
            </div>
          </div>

          {/* Rewards */}
          <div className="space-y-2.5 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-display flex items-center gap-1.5">
              <Gift className="h-3.5 w-3.5 text-slate-400" />
              {lang === "fr" ? "Contreparties proposées" : "Available Rewards"}
            </p>
            <div className="space-y-2 font-sans">
              {project.rewards.map((r, i) => (
                <div key={i} className="flex gap-3 bg-slate-50/50 rounded-2xl p-3.5 border border-slate-100/80 items-start text-left">
                  <span className="text-xs font-black text-[#008751] bg-[#008751]/10 px-2 py-1 rounded-lg flex-shrink-0 min-w-[3.5rem] text-center font-mono">
                    {r.tier}
                  </span>
                  <p className="text-xs text-slate-600 font-medium leading-snug">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenModal}
          className="w-full h-11 text-xs font-black uppercase tracking-widest rounded-xl bg-[#008751] text-white hover:bg-[#006e40] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-4 font-display"
        >
          {lang === "fr" ? "Soutenir / Réserver" : "Support / Reserve"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Contribution Modal overlay */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100/80 transform scale-100 transition-all duration-300 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/20 text-left">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#008751] font-display">
                  {lang === "fr" ? "CONTRIBUTION FINANCIÈRE" : "FINANCIAL CONTRIBUTION"}
                </span>
                <h3 className="font-extrabold text-sm text-slate-800 leading-tight font-display mt-0.5">
                  {lang === "fr" ? "Soutenir / Réserver" : "Support / Reserve"}
                </h3>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-left flex-1 font-sans">
              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto border border-emerald-100 animate-bounce">
                    <CheckCircle2 className="h-8 w-8 text-[#008751]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-base font-black text-slate-800">
                      {lang === "fr" ? "Merci pour votre soutien !" : "Thank you for your support!"}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      {lang === "fr"
                        ? `Votre contribution de ${customAmount} € a été enregistrée avec succès pour "${project.name}".`
                        : `Your contribution of ${customAmount} € was successfully recorded for "${project.name}".`}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSupportModalOpen(false)}
                    className="px-6 h-10 text-xs font-bold bg-[#008751] text-white rounded-lg hover:bg-[#006e40] transition-colors cursor-pointer mx-auto block"
                  >
                    {lang === "fr" ? "Fermer" : "Close"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmSupport} className="space-y-4">
                  {/* Select Reward Tier */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display">
                      {lang === "fr" ? "Sélectionnez une contrepartie" : "Select a reward level"}
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {project.rewards.map((reward, rIdx) => {
                        const isSelected = selectedReward?.tier === reward.tier;
                        return (
                          <div
                            key={rIdx}
                            onClick={() => handleSelectReward(reward)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer text-left flex gap-3 items-start ${
                              isSelected
                                ? "bg-[#008751]/5 border-[#008751] ring-1 ring-[#008751]"
                                : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                            }`}
                          >
                            <div className="mt-0.5">
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-[#008751]" : "border-slate-300"
                              }`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-[#008751]" />}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-baseline">
                                <span className="text-xs font-black text-[#008751] font-mono">{reward.tier}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium leading-snug mt-1">{reward.label}</p>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Don Libre */}
                      <div
                        onClick={() => handleSelectReward(null)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer text-left flex gap-3 items-center ${
                          selectedReward === null
                            ? "bg-[#008751]/5 border-[#008751] ring-1 ring-[#008751]"
                            : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        <div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedReward === null ? "border-[#008751]" : "border-slate-300"
                          }`}>
                            {selectedReward === null && <div className="w-2 h-2 rounded-full bg-[#008751]" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-bold text-slate-700">
                            {lang === "fr" ? "Don libre (sans contrepartie)" : "Custom Donation (no reward)"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display">
                      {lang === "fr" ? "Montant de votre contribution (€)" : "Contribution Amount (€)"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">€</span>
                      <input
                        type="number"
                        min={selectedReward ? getMinAmount(selectedReward.tier) : 1}
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full h-10 pl-8 pr-4 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#008751] focus:ring-1 focus:ring-[#008751]"
                        required
                      />
                    </div>
                  </div>

                  {/* Backer Identity Fields */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display">
                        {lang === "fr" ? "Votre Nom" : "Your Name"}
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Jean Dupont"
                        value={backerName}
                        onChange={(e) => setBackerName(e.target.value)}
                        className="w-full h-10 px-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#008751] focus:ring-1 focus:ring-[#008751]"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display">
                        {lang === "fr" ? "Votre Adresse e-mail" : "Your Email Address"}
                      </label>
                      <input
                        type="email"
                        placeholder="jean.dupont@example.com"
                        value={backerEmail}
                        onChange={(e) => setBackerEmail(e.target.value)}
                        className="w-full h-10 px-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#008751] focus:ring-1 focus:ring-[#008751]"
                        required
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
                      {errorMsg}
                    </p>
                  )}

                  {/* Submission actions */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 text-xs font-black uppercase tracking-widest rounded-xl bg-[#008751] text-white hover:bg-[#006e40] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                      {lang === "fr" ? "Confirmer la contribution" : "Confirm contribution"}
                    </button>
                    <p className="text-[9px] text-slate-400 mt-2 text-center">
                      🛡️ {lang === "fr"
                        ? "Contribution simulée sécurisée. Vos retours soutiennent l'autonomie des artisans."
                        : "Simulated secure backup. Your support directly aids artisan independence."}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectPanel({ provider, lang }) {
  const projects = provider.projects || [];
  if (projects.length === 0) return null;

  return (
    <div className="mt-8 text-left animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-[#008751]" />
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 font-display">
          {lang === "fr" ? "Projets à financer" : "Projects to fund"}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} lang={lang} />
        ))}
      </div>
    </div>
  );
}

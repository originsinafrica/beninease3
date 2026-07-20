import { SUYUS } from "../lib/data";
import SeriesRow from "../components/SeriesRow";
import Header from "../components/Header";
import SearchTabs from "../components/SearchTabs";
import { useLang, T } from "../lib/LangContext";

export default function Home() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 pb-20 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Header />

      {/* Modern Editorial Hero */}
      <div className="relative overflow-hidden bg-slate-950 pt-32 pb-24 px-4 md:px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/benin_heritage_hero_1784551167834.jpg"
            alt="Benin Cultural Heritage"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/65" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight font-display">
            {lang === "fr" 
              ? "C'est facile d'aimer le Bénin" 
              : "It's easy to love Benin"}
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            {t.heroSub || "Découvrez des récits captivants, puis rencontrez les artisans, guides et sages certifiés qui font battre le cœur de notre culture."}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto pt-12 px-4 md:px-8 space-y-12">
        
        {/* Search & Discover Block */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
          <div className="mb-6 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
              {lang === "fr" ? "Exploration & Recherche" : "Explore & Search"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {lang === "fr" ? "Trouvez instantanément l'expérience, le conte ou le guide de vos rêves." : "Find your dream experience, tale or guide instantly."}
            </p>
          </div>
          <SearchTabs />
        </section>

        {/* SUYU CATEGORIES DISPLAY (Clean card layout by cultural themes) */}
        <section className="space-y-8">
          <div className="space-y-8">
            {SUYUS.map((s) => (
              <div 
                key={s.id} 
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <SeriesRow suyu={s} />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

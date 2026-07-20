import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang, T } from "../lib/LangContext";
import Logo from "./Logo";

export default function Header() {
  const { lang, setLang } = useLang();
  const t = T[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/80 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size={34} />
          <span className="text-base font-extrabold tracking-widest text-[#008751] group-hover:opacity-80 transition-opacity">BENINEASE</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-slate-200 rounded-full overflow-hidden text-xs font-semibold bg-slate-50">
            <button
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1 transition-all ${
                lang === "fr" ? "bg-[#008751] text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 transition-all ${
                lang === "en" ? "bg-[#008751] text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              EN
            </button>
          </div>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-sm text-slate-700 hover:text-slate-900 hidden sm:inline-flex">{t.login}</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="text-sm bg-[#008751] text-white hover:bg-[#006e40]">{t.register}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

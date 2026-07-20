import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import Header from "../components/Header";
import SpectatorDashboard from "../components/profile/SpectatorDashboard";
import ProfileSettings from "../components/profile/ProfileSettings";
import ProviderAvailabilityCalendar from "../components/profile/ProviderAvailabilityCalendar";
import ProviderRevenueDashboard from "../components/profile/ProviderRevenueDashboard";
import { useLang, T } from "../lib/LangContext";
import { User, Calendar, LogOut, Settings, BarChart3, ShieldCheck, Mail } from "lucide-react";

export default function Profile() {
  const { lang } = useLang();
  const t = T[lang];
  const navigate = useNavigate();
  const { user, logout, checkUserAuth } = useAuth();
  const [sidebarTab, setSidebarTab] = useState("dashboard"); // dashboard | availability | revenue | settings

  useEffect(() => {
    if (!user) {
      checkUserAuth().then((authenticated) => {
        if (!authenticated) {
          navigate("/login");
        }
      });
    }
  }, [user, checkUserAuth, navigate]);

  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isProvider = user.role === "provider";

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      <div className="max-w-screen-xl mx-auto pt-24 px-4 md:px-0 text-left">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-4">
            {/* User Bio Card */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm text-center md:text-left space-y-3">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                  {user.firstName ? user.firstName[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-sm text-foreground truncate text-left">{user.firstName} {user.lastName}</h2>
                  <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full mt-0.5">
                    {isProvider ? "Artisan Certifié" : "Spectateur"}
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-1 text-left">
                <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /><span className="truncate">{user.email}</span></p>
                {user.role === "provider" && (
                  <p className="flex items-center gap-1.5 text-green-600 font-semibold"><ShieldCheck className="h-3.5 w-3.5" />Statut vérifié</p>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="bg-card border border-border rounded-2xl p-2.5 shadow-sm space-y-1">
              <button
                onClick={() => setSidebarTab("dashboard")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  sidebarTab === "dashboard" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <User className="h-4 w-4" />
                {isProvider ? (lang === "fr" ? "Mon activité" : "My activity") : (lang === "fr" ? "Mon espace" : "My space")}
              </button>

              {isProvider && (
                <>
                  <button
                    onClick={() => setSidebarTab("availability")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      sidebarTab === "availability" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    {lang === "fr" ? "Mon calendrier" : "My calendar"}
                  </button>

                  <button
                    onClick={() => setSidebarTab("revenue")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      sidebarTab === "revenue" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    {lang === "fr" ? "Mes revenus" : "My revenue"}
                  </button>
                </>
              )}

              <button
                onClick={() => setSidebarTab("settings")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  sidebarTab === "settings" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Settings className="h-4 w-4" />
                {lang === "fr" ? "Paramètres" : "Settings"}
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                {t.logout}
              </button>
            </div>
          </div>

          {/* Main Panel Content */}
          <div className="flex-1 bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[400px]">
            {sidebarTab === "dashboard" && (
              isProvider ? (
                <div className="space-y-6">
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                    <p className="font-semibold text-primary text-sm">Bienvenue, {user.firstName} !</p>
                    <p className="text-xs text-muted-foreground mt-1">Vous êtes un prestataire certifié Beninease. Vos expériences et ateliers sont accessibles par les spectateurs du monde entier.</p>
                  </div>
                  <ProviderRevenueDashboard />
                </div>
              ) : (
                <SpectatorDashboard />
              )
            )}

            {sidebarTab === "availability" && isProvider && (
              <ProviderAvailabilityCalendar />
            )}

            {sidebarTab === "revenue" && isProvider && (
              <ProviderRevenueDashboard />
            )}

            {sidebarTab === "settings" && (
              <ProfileSettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

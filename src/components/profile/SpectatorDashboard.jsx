import { useState } from "react";
import { Calendar, CheckCircle2, Heart, Award, CreditCard, Sparkles } from "lucide-react";
import { useLang } from "../../lib/LangContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MOCK_BOOKINGS = [
  { id: "b1", service: "Atelier de cuisine béninoise", provider: "Adjovi Kossou Ahyi", date: "2026-08-12", status: "confirmed", price: 40 },
  { id: "b2", service: "Tour textile de Porto-Novo", provider: "Aïssatou Gandonou Sèdégbé", date: "2026-08-19", status: "pending", price: 30 },
];

const MOCK_CONTRIBUTIONS = [
  { id: "c1", project: "Restauration du Palais Royal de Porto-Novo", tier: "Bronze", amount: 25, date: "2026-07-15" },
  { id: "c2", project: "Atelier Itinérant de Batik pour Orphelins", tier: "Or", amount: 150, date: "2026-07-20" },
];

const MOCK_FAVORITES = [
  { name: "À la Sauce Bénin", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=900&fit=crop" },
  { name: "Le Royaume", image: "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=600&h=900&fit=crop" },
];

export default function SpectatorDashboard() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <div className="space-y-6 text-left">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {lang === "fr" ? "Réservations" : "Bookings"}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_BOOKINGS.length}</div>
            <p className="text-xs text-muted-foreground">
              {lang === "fr" ? "1 en attente de confirmation" : "1 pending confirmation"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {lang === "fr" ? "Contributions" : "Contributions"}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$175</div>
            <p className="text-xs text-muted-foreground">
              {lang === "fr" ? "Soutien à 2 projets" : "Supporting 2 projects"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {lang === "fr" ? "Favoris" : "Favorites"}
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_FAVORITES.length}</div>
            <p className="text-xs text-muted-foreground">
              {lang === "fr" ? "Séries sauvegardées" : "Saved series"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs list */}
      <div className="border-b border-border flex gap-4">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`pb-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === "bookings" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang === "fr" ? "Mes Réservations" : "My Bookings"}
        </button>
        <button
          onClick={() => setActiveTab("contributions")}
          className={`pb-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === "contributions" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang === "fr" ? "Mes Contributions" : "My Contributions"}
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`pb-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === "favorites" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang === "fr" ? "Séries Favorites" : "Favorite Series"}
        </button>
      </div>

      {/* Tab contents */}
      <div>
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {MOCK_BOOKINGS.map(b => (
              <div key={b.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h4 className="font-bold text-sm text-foreground">{b.service}</h4>
                  <p className="text-xs text-muted-foreground">{lang === "fr" ? "avec" : "with"} {b.provider}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(b.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { dateStyle: "medium" })}
                  </p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="font-bold text-sm text-foreground">${b.price}</p>
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                      b.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {b.status === "confirmed" ? (lang === "fr" ? "Confirmé" : "Confirmed") : (lang === "fr" ? "En attente" : "Pending")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contributions" && (
          <div className="space-y-4">
            {MOCK_CONTRIBUTIONS.map(c => (
              <div key={c.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h4 className="font-bold text-sm text-foreground">{c.project}</h4>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-primary" />
                    {lang === "fr" ? "Contrepartie :" : "Reward tier:"} {c.tier}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-base text-primary">${c.amount}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {new Date(c.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { dateStyle: "short" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MOCK_FAVORITES.map(f => (
              <Link key={f.name} to={`/series/${encodeURIComponent(f.name)}`} className="group block">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow border border-border group-hover:scale-105 transition-transform duration-200">
                  <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-bold truncate">{f.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

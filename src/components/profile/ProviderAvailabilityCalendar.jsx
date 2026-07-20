import { useState } from "react";
import { useLang } from "../../lib/LangContext";
import { Button } from "@/components/ui/button";

export default function ProviderAvailabilityCalendar() {
  const { lang } = useLang();
  const [availabilities, setAvailabilities] = useState([
    { id: 1, date: "2026-08-12", time: "10:00 - 13:00", status: "booked", labelFr: "Atelier Cuisine", labelEn: "Cooking Workshop" },
    { id: 2, date: "2026-08-15", time: "14:00 - 17:00", status: "free", labelFr: "Disponible", labelEn: "Available" },
    { id: 3, date: "2026-08-19", time: "09:00 - 11:00", status: "booked", labelFr: "Tour Porto-Novo", labelEn: "Porto-Novo Tour" },
    { id: 4, date: "2026-08-22", time: "15:00 - 18:00", status: "free", labelFr: "Disponible", labelEn: "Available" },
  ]);

  const toggleStatus = (id) => {
    setAvailabilities(prev =>
      prev.map(av => {
        if (av.id === id && av.status === "free") {
          return { ...av, status: "blocked", labelFr: "Bloqué", labelEn: "Blocked" };
        } else if (av.id === id && av.status === "blocked") {
          return { ...av, status: "free", labelFr: "Disponible", labelEn: "Available" };
        }
        return av;
      })
    );
  };

  return (
    <div className="space-y-4 text-left">
      <div>
        <h3 className="text-base font-bold text-foreground">
          {lang === "fr" ? "Gestion du Calendrier" : "Calendar Management"}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {lang === "fr" ? "Configurez vos créneaux horaires et gérez vos réservations." : "Configure your time slots and manage your bookings."}
        </p>
      </div>
      <div className="space-y-2.5">
        {availabilities.map(av => (
          <div key={av.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-semibold text-sm text-foreground">
                {new Date(av.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { dateStyle: "long" })}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{av.time}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                av.status === "booked" ? "bg-red-100 text-red-700" :
                av.status === "blocked" ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700"
              }`}>
                {lang === "fr" ? av.labelFr : av.labelEn}
              </span>
              {av.status !== "booked" && (
                <button
                  onClick={() => toggleStatus(av.id)}
                  className="text-xs px-3 py-1 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer"
                >
                  {av.status === "free" ? (lang === "fr" ? "Bloquer" : "Block") : (lang === "fr" ? "Débloquer" : "Unblock")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

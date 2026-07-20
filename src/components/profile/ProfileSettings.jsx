import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "../../lib/LangContext";

export default function ProfileSettings() {
  const { lang } = useLang();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: "Pierre",
    lastName: "Koffi",
    email: "pierre.koffi@example.com",
    phone: "+229 97 00 00 00",
    bio: "Passionné d'histoire et de culture béninoise. Toujours prêt à découvrir de nouveaux artisans.",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md text-left">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
            {lang === "fr" ? "Prénom" : "First Name"}
          </label>
          <input
            value={form.firstName}
            onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))}
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
            {lang === "fr" ? "Nom" : "Last Name"}
          </label>
          <input
            value={form.lastName}
            onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))}
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
          {lang === "fr" ? "Téléphone" : "Phone"}
        </label>
        <input
          value={form.phone}
          onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
          Bio
        </label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>
      <div className="pt-2">
        <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground cursor-pointer">
          {lang === "fr" ? "Enregistrer les modifications" : "Save Changes"}
        </Button>
        {saved && (
          <p className="text-xs text-green-600 mt-2 text-center font-semibold animate-pulse">
            {lang === "fr" ? "Profil mis à jour avec succès !" : "Profile successfully updated!"}
          </p>
        )}
      </div>
    </form>
  );
}

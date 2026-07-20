import { useState, useEffect } from "react";
import { X, Calendar, CheckCircle2, ShoppingCart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang, T } from "../lib/LangContext";

export default function BookingModal({ provider, open, onClose, mode = "book", initialItem = null }) {
  const { lang } = useLang();
  const t = T[lang];
  const [step, setStep] = useState("form"); // form | success
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    service: "",
    product: "",
    quantity: "1",
    address: "",
    message: ""
  });

  // Pre-fill initial items on open
  useEffect(() => {
    if (open) {
      setStep("form");
      setForm({
        name: "",
        email: "",
        date: "",
        service: mode === "book" && initialItem ? initialItem.name : "",
        product: mode === "purchase" && initialItem ? initialItem.name : "",
        quantity: "1",
        address: "",
        message: ""
      });
    }
  }, [open, mode, initialItem]);

  if (!open) return null;

  const services = provider?.services || [];
  const products = provider?.products || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep("success");
  };

  const handleClose = () => {
    setStep("form");
    onClose();
  };

  const isBookMode = mode === "book";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-[fadeIn_0.2s_ease]" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto border border-slate-100"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease" }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0 text-left bg-slate-50/50">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              {isBookMode ? (
                <Calendar className="h-3.5 w-3.5 text-[#008751]" />
              ) : (
                <ShoppingCart className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span className={`text-[10px] font-black uppercase tracking-widest ${isBookMode ? "text-[#008751]" : "text-amber-600"}`}>
                {isBookMode
                  ? (lang === "fr" ? "Réservation d'Expérience" : "Experience Booking")
                  : (lang === "fr" ? "Achat de Produit d'Artisanat" : "Craft Product Purchase")}
              </span>
            </div>
            <h2 className="font-extrabold text-slate-800 text-sm font-display">
              {isBookMode
                ? (lang === "fr" ? "Réserver une session" : "Book a slot session")
                : (lang === "fr" ? "Acheter un produit" : "Purchase product")}
            </h2>
            <p className="text-[11px] text-slate-500 font-sans font-medium mt-0.5">{provider?.full_name}</p>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-left">
          {step === "success" ? (
            <div className="flex flex-col items-center text-center py-6 space-y-4 animate-fade-in font-sans">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border animate-bounce ${
                isBookMode ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
              }`}>
                <CheckCircle2 className={`h-7 w-7 ${isBookMode ? "text-[#008751]" : "text-amber-500"}`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-800 text-base font-display">
                  {isBookMode
                    ? (lang === "fr" ? "Demande de réservation envoyée !" : "Booking request sent!")
                    : (lang === "fr" ? "Commande enregistrée avec succès !" : "Order successfully recorded!")}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {isBookMode
                    ? (lang === "fr"
                        ? `Votre demande pour "${form.service}" a été transmise à ${provider?.name}. Vous recevrez un e-mail de confirmation sous peu.`
                        : `Your request for "${form.service}" was sent to ${provider?.name}. You will receive a confirmation email shortly.`)
                    : (lang === "fr"
                        ? `Votre commande pour ${form.quantity}x "${form.product}" a été simulée avec succès. Les fonds (100%) sont alloués directement à ${provider?.name}.`
                        : `Your order for ${form.quantity}x "${form.product}" was successfully simulated. 100% of the funds go directly to ${provider?.name}.`)}
                </p>
              </div>

              <button
                onClick={handleClose}
                className={`px-6 h-10 text-xs font-black uppercase tracking-wider rounded-xl text-white transition-colors cursor-pointer mx-auto ${
                  isBookMode ? "bg-[#008751] hover:bg-[#006e40]" : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                {t.close || "Fermer"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              
              {/* Main Selection fields */}
              {isBookMode ? (
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display block mb-1">
                    {t.service || "Service / Expérience"}
                  </label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:border-[#008751] focus:ring-1 focus:ring-[#008751] focus:outline-none"
                  >
                    <option value="">{t.selectService || "Sélectionnez un service"}</option>
                    {services.map((s, i) => (
                      <option key={i} value={s.name}>
                        {s.name} — {s.price} {s.currency} ({s.duration})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display block mb-1">
                      {lang === "fr" ? "Article d'artisanat" : "Craft Product"}
                    </label>
                    <select
                      required
                      value={form.product}
                      onChange={(e) => setForm(f => ({ ...f, product: e.target.value }))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="">{lang === "fr" ? "Sélectionnez un produit" : "Select a product"}</option>
                      {products.map((p, i) => (
                        <option key={i} value={p.name}>
                          {p.name} — {p.price} {p.currency}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display block mb-1">
                      {lang === "fr" ? "Quantité" : "Quantity"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      required
                      value={form.quantity}
                      onChange={(e) => setForm(f => ({ ...f, quantity: e.target.value }))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Personal Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display block mb-1">
                    {t.fullName || "Votre nom"}
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none"
                    placeholder={t.yourName || "Ex: Jean Dupont"}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display block mb-1">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none"
                    placeholder="jean.dupont@example.com"
                  />
                </div>
              </div>

              {/* Contextual Action details (Date or Shipping Address) */}
              {isBookMode ? (
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display block mb-1">
                    {t.preferredDate || "Date souhaitée"}
                  </label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:border-[#008751] focus:ring-1 focus:ring-[#008751] focus:outline-none"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display block mb-1">
                    {lang === "fr" ? "Adresse de livraison" : "Delivery Address"}
                  </label>
                  <input
                    required
                    value={form.address}
                    onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    placeholder={lang === "fr" ? "Ex: 12 Bvd de la Marina, Cotonou, Bénin" : "Ex: 12 Marina Bvd, Cotonou, Benin"}
                  />
                </div>
              )}

              {/* Optional message */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-display block mb-1">
                  {t.messageOptional || "Message ou instructions spécifiques"}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none resize-none"
                  placeholder={t.specialRequests || "Ex: Précisez des exigences alimentaires ou mesures..."}
                />
              </div>

              {/* Confirm submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full h-11 text-xs font-black uppercase tracking-widest rounded-xl text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    isBookMode ? "bg-[#008751] hover:bg-[#006e40]" : "bg-amber-500 hover:bg-amber-600"
                  }`}
                >
                  {isBookMode ? (
                    <>
                      <Calendar className="h-4 w-4" />
                      {t.confirmBooking || "Confirmer la réservation"}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      {lang === "fr" ? "Confirmer l'achat" : "Confirm purchase"}
                    </>
                  )}
                </button>
                <p className="text-[9px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-slate-400" />
                  {lang === "fr"
                    ? "Simulation sécurisée sans frais réels."
                    : "Secured simulation, no real charges apply."}
                </p>
              </div>

            </form>
          )}
        </div>
      </div>
      <style>{`
        @keyframes slideUp { 
          from { transform: translateY(40px); opacity: 0; } 
          to { transform: translateY(0); opacity: 1; } 
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

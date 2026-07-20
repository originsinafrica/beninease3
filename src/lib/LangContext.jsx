import { createContext, useContext, useState } from "react";

const LangContext = createContext({ lang: "fr", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "fr" || stored === "en") return stored;
    } catch (e) {
      console.error("Failed to read lang from localStorage", e);
    }
    return "fr";
  });

  const changeLang = (l) => { 
    setLang(l); 
    localStorage.setItem("lang", l); 
  };

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export const T = {
  fr: {
    discover: "Découvrez le Bénin",
    discoverSub: "Expériences authentiques, curées par les meilleurs acteurs locaux du pays.",
    login: "Se connecter",
    register: "S'inscrire",
    back: "Retour",
    protagonists: "Rencontrez les protagonistes",
    soon: "Les protagonistes de cette série seront bientôt révélés.",
    services: "Services",
    bookView: "Voir les services & Réserver",
    book: "Réserver",
    episodes: "Épisodes",
    servicesPanel: "Services & Produits",
    synopsis: "Synopsis",
    synopsisLong: "Histoire complète",
    keywords: "Mots-clés",
    payment: "Paiement sécurisé",
    payCard: "Carte bancaire",
    payYape: "Mobile Money",
    payWith: "Payer avec",
    cardNumber: "Numéro de carte",
    cardName: "Nom sur la carte",
    expiry: "Expiration",
    cvv: "CVV",
    confirmPay: "Confirmer le paiement",
    yapePhone: "Numéro de téléphone Mobile Money",
    yapeConfirm: "Payer par Mobile Money",
    totalToPay: "Total à payer",
    service: "Service",
    provider: "Prestataire",
    views: "Vues",
    evaluations: "Évaluations",
    score: "Score",
    rateEpisode: "Évaluez cet épisode",
    rated: "Évalué",
    sendRating: "Envoyer l'évaluation",
    thankRating: "Merci pour votre évaluation !",
    playing: "Lecture en cours...",
    bookSession: "Réserver une session",
    requestSent: "Demande envoyée !",
    requestSentSub: "recevra votre demande et confirmera la session rapidement.",
    fullName: "Nom complet",
    yourName: "Votre nom",
    selectService: "Sélectionnez un service",
    preferredDate: "Date préférée",
    messageOptional: "Message (optionnel)",
    specialRequests: "Des questions ou demandes particulières ?",
    confirmBooking: "Confirmer la réservation",
    close: "Fermer",
    seriesNotFound: "Série non trouvée.",
    providerNotFound: "Prestataire non trouvé.",
    criteriaAuthenticity: "Authenticité",
    criteriaOriginality: "Originalité",
    criteriaImpact: "Impact",
  },
  en: {
    discover: "Discover Benin",
    discoverSub: "Premium experiences curated by the best local experts in the country.",
    login: "Log In",
    register: "Sign Up",
    back: "Back",
    protagonists: "Meet the protagonists",
    soon: "The protagonists of this series will be revealed soon.",
    services: "Services",
    bookView: "View Services & Book",
    book: "Book",
    episodes: "Episodes",
    servicesPanel: "Services & Products",
    synopsis: "Synopsis",
    synopsisLong: "Full story",
    keywords: "Keywords",
    payment: "Secure payment",
    payCard: "Bank card",
    payYape: "Mobile Money",
    payWith: "Pay with",
    cardNumber: "Card number",
    cardName: "Cardholder name",
    expiry: "Expiry",
    cvv: "CVV",
    confirmPay: "Confirm payment",
    yapePhone: "Mobile Money phone number",
    yapeConfirm: "Pay with Mobile Money",
    totalToPay: "Total to pay",
    service: "Service",
    provider: "Provider",
    views: "Views",
    evaluations: "Ratings",
    score: "Score",
    rateEpisode: "Rate this episode",
    rated: "Rated",
    sendRating: "Submit rating",
    thankRating: "Thanks for your rating!",
    playing: "Playing...",
    bookSession: "Book a Session",
    requestSent: "Request sent!",
    requestSentSub: "will receive your request and confirm the session soon.",
    fullName: "Full name",
    yourName: "Your name",
    selectService: "Select a service",
    preferredDate: "Preferred date",
    messageOptional: "Message (optional)",
    specialRequests: "Any questions or special requests?",
    confirmBooking: "Confirm Booking",
    close: "Close",
    seriesNotFound: "Series not found.",
    providerNotFound: "Provider not found.",
    criteriaAuthenticity: "Authenticity",
    criteriaOriginality: "Originality",
    criteriaImpact: "Impact",
  },
};

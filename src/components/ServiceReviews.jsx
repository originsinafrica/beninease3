import { Star } from "lucide-react";

// Deterministic seeded data per service name
function seed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 9973;
  return h;
}

const REVIEWER_NAMES = [
  "Marie A.", "Jean D.", "Cécile B.", "Thomas R.", "Aminata S.",
  "Lucien H.", "Sophie M.", "Koffi A.", "Nadège F.", "Patrick L.",
  "Fatou D.", "Olivier T.", "Claire V.", "Marius K.", "Estelle P.",
];

const REVIEW_TEXTS_FR = [
  "Service exceptionnel, je recommande vivement !",
  "Une expérience authentique et inoubliable.",
  "Très professionnel, à la hauteur de mes attentes.",
  "Moment magique, à refaire sans hésiter.",
  "Accueil chaleureux et prestation de qualité.",
  "Parfait, rien à redire sur la prestation.",
  "Belle découverte, je reviendrai avec plaisir.",
  "Un vrai trésor de culture, merci pour ce moment.",
  "Prestation honnête et passionnante du début à la fin.",
];

function getReviews(serviceName) {
  const s = seed(serviceName);
  const rating = 3.5 + (s % 15) / 10; // 3.5 to 4.9
  const count = 3 + (s % 5); // 3–7 reviews
  const reviews = [];
  for (let i = 0; i < Math.min(count, 4); i++) {
    const rs = seed(serviceName + i);
    reviews.push({
      name: REVIEWER_NAMES[rs % REVIEWER_NAMES.length],
      stars: Math.round(rating - (i % 2) * 0.5) || 5,
      text: REVIEW_TEXTS_FR[rs % REVIEW_TEXTS_FR.length],
      daysAgo: 2 + (rs % 60),
    });
  }
  return { rating: Math.round(rating * 10) / 10, count, reviews };
}

function Stars({ value, size = "h-3.5 w-3.5" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`${size} ${n <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  );
}

export default function ServiceReviews({ serviceName }) {
  const { rating, count, reviews } = getReviews(serviceName);

  return (
    <div className="mt-3 pt-3 border-t border-border text-left">
      <div className="flex items-center gap-2 mb-2">
        <Stars value={rating} />
        <span className="text-xs font-bold text-foreground">{rating.toFixed(1)}</span>
        <span className="text-[11px] text-muted-foreground">({count} avis)</span>
      </div>
      <div className="space-y-2">
        {reviews.map((r, i) => (
          <div key={i} className="text-xs">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-semibold text-foreground">{r.name}</span>
              <Stars value={r.stars} size="h-2.5 w-2.5" />
              <span className="text-[10px] text-muted-foreground">· il y a {r.daysAgo} j</span>
            </div>
            <p className="text-muted-foreground leading-snug">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

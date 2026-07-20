import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SeriesRow({ suyu }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  return (
    <section className="mb-12">
      <div className="flex items-baseline gap-3 px-4 md:px-0 mb-4 text-left">
        <h2 className="text-lg font-bold text-foreground">{suyu.name}</h2>
        <span className="text-xs font-medium text-muted-foreground tracking-wide">{suyu.subtitle}</span>
      </div>
      <div className="relative group/row">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-[40%] -translate-y-1/2 z-10 w-8 h-8 bg-background/90 backdrop-blur shadow-md rounded-full flex items-center justify-center border border-border hover:bg-background transition-all cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
        )}
        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-8 h-8 bg-background/90 backdrop-blur shadow-md rounded-full flex items-center justify-center border border-border hover:bg-background transition-all cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto px-4 md:px-0 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {suyu.series.map((s) => (
            <Link
              key={s.name}
              to={`/series/${encodeURIComponent(s.name)}`}
              className="flex-shrink-0 group w-[150px] md:w-[170px] text-left"
            >
              {/* Poster */}
              <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-md transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                <img
                  src={s.image}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=900&fit=crop"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div
                  className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full ring-1 ring-white/40"
                  style={{ backgroundColor: suyu.color }}
                />
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {s.keywords?.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-black/50 text-white/90 backdrop-blur-sm leading-none"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold leading-tight">{s.name}</p>
                </div>
              </div>
              {/* Synopsis below poster */}
              <p className="mt-2 text-[11px] text-muted-foreground leading-snug line-clamp-3">
                {s.synopsis}
              </p>
            </Link>
          ))}
          <div className="flex-shrink-0 w-4" />
        </div>
      </div>
    </section>
  );
}

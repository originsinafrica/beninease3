import { useState } from "react";
import { Play, Youtube } from "lucide-react";

// Mock YouTube IDs per series — replace with real IDs when available
const SERIES_YOUTUBE = {
  "À la Sauce Bénin": [
    { ep: 1, title: "Quel plat te ramène à ton enfance ?", youtubeId: "ysz5S6PUM-M" },
    { ep: 2, title: "L'akassa sans pouvoir y goûter", youtubeId: "M7lc1UVf-VE" },
  ],
  "Le Royaume": [
    { ep: 1, title: "Le roi qui m'a le plus fasciné", youtubeId: "ysz5S6PUM-M" },
  ],
  "À Plate Couture": [
    { ep: 1, title: "Quelle création raconte ton histoire ?", youtubeId: "ysz5S6PUM-M" },
  ],
};

function YouTubeEmbed({ videoId, title }) {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <button
        onClick={() => setStarted(true)}
        className="relative w-full rounded-xl overflow-hidden group cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        aria-label={`Lire : ${title}`}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play className="h-6 w-6 text-white fill-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left">
          <p className="text-white text-sm font-semibold leading-tight">{title}</p>
        </div>
      </button>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}

export default function SeriesYouTubeSection({ seriesName, providers }) {
  const videos = SERIES_YOUTUBE[seriesName];

  // Also check if any provider episode has a youtubeId
  const providerVideos = providers?.flatMap(p =>
    (p.episodes || [])
      .filter(ep => ep.youtube_id)
      .map(ep => ({ ep: (p.episodes.indexOf(ep) + 1), title: ep.title, youtubeId: ep.youtube_id, provider: p.name }))
  ) || [];

  const allVideos = [...providerVideos, ...(videos || [])];

  if (allVideos.length === 0) return null;

  return (
    <div className="mt-10 text-left">
      <div className="flex items-center gap-2 mb-4">
        <Youtube className="h-5 w-5 text-red-600" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Extraits vidéo
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allVideos.map((v, i) => (
          <div key={i}>
            <YouTubeEmbed videoId={v.youtubeId} title={v.title} />
            {v.provider && <p className="text-xs text-muted-foreground mt-1.5 pl-1">avec {v.provider} · Ep. {v.ep}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function YouTubePlayer({ videoId, title }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}

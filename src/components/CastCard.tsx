import type { TCast } from "@/utils/types";

type CastCardProps = {
  cast: TCast;
};

export function CastCard({ cast }: CastCardProps) {
  const imageUrl = cast.profile_path
    ? `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
    : null;

  // Initiales pour fallback
  const initials = cast.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-2 min-w-[120px] group">
      {/* Avatar */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-neutral-800 ring-2 ring-neutral-700 group-hover:ring-orange-500 transition-all duration-300">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={cast.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-neutral-700 to-neutral-800 text-neutral-400 text-lg font-bold">
            {initials}
          </div>
        )}
      </div>

      {/* Informations */}
      <div className="flex flex-col items-center gap-0.5 text-center">
        <p className="text-sm font-medium text-neutral-200 line-clamp-2 leading-tight">
          {cast.name}
        </p>
        <p className="text-xs text-neutral-400 line-clamp-1">
          {cast.character}
        </p>
      </div>
    </div>
  );
}

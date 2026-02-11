import { formatWeekRange, getWeekEnd } from "@/utils/dates";

export function EmptyWeek({ weekStart }: { weekStart: Date }) {
  const weekEnd = getWeekEnd(weekStart);
  const formattedWeek = formatWeekRange(weekStart, weekEnd);

  return (
    <div className="text-center py-16 px-4 animate-fadeIn">
      <div className="text-6xl mb-4">🎬</div>
      <p className="text-neutral-400 text-lg mb-2">
        Aucune sortie prévue cette semaine
      </p>
      <p className="text-neutral-500 text-sm">Semaine du {formattedWeek}</p>
    </div>
  );
}

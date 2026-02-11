import {
  canNavigateNext,
  canNavigatePrevious,
  formatWeekRange,
  getCurrentWeekStart,
  getNextWeek,
  getPreviousWeek,
  getWeekEnd,
  toISODate,
} from "@/utils/dates";

interface WeekNavigatorProps {
  currentWeekStart: Date;
  onNavigate: (newWeekStart: Date) => void;
}

export function WeekNavigator({
  currentWeekStart,
  onNavigate,
}: WeekNavigatorProps) {
  const weekEnd = getWeekEnd(currentWeekStart);
  const formattedWeek = formatWeekRange(currentWeekStart, weekEnd);
  const isCurrentWeek =
    toISODate(currentWeekStart) === toISODate(getCurrentWeekStart());

  const handlePrevious = () => {
    if (canNavigatePrevious(currentWeekStart)) {
      onNavigate(getPreviousWeek(currentWeekStart));
    }
  };

  const handleNext = () => {
    if (canNavigateNext(currentWeekStart)) {
      onNavigate(getNextWeek(currentWeekStart));
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 animate-fadeIn">
      <button
        onClick={handlePrevious}
        disabled={!canNavigatePrevious(currentWeekStart)}
        className="px-3 sm:px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm"
        aria-label="Semaine précédente"
        type="button"
      >
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">← Précédente</span>
      </button>

      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center">
          Semaine du {formattedWeek}
        </h2>
        {isCurrentWeek && (
          <span className="text-xs px-2 py-0.5 bg-orange-500 text-white rounded-full font-medium">
            Cette semaine
          </span>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!canNavigateNext(currentWeekStart)}
        className="px-3 sm:px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm"
        aria-label="Semaine suivante"
        type="button"
      >
        <span className="sm:hidden">→</span>
        <span className="hidden sm:inline">Suivante →</span>
      </button>
    </div>
  );
}

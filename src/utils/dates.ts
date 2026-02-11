import dayjs from "dayjs";
import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.locale("fr");

/**
 * Obtenir le mercredi de début de semaine pour une date donnée
 * Les semaines cinéma FR vont de mercredi à mardi
 */
export function getWeekStart(date: Date): Date {
  const d = dayjs(date);
  const day = d.day(); // 0=Dim, 1=Lun, 2=Mar, 3=Mer, 4=Jeu, 5=Ven, 6=Sam

  // Calculer combien de jours en arrière pour atteindre le mercredi précédent
  let diff: number;
  if (day >= 3) {
    // De mercredi à samedi : reculer de (day - 3) jours
    diff = day - 3;
  } else {
    // De dimanche à mardi : on est dans la semaine qui a commencé le mercredi précédent
    diff = day + 4; // dim=4, lun=5, mar=6
  }

  return d.subtract(diff, "day").startOf("day").toDate();
}

/**
 * Obtenir le mardi de fin de semaine pour une date donnée
 */
export function getWeekEnd(startDate: Date): Date {
  return dayjs(startDate).add(6, "day").endOf("day").toDate();
}

/**
 * Formater une semaine pour l'affichage "11 - 17 février 2024"
 */
export function formatWeekRange(startDate: Date, endDate: Date): string {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const startDay = start.date();
  const endDay = end.date();
  const startMonth = start.format("MMMM");
  const endMonth = end.format("MMMM");
  const year = end.year();

  // Si même mois
  if (start.month() === end.month()) {
    return `${startDay} - ${endDay} ${startMonth} ${year}`;
  }
  // Si mois différents
  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
}

/**
 * Obtenir la date de début de la semaine courante (mercredi dernier ou ce mercredi)
 */
export function getCurrentWeekStart(): Date {
  return getWeekStart(dayjs().toDate());
}

/**
 * Naviguer vers la semaine suivante
 */
export function getNextWeek(currentWeekStart: Date): Date {
  return dayjs(currentWeekStart).add(7, "day").toDate();
}

/**
 * Naviguer vers la semaine précédente
 */
export function getPreviousWeek(currentWeekStart: Date): Date {
  return dayjs(currentWeekStart).subtract(7, "day").toDate();
}

/**
 * Convertir une date en format ISO (YYYY-MM-DD) pour l'API
 */
export function toISODate(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD");
}

/**
 * Parser une date ISO string vers Date
 */
export function parseISODate(isoString: string): Date {
  return dayjs(isoString, "YYYY-MM-DD").toDate();
}

/**
 * Vérifier si on peut naviguer vers la semaine suivante (limite +3 mois)
 */
export function canNavigateNext(weekStart: Date): boolean {
  const threeMonthsFromNow = dayjs().add(3, "month");
  return dayjs(weekStart).isBefore(getWeekStart(threeMonthsFromNow.toDate()));
}

/**
 * Vérifier si on peut naviguer vers la semaine précédente (limite -3 mois)
 */
export function canNavigatePrevious(weekStart: Date): boolean {
  const threeMonthsAgo = dayjs().subtract(3, "month");
  return dayjs(weekStart).isAfter(getWeekStart(threeMonthsAgo.toDate()));
}

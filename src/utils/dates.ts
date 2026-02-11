/**
 * Obtenir le mercredi de début de semaine pour une date donnée
 * Les semaines cinéma FR vont de mercredi à mardi
 */
export function getWeekStart(date: Date): Date {
  const day = date.getDay(); // 0=Dim, 1=Lun, 2=Mar, 3=Mer, 4=Jeu, 5=Ven, 6=Sam

  // Calculer combien de jours en arrière pour atteindre le mercredi précédent
  // Si on est mercredi (3), diff = 0
  // Si on est jeudi (4), diff = 1
  // Si on est dimanche (0), diff = 4
  // Si on est lundi (1), diff = 5
  // Si on est mardi (2), diff = 6
  let diff: number;
  if (day >= 3) {
    // De mercredi à samedi : reculer de (day - 3) jours
    diff = day - 3;
  } else {
    // De dimanche à mardi : on est dans la semaine qui a commencé le mercredi précédent
    diff = day + 4; // dim=4, lun=5, mar=6
  }

  const wednesday = new Date(date);
  wednesday.setDate(date.getDate() - diff);
  wednesday.setHours(0, 0, 0, 0);
  return wednesday;
}

/**
 * Obtenir le mardi de fin de semaine pour une date donnée
 */
export function getWeekEnd(startDate: Date): Date {
  const tuesday = new Date(startDate);
  tuesday.setDate(startDate.getDate() + 6);
  tuesday.setHours(23, 59, 59, 999);
  return tuesday;
}

/**
 * Formater une semaine pour l'affichage "11 - 17 février 2024"
 */
export function formatWeekRange(startDate: Date, endDate: Date): string {
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = startDate.toLocaleDateString("fr-FR", { month: "long" });
  const endMonth = endDate.toLocaleDateString("fr-FR", { month: "long" });
  const year = endDate.getFullYear();

  // Si même mois
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDay} - ${endDay} ${startMonth} ${year}`;
  }
  // Si mois différents
  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
}

/**
 * Obtenir la date de début de la semaine courante (mercredi dernier ou ce mercredi)
 */
export function getCurrentWeekStart(): Date {
  return getWeekStart(new Date());
}

/**
 * Naviguer vers la semaine suivante
 */
export function getNextWeek(currentWeekStart: Date): Date {
  const nextWeek = new Date(currentWeekStart);
  nextWeek.setDate(currentWeekStart.getDate() + 7);
  return nextWeek;
}

/**
 * Naviguer vers la semaine précédente
 */
export function getPreviousWeek(currentWeekStart: Date): Date {
  const prevWeek = new Date(currentWeekStart);
  prevWeek.setDate(currentWeekStart.getDate() - 7);
  return prevWeek;
}

/**
 * Convertir une date en format ISO (YYYY-MM-DD) pour l'API
 */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parser une date ISO string vers Date
 */
export function parseISODate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Vérifier si on peut naviguer vers la semaine suivante (limite +3 mois)
 */
export function canNavigateNext(weekStart: Date): boolean {
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  return weekStart < getWeekStart(threeMonthsFromNow);
}

/**
 * Vérifier si on peut naviguer vers la semaine précédente (limite -3 mois)
 */
export function canNavigatePrevious(weekStart: Date): boolean {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return weekStart > getWeekStart(threeMonthsAgo);
}

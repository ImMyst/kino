export function convertMinutesToHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;

  let result = "";

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (remainderMinutes > 0) {
    result += ` ${remainderMinutes}min`;
  }

  return result;
}

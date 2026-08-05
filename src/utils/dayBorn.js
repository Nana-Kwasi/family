// Akan day-name helpers. Pure date logic with no dependency on the catalogue, so it stays
// usable while the shop is still loading from the API.

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** The day-born whose products the site should be leading with today. */
export function getTodayBornDay(date = new Date()) {
  return DAY_NAMES[date.getDay()];
}

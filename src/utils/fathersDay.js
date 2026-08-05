// Father's Day (US/UK third Sunday of June) date helpers.
export function getFathersDay(year = new Date().getFullYear()) {
  const june1 = new Date(year, 5, 1);
  const firstSunday = 1 + ((7 - june1.getDay()) % 7); // date of first Sunday in June
  return new Date(year, 5, firstSunday + 14, 0, 0, 0, 0); // third Sunday
}

// Returns 'day' on Father's Day, 'pre' in the lead-up window, else null.
export function fathersDayState(now = new Date()) {
  const fd = getFathersDay(now.getFullYear());
  const start = new Date(fd); start.setDate(fd.getDate() - 4); start.setHours(0, 0, 0, 0);
  const end = new Date(fd); end.setHours(23, 59, 59, 999);
  if (now < start || now > end) return null;
  const sameDay = now.getFullYear() === fd.getFullYear()
    && now.getMonth() === fd.getMonth()
    && now.getDate() === fd.getDate();
  return sameDay ? 'day' : 'pre';
}

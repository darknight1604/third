export function formatDate(
  date: Date,
  pattern: string = 'YYYY-MM-DD HH:mm:ss',
): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const replacements: {[key: string]: string} = {
    YYYY: year,
    MM: month,
    DD: day,
    HH: hours,
    mm: minutes,
    ss: seconds,
  };

  let formatted = pattern;

  for (const [key, value] of Object.entries(replacements)) {
    formatted = formatted.replace(key, value);
  }

  return formatted;
}

export function timeFormat(hour: number = 0, minute: number = 0): string {
  const hourStr = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minuteStr = minute.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return `${hourStr}:${minuteStr}`;
}

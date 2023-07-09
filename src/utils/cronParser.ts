import { HabitSchedule } from "../types";

// scheduleToCron parse habit schedule to cron string
// ┌──────────────── (optional) second (0 - 59)
// │ ┌────────────── minute (0 - 59)
// │ │ ┌──────────── hour (0 - 23)
// │ │ │ ┌────────── day of month (1 - 31)
// │ │ │ │ ┌──────── month (1 - 12, JAN-DEC)
// │ │ │ │ │ ┌────── day of week (0 - 6, SUN-Mon)
// │ │ │ │ │ │       (0 to 6 are Sunday to Saturday; 7 is Sunday, the same as 0)
// * * * * * *
// @yearly	Run once a year, ie. "0 0 1 1 *".
// @monthly	Run once a month, ie. "0 0 1 * *".
// @weekly	Run once a week, ie. "0 0 * * 0".
// @daily	Run once a day, ie. "0 0 * * *".
// @hourly	Run once an hour, ie. "0 * * * *".
export function scheduleToCron(schedule: HabitSchedule): string {
  const min: string = (schedule.on.minute || 0).toString();
  const hour: string = (schedule.on.hour || 0).toString();
  const day: string = (schedule.on.day || 1).toString();
  const month: string = (schedule.on.month || 1).toString();
  const weekDay: string = (schedule.on.weekday || 0)?.toString();

  switch (schedule.every) {
    case "year":
      return `0 ${min} ${hour} ${day} ${month} *`;
    case "month":
      return `0 ${min} ${hour} ${day} * *`;
    case "two-weeks":
      return `0 ${min} ${hour} ${day} * *`;
    case "week":
      return `0 ${min} ${hour} * * ${weekDay}`;
    case "day":
      return `0 ${min} ${hour} * * *`;
    case "hour":
      return `0 ${min} * * * *`;
  }
}

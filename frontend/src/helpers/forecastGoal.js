import { workDaysInMonth } from './workDays'

export const forecastGoal = (units, goal) => {
  const today = new Date()
  const workDays = workDaysInMonth(today)
  const hourDone = (workDays.done - 1) * 8 + (today.getHours() - 7)
  const forecastUnits = ((units / hourDone) * (workDays.total * 8)).toFixed(2)
  const forecastPercent = `${((forecastUnits * 100) / goal).toFixed(2)} %`
  return { forecastPercent, forecastUnits }
}

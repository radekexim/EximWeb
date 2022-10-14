const milisecondDay = 24 * 60 * 60 * 1000
const currentYear = new Date().getFullYear()
const easterDay = getEaster(currentYear)
const easterDate = new Date(currentYear, easterDay[0] - 1, easterDay[1])
const easterSecondDate = new Date(easterDate.getTime() + milisecondDay)
const easterSecondDay = [easterSecondDate.getMonth() + 1, easterSecondDate.getDate()]
const godBodyDate = new Date(easterDate.getTime() + 60 * milisecondDay)
const godBodyDay = [godBodyDate.getMonth() + 1, godBodyDate.getDate()]

export const holidays = [
  [1, 1], // Nowy rok
  [1, 6], // Trzech króli
  [5, 1], // Święto pracy
  [5, 3], // Konstytucji
  [8, 15], // Wniebowzięcie
  [11, 1], // Wszytskich świętych
  [11, 11], // Niepodległości
  [12, 25], // Boże narodzenie
  [12, 26], // Boże narodzenie
  easterDay, // Wielkanoc
  easterSecondDay, // Poniedziałek wielkanocny
  godBodyDay, // Boże ciało
]

function getEaster(year) {
  var f = Math.floor,
    // Golden Number - 1
    G = year % 19,
    C = f(year / 100),
    // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    // number of days from 21 March to the Paschal full moon
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4)

  return [month, day]
}

export const workDaysInMonth = (date) => {
  var currentDay = date.getDate()
  var year = date.getYear() + 1900
  var month = date.getMonth()
  var total = 0
  var done = 0
  for (let dayMonth = 1; dayMonth <= 31; dayMonth++) {
    var t = new Date(year, month, dayMonth)
    if (t.getMonth() > month) break // month has less than 31 days
    if (t.getDay() === 0 || t.getDay() === 6) continue // no weekday
    if (holidays.some((h) => h[0] - 1 === month && h[1] === dayMonth)) continue // holiday
    total++ // increase total
    if (t.getDate() <= currentDay) done++ // increase past days
  }
  return { done, total }
}

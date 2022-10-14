/* eslint-disable camelcase */
export const objectToArrayWithId = (obj) => {
  const arr = []
  const arrWithComplaint = []
  for (const key in obj) {
    if (!arr.find((el) => el.tradedocid === obj[key].tradedocid)) {
      const newDateCreation = new Date(obj[key].date).toISOString().slice(0, 10)
      obj[key].date = newDateCreation
      if (obj[key].date_delivery !== null && obj[key].date_delivery !== undefined) {
        const newDateDelivery = new Date(obj[key].date_delivery).toISOString().slice(0, 10)
        obj[key].date_delivery = newDateDelivery
      } else {
        obj[key].date_delivery = '---'
      }
      if (
        obj[key].datestartingproduction !== null &&
        obj[key].datestartingproduction !== undefined
      ) {
        const newDateDelivery = new Date(obj[key].datestartingproduction).toISOString().slice(0, 10)
        obj[key].datestartingproduction = newDateDelivery
      } else {
        obj[key].datestartingproduction = '---'
      }
      if (obj[key].tradedocid.includes('R')) {
        arrWithComplaint.push({ ...obj[key], id: key })
      } else {
        arr.push({ ...obj[key], id: key })
      }
    }
  }

  return { orders: arr, complaints: arrWithComplaint }
}

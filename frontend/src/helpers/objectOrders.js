export const objectToArrayWithId = obj => {
    const arr = [];
    for (const key in obj) {
        const newDateCreation = new Date(obj[key].date).toISOString().slice(0, 10);
        obj[key].date = newDateCreation;
        if (obj[key].date_delivery !== null && obj[key].date_delivery !== undefined) {
            const newDateDelivery = new Date(obj[key].date_delivery).toISOString().slice(0, 10);
            obj[key].date_delivery = newDateDelivery;
        } else {
            obj[key].date_delivery = '---';
        }
        if (obj[key].datestartingproduction !== null && obj[key].datestartingproduction !== undefined) {
            const newDateDelivery = new Date(obj[key].datestartingproduction).toISOString().slice(0, 10);
            obj[key].datestartingproduction = newDateDelivery;
        } else {
            obj[key].datestartingproduction = '---';
        }

        arr.push({ ...obj[key], id: key });
    }

    return arr;
}

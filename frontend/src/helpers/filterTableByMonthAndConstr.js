export const filterTableByMonthAndConstr = (objFilter, filterArray, month) => {
    const arr = [];
    if (month === 'all') {
        for (const key in objFilter) {
            let countConstruction = filterArray.filter(x => x.construction.includes(objFilter[key].value)).length;
            let countUnits = filterArray.filter(x => x.construction.includes(objFilter[key].value))
                .map(x => Number(x.units)).reduce((a, b) => a + b, 0).toFixed(2)

            arr.push({ id: objFilter[key].id, name: objFilter[key].name, value: countConstruction, units: countUnits });
        }
    } else {
        for (const key in objFilter) {
            let countConstruction = filterArray.filter(x => (x.construction.includes(objFilter[key].value)) && new Date(x.eventtime).getMonth() === month).length;
            let countUnits = filterArray.filter(x => (x.construction.includes(objFilter[key].value)) && new Date(x.eventtime).getMonth() === month)
                .map(x => Number(x.units)).reduce((a, b) => a + b, 0).toFixed(2)
            arr.push({ id: objFilter[key].id, name: objFilter[key].name, value: countConstruction, units: countUnits });
        }
    }
    return arr;
}

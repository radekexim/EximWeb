export const sumValueInObject = (obj1) => {
    let sum = 0;
    for (const key in obj1) {
        sum += Number(obj1[key].sale);
    }
    return sum;
}

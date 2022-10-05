export const binaryToBase64 = (obj) => {
    const arr = [];
    for (const key in obj) {
        const base64data = btoa(String.fromCharCode(...new Uint8Array(obj[key].obrazek.data)));
        arr.push({ ...obj[key], obrazek: base64data });
    }
    return arr;
}

export function keyGenerator() {
    return btoa(Array.from(arguments).join(''));
}

export function keyFromObject(obj) {
    return btoa(Object.keys(obj).map((k) => obj[k]).join(''));
}
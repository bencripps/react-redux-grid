export function keyGenerator(...keywords) {
    return btoa(Array.from(keywords).join(''));
}

export function keyFromObject(obj, additionalStrings) {

    if (additionalStrings && Array.isArray(additionalStrings)) {
        return btoa(additionalStrings.join('') + Object.keys(obj).map((k) => obj[k]).join(''));
    }

    else {
        return btoa(Object.keys(obj).map((k) => obj[k]).join(''));
    }
}
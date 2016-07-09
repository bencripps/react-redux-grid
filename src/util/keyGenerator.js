export function keyGenerator(...keywords) {
    return btoa(Array.from(keywords).join(''));
}

export function keyFromObject(obj, additionalStrings) {

    const mergedObjectKeys = Object.keys(obj).map((k) => obj[k]).join('');

    if (additionalStrings && Array.isArray(additionalStrings)) {
        return btoa(additionalStrings.join('') + mergedObjectKeys);
    }

    return btoa(mergedObjectKeys);
}

export const keyGenerator = (...keywords) => encode(
    Array.from(keywords).join('')
);

export const keyFromObject = (obj, additionalStrings) => {

    if (additionalStrings && Array.isArray(additionalStrings)) {
        return encode(
            additionalStrings.join('') + Object.keys(obj)
                .map((k) => obj[k]).join('')
        );
    }

    return encode(Object.keys(obj).map((k) => obj[k]).join(''));
};

export const encode = s => btoa(unescape(encodeURIComponent(s)));

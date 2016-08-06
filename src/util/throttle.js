export function throttle(callback, scope, limit) {
    let wait = false;

    limit = limit || 100;

    return function dothrottle() {
        if (!wait) {
            callback.apply(scope, arguments);
            wait = true;
            setTimeout(() => {
                wait = false;
            }, limit);
        }
    };
}

export function debounce(func, wait, immediate) {
    let timeout;

    return function doDebounce() {
        const context = this;
        const args = arguments;

        const later = function later() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
}

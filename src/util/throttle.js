export function throttle(callback, scope, limit = 100, options = {}) {

    options = {
        leading: true,
        trailing: false,
        ...options
    };

    let wait = false;
    let skip = false;

    if (options.leading === false) {
        skip = true;
    }

    const later = debounce(function dodebounce() {
        if (options.trailing) {
            callback.apply(scope, arguments);
        }
        if (options.leading === false) {
            skip = true;
        }
    }, limit + limit * 0.15);

    return function dothrottle() {

        if (!wait && !skip) {
            callback.apply(scope, arguments);
            wait = true;
            setTimeout(() => {
                wait = false;
                if (later) {
                    later.apply(scope, arguments);
                }
            }, limit);
        }
        else if (!wait && skip) {
            wait = true;
            setTimeout(() => {
                skip = false;
                wait = false;
                if (later) {
                    later.apply(scope, arguments);
                }
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

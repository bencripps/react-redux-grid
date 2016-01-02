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
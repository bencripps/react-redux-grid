export function elementContains(el, cls) {

    if (!el || !cls) {
        throw Error('Function requires a dom node and a classname');
    }

    while (el && el !== document.body) {
        if (el && el.classList && el.classList.contains(cls)) {
            return true;
        }
        el = el.parentNode;
    }
}
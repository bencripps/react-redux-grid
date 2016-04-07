export function elementContains(el, ...classes) {

    if (!el || !classes || !classes.length) {
        throw Error('Function requires a dom node and a classname');
    }

    while (el && el !== document.body) {
        if (el && el.classList) {
            for (let i = 0; i < classes.length; i++) {
                if (el.classList.contains(classes[i])) {
                    return true;
                }
            }
        }
        el = el.parentNode;
    }
}
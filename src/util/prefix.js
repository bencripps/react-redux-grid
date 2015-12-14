import { CSS_PREFIX } from '../constants/GridConstants';

export function prefix() {
    return Array.from(arguments).map((cls) => {
        return `${CSS_PREFIX}-${cls}`;
    }).join(' ');
}
import { CSS_PREFIX } from '../constants/GameConstants';

export function prefix() {
    return Array.from(arguments).map((cls) => {
        return `${CSS_PREFIX}-${cls}`;
    }).join(' ');
}
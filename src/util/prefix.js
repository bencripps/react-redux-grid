import { CSS_PREFIX } from '../constants/GridConstants';

export function prefix() {
    return Array.from(arguments).map((cls) => {

        if (!cls) {
            return null;
        }

        return `${CSS_PREFIX}-${cls}`;
    }).join(' ');
}
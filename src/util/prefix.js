import { CSS_PREFIX } from '../constants/GridConstants';

export function prefix(...classes) {
    return Array.from(classes).map((cls) => {

        if (!cls || cls.length === 0) {
            return null;
        }

        return `${CSS_PREFIX}-${cls}`;
    }).filter((cls) => cls).join(' ');
}

import { gridConfig } from '../constants/GridConstants';

export const prefix = (...classes) => {

    const { CSS_PREFIX } = gridConfig();

    return Array.from(classes).map((cls) => {

        if (!cls || cls.length === 0) {
            return null;
        }

        return `${CSS_PREFIX}-${cls}`;
    }).filter(cls => cls).join(' ');
};

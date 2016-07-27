import { SORT_DIRECTIONS } from '../constants/GridConstants';

export class Sorter {
    constructor() {

    }

    sortBy(name, direction, datasource) {
        return datasource.data.sort((a, b) => {

            if (a[name] < b[name] && direction) {
                return direction === SORT_DIRECTIONS.ASCEND ? 1 : -1;
            }

            else if (a[name] > b[name]) {
                return direction === SORT_DIRECTIONS.ASCEND ? -1 : 1;
            }

        });
    }
}

export default new Sorter();

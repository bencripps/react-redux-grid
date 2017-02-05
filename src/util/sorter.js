import { SORT_DIRECTIONS } from '../constants/GridConstants';

export class Sorter {

    sortBy(name, direction, datasource) {
        return datasource.data.sort((a, b) => {

            if (a.get(name) < b.get(name) && direction) {
                return direction === SORT_DIRECTIONS.ASCEND ? 1 : -1;
            }

            else if (a.get(name) > b.get(name)) {
                return direction === SORT_DIRECTIONS.ASCEND ? -1 : 1;
            }
            return 0;
        });
    }
}

export default new Sorter();

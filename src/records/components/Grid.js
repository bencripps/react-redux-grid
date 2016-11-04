import {
    Record,
    List
} from 'immutable';

const Grid = Record({
    columns: List(),
    headerHidden: false,
    lastUpdate: 0
});

export default Grid;

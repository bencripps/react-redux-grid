import {
    Record, Map, List
} from 'immutable';

const Editor = Record({
    key: null,
    values: Map(),
    rowIndex: null,
    top: null,
    valid: null,
    invalidCells: List(),
    isCreate: null,
    overrides: Map(),
    previousValues: Map(),
    lastUpdate: 0
});

export default Editor;

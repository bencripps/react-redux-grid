import {
    Record, Map
} from 'immutable';

const Editor = Record({
    key: null,
    values: Map(),
    rowIndex: null,
    top: null,
    valid: null,
    isCreate: null,
    overrides: Map(),
    previousValues: Map(),
    lastUpdate: 0
});

export default Editor;

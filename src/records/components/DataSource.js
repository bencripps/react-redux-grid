import {
    Record,
    List,
    Map
} from 'immutable';

const DataSource = Record({
    data: List(),
    proxy: List(),
    total: 0,
    treeData: Map(),
    currentRecords: List(),
    isEditing: false,
    lastUpdate: 0
});

export default DataSource;

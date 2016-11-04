import {
    Record
} from 'immutable';

const BulkAction = Record({
    isRemoved: null,
    lastUpdate: 0
});

export default BulkAction;

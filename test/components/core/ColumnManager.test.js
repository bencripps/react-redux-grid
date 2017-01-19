import expect from 'expect';
import { OrderedMap } from 'immutable';

import { initializedStore, getColumnManager } from './../../testUtils';

import {
    gridColumns,
    localGridData,
    defaultColumnManager
} from './../../testUtils/data';

const props = {
    columnManager: defaultColumnManager,
    columns: gridColumns,
    store: initializedStore,
    data: localGridData,
    editorState: new OrderedMap()
};

describe('A ColumnManager', () => {
    /* eslint-disable no-unused-vars */
    const manager = getColumnManager(props);

    it('Should sort locally', () => {

        expect(initializedStore.dispatch).toExist();

    });

});

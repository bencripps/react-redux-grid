import expect from 'expect';
import store from './../../../../src/store/store';

import {
    isColumnResizable,
    handleSort,
    handleColumnClick
} from './../../../../src/components/layout/header/Column.jsx';

describe('The Column isColumnResizable func', () => {

    it('return resizable', () => {
        expect(
            isColumnResizable({ resizable: true}, null)
        ).toEqual(true);
    });

    it('return false even if col manager is true', () => {
        expect(isColumnResizable(
            { resizable: false }, { config: { defaultResizable: true }}
        )).toEqual(false);
    });

    it('return false even if col manager is true', () => {
        expect(isColumnResizable(
            { resizable: undefined }, { config: { defaultResizable: true }}
        )).toEqual(true);
    });

});

describe('The Column handleColumnClick func', () => {

    it('Should fire the HANDLE_CLICK event', () => {

        const columnManager = {
            config: {
                sortable: {
                    method: 'none'
                }
            },
            doSort: () => {}
        };

        const col = {
            id: 'some-id',
            HANDLE_CLICK: sinon.spy()
        };

        handleColumnClick({
            columns: [],
            col,
            columnManager,
            dataSource: () => {},
            direction: 'ASC',
            pager: {},
            stateKey: 'some-stateKey',
            store
        });

        expect(
            col.HANDLE_CLICK.called
        ).toEqual(true);

    });

});

describe('The Column handleSort func', () => {

    it('Should dispatch a sort but not call a sort method', () => {

        const colManager = {
            config: {
                sortable: {
                    method: 'none'
                }
            },
            doSort: sinon.spy()
        };

        handleSort(
            [],
            {
                id: 'col-id'
            },
            colManager,
            () => {},
            'ASC',
            {},
            25,
            {},
            'grid-state-thing',
            store
        );

        expect(colManager.doSort.called)
            .toEqual(false);
    });

    it('Should dispatch a sort and call a remote sort', () => {

        const colManager = {
            config: {
                sortable: {
                    method: 'remote'
                }
            },
            doSort: sinon.spy()
        };

        handleSort(
            [],
            {
                id: 'col-id'
            },
            colManager,
            () => {},
            'ASC',
            {},
            25,
            {},
            'grid-state-thing',
            store
        );

        expect(colManager.doSort.called)
            .toEqual(true);
    });

    it('Should dispatch a sort and call a local sort', () => {

        const colManager = {
            config: {
                sortable: {
                    method: 'local'
                }
            },
            doSort: sinon.spy()
        };

        handleSort(
            [],
            {
                id: 'col-id'
            },
            colManager,
            () => {},
            'ASC',
            {},
            25,
            {},
            'grid-state-thing',
            store
        );

        expect(colManager.doSort.called)
            .toEqual(true);
    });
});

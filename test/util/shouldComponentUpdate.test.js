import expect from 'expect';
import { OrderedMap, Map, fromJS } from 'immutable';

import store from './../../src/store/store';

import { Editor } from './../../src/records';

import {
    shouldGridUpdate,
    shouldRowUpdate,
    shouldPagerUpdate
} from './../../src/util/shouldComponentUpdate';

describe('shouldGridUpdate utility function', () => {

    const component = function component() { };

    component.props = {};

    component.context = {
        store
    };

    component.props.store = store;

    const nextProps = {
        classNames: ['blurg'],
        columns: [
            {
                name: 'col1',
                dataIndex: '1',
                width: '50%'
            },
            {
                name: 'col2',
                dataIndex: '2',
                width: '50%'
            }
        ],
        data: [],
        menuState: Map({
            'rowid!1': true
        })
    };

    it('return true if no previous state has been created', () => {
        expect(
            shouldGridUpdate.call(component, nextProps)
        ).toEqual(
            true
        );
    });

    it('return true if props have changed', () => {

        const alteredNextProps = {
            ...nextProps,
            classNames: ['food']
        };

        expect(
            shouldGridUpdate.call(component, alteredNextProps)
        ).toEqual(
            true
        );

    });

});

describe('shouldRowUpdate utility function', () => {

    const component = function component() { };

    const defaultProps = {
        editorState: Map(),
        menuState: Map(),
        selectedRows: Map(),
        columns: []
    };

    component.props = defaultProps;

    component.context = {
        store
    };

    const nextProps = {
        columns: [
            {
                name: 'col1',
                dataIndex: '1',
                width: '50%'
            },
            {
                name: 'col2',
                dataIndex: '2',
                width: '50%'
            }
        ],
        editorState: new OrderedMap(),
        menuState: fromJS({
            'cm93MA==': true
        }),
        row: fromJS({
            col1: 'hey',
            col2: 'jude'
        }),
        index: 0,
        selectedRows: fromJS({
            'cm93MA==': false
        })
    };

    it('return true if no previous state has been created', () => {
        expect(
            shouldRowUpdate.call(component, nextProps)
        ).toEqual(
            true
        );
    });

    it('return true if row gets selected', () => {

        const cmp = function Cmp() {};

        cmp.props = {
            ...defaultProps,
            row: fromJS({
                _key: 'key-1'
            }),
            selectedRows: fromJS({
                'key-1': false
            })
        };

        const selectedProps = {
            ...defaultProps,
            row: fromJS({
                _key: 'key-1'
            }),
            selectedRows: fromJS({
                'key-2': true
            })
        };

        expect(
            shouldRowUpdate.call(component, selectedProps)
        ).toEqual(
            true
        );
    });

    it('return true if menu gets selected', () => {

        const cmp = function Cmp() {};

        cmp.props = {
            ...defaultProps,
            row: fromJS({
                _key: 'key-1'
            }),
            menuState: fromJS({
                'key-1': false
            })
        };

        const selectedProps = {
            ...defaultProps,
            row: fromJS({
                _key: 'key-1'
            }),
            menuState: fromJS({
                'key-2': true
            })
        };

        expect(
            shouldRowUpdate.call(cmp, selectedProps)
        ).toEqual(
            true
        );
    });

    it('return false if menu stays selected', () => {

        const cmp = function Cmp() {};

        cmp.previousColumns = [];

        cmp.props = {
            ...defaultProps,
            row: fromJS({
                _key: 'key-1'
            }),
            menuState: fromJS({
                'key-1': true
            })
        };

        const menuStaySelected = {
            ...defaultProps,
            row: fromJS({
                _key: 'key-1'
            }),
            menuState: fromJS({
                'key-1': true
            })
        };

        expect(
            shouldRowUpdate.call(cmp, menuStaySelected)
        ).toEqual(
            false
        );
    });

    it('return true if editor values change', () => {

        const cmp = function Cmp() {};

        cmp.previousColumns = [];

        cmp.props = {
            ...defaultProps,
            index: 1,
            row: fromJS({
                _key: 'key-1'
            }),
            editorState: new OrderedMap({
                'key-1': new Editor({
                    key: 'key-1',
                    rowIndex: 1,
                    values: {
                        field: 'value2'
                    }
                })
            })
        };

        const editedValues = {
            ...defaultProps,
            index: 1,
            row: fromJS({
                _key: 'key-1'
            }),
            editorState: new OrderedMap({
                row: new Editor({
                    rowIndex: 1,
                    values: Map({
                        field: 'changed-value'
                    })
                })
            })
        };

        expect(
            shouldRowUpdate.call(cmp, editedValues)
        ).toEqual(
            true
        );
    });

    it('return true if columns change', () => {

        const cmp = function Cmp() {};

        cmp.previousColumns = [
            {
                width: '50%'
            },
            {
                width: '50%'
            }
        ];

        cmp.props = {
            ...defaultProps,
            row: fromJS({
                _key: 'key-1'
            })
        };

        const colProps = {
            ...defaultProps,
            row: fromJS({
                _key: 'key-1'
            }),
            columns: [
                {
                    width: '30%'
                },
                {
                    width: '70%'
                }
            ]
        };

        expect(
            shouldRowUpdate.call(cmp, colProps)
        ).toEqual(
            true
        );
    });

});

describe('shouldPagerUpdate utility function', () => {

    it('Should update pager when records changed', () => {

        const cmp = function Cmp() {};

        cmp.props = {
            gridData: [
                {},
                {}
            ]
        };

        const pagerProps = {
            gridData: [
                {},
                {},
                {}
            ]
        };

        expect(
            shouldPagerUpdate.call(cmp, pagerProps)
        ).toEqual(
            true
        );
    });

    it('Should not update pager when record dont change', () => {

        const cmp = function Cmp() {};

        cmp.props = {
            gridData: [
                {},
                {},
                {}
            ]
        };

        const pagerProps = {
            gridData: [
                {},
                {},
                {}
            ]
        };

        expect(
            shouldPagerUpdate.call(cmp, pagerProps)
        ).toEqual(
            false
        );
    });

});

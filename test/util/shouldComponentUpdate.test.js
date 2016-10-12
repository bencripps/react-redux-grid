import expect from 'expect';

import store from './../../src/store/store';
import {
    shouldGridUpdate,
    shouldRowUpdate,
    shouldPagerUpdate
} from './../../src/util/shouldComponentUpdate';

describe('shouldGridUpdate utility function', () => {

    const component = function component() { };

    component.props = {};

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
        menuState: {
            'rowid!1': true
        }
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
        editorState: {},
        menuState: {},
        selectedRows: {},
        columns: []
    };

    component.props = defaultProps;

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
        editorState: {},
        menuState: {
            'cm93MA==': true
        },
        row: {
            col1: 'hey',
            col2: 'jude'
        },
        index: 0,
        selectedRows: {
            'cm93MA==': false
        }
    };

    it('return true if no previous state has been created', () => {
        expect(
           shouldRowUpdate.call(component, nextProps)
        ).toEqual(
            true
        );
    });

    it('return true if row gets selected', () => {

        const cmp = function() {};

        cmp.props = {
            ...defaultProps,
            row: {
                _key: 'key-1'
            },
            selectedRows: {
                'key-1': false
            }
        };

        const selectedProps = {
            ...defaultProps,
            row: {
                _key: 'key-1'
            },
            selectedRows: {
                'key-2': true
            }
        };

        expect(
           shouldRowUpdate.call(component, selectedProps)
        ).toEqual(
            true
        );
    });

    it('return true if menu gets selected', () => {

        const cmp = function() {};

        cmp.props = {
            ...defaultProps,
            row: {
                _key: 'key-1'
            },
            menuState: {
                'key-1': false
            }
        };

        const selectedProps = {
            ...defaultProps,
            row: {
                _key: 'key-1'
            },
            menuState: {
                'key-2': true
            }
        };

        expect(
           shouldRowUpdate.call(cmp, selectedProps)
        ).toEqual(
            true
        );
    });

    it('return false if menu stays selected', () => {

        const cmp = function() {};

        cmp.previousColumns = [];

        cmp.props = {
            ...defaultProps,
            row: {
                _key: 'key-1'
            },
            menuState: {
                'key-1': true
            }
        };

        const menuStaySelected = {
            ...defaultProps,
            row: {
                _key: 'key-1'
            },
            menuState: {
                'key-1': true
            }
        };

        expect(
           shouldRowUpdate.call(cmp, menuStaySelected)
        ).toEqual(
            false
        );
    });

    it('return true if editor values change', () => {

        const cmp = function() {};

        cmp.previousColumns = [];

        cmp.props = {
            ...defaultProps,
            index: 1,
            row: {
                _key: 'key-1'
            },
            editorState: {
                'key-1': {
                    key: 'key-1',
                    rowIndex: 1,
                    values: {
                        field: 'value2'
                    }
                }
            }
        };

        const editedValues = {
            ...defaultProps,
            index: 1,
            row: {
                _key: 'key-1'
            },
            editorState: {
                row: {
                    rowIndex: 1,
                    values: {
                        field: 'changed-value'
                    }
                }
            }
        };

        expect(
           shouldRowUpdate.call(cmp, editedValues)
        ).toEqual(
            true
        );
    });

    it('return true if columns change', () => {

        const cmp = function() {};

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
            row: {
                _key: 'key-1'
            }
        };

        const colProps = {
            ...defaultProps,
            row: {
                _key: 'key-1'
            },
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

        const cmp = function() {};

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

        const cmp = function() {};

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

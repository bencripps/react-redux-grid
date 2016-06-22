import expect from 'expect';

import store from './../../src/store/store';
import {
    shouldGridUpdate,
    shouldRowUpdate
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

    it('return true props haven\'t been updated', () => {
        expect(
           shouldRowUpdate.call(component, nextProps)
        ).toEqual(
            false
        );
    });

    it('return true if menuState for this row changes', () => {

        const alteredNextProps = {
            ...nextProps,
            menuState: {
                'cm93MA==': false
            }
        };

        expect(
           shouldRowUpdate.call(component, alteredNextProps)
        ).toEqual(
            true
        );
    });

    it('return false if menuState for another row changes', () => {

        const alteredNextProps = {
            ...nextProps,
            menuState: {
                'cm93MA==': false,
                anotherRow: true
            }
        };

        expect(
           shouldRowUpdate.call(component, alteredNextProps)
        ).toEqual(
            false
        );
    });

    it('return true if this row becomes selected', () => {

        const alteredNextProps = {
            ...nextProps,
            menuState: {
                'cm93MA==': false,
                anotherRow: true
            },
            selectedRows: {
                'cm93MA==': true
            }
        };

        expect(
           shouldRowUpdate.call(component, alteredNextProps)
        ).toEqual(
            true
        );
    });

    it('return false if another row becomes selected', () => {

        const alteredNextProps = {
            ...nextProps,
            menuState: {
                'cm93MA==': false,
                anotherRow: true
            },
            selectedRows: {
                'cm93MA==': true,
                anotherRow: true
            }
        };

        expect(
           shouldRowUpdate.call(component, alteredNextProps)
        ).toEqual(
            false
        );
    });

    it('return false if another row starts being edited', () => {

        const alteredNextProps = {
            ...nextProps,
            menuState: {
                'cm93MA==': false,
                anotherRow: true
            },
            selectedRows: {
                'cm93MA==': true,
                anotherRow: true
            },
            editorState: {
                row: {
                    rowIndex: 1
                }
            }
        };

        expect(
           shouldRowUpdate.call(component, alteredNextProps)
        ).toEqual(
            false
        );
    });

    it('return true if another row starts being edited', () => {

        const alteredNextProps = {
            ...nextProps,
            menuState: {
                'cm93MA==': false,
                anotherRow: true
            },
            selectedRows: {
                'cm93MA==': true,
                anotherRow: true
            },
            editorState: {
                row: {
                    rowIndex: 0
                }
            }
        };

        expect(
           shouldRowUpdate.call(component, alteredNextProps)
        ).toEqual(
            true
        );
    });

});
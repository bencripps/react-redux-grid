import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';

import store from './../../../../../../src/store/store';
import {
    Input
} from './../../../../../../src/components/layout/table-row/row/cell/Input.jsx';

describe('The shallow cell default Input', () => {

    const props = {
        cellData: 'Michael Jordan',
        column: {
            dataIndex: 'name',
            name: 'Name',
            placeholder: 'Player Name'
        },
        columns: [
            {
                dataIndex: 'name',
                name: 'Name',
                placeholder: 'Player Name'
            },
            {
                dataIndex: 'position',
                name: 'Position'
            }
        ],
        editorState: {},
        rowId: 'cmu==1',
        stateKey: 'test-grid',
        store
    };

    const cmp = shallow(<Input { ...props } />);

    it('Should shallow render an input', () => {
        expect(cmp.type()).toEqual('input');
    });

    it('Should render valid input html', () => {
        expect(cmp.html())
            .toEqual([
                '<input type="text" value="Michael Jordan"',
                ' placeholder="Player Name"/>'
            ].join(''));
    });

    it('Should render a disabled input when col is marked as onCreate', () => {

        const disabledProps = {
            cellData: 'Michael Jordan',
            column: {
                dataIndex: 'name',
                name: 'Name',
                placeholder: 'Player Name',
                editable: 'create'
            },
            columns: [
                {
                    dataIndex: 'name',
                    name: 'Name',
                    placeholder: 'Player Name'
                },
                {
                    dataIndex: 'position',
                    name: 'Position'
                }
            ],
            editorState: {
                row: {
                    isCreate: false
                }
            },
            rowId: 'cmu==1',
            stateKey: 'test-grid',
            store
        };

        const disabled = shallow(<Input { ...disabledProps } />);

        expect(disabled.props().disabled)
            .toEqual(true);

    });

    it('Should render a editable input when col is marked !onCreate', () => {

        const enabledProps = {
            cellData: 'Michael Jordan',
            column: {
                dataIndex: 'name',
                name: 'Name',
                placeholder: 'Player Name',
                editable: true
            },
            columns: [
                {
                    dataIndex: 'name',
                    name: 'Name',
                    placeholder: 'Player Name'
                },
                {
                    dataIndex: 'position',
                    name: 'Position'
                }
            ],
            editorState: {
                row: {
                    isCreate: false
                }
            },
            rowId: 'cmu==1',
            stateKey: 'test-grid',
            store
        };

        const enabled = shallow(<Input { ...enabledProps } />);

        expect(enabled.props().disabled)
            .toEqual(false);

    });

    it('Should render a disabled input when override is present', () => {

        const enabledProps = {
            cellData: 'Michael Jordan',
            column: {
                dataIndex: 'name',
                name: 'Name',
                placeholder: 'Player Name',
                editable: true
            },
            columns: [
                {
                    dataIndex: 'name',
                    name: 'Name',
                    placeholder: 'Player Name'
                },
                {
                    dataIndex: 'position',
                    name: 'Position'
                }
            ],
            editorState: {
                row: {
                    isCreate: false,
                    values: {
                        name: 'Another Name'
                    },
                    overrides: {
                        name: {
                            disabled: true
                        }
                    }
                }
            },
            rowId: 'cmu==1',
            stateKey: 'test-grid',
            store
        };

        const enabled = shallow(<Input { ...enabledProps } />);

        expect(enabled.props().disabled)
            .toEqual(true);

    });

});

describe('The mounted cell Input ', () => {

    const props = {
        cellData: 'Michael Jordan',
        column: {
            dataIndex: 'name',
            name: 'Name',
            placeholder: 'Player Name'
        },
        columns: [
            {
                dataIndex: 'name',
                name: 'Name',
                placeholder: 'Player Name'
            },
            {
                dataIndex: 'position',
                name: 'Position'
            }
        ],
        editorState: {},
        rowId: 'cmu==1',
        stateKey: 'test-grid',
        store
    };

    it('Should update the editor state on change', (done) => {

        const cmp = mount(<Input { ...props } />);

        cmp.simulate('change', { target: { value: 'Alonzo Morning' } });

        setTimeout(() => {
            const editorState = cmp.props().store.getState().editor.toJS();

            expect(editorState['test-grid'].row.values.name)
                .toEqual('Alonzo Morning');

            done();
        }, 100);
    });

});

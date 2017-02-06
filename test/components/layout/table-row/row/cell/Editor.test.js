import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { OrderedMap, fromJS, Map } from 'immutable';

import { testState } from './../../../../../testUtils';
import store from './../../../../../../src/store/store';
import { Editor as EditorRecord } from './../../../../../../src/records';
import {
    Editor,
    cleanProps
} from './../../../../../../src/components/layout/table-row/row/cell/Editor.jsx'; // eslint-disable-line max-len

describe('The Editor Component', () => {

    const props = {
        cellData: 'Michael Jordan',
        columns: [
            {
                dataIndex: 'name'
            },
            {
                dataIndex: 'position'
            }
        ],
        editorState: new OrderedMap(),
        rawValue: 'Michael Jordan',
        index: 0,
        isEditable: false,
        row: fromJS({
            name: 'Michael Jordan',
            position: 'Shooting Guard'
        }),
        isRowSelected: false,
        rowId: 'row-0',
        stateKey: 'editor-tests',
        store
    };

    it('Should return an uneditable field', () => {
        const cmp = mount(<Editor { ...props } />);

        expect(cmp.html())
            .toEqual('<span class="react-grid-inactive">Michael Jordan</span>');
    });

    it('Should clean props from an object', () => {

        expect(cleanProps({
            thing1: true,
            thing2: undefined
        })).toEqual({
            thing1: true
        });

    });

    it('Should return a custom editor', () => {
        const customProps = {
            ...props,
            columns: [
                {
                    dataIndex: 'name',
                    editable: true,
                    editor: () => {
                        return <input type="checkbox" />;
                    }
                },
                {
                    dataIndex: 'position'
                }
            ],
            editorState: Map(),
            isEditable: true
        };

        const cmp = mount(<Editor { ...customProps } />);

        expect(cmp.find('input').length)
            .toEqual(1);

        expect(cmp.find('input').props().type)
            .toEqual(
                'checkbox',
                'Custom render should have created a checkbox'
            );
    });

    it('Should return a custom editor with correct arguments', () => {
        const editorSpy = sinon.spy();

        const editedProps = {
            ...props,
            columns: [
                {
                    dataIndex: 'name',
                    editable: true,
                    editor: editorSpy
                },
                {
                    dataIndex: 'position'
                }
            ],
            editorState: new testState({
                ['row-0']: new EditorRecord({
                    key: 'row-0',
                    values: Map({
                        name: 'Updated Michael',
                        position: 'Shooting G'
                    }),
                    rowIndex: 0,
                    top: 40,
                    valid: true,
                    isCreate: false,
                    overrides: Map(),
                    previousValues: Map({
                        name: 'Michael Jordan',
                        position: 'Shooting Guard'
                    }),
                    lastUpdate: 1
                })
            }),
            isEditable: true
        };

        /* eslint-disable no-unused-vars */
        const cmp = mount(<Editor { ...editedProps } />);
        /* eslint-enable no-unused-vars */
        const [[{ row, rowId, value }]] = editorSpy.args;

        expect(row.name).toEqual('Updated Michael');
        expect(row.position).toEqual('Shooting G');
        expect(rowId).toEqual('row-0');
        expect(value).toEqual('Updated Michael');
    });
});

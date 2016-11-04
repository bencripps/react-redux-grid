import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { OrderedMap, fromJS, Map } from 'immutable';

import store from './../../../../../../src/store/store';
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

});

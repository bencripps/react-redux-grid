import React from 'react';
import { fromJS } from 'immutable';
import expect from 'expect';
import { shallow, mount } from 'enzyme';

import { getSelModel } from './../../../../testUtils/';
import store from './../../../../../src/store/store';
import {
    Cell
} from './../../../../../src/components/layout/table-row/row/Cell.jsx';

describe('The Grid Cell Component', () => {

    const props = {
        cellData: 'Tommy Lee Jones',
        columns: [
            {
                name: 'Name',
                dataIndex: 'name'
            },
            {
                name: 'Position',
                dataIndex: 'position'
            }
        ],
        editor: {
            config: {
                type: 'inline',
                enabled: true
            },
            editModes: {
                inline: 'inline'
            }
        },
        editorState: {},
        events: {},
        index: 0,
        rowData: {
            name: 'Tommy Lee Jones',
            position: 'actor'
        },
        rowIndex: 3,
        rowId: 'some-id',
        stateKey: 'test-grid',
        selectionModel: getSelModel(),
        store
    };

    it('Should render a cell', () => {

        const component = shallow(<Cell { ...props } />);

        expect(component.html())
            .toEqual(
                '<td class="react-grid-cell"><span>Tommy Lee Jones</span></td>'
            );

        expect(component.find('input').node)
            .toBeFalsy();

    });

    it('Should render an editable cell', () => {

        const editableProps = {
            ...props,
            editorState: {
                row: {
                    key: 'some-id'
                }
            }
        };

        const component = mount(<Cell { ...editableProps } />);

        expect(component.find('input').node)
            .toBeTruthy();

    });

    it('Should render a hidden cell', () => {

        const editableProps = {
            ...props,
            columns: [
                {
                    name: 'Name',
                    dataIndex: 'name',
                    hidden: true
                },
                {
                    name: 'Position',
                    dataIndex: 'position'
                }
            ]
        };

        const component = mount(<Cell { ...editableProps } />);

        expect(component.html())
            .toContain('display: none;');
    });

    it('Should fire single click events', () => {

        const clickable = {
            ...props,
            events: {
                HANDLE_CELL_CLICK: sinon.spy()
            }
        };

        const component = mount(<Cell { ...clickable } />);

        component.simulate('click');

        expect(
            clickable.events.HANDLE_CELL_CLICK.called
        ).toEqual(true);
    });

    it('Should fire edit event on single click', () => {

        const modifiedSelModel = getSelModel();

        modifiedSelModel.defaults.editEvent = 'singleclick';

        const editEvenProps = {
            ...props,
            events: {},
            editorState: {
                lastUpdate: 1
            },
            selectionModel: modifiedSelModel
        };

        const component = mount(<Cell { ...editEvenProps } />);

        const beforEditState = editEvenProps
            .store
            .getState()
            .editor.getIn('test-grid');

        expect(beforEditState)
            .toEqual(undefined);

        component.simulate('click', {
            target: {
                offsetTop: 11,
                clientHeight: 20
            }
        });

        const afterEditState = editEvenProps
            .store
            .getState()
            .editor.getIn(['test-grid', 'row', 'values']);

        expect(afterEditState)
            .toEqual(fromJS({
                name: 'Tommy Lee Jones',
                position: 'actor'
            }));

    });

    it('Should fire edit event on dbl click', () => {

        const modifiedSelModel = getSelModel();

        modifiedSelModel.defaults.editEvent = 'doubleclick';

        const editEvenProps = {
            ...props,
            events: {},
            editorState: {},
            stateKey: 'dbl-click-grid',
            selectionModel: modifiedSelModel
        };

        const component = mount(<Cell { ...editEvenProps } />);

        const beforEditState = editEvenProps
            .store
            .getState()
            .editor.getIn('dbl-click-grid');

        expect(beforEditState)
            .toEqual(undefined);

        component.simulate('dblclick', {
            target: {
                offsetTop: 11,
                clientHeight: 20
            }
        });

        const afterEditState = editEvenProps
            .store
            .getState()
            .editor.getIn(['dbl-click-grid', 'row', 'values']);

        expect(afterEditState)
            .toEqual(fromJS({
                name: 'Tommy Lee Jones',
                position: 'actor'
            }));

    });

});

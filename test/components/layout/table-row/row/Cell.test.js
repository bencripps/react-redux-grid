import React from 'react';
import { fromJS, OrderedMap } from 'immutable';
import expect from 'expect';

import { getSelModel } from './../../../../testUtils/';
import { Editor } from './../../../../../src/records';

import {
    initializedStore,
    mountWithContext,
    shallowWithContext
} from './../../../../testUtils';

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
        editorState: new OrderedMap(),
        events: {},
        index: 0,
        row: {
            name: 'Tommy Lee Jones',
            position: 'actor'
        },
        rowIndex: 3,
        rowId: 'some-id',
        stateKey: 'test-grid',
        selectionModel: getSelModel(),
        store: initializedStore
    };

    it('Should render a cell', () => {

        const component = shallowWithContext(<Cell { ...props } />);

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
            editorState: new OrderedMap({
                ['some-id']: new Editor({
                    key: 'some-id'
                })
            })
        };

        const component = mountWithContext(<Cell { ...editableProps } />);

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

        const component = mountWithContext(<Cell { ...editableProps } />);

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

        const component = mountWithContext(<Cell { ...clickable } />);

        component.simulate('click');

        expect(
            clickable.events.HANDLE_CELL_CLICK.called
        ).toEqual(true);
    });

    it('Should fire edit event on single click', () => {

        const modifiedSelModel = getSelModel();

        modifiedSelModel.defaults.editEvent = 'singleclick';

        const editEventProps = {
            ...props,
            events: {},
            editorState: new OrderedMap({
                lastUpdate: 1
            }),
            selectionModel: modifiedSelModel
        };

        const component = mountWithContext(<Cell { ...editEventProps } />);

        const beforEditState = editEventProps
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

        const afterEditState = editEventProps
            .store
            .getState()
            .editor.getIn(['test-grid', 'some-id', 'values']);

        expect(afterEditState)
            .toEqual(fromJS({
                name: 'Tommy Lee Jones',
                position: 'actor'
            }));

    });

    it('Should fire stopPropagation if cell is in edit mode on click', () => {

        const noEventProps = {
            ...props,
            editorState: new OrderedMap({
                row: new Editor({
                    key: 'some-id'
                })
            })
        };

        const component = mountWithContext(<Cell { ...noEventProps } />);

        component.node.classList = {};
        component.node.classList.contains = () => { return true; };

        const spy = sinon.spy();

        expect(spy.called)
            .toEqual(false);

        component.simulate('click', {
            target: component.node,
            stopPropagation: spy
        });

        expect(
            spy.called
        ).toEqual(true);

    });

    it(['Should fire stopPropagation if cell',
        'is in edit mode on dbl click'].join(' '), () => {

        const noEventProps = {
            ...props,
            editorState: new OrderedMap({
                row: new Editor({
                    key: 'some-id'
                })
            })
        };

        const component = mountWithContext(<Cell { ...noEventProps } />);

        component.node.classList = {};
        component.node.classList.contains = () => { return true; };

        const spy = sinon.spy();

        expect(spy.called)
            .toEqual(false);

        component.simulate('dblclick', {
            target: component.node,
            stopPropagation: spy
        });

        expect(
            spy.called
        ).toEqual(true);

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

        const component = mountWithContext(<Cell { ...editEvenProps } />);

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
            .editor.getIn(['dbl-click-grid', 'some-id', 'values']);

        expect(afterEditState)
            .toEqual(fromJS({
                name: 'Tommy Lee Jones',
                position: 'actor'
            }));

    });

});

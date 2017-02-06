import expect from 'expect';
import React from 'react';
import { fromJS, Map } from 'immutable';

import ActionColumn, {
    addKeysToActions,
    enableActions
} from './../../../../src/components/plugins/gridactions/ActionColumn.jsx';

import {
    initializedStore,
    mountWithContext
} from './../../../testUtils';

describe('The GridAction component', () => {

    const props = {
        actions: {
            menu: [
                {
                    text: 'Move',
                    EVENT_HANDLER: sinon.spy()
                },
                {
                    text: 'Delete',
                    EVENT_HANDLER: sinon.spy()
                }
            ]
        },
        columns: [
            {
                name: 'Player',
                dataIndex: 'player'
            },
            {
                name: 'Position',
                dataIndex: 'position'
            }
        ],
        editor: {},
        iconCls: '',
        menuState: Map(),
        rowId: 'rowId',
        rowData: fromJS({
            player: 'Michael Jordan',
            position: 'Shooting Guard'
        }),
        store: initializedStore,
        stateKey: 'test-grid',
        type: 'header',
        rowIndex: 0,
        reducerKeys: {}
    };

    it('Should render an action column', () => {

        const component = mountWithContext(<ActionColumn { ...props } />);

        expect(
            component.html()
        ).toEqual([
            '<th class="react-grid-action-container">',
            '<span class=""></span></th>'
        ].join(''));

    });

    it('Should fire show event on click', () => {

        const component = mountWithContext(<ActionColumn { ...props } />);

        component.simulate('click');

        expect(
            initializedStore.getState().menu.getIn(['test-grid', 'rowId'])
        ).toEqual(true);

    });

    it('Should no action column', () => {

        const noProps = {
            ...props,
            type: 'column',
            actions: {
                menu: []
            }
        };

        const component = mountWithContext(<ActionColumn { ...noProps } />);

        expect(
            component.html()
        ).toEqual([
            '<td class="react-grid-action-container">',
            '<span class=" react-grid-no-actions"></span></td>'
        ].join(''));

    });

    it('Should use the headerActionItemBuilder column', () => {

        const builderProps = {
            ...props,
            menuShown: true,
            headerActionItemBuilder: sinon.spy()
        };

        mountWithContext(<ActionColumn { ...builderProps } />);

        expect(
            builderProps.headerActionItemBuilder.callCount
        ).toEqual(2);

    });

});

describe('The addKeysToActions GridAction util function', () => {

    it('Should leave actions with keys alone', () => {

        expect(addKeysToActions({
            key: 'banana',
            EVENT_HANDLER: () => {}
        })).toEqual({
            key: 'banana',
            EVENT_HANDLER: () => {}
        });

    });

    it('Should add a key to actions without keys', () => {

        expect(addKeysToActions({
            EVENT_HANDLER: () => {}
        })).toEqual({
            key: 'ZnVuY3Rpb24gRVZFTlRfSEFORExFUigpIHt9',
            EVENT_HANDLER: () => {}
        });

    });

});

describe('The enableActions GridAction util function', () => {

    it('Should enable a disabled action', () => {

        expect(enableActions(
            true,
            {
                menu: [
                    {
                        disabled: true
                    }
                ]
            },
            [],
            {}
        )).toEqual({
            menu: [
                {
                    disabled: false
                }
            ]
        });

    });

    it('Should disable an action with a custom func action', () => {

        expect(enableActions(
            true,
            {
                menu: [
                    {
                        key: 'name',
                        disabled: false
                    },
                    {
                        key: 'position',
                        disabled: false
                    }
                ],
                onMenuShow: () => {
                    return ['position'];
                }
            },
            [],
            {}
        ).menu).toEqual([
            { disabled: false, key: 'name' },
            { disabled: true, key: 'position' }
        ]);

    });

    it('Should leave actions enabled if custom func is faulty', () => {

        expect(enableActions(
            true,
            {
                menu: [
                    {
                        key: 'name',
                        disabled: false
                    },
                    {
                        key: 'position',
                        disabled: false
                    }
                ],
                onMenuShow: () => {
                    return false;
                }
            },
            [],
            {}
        ).menu).toEqual([
            { disabled: false, key: 'name' },
            { disabled: false, key: 'position' }
        ]);

    });

});


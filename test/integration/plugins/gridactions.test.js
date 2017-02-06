/* eslint-enable describe it sinon */
import React from 'react';
import expect from 'expect';
import Grid from './../../../src/components/Grid.jsx';

import {
    gridColumns,
    localGridData,
    stateKey
} from '../../testUtils/data';

import { mountWithContext } from '../../testUtils';

const props = {
    data: localGridData,
    columns: gridColumns,
    stateKey,
    plugins: {}
};

describe('Integration Test for Grid Actions', () => {

    const simpleProps = {
        ...props,
        stateKey: 'grid-action-statekey',
        plugins: {
            GRID_ACTIONS: {
                menu: [
                    {
                        text: 'Action 1',
                        key: 'action1',
                        EVENT_HANDLER: sinon.spy()
                    },
                    {
                        text: 'Action 2',
                        key: 'action2',
                        EVENT_HANDLER: sinon.spy()
                    }
                ]
            }
        }
    };

    const component = mountWithContext(<Grid { ...simpleProps } />);

    it('Should render with the correct number of rows', () => {
        expect(
            component.find('.react-grid-row').length
        ).toEqual(2);
    });

    it('Should render each row with action icons', () => {
        // each row has an icon,
        // + the hidden header, + the fixed (visible) header
        expect(
            component.find('.react-grid-action-icon').length
        ).toEqual(4);
    });

    it('Should render each row with action icons', () => {
        const rows = component.find('.react-grid-row');
        const row1 = rows.first();

        expect(
            row1.find('.react-grid-action-icon').length
        ).toEqual(1);

    });

    const row = component.find('.react-grid-row');
    const icon = row.first()
        .find('.react-grid-action-icon');

    it('When clicked, the action icon should show a menu', (done) => {
        icon.simulate('click');

        setTimeout(() => {
            expect(
                row.find('.react-grid-action-container')
                    .first()
                    .props()
                    .className
            ).toContain('react-grid-action-menu-selected');
            done();
        }, 1000);

    });

    it('When clicked, the menu should reposition to above row', (done) => {
        const dataProps = {
            ...props,
            height: 400,
            plugins: {
                GRID_ACTIONS: {
                    menu: [
                        {
                            text: 'Action 1',
                            key: 'action1',
                            EVENT_HANDLER: sinon.spy()
                        },
                        {
                            text: 'Action 2',
                            key: 'action2',
                            EVENT_HANDLER: sinon.spy()
                        }
                    ]
                }
            },
            data: [
                {
                    name: 'Michael Jordan',
                    position: 'Shooting Guard'
                },
                {
                    name: 'Charles Barkley',
                    position: 'Power Forward'
                },
                {
                    name: 'Michael Jordan 1',
                    position: 'Shooting Guard 1'
                },
                {
                    name: 'Charles Barkley 1',
                    position: 'Power Forward 1'
                },
                {
                    name: 'Michael Jordan',
                    position: 'Shooting Guard'
                },
                {
                    name: 'Charles Barkley',
                    position: 'Power Forward'
                },
                {
                    name: 'Michael Jordan 1',
                    position: 'Shooting Guard 1'
                },
                {
                    name: 'Charles Barkley 1',
                    position: 'Power Forward 1'
                },
                {
                    name: 'Michael Jordan',
                    position: 'Shooting Guard'
                },
                {
                    name: 'Charles Barkley',
                    position: 'Power Forward'
                },
                {
                    name: 'Michael Jordan 1',
                    position: 'Shooting Guard 1'
                },
                {
                    name: 'Charles Barkley 1',
                    position: 'Power Forward 1'
                },
                {
                    name: 'Michael Jordan',
                    position: 'Shooting Guard'
                },
                {
                    name: 'Charles Barkley',
                    position: 'Power Forward'
                },
                {
                    name: 'Michael Jordan 1',
                    position: 'Shooting Guard 1'
                },
                {
                    name: 'Charles Barkley 1',
                    position: 'Power Forward 1'
                }
            ],
            stateKey: 'big-data-set'
        };

        const cmpWithData = mountWithContext(<Grid { ...dataProps } />, {
            attachTo: document.body
        });

        const lastIcon = cmpWithData.find('.react-grid-row')
            .at(13)
            .find('.react-grid-action-icon');

        lastIcon.simulate('click');

        setTimeout(() => {
            // const parent = lastIcon.parent();
            // to-do
            // expect(
            //     parent.html()
            // ).toContain('react-grid-top');

            done();
        }, 200);
    });
});

/* eslint-enable describe it sinon */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { ConnectedGrid } from './../../../src/components/Grid.jsx';
import { Store as GridStore } from './../../../src/store/store';

import {
    gridColumns,
    localGridData,
    stateKey
} from '../../testUtils/data';

const props = {
    data: localGridData,
    columns: gridColumns,
    stateKey,
    plugins: {}
};

describe('Integration Test for Grid Actions', () => {

    const simpleProps = {
        ...props,
        store: GridStore,
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

    const component = mount(<ConnectedGrid { ...simpleProps } />, {
        attachTo: document.body
    });

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
        }, 200);

    });
});

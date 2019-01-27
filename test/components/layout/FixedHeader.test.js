import expect from 'expect';
import React from 'react';
import FixedHeader from './../../../src/components/layout/FixedHeader.jsx';

import {
    getColumnManager,
    getSelModel,
    initializedStore,
    mountWithContext
} from './../../testUtils/index';

const props = {
    columns: [
        {
            name: 'Player',
            dataIndex: 'name'
        },
        {
            name: 'Position',
            dataIndex: 'position'
        }
    ],
    columnManager: getColumnManager(),
    dataSource: [
        {
            name: 'Michael Jordan',
            position: 'Shooting Guard'
        },
        {
            name: 'Scottie Pippen',
            position: 'Power Forward'
        }
    ],
    reducerKeys: {},
    selectionModel: getSelModel(),
    stateKey: 'test-grid',
    store: initializedStore,
    pager: {},
    plugins: {},
    menuState: {}
};

describe('The Grid Fixed header component', () => {

    it('Should render the correct number of TH (including action col)', () => {

        const component = mountWithContext(<FixedHeader { ...props } />);

        expect(
            component.find('th').length
        ).toEqual(3);

    });

    it('Should render a header with a default sort direction', () => {

        const defaultSortDirection = {
            ...props,
            columns: [
                {
                    name: 'Player',
                    dataIndex: 'name',
                    defaultSortDirection: 'DESC'
                },
                {
                    name: 'Position',
                    dataIndex: 'position'
                }
            ]
        };

        const component = mountWithContext(
            <FixedHeader { ...defaultSortDirection } />
        );

        expect(
            component.find('th').first().props().className
        ).toContain('react-grid-sort-handle-visible');

    });

    it('Should render a header with a sort handle after sort is set', () => {

        const sortDirection = {
            ...props,
            columns: [
                {
                    name: 'Player',
                    dataIndex: 'name',
                    sortDirection: 'ASC'
                },
                {
                    name: 'Position',
                    dataIndex: 'position'
                }
            ]
        };

        const component = mountWithContext(
            <FixedHeader { ...sortDirection } />
        );

        expect(
            component.find('th').first().props().className
        ).toContain('react-grid-sort-handle-visible');
    });

    it('Shouldnt render a hidden header', () => {

        const hiddenProps = {
            ...props,
            columns: [
                {
                    name: 'Player',
                    dataIndex: 'name',
                    hidden: true
                },
                {
                    name: 'Position',
                    dataIndex: 'position'
                }
            ]
        };

        const component = mountWithContext(<FixedHeader { ...hiddenProps } />);

        expect(
            component.find('th').length
        ).toEqual(2);

    });

    it('Should be able to pass classes as state', () => {

        const component = mountWithContext(<FixedHeader { ...props } />);

        component.setState({ classes: ['custom', 'classes'] });

        expect(
            component.find('table').props().className
        ).toEqual(
            'react-grid-table react-grid-header-fixed custom classes'
        );

    });

    it('Should trigger a valid drag event to resize cols', () => {

        const modifiedColManager = getColumnManager();
        modifiedColManager.config.resizable = true;

        const draggableProps = {
            ...props,
            columns: [
                {
                    name: 'Player',
                    id: 'UGxheWVyZ3JpZC1jb2x1bW4=',
                    dataIndex: 'name'
                },
                {
                    name: 'Position',
                    dataIndex: 'position',
                    id: 'UG9zaXRpb25ncmlkLWNvbHVtbg=='
                }
            ],
            columnManager: modifiedColManager
        };

        const container = document.createElement('div');
        document.body.appendChild(container);
        container.style.width = '500px';

        const component = mountWithContext(
            <FixedHeader { ...draggableProps } />,
            { attachTo: container}
        );

        component
            .find('.react-grid-drag-handle')
            .first()
            .simulate('drag', {
                clientX: 100
            });

        expect(
            initializedStore
                .getState()
                .grid
                .getIn(['test-grid', 'columns'])[0].width
        ).toContain('%');

    });

    it('Should not call getScrollWidth when already unmounted', (done) => {

        const component = mountWithContext(<FixedHeader { ...props } />);
        const instance = component.instance();
        const getScrollWidth =
            expect
                .spyOn(instance, 'getScrollWidth')
                .andCallThrough();

        instance.componentDidUpdate();
        component.unmount();

        setTimeout(() => {

            expect(
                getScrollWidth
            ).toNotHaveBeenCalled();

            getScrollWidth.restore();

            done();

        }, 500);
    });

});

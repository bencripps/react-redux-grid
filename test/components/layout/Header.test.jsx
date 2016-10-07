import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import Header from './../../../src/components/layout/Header.jsx';

import store from './../../../src/store/store';

import {
    getColumnManager, getSelModel
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
    store,
    pager: {},
    plugins: {},
    menuState: {}
};

describe('The Grid Header component', () => {
    it('Should render the correct number of TH', () => {

        const component = mount(<Header { ...props } />);

        expect(
            component.find('th').length
        ).toEqual(2);

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

        const component = mount(<Header { ...hiddenProps } />);

        expect(
            component.find('th').length
        ).toEqual(1);

    });

    it('Should render a default sort as descending', () => {

        const hiddenProps = {
            ...props,
            columns: [
                {
                    name: 'Player',
                    dataIndex: 'name',
                    sortable: true,
                    defaultSortDirection: 'DESC'
                },
                {
                    name: 'Position',
                    dataIndex: 'position'
                }
            ]
        };

        const component = mount(<Header { ...hiddenProps } />);

        expect(
            component.find('.react-grid-sort-handle-visible').length
        ).toEqual(1);

        expect(
            component.find('.react-grid-desc').length
        ).toEqual(1);
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

        const component = mount(<Header { ...draggableProps } />, {
            attachTo: container
        });

        component
            .find('.react-grid-drag-handle')
            .first()
            .simulate('drag', {
                clientX: 100
            });

        expect(
            store
                .getState()
                .grid
                .getIn(['test-grid', 'columns'])
                .first()
                .get('width')
        ).toContain('%');

    });
});

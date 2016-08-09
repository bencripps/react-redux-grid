import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import FixedHeader from './../../../src/components/layout/FixedHeader.jsx';

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

describe('The Grid Fixed header component', () => {

    it('Should render the correct number of TH (including action col)', () => {

        const component = mount(<FixedHeader { ...props } />);

        expect(
            component.find('th').length
        ).toEqual(3);

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

        const component = mount(<FixedHeader { ...hiddenProps } />);

        expect(
            component.find('th').length
        ).toEqual(2);

    });

    it('Should be able to pass classes as state', () => {

        const component = mount(<FixedHeader { ...props } />);

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

        const component = mount(<FixedHeader { ...draggableProps } />, {
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

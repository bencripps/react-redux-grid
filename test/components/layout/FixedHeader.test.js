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

});

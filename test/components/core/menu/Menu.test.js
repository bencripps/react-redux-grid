import expect from 'expect';
import React from 'react';
import { Menu } from './../../../../src/components/core/menu/Menu.jsx';
import { store, shallowWithContext } from './../../../testUtils/index';

const props = {
    store,
    menu: [
        {
            text: 'add',
            key: 'add'
        },
        {
            text: 'delete',
            key: 'delete'
        }
    ]
};

describe('A rendered Menu', () => {

    const component = shallowWithContext(<Menu { ...props } />);

    it('Should be a UL HTML Node', () => {
        expect(component.type()).toEqual('ul');
    });

    it('Should have children', () => {
        expect(component.props().children).toBeTruthy();
    });

    it('Should have the correct class name', () => {
        expect(
            component.props().className
        ).toEqual('react-grid-action-menu-container');
    });

});

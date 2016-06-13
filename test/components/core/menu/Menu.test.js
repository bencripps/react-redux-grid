import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Menu } from './../../../../src/components/core/menu/Menu.jsx';
import { mockStore } from './../../../testUtils/index';

const store = mockStore();

store.subscribe = () => {};

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

function menu(cmpProps) {
    const element = React.createElement(Menu, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('A rendered Menu', () => {

    const component = menu(props);

    it('Should be a UL HTML Node', () => {
        expect(component.type).toEqual('ul');
    });

    it('Should have children', () => {
        expect(component.props.children).toBeTruthy();
    });

    it('Should have the correct class name', () => {
        expect(
            component.props.className
        ).toEqual('react-grid-action-menu-container');
    });

});

describe('A Menu\'s child elements', () => {

    const component = menu(props);

    it('Should have 2 children', () => {
        expect(component.props.children.length).toEqual(2);
    });

    it('Should have the correct first child', () => {
        expect(
            component.props.children[0].key
        ).toEqual('YWRkYWRk');
        expect(
            component.props.children[0].ref
        ).toBeFalsy();
        expect(
            component.props.children[0].props.data
        ).toBeTruthy();
        expect(
            component.props.children[0].props.data.text
        ).toEqual(props.menu[0].text);
    });
});

import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { MenuItem } from './../../../../src/components/core/menu/MenuItem.jsx';
import { mockStore } from './../../../testUtils/index';

const store = mockStore();

store.subscribe = () => {};

const props = {
    data: {
        text: 'add',
        dismissOnClick: false,
        EVENT_HANDLER: () => {
            return 'Menu Item Clicked';
        }
    },
    store
};

function menuitem(cmpProps) {
    const element = React.createElement(MenuItem, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('A rendered Menu Item', () => {
    const component = menuitem(props);

    expect(component.type).toEqual('li');
    expect(component.key).toBeFalsy();
});

describe('Menu Item Children', () => {
    const component = menuitem(props);
    expect(component.props.className).toEqual('react-grid-action-menu-item');
    expect(component.props.children.length).toEqual(2);
});

describe('Menu Item Click Handler', () => {
    const component = menuitem(props);

    expect(component.props.onClick()).toEqual(props.data.EVENT_HANDLER());
});

describe('Menu Item Click Handler Should Dismiss Menu', () => {
    const hiddenMenuProps = {
        data: {
            text: 'add',
            dismissOnClick: true,
            EVENT_HANDLER: () => {
                return 'Menu Item Clicked';
            }
        },
        store: mockStore({}, { id: undefined, type: 'HIDE_MENU' })
    };

    const component = menuitem(hiddenMenuProps);

    expect(component.props.onClick()).toEqual(hiddenMenuProps.data.EVENT_HANDLER());
});
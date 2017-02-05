import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { MenuItem } from './../../../../src/components/core/menu/MenuItem';
import { initializedStore } from './../../../testUtils';

const props = {
    data: {
        disabled: false,
        text: 'add',
        dismissOnClick: false,
        EVENT_HANDLER: () => {
            return 'Menu Item Clicked';
        }
    },
    store: initializedStore
};

function menuitem(cmpProps) {
    const element = React.createElement(MenuItem, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('A rendered Menu Item', () => {
    const component = menuitem(props);

    it('Should render correctly', () => {
        expect(component.type).toEqual('li');
        expect(component.key).toBeFalsy();
    });

});

describe('Menu Item Children', () => {
    const component = menuitem(props);

    it('Should have children', () => {
        expect(
            component.props.className
        ).toEqual('react-grid-action-menu-item');
        expect(component.props.children.length).toEqual(2);
    });
});

describe('Menu Item Click Handler', () => {
    const component = menuitem(props);

    it('Should fire event handler correctly', () => {
        expect(
            component.props.onClick()
        ).toEqual(props.data.EVENT_HANDLER());
    });
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
        store: initializedStore
    };

    const component = menuitem(hiddenMenuProps);

    it('Should dismiss menu', () => {
        expect(
            component.props.onClick()
        ).toEqual(
            hiddenMenuProps.data.EVENT_HANDLER()
        );
    });

});

describe('A disabled menu item', () => {
    const disabledMenuItemProps = {
        data: {
            text: 'add',
            dismissOnClick: true,
            EVENT_HANDLER: () => {
                return 'Menu Item Clicked';
            }
        },
        disabled: true,
        store: initializedStore
    };

    const component = menuitem(disabledMenuItemProps);

    it('Should return false onClick', () => {
        expect(
            component.props.onClick()
        ).toEqual(
            false
        );
    });

});

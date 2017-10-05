import expect from 'expect';
import React from 'react';
import { MenuItem } from './../../../../src/components/core/menu/MenuItem.jsx';
import { initializedStore, shallowWithContext } from './../../../testUtils';

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

describe('A rendered Menu Item', () => {
    const component = shallowWithContext(<MenuItem { ...props } />);

    it('Should render correctly', () => {
        expect(component.type()).toEqual('li');
    });

});

describe('Menu Item Children', () => {
    const component = shallowWithContext(<MenuItem { ...props } />);

    it('Should have children', () => {
        expect(
            component.props().className
        ).toEqual('react-grid-action-menu-item');

        expect(component.text()).toEqual('add');
    });
});

describe('Menu Item Click Handler', () => {
    const component = shallowWithContext(<MenuItem { ...props } />);

    it('Should fire event handler correctly', () => {
        expect(
            component.props().onClick()
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

    const component = shallowWithContext(<MenuItem { ...hiddenMenuProps } />);

    it('Should dismiss menu', () => {
        expect(
            component.props().onClick()
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

    const component = shallowWithContext(
        <MenuItem { ...disabledMenuItemProps } />
    );

    it('Should return false onClick', () => {
        expect(
            component.props().onClick()
        ).toEqual(
            false
        );
    });

});

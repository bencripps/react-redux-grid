import expect from 'expect';
import React from 'react';
import {
    PagerToolbar
} from './../../../../src/components/plugins/pager/Pager';
import { store, shallowWithContext } from './../../../testUtils/index';
import { localGridData } from './../../../testUtils/data';

// store.subscribe = () => {};

const props = {
    store,
    pageSize: 25,
    dataSource: localGridData,
    ref: 'pagertoolbar',
    plugins: {
        PAGER: {
            enabled: true
        }
    }
};

describe('An Unrendered Paging Toolbar', () => {

    const unrenderedProps = {
        store,
        pageSize: 25,
        dataSource: localGridData
    };

    const component = shallowWithContext(
        <PagerToolbar { ...unrenderedProps }/>
    );

    it('Should render a shallow component with no props, no children', () => {
        expect(component.node.type).toEqual('div');
        expect(Object.keys(component.props).length).toBeFalsy();
    });

    it('Should render an an empty footer', () => {
        expect(component.html()).toEqual('<div></div>');
    });

});

describe('The default toolbar instance', () => {

    const component = shallowWithContext(<PagerToolbar { ...props }/>);
    const instance = component.instance();

    it('Should have button types on props definition', () => {
        expect(instance.props.BUTTON_TYPES)
            .toEqual({ BACK: 'BACK', NEXT: 'NEXT' });
    });

    it('Should render a stateless component', () => {
        expect(instance.constructor.name)
            .toBe('PagerToolbar');
    });

    it('Should have button types on props definition', () => {
        expect(instance.props.BUTTON_TYPES)
            .toEqual({ BACK: 'BACK', NEXT: 'NEXT' });
    });

    it('Should have the right dataSource loaded', () => {
        expect(instance.props.dataSource).toEqual(props.dataSource);
    });

    it('Should have a default pageSize of 25', () => {
        expect(instance.props.pageSize).toEqual(25);
    });

    it('Should have a default recordType of Records', () => {
        expect(instance.props.recordType).toEqual('Records');
    });

    it('Should have the PAGER plugin loaded into props', () => {
        expect(instance.props.plugins.PAGER).toBeTruthy();
        expect(instance.props.plugins.PAGER.enabled).toEqual(true);
    });

    it('Should have the default toolbar renderer loaded into props', () => {
        expect(typeof instance.props.toolbarRenderer).toEqual('function');
    });

    it('Should render a description and two buttons', () => {
        expect(component.text())
            .toEqual('<Button /><Button /><Description />');
    });

    it('Should render a table footer as the first child', () => {
        expect(component.first().type()).toEqual('div');
    });

});

describe('An Rendered Paging Toolbar HTML', () => {

    it('Should render a toolbar', () => {
        const component = shallowWithContext(<PagerToolbar { ...props }/>);

        expect(component.html()).toEqual(
            [
                '<div>',
                '<div class="react-grid-pager-toolbar">',
                '<span>',
                '<button disabled="" class="react-grid-page-buttons ',
                'react-grid-back">Back</button>',
                '<button class="react-grid-page-buttons ',
                'react-grid-next">Next</button>',
                '</span>',
                '<span>No Records Available</span>',
                '</div>',
                '</div>'
            ].join('')
        );
    });

});

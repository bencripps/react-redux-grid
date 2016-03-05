import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { Button } from './../../../../src/components/plugins/pager/toolbar/Button.jsx';
import { PagerToolbar } from './../../../../src/components/plugins/pager/Toolbar.jsx';
import { mockStore } from './../../../testUtils/index';
import { localGridData } from './../../../testUtils/data';

const store = mockStore();

store.subscribe = () => {};

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

    const component = shallow(<PagerToolbar { ...unrenderedProps }/>);

    it('Should render a shallow component with no props, and no children', () => {
        expect(component.node.type).toEqual('tfoot');
        expect(Object.keys(component.props).length).toBeFalsy();
    });

    it('Should render an an empty footer', () => {
        expect(component.html()).toEqual('<tfoot></tfoot>');
    });

});

describe('The default toolbar instance', () => {

    const component = shallow(<PagerToolbar { ...props }/>);
    const instance = component.instance();

    it('Should have button types on props definition', () => {
        expect(instance.props.BUTTON_TYPES).toEqual({ BACK: 'BACK', NEXT: 'NEXT' });
    });

    it('Should render a stateless component', () => {
        expect(instance.constructor.name).toBe('StatelessComponent');
    });

    it('Should have button types on props definition', () => {
        expect(instance.props.BUTTON_TYPES).toEqual({ BACK: 'BACK', NEXT: 'NEXT' });
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
        expect(component.text()).toEqual('<Description /><Button /><Button />');
    });

    it('Should render a table footer as the first child', () => {
        expect(component.first().type()).toEqual('tfoot');
    });

});

describe('An Rendered Paging Toolbar HTML', () => {

    it('Should render a toolbar', () => {
        const component = shallow(<PagerToolbar { ...props }/>);

        expect(component.html()).toEqual([
            '<tfoot><tr class="react-grid-pager-toolbar">',
            '<td colspan="100%">',
            '<div>',
            '<span>No Records Available</span>',
            '<span>',
            '<button class="react-grid-page-buttons react-grid-next">Next</button>',
            '<button disabled="" class="react-grid-page-buttons react-grid-back">Back</button>',
            '</span>',
            '</div>',
            '</td>',
            '</tr></tfoot>'].join('')
        );
    });

});
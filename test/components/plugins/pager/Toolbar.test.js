import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
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

function pager(cmpProps) {
    const element = React.createElement(PagerToolbar, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('An Unrendered Paging Toolbar', () => {

    const unrenderedProps = {
        store,
        pageSize: 25,
        dataSource: localGridData
    };

    const component = pager(unrenderedProps);

    it('Should render a shallow component with no props, and no children', () => {
        expect(component.type).toEqual('tfoot');
        expect(Object.keys(component.props).length).toBeFalsy();
    });

});

describe('An Rendered Paging Toolbar', () => {

    const component = pager(props);
    const container = component.props.children.props.children;
    const cmpContainer = container.props.children;
    const description = cmpContainer.props.children[0];
    const buttonContainer = cmpContainer.props.children[1];
    const nextButton = buttonContainer.props.children[0];
    const lastButton = buttonContainer.props.children[1];

    it('Should render a shallow component with children', () => {
        expect(component.type).toEqual('tfoot');
        expect(component.props.children).toBeTruthy();
    });

    it('Should render the correct paging component', () => {
        expect(component.props.children.props.className).toEqual('react-grid-pager-toolbar');
        expect(component.props.children.props.children).toBeTruthy();
    });

    it('Should render the pager container', () => {
        expect(container.type).toEqual('td');
        expect(container.props.colSpan).toEqual('100%');
        expect(container.props.children).toBeTruthy();
    });

    it('Should render the pager component container', () => {
        expect(cmpContainer.type).toEqual('div');
        expect(cmpContainer.props.children.length).toEqual(2);
    });

    it('Should render the pager description with no records', () => {
        expect(description).toBeTruthy();
        expect(description.type).toEqual('span');
        expect(description.props.children).toEqual('No Records Available');
    });

    it('Should render the pager button container', () => {
        expect(buttonContainer).toBeTruthy();
        expect(buttonContainer.type).toEqual('span');
        expect(buttonContainer.props.children.length).toEqual(2);
    });

    it('Should render a back button', () => {
        expect(lastButton).toBeTruthy();
        expect(lastButton.type).toEqual('button');
        expect(lastButton.props.children).toEqual('Back');
        expect(lastButton.props.className).toEqual('react-grid-page-buttons react-grid-back');
        expect(lastButton.props.disabled).toEqual(true);
    });

    it('Should render a next button', () => {
        expect(nextButton).toBeTruthy();
        expect(nextButton.type).toEqual('button');
        expect(nextButton.props.children).toEqual('Next');
        expect(nextButton.props.className).toEqual('react-grid-page-buttons react-grid-next');
        expect(nextButton.props.disabled).toEqual(false);
    });

    it('Should render two buttons', () => {
        const shallowPager = shallow(<PagerToolbar { ...props }/>);

        expect(shallowPager).toBeTruthy();
        expect(shallowPager.find('.react-grid-page-buttons').length).toEqual(2);
        expect(shallowPager.find('.react-grid-next').length).toEqual(1);
        expect(shallowPager.find('.react-grid-back').length).toEqual(1);

    });
});
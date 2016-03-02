import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { CheckBox } from './../../../../src/components/plugins/selection/CheckBox.jsx';
import { mockStore } from './../../../testUtils/index';
import { localGridData } from './../../../testUtils/data';

const store = mockStore();

store.subscribe = () => {};

const props = {
    store,
    dataSource: {},
    selectedRows: {},
    type: 'notheader'
};

// function pager(cmpProps) {
//     const element = React.createElement(PagerToolbar, cmpProps);
//     const renderer = TestUtils.createRenderer();
//     renderer.render(element);
//     return renderer.getRenderOutput();
// }

describe('An Non Header CheckBox Component', () => {

    const checkboxContainer = shallow(<CheckBox { ...props }/>);
    const checkbox = checkboxContainer.find('.react-grid-checkbox');

    it('Should render the container correctly', () => {
        expect(checkboxContainer.node.type).toEqual('td');
    });

    it('Should render the checkbox correctly', () => {
        expect(checkbox.node.type).toEqual('input');
    });

});

describe('An Header CheckBox Component', () => {

    const headerProps = {
        store,
        dataSource: {},
        selectedRows: {},
        type: 'header'
    };

    const checkboxContainer = shallow(<CheckBox { ...headerProps }/>);
    const checkbox = checkboxContainer.find('.react-grid-checkbox');

    it('Should render the container correctly', () => {
        expect(checkboxContainer.node.type).toEqual('th');
    });

    it('Should render the checkbox correctly', () => {
        expect(checkbox.node.type).toEqual('input');
    });

});

describe('An Non Header CheckBox Click Event', () => {

    const checkboxContainer = shallow(<CheckBox { ...props }/>);
    const checkbox = checkboxContainer.find('.react-grid-checkbox');

    checkbox.simulate('click');

    it('Should render the container correctly', () => {
        expect(checkboxContainer.node.type).toEqual('td');
    });

});

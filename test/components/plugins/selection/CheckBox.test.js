import expect from 'expect';
import React from 'react';

import {
    CheckBox
} from './../../../../src/components/plugins/selection/CheckBox.jsx';
import {
    shallowWithContext,
    initializedStore
} from './../../../testUtils';

const props = {
    store: initializedStore,
    dataSource: {},
    selectedRows: {},
    type: 'notheader'
};

describe('An Non Header CheckBox Component', () => {

    const checkboxContainer = shallowWithContext(<CheckBox { ...props }/>);
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
        store: initializedStore,
        dataSource: {},
        selectedRows: {},
        type: 'header'
    };

    const checkboxContainer = shallowWithContext(
        <CheckBox { ...headerProps }/>
    );
    const checkbox = checkboxContainer.find('.react-grid-checkbox');

    it('Should render the container correctly', () => {
        expect(checkboxContainer.node.type).toEqual('th');
    });

    it('Should render the checkbox correctly', () => {
        expect(checkbox.node.type).toEqual('input');
    });

});

describe('An Non Header CheckBox Click Event', () => {

    const checkboxContainer = shallowWithContext(<CheckBox { ...props }/>);
    const checkbox = checkboxContainer.find('.react-grid-checkbox');

    checkbox.simulate('click');

    it('Should render the container correctly', () => {
        expect(checkboxContainer.node.type).toEqual('td');
    });

});

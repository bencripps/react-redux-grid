import expect from 'expect';
import React from 'react';
import {
    SELECTION_MODES
 } from './../../../../src/constants/GridConstants';
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


describe('A Non Header CheckBox Double Click Event', () => {

    // attempting to cover lines 126, 127 but add selectionModelConfig to props fails 
    //const selectionModelConfig = {mode: SELECTION_MODES.checkboxSingle, selectionEvent: 'doubleclick'}; 

    const checkboxContainer = shallowWithContext(<CheckBox { ...props }/>);
    const checkbox = checkboxContainer.find('.react-grid-checkbox');

    checkbox.simulate('doubleclick');

    it('Should render the container correctly', () => {
        expect(checkboxContainer.node.type).toEqual('td');
    });

});
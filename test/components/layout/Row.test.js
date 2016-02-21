import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Row } from './../../../src/components/layout/Row.jsx';
import { mockStore } from './../../testUtils/index';
import {
    gridColumns,
    gridActions,
    localGridData,
    defaultColumnManager
} from './../../testUtils/data';

const props = {
    columnManager: defaultColumnManager,
    columns: gridColumns,
    store: mockStore({}, ...gridActions),
    data: localGridData,
    editorState: {}
};

props.store.subscribe = () => {};

function row(cmpProps) {
    const element = React.createElement(Row, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('A rendered Row component', () => {

    const component = row(props);

    expect(component.type).toEqual('tbody');
    expect(component.props.className).toBeFalsy();

});

describe('Immediate Row Child Elements', () => {

    const component = row(props);

    expect(component.props.children).toBeTruthy();
    expect(component.props.children.type).toEqual('tr');
    expect(component.props.children.props.className).toEqual('react-grid-row');

});

describe('Row Child Elements -- Cells', () => {

    const component = row(props);

    expect(component.props.children).toBeTruthy();
    expect(component.props.children.type).toEqual('tr');
    expect(component.props.children.props.className).toEqual('react-grid-row');
    expect(component.props.children.props.children.type).toEqual('td');
    expect(component.props.children.props.children.props.children).toEqual('No Data Available');
    expect(component.props.children.props.children.props.colSpan).toEqual('100%');

});
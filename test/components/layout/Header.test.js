import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from './../../../src/components/layout/Header.jsx';
import { 
    mockStore, getColumnManager, getSelModel
} from './../../testUtils/index';
import {
    gridColumns,
    gridActions,
    localGridData
} from './../../testUtils/data';

const props = {
    columnManager: getColumnManager(),
    selectionModel: getSelModel(),
    columns: gridColumns,
    store: mockStore({}, ...gridActions),
    data: localGridData,
    editorState: {}
};

props.store.subscribe = () => {};

function header(cmpProps) {
    const element = React.createElement(Header, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('A rendered Header component', () => {

    const component = header(props);

    expect(component.type).toEqual('thead');
    // expect(component.props.children.type).toEqual('tr');

});

describe('Header Columns', () => {

    const component = header(props);

    expect(
        component.props.children.props.className
    ).toEqual('react-grid-header react-grid-header-hidden');
    expect(component.props.children.props.children.length).toEqual(2);

});

describe('Header Column Child Elements', () => {

    const component = header(props);
    const firstColumn = component.props.children.props.children[0];

    expect(firstColumn.key).toEqual('header-0');
    expect(firstColumn.ref).toEqual(null);

});

describe('Header Column Child Element Sub Elements', () => {

    const component = header(props);
    const firstColumn = component.props.children.props.children[0];

    // expect(firstColumn.props.children).toBeTruthy();
    // expect(firstColumn.props.children[0].type).toEqual('span');
    // expect(firstColumn.props.children[0].props.children).toEqual('Player');
    // expect(firstColumn.props.children[0].props.className).toEqual('react-grid-column');
    // expect(firstColumn.props.children[0].props.draggable).toEqual(false);

});
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Cell } from './../../../src/components/layout/Cell.jsx';
import { setup, mockStore, mockReducer } from './../../util/index';
import { cellData, gridColumns } from './../../util/data';

const props = {
    cellData,
    events: {
        HANDLE_CELL_CLICK: () => {
        alert('hi');
        }
    },
    rowId: 'rowId',
    editorState: {},
    columns: gridColumns,
    index: 0
};

function cell(cmpProps) {
    const element = React.createElement(Cell, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('Cell Default Props', () => {
    const component = <Cell { ...props } />;
    const internalProps = component.props;

    it('Should be rendered with correct default props', () => {
        expect(internalProps.cellData).toEqual(props.cellData);
    });
    
});

describe('A rendered cell', () => {
    // const component = cell(props);
    
    // it('Should have editable property but shouldn\'t be ediable', () => {
    //     expect(component.props.contentEditable).toBeFalsy();
    // });

    // it('Should fire click event', () => {
    //     TestUtils.Simulate.click(cell);
    // })
})
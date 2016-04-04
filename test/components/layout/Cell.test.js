import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Cell } from './../../../src/components/layout/Cell.jsx';
import { cellData, gridColumns } from './../../testUtils/data';

const props = {
    cellData,
    events: {
        HANDLE_CELL_CLICK: () => {
            return 'Clicked';
        },
        HANDLE_CELL_DOUBLE_CLICK: () => {
            return 'Double-Click';
        }
    },
    editor: {},
    selectionModel: {
        defaults: {
            editEvent: 'none'
        },
        eventTypes: {}
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

    const component = cell(props);
    // events, cellData, editor, index, rowData, rowId, selectionModel, store, reactEvent
    const clickEventArgs = [
        props.events,
        props.cellData,
        props.editor,
        props.index,
        props.rowData,
        props.rowId,
        props.selectionModel,
        {},
        {
            reactEvent: {}
        }
    ];

    it('Should have editable property but shouldn\'t be ediable', () => {
        expect(component.props.contentEditable).toBeFalsy();
    });

    it('Should have the correct class name', () => {
        expect(component.props.className).toEqual('react-grid-cell');
    });

    it('Should have the DOM type', () => {
        expect(component.type).toEqual('td');
    });

    it('Should have the correct class name', () => {
        expect(component.props.className).toEqual('react-grid-cell');
    });

    it('Should fire click event', () => {
        expect(component.props.onClick).toBeTruthy();
        // events, cellData, editor, index, rowData, rowId, selectionModel, store, reactEvent
        expect(component.props.onClick(...clickEventArgs)).toEqual('Clicked');
    });

    it('Should fire doubleclick event', () => {
        expect(component.props.onClick).toBeTruthy();
        expect(component.props.onDoubleClick({}, cellData, {})).toEqual('Double-Click');
    });

});

describe('A visible column', () => {

    const visibleCellProps = {
        cellData,
        events: {
            HANDLE_CELL_CLICK: () => {
                return 'Clicked';
            },
            HANDLE_CELL_DOUBLE_CLICK: () => {
                return 'Double-Click';
            }
        },
        rowId: 'rowId',
        editorState: {},
        columns: [
            {
                hidden: false
            }
        ],
        index: 0
    };

    const component = cell(visibleCellProps);

    it('Should render a visible column', () => {
        expect(component.props.style).toEqual({});
    });

});

describe('A hidden column', () => {

    const hiddenCellProps = {
        cellData,
        events: {
            HANDLE_CELL_CLICK: () => {
                return 'Clicked';
            },
            HANDLE_CELL_DOUBLE_CLICK: () => {
                return 'Double-Click';
            }
        },
        rowId: 'rowId',
        editorState: {},
        columns: [
            {
                hidden: true
            }
        ],
        index: 0
    };

    const component = cell(hiddenCellProps);

    it('Should render a hidden column', () => {
        expect(component.props.style.display).toEqual('none');
    });

});
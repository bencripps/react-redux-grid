import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Cell } from './../../../../src/components/layout/table-row/row/Cell.jsx';
import { Editor } from './../../../../src/components/layout/table-row/row/cell/Editor.jsx';
import util from 'util'

const gridColumns = [
    {
        name: 'Player Name',
        dataIndex: 'name'
    },
    {
        name: 'Position',
        dataIndex: 'position',
        editor: [
            { name: "Point Guard", value: "PG" },
            { name: "Shooting Guard", value: "SG" },
            { name: "Small Forward", value: "SF" },
            { name: "Point Guard", value: "PW" },
            { name: "Center", value: "C" }
        ]
    }
];
const cellData = "PW"

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

describe('A rendered cell in edit mode', () => {
    props.editorState = { row: { key: 'rowId' } }
    const component = cell(props);
    const internalSpan = component.props.children;

    it('Should be rendered with an Editor instance', () => {

        const editorProps = {
            cellData: props.cellData,
            columns: props.columns,
            editorState: props.editorState,
            index: props.index,
            isEditable: true,
            rowId: props.rowId,
            store: props.store,
            stateKey: props.stateKey
        };

        expect(internalSpan).toEqual(<Editor {...editorProps} />);
    });
});

describe('A rendered cell', () => {

    const component = cell(props);

    const clickEventArgs = [
        props.events,
        props.columns,
        props.cellData,
        props.editor,
        props.index,
        props.rowData,
        props.rowId,
        props.selectionModel,
        'stateKey',
        {},
        {
            reactEvent: {}
        }
    ];

    it('Should have editable property but shouldn\'t be editable', () => {
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
        expect(component.props.onDoubleClick(...clickEventArgs)).toEqual('Double-Click');
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
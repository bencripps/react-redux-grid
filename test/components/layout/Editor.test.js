
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Editor } from './../../../src/components/layout/table-row/row/cell/Editor.jsx';
import { Input } from './../../../src/components/layout/table-row/row/cell/editors/Input.jsx';
import { Select } from './../../../src/components/layout/table-row/row/cell/editors/Select.jsx';
import { mockStore } from './../../testUtils/index';
import { CLASS_NAMES } from './../../../src/constants/GridConstants';
import { prefix } from './../../../src/util/prefix';
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
    columns: gridColumns,
    editorState: { row: { key: 'rowId' } },
    index: 0,
    isEditable: true,
    rowId: 'rowId',
    stateKey: "grid-cell-Editor",
    store: mockStore()
};

function editor(cmpProps) {
    const element = React.createElement(Editor, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('Cell Default Props', () => {
    const component = <Editor { ...props } />;
    const internalProps = component.props;

    it('Should be rendered with correct default props', () => {
        expect(internalProps.cellData).toEqual(props.cellData);
    });
});

describe('A rendered Editor with default editor value', () => {

    const component = editor(props);
    const internalElement = component.props.children;

    it('Should be rendered with a span marked with correct className', () => {
        expect(component.type).toEqual('span');
        expect(component.props.className).toEqual(prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER));
    });

    it('Should be rendered with a select element', () => {
        expect(internalElement).toEqual(
            <Input {
                    ...{
                        column: props.columns[0],
                        columns: props.columns,
                        editorState: props.editorState,
                        cellData: props.cellData,
                        rowId: props.rowId,
                        stateKey: props.stateKey,
                        store: props.store
                    }
                }
            />
        );
    });
});

describe('A rendered Editor with array editor value', () => {
    props.index = 1
    const component = editor(props);
    const internalElement = component.props.children;

    it('Should be rendered with a span marked with correct className', () => {
        expect(component.type).toEqual('span');
        expect(component.props.className).toEqual(prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER));
    });

    it('Should be rendered with a select element', () => {
        expect(internalElement).toEqual(
            <Select {
                    ...{
                        column: props.columns[1],
                        columns: props.columns,
                        editorState: props.editorState,
                        cellData: props.cellData,
                        rowId: props.rowId,
                        stateKey: props.stateKey,
                        store: props.store
                    }
                }
            />
        );
    });
});

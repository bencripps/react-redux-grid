import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { isPluginEnabled } from '../../util/isPluginEnabled';
import { getCurrentRecords } from '../../util/getCurrentRecords';
import { getTreePathFromId } from './../../util/getTreePathFromId';
import { getRowKey } from '../../util/getData';

import { moveNode } from '../../actions/GridActions';

import Row from './table-row/Row';
import { PlaceHolder } from './row/PlaceHolder';

const { arrayOf, bool, func, number, object, oneOf, string } = PropTypes;

export class TableRow extends Component {

    render() {

        const { columnManager,
            columns,
            dataSource,
            editor,
            editorState,
            emptyDataMessage,
            events,
            gridType,
            menuState,
            pageSize,
            pager,
            plugins,
            reducerKeys,
            readFunc,
            selectedRows,
            selectionModel,
            showTreeRootNode,
            stateKey,
            store
        } = this.props;

        const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

        const rows = getRowSelection(
            dataSource, pageIndex, pageSize, pager, plugins, stateKey, store
        );

        const rowComponents = getRows(
            columns,
            columnManager,
            editor,
            editorState,
            gridType,
            menuState,
            reducerKeys,
            readFunc,
            rows,
            events,
            this.moveRow,
            this.isValidDrop,
            plugins,
            selectionModel,
            selectedRows,
            showTreeRootNode,
            stateKey,
            store
        );

        const rowInsert = Array.isArray(rowComponents)
            && rowComponents.length > 0
            ? rowComponents
            : <PlaceHolder { ...{ emptyDataMessage } } />;

        return (
            <tbody>
                { rowInsert }
            </tbody>
        );
    }

    constructor(props) {
        super(props);
    }

    static propTypes = {
        columnManager: object.isRequired,
        columns: arrayOf(object).isRequired,
        data: arrayOf(object),
        dataSource: object,
        editor: object,
        editorState: object,
        emptyDataMessage: string,
        events: object,
        gridType: oneOf([
            'tree', 'grid'
        ]),
        menuState: object,
        pageSize: number,
        pager: object,
        plugins: object,
        readFunc: func,
        reducerKeys: object,
        selectedRows: object,
        selectionModel: object,
        showTreeRootNode: bool,
        stateKey: string,
        store: object.isRequired
    };

    static defaultProps = {
        emptyDataMessage: 'No Data Available'
    };

    moveRow = (current, next) => {
        const { stateKey, store, showTreeRootNode } = this.props;

        store.dispatch(
            moveNode({ stateKey, store, current, next, showTreeRootNode })
        );
    };

    isValidDrop = (id, hoverParentId) => {
        const {
            dataSource,
            pageSize,
            pager,
            plugins,
            stateKey,
            store
        } = this.props;

        const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

        const rows = getRowSelection(
            dataSource, pageIndex, pageSize, pager, plugins, stateKey, store
        );

        const path = [-1, ...getTreePathFromId(rows, hoverParentId)];

        return path.indexOf(id) === -1;
    }

}

export const getRowComponents = (
    columns,
    columnManager,
    editor,
    editorState,
    gridType,
    menuState,
    reducerKeys,
    readFunc,
    row,
    events,
    moveRow,
    isValidDrop,
    plugins,
    selectionModel,
    selectedRows,
    showTreeRootNode,
    stateKey,
    store,
    index
) => {

    const key = getRowKey(columns, row, index);

    return (
        <Row
            key={ key }
            {
                ...{
                    columnManager,
                    columns,
                    editor,
                    editorState,
                    events,
                    gridType,
                    index,
                    menuState,
                    moveRow,
                    isValidDrop,
                    plugins,
                    reducerKeys,
                    readFunc,
                    row,
                    selectedRows,
                    selectionModel,
                    showTreeRootNode,
                    stateKey,
                    store,
                    treeData: getTreeData(row)
                }
            }
        />);
};

export const getRowSelection = (
    dataSource, pageIndex, pageSize, pager, plugins
) => {
    if (!dataSource) {
        return false;
    }

    if (!isPluginEnabled(plugins, 'PAGER')
        || plugins.PAGER.pagingType === 'remote') {
        return dataSource.data;
    }

    return getCurrentRecords(dataSource, pageIndex, pageSize);
};

export const getRows = (
    columns,
    columnManager,
    editor,
    editorState,
    gridType,
    menuState,
    reducerKeys,
    readFunc,
    rows,
    events,
    moveRow,
    isValidDrop,
    plugins,
    selectionModel,
    selectedRows,
    showTreeRootNode,
    stateKey,
    store
) => {

    return Array.isArray(rows)
            ? rows.map((row, i) => getRowComponents(
                columns,
                columnManager,
                editor,
                editorState,
                gridType,
                menuState,
                reducerKeys,
                readFunc,
                row,
                events,
                moveRow,
                isValidDrop,
                plugins,
                selectionModel,
                selectedRows,
                showTreeRootNode,
                stateKey,
                store,
                i
            ))
            : null;
};

export const getTreeData = row => ({
    depth: row._depth,
    parentId: row._parentId,
    id: row._id,
    index: row._index,
    leaf: row._leaf,
    hasChildren: row._hasChildren,
    isExpanded: row._isExpanded
});

export default DragDropContext(HTML5Backend)(TableRow);

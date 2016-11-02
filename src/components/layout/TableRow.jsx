/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { isPluginEnabled } from '../../util/isPluginEnabled';
import { bufferTop, bufferBottom } from '../../util/buffer';
import { prefix } from '../../util/prefix';
import { getCurrentRecords } from '../../util/getCurrentRecords';
import { getRowKey } from '../../util/getData';

import { moveNode } from '../../actions/GridActions';
import { ROW_HEIGHT, CLASS_NAMES } from '../../constants/GridConstants';

import Row from './table-row/Row';
import { PlaceHolder } from './row/PlaceHolder';

const BUFFER_MULTIPLIER = 1.5;
const DEFAULT_VIEWABLE_RECORDS = 25;

const { arrayOf, bool, func, number, object, oneOf, string } = PropTypes;

export class TableRow extends Component {

    render() {

        const {
            columnManager,
            columns,
            containerScrollTop,
            dataSource,
            dragAndDrop,
            editor,
            editorState,
            emptyDataMessage,
            events,
            gridType,
            infinite,
            menuState,
            pageSize,
            pager,
            plugins,
            readFunc,
            reducerKeys,
            selectedRows,
            selectionModel,
            showTreeRootNode,
            stateKey,
            stateful,
            store
        } = this.props;

        const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

        const totalCount = dataSource
            && Array.isArray(dataSource.currentRecords)
                ? dataSource.currentRecords.length
                : 0;

        const { viewableCount, viewableIndex, rowHeight } = this.state;

        const rows = getRowSelection(
            dataSource,
            infinite,
            pageIndex,
            pageSize,
            pager,
            plugins,
            viewableIndex,
            viewableCount,
            BUFFER_MULTIPLIER,
            stateKey,
            store
        );

        const rowComponents = getRows(
            columns,
            columnManager,
            dragAndDrop,
            editor,
            editorState,
            gridType,
            menuState,
            reducerKeys,
            readFunc,
            rows,
            events,
            this.moveRow,
            plugins,
            selectionModel,
            selectedRows,
            showTreeRootNode,
            stateful,
            stateKey,
            store,
            containerScrollTop,
            infinite,
            totalCount,
            rowHeight,
            viewableIndex,
            viewableCount,
            BUFFER_MULTIPLIER
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

    componentDidMount() {
        this.calculateHeights();
    }

    componentWillReceiveProps(nextProps) {
        const { rowHeight } = this.state;

        if (this.props.containerScrollTop !== nextProps.containerScrollTop) {
            this.setState({
                viewableIndex: Math.floor(
                    nextProps.containerScrollTop / rowHeight
                )
            });
        }
    }

    componentDidUpdate() {
        this.calculateHeights();
    }

    constructor(props) {
        super(props);

        this.state = {
            viewableIndex: 0,
            rowHeight: ROW_HEIGHT,
            viewableCount: DEFAULT_VIEWABLE_RECORDS
        };
    }

    static propTypes = {
        columnManager: object.isRequired,
        columns: arrayOf(object).isRequired,
        containerHeight: number,
        containerScrollTop: number,
        data: arrayOf(object),
        dataSource: object,
        dragAndDrop: bool,
        editor: object,
        editorState: object,
        emptyDataMessage: string,
        events: object,
        gridType: oneOf(['tree', 'grid']),
        infinite: bool,
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
        stateful: bool,
        store: object.isRequired
    };

    static defaultProps = {
        emptyDataMessage: 'No Data Available'
    };

    calculateHeights = () => {
        const { containerHeight } = this.props;
        const { rowHeight, viewableCount } = this.state;

        const tbody = ReactDOM
            .findDOMNode(this);

        const rows = tbody
            ? Array.from(tbody.querySelectorAll(`.${prefix(CLASS_NAMES.ROW)}`))
            : null;

        if (!rows.length) {
            return;
        }

        const nextRowHeight = Math.round(
            rows.reduce((prev, el) => prev + el.clientHeight, 0) / rows.length
        );

        const nextState = {};

        if (rowHeight !== nextRowHeight
            && nextRowHeight !== undefined
            && !Number.isNaN(nextRowHeight)) {
            nextState.rowHeight = nextRowHeight;
        }

        const nextViewableCount = Math.ceil(containerHeight / rowHeight);

        if (nextViewableCount !== viewableCount
            && !Number.isNaN(nextViewableCount)) {
            nextState.viewableCount = nextViewableCount;
        }

        if (Object.keys(nextState).length) {
            this.setState(nextState);
        }
    };

    moveRow = (current, next) => {
        const { stateKey, store, showTreeRootNode } = this.props;
        if (!this.requestedFrame) {
            this.requestedFrame = requestAnimationFrame(() => {
                store.dispatch(
                    moveNode({
                        stateKey,
                        store,
                        current,
                        next,
                        showTreeRootNode
                    })
                );
                this.requestedFrame = null;
            });
        }

    };

}

export const getRowComponents = (
    columns,
    columnManager,
    dragAndDrop,
    editor,
    editorState,
    gridType,
    menuState,
    reducerKeys,
    readFunc,
    row,
    previousRow,
    events,
    moveRow,
    plugins,
    selectionModel,
    selectedRows,
    showTreeRootNode,
    stateful,
    stateKey,
    store,
    index
) => {

    const key = getRowKey(columns, row);

    return (
        <Row
            key={ key }
            {
                ...{
                    columnManager,
                    columns,
                    dragAndDrop,
                    editor,
                    editorState,
                    events,
                    gridType,
                    index,
                    menuState,
                    moveRow,
                    plugins,
                    reducerKeys,
                    readFunc,
                    row,
                    previousRow,
                    selectedRows,
                    selectionModel,
                    showTreeRootNode,
                    stateful,
                    stateKey,
                    store,
                    treeData: getTreeData(row)
                }
            }
        />);
};

export const getRowSelection = (
    dataSource,
    infinite,
    pageIndex,
    pageSize,
    pager,
    plugins,
    viewableIndex,
    viewableCount,
    bufferMultiplier,
    stateKey,
    store
) => {

    if (!dataSource) {
        return false;
    }

    if (!isPluginEnabled(plugins, 'PAGER') && !infinite
        || plugins.PAGER.pagingType === 'remote'
        && !infinite) {
        return dataSource.data;
    }

    return getCurrentRecords(
        dataSource,
        pageIndex,
        pageSize,
        infinite,
        viewableIndex,
        viewableCount,
        bufferMultiplier
    ).data;
};

export const getRows = (
    columns,
    columnManager,
    dragAndDrop,
    editor,
    editorState,
    gridType,
    menuState,
    reducerKeys,
    readFunc,
    rows,
    events,
    moveRow,
    plugins,
    selectionModel,
    selectedRows,
    showTreeRootNode,
    stateful,
    stateKey,
    store,
    containerScrollTop,
    infinite,
    totalCount,
    rowHeight,
    viewableIndex,
    viewableCount,
    bufferMultiplier
) => {

    const rowArray = Array.isArray(rows)
            ? rows.map((row, i) => getRowComponents(
                columns,
                columnManager,
                dragAndDrop,
                editor,
                editorState,
                gridType,
                menuState,
                reducerKeys,
                readFunc,
                row,
                rows[i-1],
                events,
                moveRow,
                plugins,
                selectionModel,
                selectedRows,
                showTreeRootNode,
                stateful,
                stateKey,
                store,
                i
            ))
            : [];

    if (!infinite) {
        return rowArray;
    }

    const topProps = {
        style: {
            height: bufferTop(
                rowHeight,
                viewableIndex,
                viewableCount,
                bufferMultiplier,
                totalCount
            )
        }
    };

    const bottomProps = {
        style: {
            height: bufferBottom(
                rowHeight,
                viewableIndex,
                viewableCount,
                bufferMultiplier,
                totalCount
            )
        }
    };

    // adding buffer rows for infinite scroll
    rowArray.unshift(
        <tr
            key="row-inifinite-buffer-top"
            { ...topProps }
        />
    );
    rowArray.push(
        <tr
            key="row-inifinite-buffer-bottom"
            { ...bottomProps }
        />);

    return rowArray;

};

export const getTreeData = row => ({
    depth: row._depth,
    parentId: row._parentId,
    id: row._id,
    index: row._index,
    flatIndex: row._flatIndex,
    leaf: row._leaf,
    hasChildren: row._hasChildren,
    isExpanded: row._isExpanded,
    isLastChild: row._isLastChild,
    isFirstChild: row._isFirstChild,
    previousSiblingId: row._previousSiblingId,
    previousSiblingTotalChildren: row._previousSiblingTotalChilden,
    previousSiblingChildIds: row._previousSiblingChildIds,
    parentTotalChildren: row._parentTotalChildren,
    parentIndex: row._parentIndex,
    indexPath: row._indexPath,
    path: row._path
});

export default DragDropContext(HTML5Backend)(TableRow);

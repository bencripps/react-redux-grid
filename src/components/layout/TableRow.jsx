import PropTypes from 'prop-types';
/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { List } from 'immutable';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { isPluginEnabled } from '../../util/isPluginEnabled';
import * as buffer from '../../util/buffer';
import { prefix } from '../../util/prefix';
import { getCurrentRecords } from '../../util/getCurrentRecords';
import { getRowKey } from '../../util/getData';

import { moveNode } from '../../actions/GridActions';
import {
    BUFFER_MULTIPLIER,
    DEFAULT_VIEWABLE_RECORDS,
    GRID_TYPES,
    ROW_HEIGHT,
    gridConfig
} from './../../constants/GridConstants';

import Row from './table-row/Row';
import { PlaceHolder } from './row/PlaceHolder';

const { arrayOf, bool, func, number, object, string, oneOfType } = PropTypes;

export class TableRow extends Component {

    render() {
        const { dataSource } = this.props;

        const totalCount = (
            dataSource && List.isList(dataSource.currentRecords)
                ? dataSource.currentRecords.count()
                : 0
        );

        this._rows = this.rowSelection();

        return (
            <tbody>
                { this.infiniteSpacer('bufferTop', totalCount) }
                { this._rows.map(this.toRowComponents()) }
                { this.infiniteSpacer('bufferBottom', totalCount) }
                { this.emptyData(totalCount) }
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
        gridType: GRID_TYPES,
        infinite: bool,
        menuState: object,
        pageSize: number,
        pager: object,
        plugins: object,
        readFunc: func,
        reducerKeys: oneOfType([object, string]),
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
        const { CLASS_NAMES } = gridConfig();
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

    findRow = predicate => (
        this._rows.find(predicate)
    );

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

    rowSelection = () => {
        const { dataSource, infinite, pager, pageSize, plugins } = this.props;
        const { viewableIndex, viewableCount } = this.state;

        if (!dataSource) {
            return List();
        }

        if (!isPluginEnabled(plugins, 'PAGER') && !infinite
            || plugins.PAGER.pagingType === 'remote'
            && !infinite) {
            return dataSource.data;
        }

        return getCurrentRecords(
            dataSource,
            pager && pager.pageIndex ? pager.pageIndex : 0,
            pageSize,
            infinite,
            viewableIndex,
            viewableCount,
            BUFFER_MULTIPLIER
        ).data;
    };

    toRowComponents = () => (row, index, rows) => (
        <Row
            columnManager={this.props.columnManager}
            columns={this.props.columns}
            dragAndDrop={this.props.dragAndDrop}
            editor={this.props.editor}
            editorState={this.props.editorState}
            emptyDataMessage={this.props.emptyDataMessage}
            events={this.props.events}
            findRow={this.findRow}
            gridType={this.props.gridType}
            index={index}
            key={getRowKey(this.props.columns, row)}
            menuState={this.props.menuState}
            moveRow={this.moveRow}
            nextRow={rows.get(index + 1)}
            plugins={this.props.plugins}
            previousRow={rows.get(index - 1)}
            readFunc={this.props.readFunc}
            reducerKeys={this.props.reducerKeys}
            row={row}
            selectedRows={this.props.selectedRows}
            selectionModel={this.props.selectionModel}
            showTreeRootNode={this.props.showTreeRootNode}
            stateKey={this.props.stateKey}
            stateful={this.props.stateful}
            store={this.props.store}
            treeData={getTreeData(row)}
        />
    );

    infiniteSpacer = (method, totalCount) => {
        const { infinite } = this.props;
        const { rowHeight, viewableCount, viewableIndex } = this.state;

        if (infinite && totalCount) {

            const style = {
                height: buffer[method](
                    rowHeight,
                    viewableIndex,
                    viewableCount,
                    BUFFER_MULTIPLIER,
                    totalCount
                )
            };

            return (
                <tr
                    key={`row-inifinite-${method}`}
                    style={style}
                />
            );
        }
    };

    emptyData = totalCount => (
        totalCount
            ? undefined
            : <PlaceHolder
                emptyDataMessage={this.props.emptyDataMessage}
              />
    );
}

export const getTreeData = row => ({
    depth: row.get('_depth'),
    parentId: row.get('_parentId'),
    id: row.get('_id'),
    index: row.get('_index'),
    flatIndex: row.get('_flatIndex'),
    leaf: row.get('_leaf'),
    hasChildren: row.get('_hasChildren'),
    isExpanded: row.get('_isExpanded'),
    isLastChild: row.get('_isLastChild'),
    isFirstChild: row.get('_isFirstChild'),
    previousSiblingId: row.get('_previousSiblingId'),
    previousSiblingTotalChildren: row.get('_previousSiblingTotalChilden'),
    previousSiblingChildIds: row.get('_previousSiblingChildIds'),
    parentTotalChildren: row.get('_parentTotalChildren'),
    parentIndex: row.get('_parentIndex'),
    indexPath: row.get('_indexPath'),
    path: row.get('_path')
});

export default DragDropContext(HTML5Backend)(TableRow);

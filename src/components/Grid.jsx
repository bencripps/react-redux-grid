/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TableContainer from './layout/TableContainer';
import FixedHeader from './layout/FixedHeader';
import PagerToolbar from './plugins/pager/Pager';
import { Message } from './plugins/errorhandler/Message';
import BulkActionToolbar from './plugins/bulkactions/Toolbar';
import LoadingBar from './plugins/loader/LoadingBar';
import ColumnManager from './core/ColumnManager';
import Model from './plugins/selection/Model';
import Manager from './plugins/editor/Manager';
import { prefix } from '../util/prefix';
import { gridConfig, GRID_TYPES } from '../constants/GridConstants';
import {
    getAsyncData,
    setColumns,
    setData,
    setTreeData
} from '../actions/GridActions';
import { mapStateToProps } from '../util/mapStateToProps';
import { shouldGridUpdate } from '../util/shouldComponentUpdate';
import { isPluginEnabled } from '../util/isPluginEnabled';
import { getColumnsFromStorage } from '../util/getColumnsFromStorage';
import localStorageManager from './core/LocalStorageManager';

import './../style/main.styl';

const {
    any,
    array,
    arrayOf,
    bool,
    object,
    oneOfType,
    number,
    string
} = PropTypes;

class Grid extends Component {

    render() {

        const { CLASS_NAMES } = gridConfig();

        const {
            classNames,
            dataSource,
            columnState,
            gridData,
            height,
            infinite,
            loadingState,
            pageSize,
            plugins,
            events,
            reducerKeys,
            stateKey,
            store,
            pager
        } = this.props;

        const columns = columnState && columnState.columns
            ? columnState.columns
            : [];

        const editorComponent = this.editor.getComponent(
            plugins,
            reducerKeys,
            store,
            events,
            this.selectionModel,
            this.editor,
            columns
        );

        const isLoading = loadingState && loadingState.isLoading
            ? loadingState.isLoading
            : false;

        return (
            <div
                className={
                    prefix(
                        CLASS_NAMES.CONTAINER,
                        isLoading ? CLASS_NAMES.IS_LOADING : false,
                        ...classNames
                    )
                }
            >
                <Message
                    reducerKeys={reducerKeys}
                    store={store}
                />
                <BulkActionToolbar
                    plugins={plugins}
                    reducerKeys={reducerKeys}
                    selectionModel={this.selectionModel}
                    stateKey={stateKey}
                    store={store}
                />
                <FixedHeader
                    { ...this.getHeaderProps(true) }
                />
                <TableContainer
                    editorComponent={editorComponent}
                    headerProps={this.getHeaderProps(false)}
                    height={height}
                    infinite={infinite}
                    rowProps={this.getRowProps()}
                />
                <PagerToolbar
                    dataSource={dataSource}
                    gridData={gridData}
                    pageSize={pageSize}
                    pagerState={pager}
                    plugins={plugins}
                    reducerKeys={reducerKeys}
                    stateKey={stateKey}
                    store={store}
                />
                <LoadingBar
                    isLoading={isLoading}
                    plugins={plugins}
                />
            </div>
        );
    }

    componentWillMount() {

        const {
            columns,
            dataSource,
            gridType,
            events,
            plugins,
            reducerKeys,
            stateKey,
            store
        } = this.props;

        this.gridType = gridType === 'tree'
            ? 'tree'
            : 'grid';

        if (!store || !store.dispatch) {
            throw new Error('Component must be intialized with a valid store');
        }

        if (!stateKey) {
            throw new Error('A stateKey is required to intialize the grid');
        }

        this.setColumns();

        this.setData();

        this.columnManager.init({
            plugins,
            store,
            events,
            selectionModel: this.selectionModel,
            editor: this.editor,
            columns,
            dataSource,
            reducerKeys
        });

        this.selectionModel.init(plugins, stateKey, store, events);

        this.editor.init(plugins, stateKey, store, events);
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldGridUpdate.bind(this);

        this.columnManager = new ColumnManager();

        this.editor = new Manager();

        this.selectionModel = new Model();
    }

    static propTypes = {
        classNames: array,
        columnState: object,
        columns: arrayOf(object).isRequired,
        data: arrayOf(object),
        dataSource: any,
        dragAndDrop: bool,
        editorState: object,
        emptyDataMessage: any,
        events: object,
        expandOnLoad: bool,
        gridData: object,
        gridType: GRID_TYPES,
        height: oneOfType([
            string,
            number
        ]),
        infinite: bool,
        loadingState: object,
        menuState: object,
        pageSize: number,
        pager: object,
        plugins: object,
        reducerKeys: object,
        selectedRows: object,
        showTreeRootNode: bool,
        stateKey: string,
        stateful: bool,
        store: object
    };

    static defaultProps = {
        classNames: [],
        columns: [],
        events: {},
        height: '500px',
        pageSize: 25,
        reducerKeys: {},
        showTreeRootNode: false
    };

    setData(extraParams = {}) {

        const {
            dataSource,
            data,
            expandOnLoad,
            showTreeRootNode,
            stateKey,
            plugins,
            store
        } = this.props;

        const editMode = isPluginEnabled(plugins, 'EDITOR')
            ? plugins.EDITOR.type
            : null;

        if (this.gridType === 'tree') {
            if (typeof dataSource === 'string'
                    || typeof dataSource === 'function') {
                store.dispatch(
                    getAsyncData({
                        stateKey,
                        dataSource,
                        type: 'tree',
                        showTreeRootNode,
                        extraParams: {
                            ...extraParams,
                            expandOnLoad,
                            editMode
                        }
                    })
                );
            }

            else {
                store.dispatch(
                    setTreeData({
                        stateKey,
                        data,
                        showTreeRootNode,
                        extraParams: {
                            ...extraParams,
                            expandOnLoad,
                            editMode
                        }
                    })
                );
            }
        }

        else if (this.gridType === 'grid') {
            if (typeof dataSource === 'string'
                    || typeof dataSource === 'function') {
                store.dispatch(
                    getAsyncData({
                        stateKey,
                        dataSource,
                        extraParams: { ...extraParams, editMode }
                    })
                );
            }

            else if (data) {
                store.dispatch(
                    setData({ stateKey, data, editMode })
                );
            }

            else {
                throw new Error(
                    'A data source, or a static data set is required'
                );
            }
        }

    }

    setColumns() {

        const { columns, stateKey, store, stateful } = this.props;
        let savedColumns = columns;

        if (stateful) {
            savedColumns = getColumnsFromStorage(
                localStorageManager.getStateItem(
                    { stateKey, value: columns, property: 'columns' }
                ),
                columns
            );
        }

        if (!columns) {
            throw new Error('A columns array is required');
        }

        else {
            store.dispatch(setColumns(
                { columns: savedColumns, stateKey, stateful })
            );
        }
    }

    getHeaderProps = (visible) => ({
        columnManager: this.columnManager,
        columns: this.props.columns,
        plugins: this.props.plugins,
        reducerKeys: this.props.reducerKeys,
        dataSource: this.props.gridData,
        pager: this.props.pager,
        columnState: this.props.columnState,
        selectionModel: this.selectionModel,
        stateKey: this.props.stateKey,
        store: this.props.store,
        stateful: this.props.stateful,
        visible,
        menuState: this.props.menuState,
        gridType: this.gridType
    });

    getRowProps = () => ({
        columnManager: this.columnManager,
        columns: this.props.columns,
        dragAndDrop: this.props.dragAndDrop,
        editor: this.editor,
        emptyDataMessage: this.props.emptyDataMessage,
        columnState: this.props.columnState,
        dataSource: this.props.gridData,
        readFunc: this.setData.bind(this),
        pager: this.props.pager,
        editorState: this.props.editorState,
        selectedRows: this.props.selectedRows,
        events: this.props.events,
        pageSize: this.props.pageSize,
        plugins: this.props.plugins,
        reducerKeys: this.props.reducerKeys,
        selectionModel: this.selectionModel,
        stateKey: this.props.stateKey,
        store: this.props.store,
        stateful: this. props.stateful,
        showTreeRootNode: this.props.showTreeRootNode,
        menuState: this.props.menuState,
        gridType: this.gridType
    });
}

const ConnectedGrid = connect(mapStateToProps)(Grid);

export { Grid, ConnectedGrid };

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
import { gridConfig } from '../constants/GridConstants';
import {
    GRID_TYPES,
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
            dragAndDrop,
            dataSource,
            columnState,
            gridData,
            emptyDataMessage,
            height,
            infinite,
            loadingState,
            pageSize,
            plugins,
            events,
            reducerKeys,
            stateKey,
            store,
            pager,
            editorState,
            selectedRows,
            stateful,
            menuState,
            showTreeRootNode
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

        const containerProps = {
            className: prefix(CLASS_NAMES.CONTAINER, ...classNames)
        };

        const messageProps = {
            reducerKeys,
            store
        };

        const bulkActionProps = {
            plugins,
            reducerKeys,
            selectionModel: this.selectionModel,
            stateKey,
            store
        };

        const bulkActionCmp = isPluginEnabled(plugins, 'BULK_ACTIONS')
            ? <BulkActionToolbar { ...bulkActionProps } />
            : null;

        const headerProps = {
            columnManager: this.columnManager,
            columns,
            plugins,
            reducerKeys,
            dataSource: gridData,
            pager,
            columnState,
            selectionModel: this.selectionModel,
            stateKey,
            store,
            stateful,
            visible: false,
            menuState,
            gridType: this.gridType
        };

        const fixedHeaderProps = Object.assign({
            visible: true,
            gridData
        }, headerProps);

        const rowProps = {
            columnManager: this.columnManager,
            columns,
            dragAndDrop,
            editor: this.editor,
            emptyDataMessage,
            columnState,
            dataSource: gridData,
            readFunc: this.setData.bind(this),
            pager,
            editorState,
            selectedRows,
            events,
            pageSize,
            plugins,
            reducerKeys,
            selectionModel: this.selectionModel,
            stateKey,
            store,
            stateful,
            showTreeRootNode,
            menuState,
            gridType: this.gridType
        };

        const tableContainerProps = {
            editorComponent,
            height,
            headerProps,
            infinite,
            rowProps
        };

        const pagerProps = {
            gridData,
            dataSource,
            pageSize,
            pagerState: pager,
            plugins,
            reducerKeys,
            stateKey,
            store
        };

        const loadingBarProps = {
            plugins,
            reducerKeys,
            stateKey,
            store,
            loadingState
        };

        return (
            <div { ...containerProps }>
                <Message { ...messageProps } />
                { bulkActionCmp }
                <FixedHeader { ...fixedHeaderProps } />
                <TableContainer { ...tableContainerProps } />
                <PagerToolbar { ...pagerProps } />
                <LoadingBar { ...loadingBarProps } />
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
}

const ConnectedGrid = connect(mapStateToProps)(Grid);

export { Grid, ConnectedGrid };

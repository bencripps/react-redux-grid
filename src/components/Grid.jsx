import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';

import TableContainer from './layout/TableContainer';
import FixedHeader from './layout/FixedHeader';
import PagerToolbar from './plugins/pager/Pager';
import Message from './plugins/errorhandler/Message';
import BulkActionToolbar from './plugins/bulkactions/Toolbar';
import LoadingBar from './plugins/loader/LoadingBar';
import ColumnManager from './core/ColumnManager';
import Model from './plugins/selection/Model';
import Manager from './plugins/editor/Manager';
import { prefix } from '../util/prefix';

import {
    gridConfig,
    GRID_TYPES
} from '../constants/GridConstants';

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

import styles from './../style/main.styl';

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

export class Grid extends Component {

    render() {

        const { CLASS_NAMES, USE_GRID_STYLES } = gridConfig();
        const editorComponent = this.getEditor();
        const isLoading = this.isLoading();
        const store = this.getStore();

        if (!this.CSS_LOADED && USE_GRID_STYLES) {
            this.CSS_LOADED = true;
            this.addStyles();
        }

        const {
            classNames,
            columnState,
            dataSource,
            gridData,
            height,
            infinite,
            pager,
            pageSize,
            plugins,
            reducerKeys,
            stateKey
        } = this.props;

        const headerHidden = columnState
            ? columnState.headerHidden
            : false;

        return (
            <div
                className={
                    prefix(
                        CLASS_NAMES.CONTAINER,
                        isLoading
                            ? CLASS_NAMES.IS_LOADING
                            : false,
                        ...classNames
                    )
                }
            >
                <Message
                    reducerKeys={reducerKeys}
                    stateKey={stateKey}
                    store={store}
                    plugins={plugins}
                />
                <BulkActionToolbar
                    plugins={plugins}
                    reducerKeys={reducerKeys}
                    selectionModel={this.selectionModel}
                    stateKey={stateKey}
                    store={store}
                />
                <FixedHeader
                    headerHidden={headerHidden}
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
            dataSource,
            gridType,
            events,
            plugins,
            reducerKeys,
            stateKey
        } = this.props;

        const columns = this.getColumns();
        const store = this.getStore();

        this.gridType = gridType === 'tree'
            ? 'tree'
            : 'grid';

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

    componentWillReceiveProps(nextProps) {
        // for issue #30 -- if we're relying on a dataArray
        // as the dataSource, we need to trigger rerender
        // if the dataArray has changed

        if (this._USING_DATA_ARRAY) {
            // check to see if new data, is the same as old data
            // -- without _key property
            const shouldResetData = this.gridType === 'tree'
                ? !deepEqual(this.props.data, nextProps.data)
                : !deepEqual(
                        this.props.data.map(this.removeKeys),
                        nextProps.data.map(this.removeKeys)
                    );

            // sigh, this is a hack
            // if we do need to retrigger, we cant do
            // that within `componentWillReceiveProps`
            // instead, we need to pull the call of the call frame
            // we do this instead of applying logic inside of componentDidUpdate
            // since this is potentially a very expensive operation
            // and only want to rerun when props have actually changed
            if (shouldResetData) {
                setTimeout(this.setData.bind(this), 0);
            }
        }
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldGridUpdate.bind(this);

        this.columnManager = new ColumnManager();

        this.editor = new Manager();

        this.selectionModel = new Model();
    }

    static contextTypes = {
        store: object
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
        filterFields: object,
        gridData: object,
        gridType: GRID_TYPES,
        height: oneOfType([
            bool,
            string,
            number
        ]),
        infinite: bool,
        loadingState: object,
        menuState: object,
        pageSize: number,
        pager: object,
        plugins: object,
        reducerKeys: oneOfType([object, string]),
        selectedRows: object,
        showTreeRootNode: bool,
        stateKey: string,
        stateful: bool,
        store: object
    };

    static defaultProps = {
        classNames: [],
        columnState: {},
        columns: [],
        events: {},
        filterFields: {},
        height: '500px',
        pageSize: 25,
        reducerKeys: {},
        showTreeRootNode: false
    };

    static CSS_LOADED = false;

    setGridDataType = asArray => {
        this._USING_DATA_ARRAY = asArray;
    };

    removeKeys = item => ({
        ...item,
        _key: undefined
    })

    setData(extraParams = {}) {

        const {
            dataSource,
            data,
            expandOnLoad,
            showTreeRootNode,
            stateKey,
            plugins
        } = this.props;

        const store = this.getStore();

        const editMode = isPluginEnabled(plugins, 'EDITOR')
            ? plugins.EDITOR.type
            : null;

        if (this.gridType === 'tree') {
            if (typeof dataSource === 'string'
                    || typeof dataSource === 'function') {
                this.setGridDataType(false);
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
                this.setGridDataType(true);
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
                this.setGridDataType(false);
                store.dispatch(
                    getAsyncData({
                        stateKey,
                        dataSource,
                        extraParams: { ...extraParams, editMode }
                    })
                );
            }

            else if (data) {
                this.setGridDataType(true);
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

        const { stateKey, stateful } = this.props;
        const store = this.getStore();
        const columns = this.getColumns();

        let savedColumns = columns;

        if (stateful) {
            savedColumns = getColumnsFromStorage(
                localStorageManager.getStateItem(
                    { stateKey, value: columns, property: 'columns' }
                ),
                columns
            );
        }

        if (!columns || columns.length === 0 || !Array.isArray(columns)) {
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
        columns: this.getColumns(),
        plugins: this.props.plugins,
        reducerKeys: this.props.reducerKeys,
        dataSource: this.props.gridData,
        filterFields: this.props.filterFields,
        pager: this.props.pager,
        pageSize: this.props.pageSize,
        selectionModel: this.selectionModel,
        stateKey: this.props.stateKey,
        store: this.getStore(),
        stateful: this.props.stateful,
        visible,
        menuState: this.props.menuState,
        gridType: this.gridType
    });

    getRowProps = () => ({
        columnManager: this.columnManager,
        columns: this.getColumns(),
        dragAndDrop: this.props.dragAndDrop,
        editor: this.editor,
        emptyDataMessage: this.props.emptyDataMessage,
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
        store: this.getStore(),
        stateful: this. props.stateful,
        showTreeRootNode: this.props.showTreeRootNode,
        menuState: this.props.menuState,
        gridType: this.gridType
    });

    getEditor = () => this.editor.getComponent(
        this.props.plugins,
        this.props.reducerKeys,
        this.getStore(),
        this.props.events,
        this.selectionModel,
        this.editor,
        this.props.columns
    );

    getColumns = () => {
        const { columns, columnState } = this.props;

        if (columnState
            && columnState.get
            && columnState.get('columns')) {
            return columnState.get('columns');
        }

        return columns;
    }

    isLoading = () => this.props.loadingState
        && this.props.loadingState.isLoading
            ? this.props.loadingState.isLoading
            : false

    addStyles = () => {
        const styleEl = document.createElement('style');
        const head = document.head
            || document.getElementsByTagName('head')[0];

        styleEl.type = 'text/css';

        if (styleEl.styleSheet) {
            styleEl.styleSheet.cssText = styles;
        }
        else {
            styleEl.appendChild(document.createTextNode(styles));
        }

        head.appendChild(styleEl);
    }

    getStore = () => this.context.store || this.props.store
}

export default connect(mapStateToProps)(Grid);

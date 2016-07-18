import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './layout/Header.jsx';
import FixedHeader from './layout/FixedHeader.jsx';
import Row from './layout/TableRow.jsx';
import {
    ConnectedPagerToolbar as PagerToolbar
} from './plugins/pager/Toolbar.jsx';
import { Message } from './plugins/errorhandler/Message.jsx';
import BulkActionToolbar from './plugins/bulkactions/Toolbar.jsx';
import FilterToolbar from './plugins/filtercontainer/Toolbar.jsx';
import LoadingBar from './plugins/loader/LoadingBar.jsx';
import ColumnManager from './core/ColumnManager';
import Model from './plugins/selection/Model';
import Manager from './plugins/editor/Manager';
import { prefix } from '../util/prefix';
import { CLASS_NAMES } from '../constants/GridConstants';
import { getAsyncData, setData, setColumns } from '../actions/GridActions';
import { mapStateToProps } from '../util/mapStateToProps';
import { shouldGridUpdate } from '../util/shouldComponentUpdate';
import { isPluginEnabled } from '../util/isPluginEnabled';
import '../style/main.styl';

class Grid extends Component {

    render() {

        const {
            classNames,
            columnState,
            gridData,
            height,
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
            menuState
        } = this.props;

        let columns = columnState && columnState.columns
            ? columnState.columns
            : [];

        if ((!columns || columns.length === 0) && this.columnManager.columns) {
            columns = this.columnManager.columns;
        }

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
            className: prefix(CLASS_NAMES.CONTAINER, ...classNames),
            reducerKeys
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

        const filterProps = {
            columnManager: this.columnManager,
            pageSize,
            plugins,
            reducerKeys,
            stateKey,
            store
        };

        const filterCmp = isPluginEnabled(plugins, 'FILTER_CONTAINER')
            ? <FilterToolbar { ...filterProps } />
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
            visible: false,
            menuState
        };

        const fixedHeaderProps = Object.assign({
            visible: true,
            gridData
        }, headerProps);

        const tableContainerProps = {
            className: prefix(CLASS_NAMES.TABLE_CONTAINER),
            style: {
                height: height
            }
        };

        const rowProps = {
            columnManager: this.columnManager,
            columns,
            editor: this.editor,
            columnState,
            dataSource: gridData,
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
            menuState
        };

        const tableProps = {
            className: prefix(CLASS_NAMES.TABLE, CLASS_NAMES.HEADER_HIDDEN),
            cellSpacing: 0,
            reducerKeys,
            store
        };

        const pagerProps = {
            dataSource: gridData,
            pageSize,
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
                { filterCmp }
                <FixedHeader { ...fixedHeaderProps } />
                <div { ...tableContainerProps } >
                    <table { ...tableProps }>
                        <Header { ...headerProps } />
                        <Row { ...rowProps } />
                    </table>
                    { editorComponent }
                </div>
                <PagerToolbar { ...pagerProps } />
                <LoadingBar { ...loadingBarProps } />
            </div>
        );
    }

    componentWillMount() {

        const {
            columns,
            dataSource,
            events,
            plugins,
            reducerKeys,
            stateKey,
            store
        } = this.props;

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
        classNames: PropTypes.array,
        columnState: PropTypes.object,
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        data: PropTypes.arrayOf(PropTypes.object),
        dataSource: PropTypes.any,
        editorState: PropTypes.object,
        events: PropTypes.object,
        gridData: PropTypes.object,
        height: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        loadingState: PropTypes.object,
        menuState: PropTypes.object,
        pageSize: PropTypes.number,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        reducerKeys: PropTypes.object,
        selectedRows: PropTypes.object,
        stateKey: PropTypes.string,
        store: PropTypes.object
    };

    static defaultProps = {
        classNames: [],
        columns: [],
        events: {},
        height: '500px',
        pageSize: 25,
        reducerKeys: {}
    };

    setData() {

        const { dataSource, data, stateKey, store } = this.props;

        if (typeof dataSource === 'string'
                || typeof dataSource === 'function') {
            store.dispatch(
                getAsyncData({ stateKey, dataSource })
            );
        }

        else if (data) {
            store.dispatch(
                setData({ stateKey, data })
            );
        }

        else {
            throw new Error('A data source, or a static data set is required');
        }

    }

    setColumns() {

        const { columns, stateKey, store } = this.props;

        if (!columns) {
            throw new Error('A columns array is required');
        }

        else {
            store.dispatch(setColumns({ columns, stateKey }));
        }
    }
}

const ConnectedGrid = connect(mapStateToProps)(Grid);

export { Grid, ConnectedGrid };

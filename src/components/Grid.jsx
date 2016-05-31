import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ConnectedHeader as Header} from './layout/Header.jsx';
import { ConnectedFixedHeader as FixedHeader} from './layout/FixedHeader.jsx';
import { Row } from './layout/Row.jsx';
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
import { stateGetter } from '../util/stateGetter';
import '../style/main.styl';

class Grid extends Component {

    render() {

        const {
            classNames,
            columnState,
            gridData,
            height,
            pageSize,
            plugins,
            events,
            reducerKeys,
            stateKey,
            store,
            pager,
            editorState,
            selectedRows
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

        const filterProps = {
            columnManager: this.columnManager,
            pageSize,
            plugins,
            reducerKeys,
            stateKey,
            store
        };

        const headerProps = {
            columnManager: this.columnManager,
            columns,
            plugins,
            reducerKeys,
            selectionModel: this.selectionModel,
            stateKey,
            store,
            visible: false
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
            store
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
            store
        };

        return (
            <div { ...containerProps }>
                <Message { ...messageProps } />
                <BulkActionToolbar { ...bulkActionProps } />
                <FilterToolbar { ...filterProps } />
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

function mapStateToProps(state, props) {
    return {
        columnState: stateGetter(state, props, 'grid', props.stateKey),
        gridData: stateGetter(state, props, 'dataSource', props.stateKey),
        editorState: stateGetter(state, props, 'editor', props.stateKey),
        pager: stateGetter(state, props, 'pager', props.stateKey),
        selectedRows: stateGetter(state, props, 'selection', props.stateKey)
    };
}

const ConnectedGrid = connect(mapStateToProps)(Grid);

export { Grid, ConnectedGrid };
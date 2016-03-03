import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedHeader as Header} from './layout/Header.jsx';
import { ConnectedRow as Row } from './layout/Row.jsx';
import { ConnectedPagerToolbar as PagerToolbar } from './plugins/pager/Toolbar.jsx';
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

    static propTypes = {
        columnState: React.PropTypes.object,
        columns: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.object),
        dataSource: React.PropTypes.any,
        events: React.PropTypes.object,
        pageSize: React.PropTypes.number,
        plugins: React.PropTypes.object,
        reducerKeys: React.PropTypes.object,
        store: React.PropTypes.object
    };

    static defaultProps = {
        pageSize: 25,
        events: {},
        reducerKeys: {}
    };

    componentWillMount() {

        const { columns, dataSource, events, plugins, store } = this.props;

        if (!store || !store.dispatch) {
            throw new Error('Component must be intialized with a valid store');
        }

        this.setColumns();

        this.setData();

        columnManager.init(plugins, store, events, selectionModel, editor, columns, dataSource);

        selectionModel.init(plugins, store, events);

        editor.init(plugins, store, events);
    }

    setData() {

        const { dataSource, data, store } = this.props;

        if (typeof dataSource === 'string' || typeof dataSource === 'function') {
            store.dispatch(getAsyncData(dataSource));
        }

        else if (data) {
            store.dispatch(setData(data));
        }

        else {
            throw new Error('A data source, or a static data set is required');
        }

    }

    setColumns() {

        const { columns, store } = this.props;

        if (!columns) {
            throw new Error('A columns array is required');
        }

        else {
            store.dispatch(setColumns(columns));
        }
    }

    render() {

        const {
            columnState,
            data,
            dataSource,
            pageSize,
            plugins,
            events,
            reducerKeys,
            store
        } = this.props;

        const columns = columnState && columnState.columns ? columnState.columns : [];

        const editorComponent = editor.getComponent(plugins, store, events, selectionModel, editor, columns);

        const containerProps = {
            className: prefix(CLASS_NAMES.CONTAINER),
            reducerKeys
        };

        const messageProps = {
            reducerKeys,
            store
        };

        const bulkActionProps = {
            plugins,
            reducerKeys,
            selectionModel,
            store
        };

        const filterProps = {
            columnManager,
            pageSize,
            plugins,
            reducerKeys,
            store
        };

        const headerProps = {
            columnManager,
            columns,
            plugins,
            reducerKeys,
            selectionModel,
            store
        };

        const rowProps = {
            columnManager,
            columns,
            events,
            pageSize,
            plugins,
            reducerKeys,
            selectionModel,
            store
        };

        const tableProps = {
            className: prefix(CLASS_NAMES.TABLE),
            cellSpacing: 0,
            reducerKeys,
            store
        };

        const pagerProps = {
            dataSource,
            pageSize,
            plugins,
            reducerKeys,
            store
        };

        const loadingBarProps = {
            plugins,
            reducerKeys
        };

        return (
            <div>
                <div { ...containerProps }>
                    <Message { ...messageProps } />
                    <BulkActionToolbar { ...bulkActionProps } />
                    <FilterToolbar { ...filterProps } />
                    <table { ...tableProps }>
                        <Header { ...headerProps } />
                        <Row { ...rowProps } />
                        <PagerToolbar { ...pagerProps } />
                    </table>
                    <LoadingBar { ...loadingBarProps } />
                </div>
                    { editorComponent }
            </div>
        );
    }
}

export const columnManager = new ColumnManager();

export const editor = new Manager();

export const selectionModel = new Model();

function mapStateToProps(state, props) {
    return {
        columnState: stateGetter(state, props, 'grid', 'gridState')
    };
}

const ConnectedGrid = connect(mapStateToProps)(Grid);

export { Grid, ConnectedGrid };
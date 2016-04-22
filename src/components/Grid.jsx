import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ConnectedHeader as Header} from './layout/Header.jsx';
import { ConnectedFixedHeader as FixedHeader} from './layout/FixedHeader.jsx';
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
        columnState: PropTypes.object,
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        data: PropTypes.arrayOf(PropTypes.object),
        dataSource: PropTypes.any,
        events: PropTypes.object,
        height: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        pageSize: PropTypes.number,
        plugins: PropTypes.object,
        reducerKeys: PropTypes.object,
        store: PropTypes.object
    };

    static defaultProps = {
        columns: [],
        events: {},
        height: '500px',
        pageSize: 25,
        reducerKeys: {}
    };

    componentWillMount() {

        const { columns, dataSource, events, plugins, reducerKeys, store } = this.props;

        if (!store || !store.dispatch) {
            throw new Error('Component must be intialized with a valid store');
        }

        this.setColumns();

        this.setData();

        columnManager.init({
            plugins,
            store,
            events,
            selectionModel,
            editor,
            columns,
            dataSource,
            reducerKeys
        });

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
            height,
            pageSize,
            plugins,
            events,
            reducerKeys,
            store
        } = this.props;

        const columns = columnState && columnState.columns ? columnState.columns : [];

        const editorComponent = editor.getComponent(plugins, reducerKeys, store, events, selectionModel, editor, columns);

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
            store,
            visible: false
        };

        const fixedHeaderProps = Object.assign({
            visible: true
        }, headerProps);

        const tableContainerProps = {
            className: prefix(CLASS_NAMES.TABLE_CONTAINER),
            style: {
                height: height
            }
        };

        const rowProps = {
            columnManager,
            columns,
            editor,
            events,
            pageSize,
            plugins,
            reducerKeys,
            selectionModel,
            store
        };

        const tableProps = {
            className: prefix(CLASS_NAMES.TABLE, CLASS_NAMES.HEADER_HIDDEN),
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
            reducerKeys,
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
}

export const columnManager = new ColumnManager();

export const editor = new Manager();

export const selectionModel = new Model();

function mapStateToProps(state, props) {
    return {
        columnState: stateGetter(state, props, 'grid', 'gridState'),
        editorState: stateGetter(state, props, 'editor', 'editorState')
    };
}

const ConnectedGrid = connect(mapStateToProps)(Grid);

export { Grid, ConnectedGrid };
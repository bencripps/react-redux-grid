import React, { Component, PropTypes } from 'react';

import Row from './table-row/Row';
import { PlaceHolder } from './row/PlaceHolder';
import { isPluginEnabled } from '../../util/isPluginEnabled';
import { getCurrentRecords } from '../../util/getCurrentRecords';
import { getRowKey } from '../../util/getData';

export class TableRow extends Component {

    render() {

        const { columnManager,
            columns,
            dataSource,
            editor,
            editorState,
            emptyDataMessage,
            events,
            menuState,
            pageSize,
            pager,
            plugins,
            reducerKeys,
            selectedRows,
            selectionModel,
            stateKey,
            store
        } = this.props;

        const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

        const rows = getRowSelection(
            dataSource, pageIndex, pageSize, pager, plugins, stateKey, store
        );

        const rowComponents = getRows(
            columns, columnManager, editor, editorState, menuState, reducerKeys,
            rows, events, plugins, selectionModel, selectedRows, stateKey, store
            );

        const rowInsert = rowComponents
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
        columnManager: PropTypes.object.isRequired,
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        data: PropTypes.arrayOf(PropTypes.object),
        dataSource: PropTypes.object,
        editor: PropTypes.object,
        editorState: PropTypes.object,
        emptyDataMessage: PropTypes.string,
        events: PropTypes.object,
        menuState: PropTypes.object,
        pageSize: PropTypes.number,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        reducerKeys: PropTypes.object,
        selectedRows: PropTypes.object,
        selectionModel: PropTypes.object,
        stateKey: PropTypes.string,
        store: PropTypes.object.isRequired
    };

    static defaultProps = {
        emptyDataMessage: 'No Data Available'
    };

}

export const getRowComponents = (
    columns,
    columnManager,
    editor,
    editorState,
    menuState,
    reducerKeys,
    row,
    events,
    plugins,
    selectionModel,
    selectedRows,
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
                    columns,
                    columnManager,
                    editor,
                    editorState,
                    menuState,
                    reducerKeys,
                    row,
                    events,
                    plugins,
                    selectionModel,
                    selectedRows,
                    stateKey,
                    store,
                    index
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
    menuState,
    reducerKeys,
    rows,
    events,
    plugins,
    selectionModel,
    selectedRows,
    stateKey,
    store
) => {

    return Array.isArray(rows)
            ? rows.map((row,
             i) => getRowComponents(
                columns,
                columnManager,
                editor,
                editorState,
                menuState,
                reducerKeys,
                row,
                events,
                plugins,
                selectionModel,
                selectedRows,
                stateKey,
                store,
                i
            ))
            : null;
};

export default TableRow;

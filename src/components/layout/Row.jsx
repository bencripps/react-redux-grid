import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import Cell from './Cell.jsx';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import { getCurrentRecords } from '../../util/getCurrentRecords';
import '../../style/components/row.styl';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Row extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object),
        pageSize: React.PropTypes.number,
        plugins:  React.PropTypes.object,
        events: React.PropTypes.object,
        emptyDataMessage: 'No Data Available',
        selectionModel: React.PropTypes.object,
        store: React.PropTypes.func.isRequired
    }

    getPlaceHolder() {

        const { emptyDataMessage } = this.props;

        const rowProps = {
            className: prefix(CLASS_NAMES.ROW)
        };

        const tdProps = {
            className: prefix(CLASS_NAMES.ROW ,CLASS_NAMES.EMPTY_ROW)
        }

        return (
            <tr { ...rowProps }>
                <td colSpan="100%" { ...tdProps }>
                    { emptyDataMessage }
                </td>
            </tr>
        );

    }

    getRowComponents(row, events, selectedRows) {

        const { selectionModel } = this.props;

        const cells = Object.keys(row).map((k) => { 

            let cellProps = {
                cellData: row[k],
                key: keyGenerator(k),
                events: events
            }

            return <Cell { ...cellProps } />;

        });


        const id = keyFromObject(row);

        const isSelected = selectedRows ? selectedRows[id] : false;

        const rowProps = {
            key: id,
            className: prefix(CLASS_NAMES.ROW, isSelected ? selectionModel.defaults.activeCls : ''),
            onClick: this.handleRowSingleClickEvent.bind(this, events, row, id),
            onDoubleClick: this.handleRowDoubleClickEvent.bind(this, events, row, id)
        };

        selectionModel.updateCells(cells, id);

        return (
            <tr { ...rowProps }>
                { cells }
            </tr>
        );
    }

    handleRowDoubleClickEvent(events, rowData, rowId, reactEvent, id, browserEvent) {
        
        const { selectionModel } = this.props;

        if (selectionModel 
                && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.doubleclick) {
            
            selectionModel.handleSelectionEvent({
                eventType: reactEvent.type,
                eventData: reactEvent,
                id: rowId
            });
        }

        if (events.HANDLE_ROW_DOUBLE_CLICK) {
            events.HANDLE_ROW_DOUBLE_CLICK.call(this, rowData, rowId, reactEvent, id, browserEvent);
        }
    }

    handleRowSingleClickEvent(events, rowData, rowId, reactEvent, id, browserEvent) {

        const { selectionModel } = this.props;
        
        if (selectionModel 
                && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.singleclick) {
            
            selectionModel.handleSelectionEvent({
                eventType: reactEvent.type,
                eventData: reactEvent,
                id: rowId
            });
        }

        if (events.HANDLE_ROW_CLICK) {
            events.HANDLE_ROW_CLICK.call(this, rowData, rowId, reactEvent, id, browserEvent);
        }
    } 

    getRowSelection(dataSource, pageIndex, pageSize, pager, plugins, store) {

        if (!dataSource) {
            return false;
        }

        if (!plugins.PAGER 
            || !plugins.PAGER.enabled 
            || plugins.PAGER.pagingType === 'remote') {
            return dataSource.data;
        }

        return getCurrentRecords(dataSource, pageIndex, pageSize);
    }

    getRows(rows, events, selectedRows) {
        return Array.isArray(rows) ? rows.map((row) => 
            this.getRowComponents(row, events, selectedRows)) : null;
    }

    render() {

        const { 
            columns, 
            data, 
            events,
            plugins,
            pageSize,
            pager,
            dataSource,
            store,
            selectedRows
        } = this.props;

        const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;
        
        const rows = this.getRowSelection(dataSource, pageIndex, pageSize, pager, plugins, store);

        const rowComponents = this.getRows(rows, events, selectedRows);

        const rowInsert = rowComponents ? rowComponents : this.getPlaceHolder();

        return (
            <tbody>
                { rowInsert }
            </tbody>
        );
    }
}

function mapStateToProps(state) {
    return {
         pager: state.pager.get('pagerState'),
         dataSource: state.dataSource.get('gridData'),
         selectedRows: state.selection.get('selectedRows')
    };
}

export default connect(mapStateToProps)(Row);
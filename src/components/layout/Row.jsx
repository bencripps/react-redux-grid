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

    getRowComponents(row, events) {

        const cells = Object.keys(row).map(
            (k) => <Cell cellData={ row[k] } key={ keyGenerator(k) } />
        );

        const rowProps = {
            key: keyFromObject(row),
            className: prefix(CLASS_NAMES.ROW),
            onClick: events.HANDLE_CELL_CLICK.bind(this, row) || emptyFn,
            onDoubleClick: events.HANDLE_CELL_DOUBLE_CLICK.bind(this, row) || emptyFn
        };

        return (
            <tr { ...rowProps }>
                { cells }
            </tr>
        );
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

    getRows(rows, events) {
        return Array.isArray(rows) ? rows.map((row) => 
            this.getRowComponents(row, events)) : null;
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
            store
        } = this.props;

        const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;
        
        const rows = this.getRowSelection(dataSource, pageIndex, pageSize, pager, plugins, store);

        const rowComponents = this.getRows(rows, events);

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
         dataSource: state.dataSource.get('gridData')
    };
}

export default connect(mapStateToProps)(Row);
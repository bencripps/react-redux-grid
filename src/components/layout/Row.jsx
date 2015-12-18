import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import Cell from './Cell.jsx';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import '../../style/components/row.styl';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Row extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object),
        pageSize: React.PropTypes.number,
        plugins:  React.PropTypes.object,
        events: React.PropTypes.object
    }

    getRows(row, events) {

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

    getRowSelection(rows, pageIndex, pageSize) {
        const selectedRows = rows.slice(pageIndex * pageSize, pageIndex + 1 * pageSize);

        return selectedRows;
    }

    render() {

        const { 
            columns, 
            data, 
            events,
            plugins,
            pageSize,
            pager
        } = this.props;

        const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

        const allRows = data.map((row) => 
            this.getRows(row, events));
        
        const rows = plugins && plugins.PAGER && plugins.PAGER.enabled 
                ? this.getRowSelection(allRows, pageIndex, pageSize) : allRows;

        return (
            <tbody>
                { rows }
            </tbody>
        );
    }
}

function mapStateToProps(state) {
    return {
         pager: state.pager.get('pagerState')
    };
}

export default connect(mapStateToProps)(Row);
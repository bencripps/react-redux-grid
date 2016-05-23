import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { Column } from './header/Column.jsx';
import { EmptyHeader } from './header/EmptyHeader.jsx';

import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { prefix } from '../../util/prefix';
import { keyFromObject } from '../../util/keyGenerator';
import { throttle } from '../../util/throttle';
import { stateGetter } from '../../util/stateGetter';
import { CLASS_NAMES } from '../../constants/GridConstants';
import { resizeColumns } from '../../actions/GridActions';

const dragAndDropManager = new DragAndDropManager();

class FixedHeader extends Component {

    static propTypes = {
        columnManager: PropTypes.object.isRequired,
        columnState: PropTypes.object,
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        dataSource: PropTypes.object,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        reducerKeys: PropTypes.object,
        selectionModel: PropTypes.object,
        stateKey: PropTypes.string,
        store: PropTypes.object
    };

    constructor() {
        super();
        this.handleDrag = throttle(handleDrag, this, 5);
    }

    render() {

        const {
            columns,
            columnManager,
            dataSource,
            reducerKeys,
            selectionModel,
            stateKey,
            store,
            pager,
            plugins
        } = this.props;

        const visibleColumns = columns.filter((col) => !col.hidden);
        const headers = visibleColumns.map((col, i) => {

            const colProps = {
                scope: this,
                col,
                columns,
                columnManager,
                dataSource,
                dragAndDropManager,
                index: i,
                pager,
                store,
                stateKey,
                visibleColumns,
                key: `fixed-header-${i}`
            };

            return (
                <Column { ...colProps } />
                );
        });

        const tableProps = {
            className: prefix(CLASS_NAMES.TABLE, CLASS_NAMES.HEADER_FIXED),
            cellSpacing: 0
        };

        const headerProps = {
            className: prefix(CLASS_NAMES.HEADER)
        };

        if (selectionModel) {
            selectionModel.updateCells(headers, columns, 'header', null, stateKey);
        }

        columnManager.addActionColumn({
            cells: headers,
            type: 'header',
            id: keyFromObject(headers),
            reducerKeys,
            stateKey
        });

        addEmptyInsert(headers, visibleColumns, plugins);

        if (document.querySelector('.react-grid-header-fixed')) {
            // to align the action icons due to scrollbar
            const fixed = document.querySelector('.react-grid-header-fixed').offsetWidth;
            const hidden = document.querySelector('.react-grid-header-hidden').offsetWidth;

            headers.push(
                <th
                    key="colum-adjuster"
                    style= { { width: (fixed - hidden) + 'px' }}
                />
            );
        }

        return (
            <table { ...tableProps }>
                <thead>
                    <tr { ...headerProps }>
                        { headers }
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        );
    }
}

export const addEmptyInsert = (headers, visibleColumns, plugins) => {
    if (!plugins) {
        return false;
    }

    const { GRID_ACTIONS } = plugins;

    if (visibleColumns.length === 0) {

        if (GRID_ACTIONS
            && GRID_ACTIONS.menu
            && GRID_ACTIONS.menu.length > 0) {

            headers.unshift(<EmptyHeader key="empty-header" />);
        }

        else {
            headers.push(<EmptyHeader key="empty-header" />);
        }
    }

};

export const handleDrag = (scope, columns, id, columnManager, store, nextColumnKey, stateKey, reactEvent) => {

    const header = reactEvent.target.parentElement.parentElement;
    const columnNode = reactEvent.target.parentElement;
    const headerNextElementSibling = columnNode.nextElementSibling;
    const columnOffsetLeft = columnNode.getBoundingClientRect().left;
    const headerWidth = parseFloat(window.getComputedStyle(header).width, 10);

    const xCoord = reactEvent.clientX || window.reactGridXcoord;
    const computedWidth = (xCoord - columnOffsetLeft) / headerWidth;
    const totalWidth = parseFloat(columnNode.style.width, 10)
        + parseFloat(headerNextElementSibling.style.width, 10);

    let width = computedWidth * 100;
    let nextColWidth = Math.abs(width - totalWidth);

    const isInvalidDrag = width + nextColWidth > totalWidth;

    if (nextColWidth < 0 || width < 0) {
        return false;
    }

    if (nextColWidth < columnManager.config.minColumnWidth) {
        nextColWidth = columnManager.config.minColumnWidth;
        width = totalWidth - columnManager.config.minColumnWidth;
    }

    else if (width < columnManager.config.minColumnWidth) {
        width = columnManager.config.minColumnWidth;
        nextColWidth = totalWidth - columnManager.config.minColumnWidth;
    }

    else if (isInvalidDrag) {
        return false;
    }

    store.dispatch(resizeColumns(width, id, {
        id: nextColumnKey,
        width: nextColWidth
    }, columns, stateKey));

};

export const handleColumnClick = (col) => {
    if (col.HANDLE_CLICK) {
        col.HANDLE_CLICK.apply(this, arguments);
    }
};

function mapStateToProps(state, props) {
    return {
        columnState: stateGetter(state, props, 'grid', props.stateKey),
        dataSource: stateGetter(state, props, 'dataSource', props.stateKey),
        pager: stateGetter(state, props, 'pager', props.stateKey)
    };
}

const ConnectedFixedHeader = connect(mapStateToProps)(FixedHeader);

export { FixedHeader, ConnectedFixedHeader };

export default connect(mapStateToProps)(FixedHeader);
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Column } from './header/Column.jsx';
import { EmptyHeader } from './header/EmptyHeader.jsx';

import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { prefix } from '../../util/prefix';
import { throttle } from '../../util/throttle';
import { stateGetter } from '../../util/stateGetter';
import { CLASS_NAMES } from '../../constants/GridConstants';
import { resizeColumns } from '../../actions/GridActions';

const dragAndDropManager = new DragAndDropManager();

class Header extends Component {

    static propTypes = {
        columnManager: PropTypes.object.isRequired,
        columnState: PropTypes.object,
        columns: PropTypes.arrayOf(PropTypes.Object).isRequired,
        dataSource: PropTypes.object,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        selectionModel: PropTypes.object,
        store: PropTypes.object
    };

    constructor() {
        super();
        this.handleDrag = throttle(handleDrag, this, 250);
    }

    render() {

        const { columns, columnManager, dataSource, selectionModel, store, pager, plugins } = this.props;
        const visibleColumns = columns.filter((col) => !col.hidden);
        const headers = visibleColumns.map((col, i) => {

            const headerProps = {
                scope: this,
                col,
                columns,
                visibleColumns,
                columnManager,
                dataSource,
                dragAndDropManager,
                pager,
                store,
                index: i
            };

            return (
                <Column { ...headerProps } />
                );
        });

        const headerProps = {
            className: prefix(CLASS_NAMES.HEADER)
        };

        if (selectionModel) {
            selectionModel.updateCells(headers, columns, 'header');
        }

        columnManager.addActionColumn(headers, 'header');

        addEmptyInsert(headers, visibleColumns, plugins);

        return (
            <thead>
                <tr { ...headerProps }>
                    { headers }
                </tr>
            </thead>
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

            headers.splice(1, 0, <EmptyHeader />);
        }

        else {
            headers.push(<EmptyHeader />);
        }
    }

};

export const handleDrag = (scope, columns, id, columnManager, store, nextColumnKey, reactEvent) => {
    const mousePosition = reactEvent.pageX;
    const header = reactEvent.target.parentElement.parentElement;
    const columnNode = ReactDOM.findDOMNode(reactEvent.target.parentElement);
    const headerNextElementSibling = ReactDOM.findDOMNode(columnNode.nextElementSibling);
    const columnOffsetLeft = columnNode.getBoundingClientRect().left;
    const headerWidth = parseFloat(window.getComputedStyle(header).width, 10);
    const computedWidth = (mousePosition - columnOffsetLeft) / headerWidth;
    const totalWidth = parseFloat(columnNode.style.width, 10)
        + parseFloat(headerNextElementSibling.style.width, 10);
    let width = computedWidth * 100;

    let nextColWidth = Math.abs(width - totalWidth);

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

    store.dispatch(resizeColumns(width, id, {
        id: nextColumnKey,
        width: nextColWidth
    }, columns));

};

export const handleColumnClick = (col) => {
    if (col.HANDLE_CLICK) {
        col.HANDLE_CLICK.apply(this, arguments);
    }
};

export const getWidth = (col, key, columns, defaultColumnWidth) => {

    const visibleColumns = columns.filter((_col) => !_col.hidden);
    const lastColumn = visibleColumns[visibleColumns.length - 1];
    const isLastColumn = lastColumn && lastColumn.name === col.name;
    const totalWidth = columns.reduce((a, _col) => {
        if (_col.hidden) {
            return a + 0;
        }
        return a + parseFloat(_col.width || 0);
    }, 0);

    let width = col.width || defaultColumnWidth;

    if (isLastColumn
            && totalWidth !== 0
            && totalWidth < 100) {
        width = `${100 - (totalWidth - parseFloat(width))}%`;
    }

    return width;

};

function mapStateToProps(state, props) {
    return {
        columnState: stateGetter(state, props, 'grid', 'gridState'),
        dataSource: stateGetter(state, props, 'dataSource', 'gridData'),
        pager: stateGetter(state, props, 'pager', 'pagerState')
    };
}

const ConnectedHeader = connect(mapStateToProps)(Header);

export { Header, ConnectedHeader };

export default connect(mapStateToProps)(Header);
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import { prefix } from '../../util/prefix';
import { throttle } from '../../util/throttle';
import { CLASS_NAMES, SORT_DIRECTIONS, SORT_METHODS } from '../../constants/GridConstants';
import { reorderColumn } from '../../actions/core/ColumnManager';
import { resizeColumns, setSortDirection } from '../../actions/GridActions';

class Header extends Component {

    static propTypes = {
        columnManager: PropTypes.object.isRequired,
        columnStates: PropTypes.object,
        columns: PropTypes.arrayOf(PropTypes.Object).isRequired,
        dataSource: PropTypes.object,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        selectionModel: PropTypes.object,
        store: PropTypes.object
    }

    constructor() {
        super();
        this.handleDrag = throttle(this.handleDrag, this, 250);
    }

    isColumnResizable(col, columnManager) {

        if (col.resizable !== undefined) {
            return col.resizable;
        }

        else if (columnManager.config.resizable !== undefined) {
            return columnManager.config.resizable;
        }

        else {
            return columnManager.config.defaultResizable;
        }
    }

    isSortable(col, columnManager) {

        if (col.sortable !== undefined) {
            return col.sortable;
        }

        else if (columnManager.config.sortable.enabled !== undefined) {
            return columnManager.config.sortable.enabled;
        }

        else {
            return columnManager.config.defaultSortable;
        }
    }

    handleDrop(droppedIndex, columns, reactEvent) {

        const { store } = this.props;

        try {
            const colData = reactEvent
                && reactEvent.dataTransfer.getData
                ? JSON.parse(reactEvent.dataTransfer.getData('Text'))
                : null;

            if (colData) {
                store.dispatch(reorderColumn(colData.index, droppedIndex, columns));
            }

        }

        catch(e) {
            console.warn('Invalid drop');
        }

    }

    handleDrag(columns, id, columnManager, store, nextColumnKey, reactEvent) {

        const mousePosition = reactEvent.pageX;
        const header = reactEvent.target.parentElement.parentElement;
        const columnNode = reactEvent.target.parentElement;
        const columnOffsetLeft = columnNode.getBoundingClientRect().left;
        const headerWidth = parseFloat(window.getComputedStyle(header).width, 10);
        const computedWidth = (mousePosition - columnOffsetLeft) / headerWidth;
        const totalWidth = parseFloat(this.refs[id].style.width, 10)
            + parseFloat(this.refs[nextColumnKey].style.width, 10);
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

    }

    handleColumnClick(col) {

        if (col.HANDLE_CLICK) {
            col.HANDLE_CLICK.apply(this, arguments);
        }
    }

    handleSort(columns, col, direction, columnManager) {
        const { store, dataSource, pager } = this.props;

        store.dispatch(setSortDirection(columns, col.id, direction));

        if (columnManager.config.sortable.method.toUpperCase() === SORT_METHODS.LOCAL) {
            columnManager.doSort(SORT_METHODS.LOCAL, col, direction, dataSource);
        }

        else if (columnManager.config.sortable.method.toUpperCase() === SORT_METHODS.REMOTE) {
            columnManager.doSort(SORT_METHODS.REMOTE, col, direction, dataSource, pager);
        }

        else {
            console.warn('Sort method not defined!');
        }
    }

    getSortHandle(col, columns, columnManager) {

        const direction = col.sortDirection
            || col.defaultSortDirection
            || SORT_DIRECTIONS.ASCEND;
        const visibile = col.sortDirection !== undefined
            || columnManager.config.sortable.enabled
            ? CLASS_NAMES.SORT_HANDLE_VISIBLE : '';

        const handleProps = {
            className: prefix(CLASS_NAMES.SORT_HANDLE, direction.toLowerCase(), visibile),
            onClick: this.handleSort.bind(this, columns, col, direction, columnManager)
        };

        return (
            <span { ...handleProps } />
        );
    }

    getDragHandle(col, dragAndDropManager) {
        const handleProps = dragAndDropManager.initDragable();

        return (
            <span { ...handleProps } />
        );
    }

    getWidth(col, key, columns, defaultColumnWidth) {

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

    }

    getHeaderText(col, index, columnManager, dragAndDropManager) {

        const innerHTML = col.renderer ? col.renderer(col) : col.name;
        const draggable = col.moveable !== undefined ? col.moveable : columnManager.config.moveable;

        const spanProps = dragAndDropManager.initDragable({
            draggable: draggable,
            className: draggable ? prefix(CLASS_NAMES.DRAGGABLE_COLUMN, CLASS_NAMES.COLUMN) : prefix(CLASS_NAMES.COLUMN),
            onDrag: (reactEvent) => {
                reactEvent.preventDefault();
                reactEvent.stopPropagation();
            },
            onDragStart: (reactEvent) => {

                const data = {
                    key: keyFromObject(col),
                    index: index
                };

                reactEvent.dataTransfer.setData('Text', JSON.stringify(data));
            }
        });

        return (
            <span { ...spanProps } >
                { innerHTML }
            </span>
        );
    }

    getHeader(col, dragAndDropManager, columns, index) {

        if (col.hidden) {
            return false;
        }

        const { columnManager, store } = this.props;

        const isResizable = this.isColumnResizable(col, columnManager);

        const isSortable = this.isSortable(col, columnManager);

        const visibleColumns = columns.filter((_col) => !_col.hidden);

        const key = keyGenerator(col.name, col.value);

        const nextColumnKey = visibleColumns && visibleColumns[index + 1]
            ? keyGenerator(visibleColumns[index + 1].name, visibleColumns[index + 1].value) : null;

        const sortHandle = isSortable
            ? this.getSortHandle(col, columns, columnManager) : null;

        const dragHandle = isResizable
            ? this.getDragHandle(col, dragAndDropManager) : null;

        const headerProps = {
            className: `${col.className} ${isResizable ? prefix('resizable') : ''}`,
            onClick: this.handleColumnClick.bind(this, col),
            onDrag: this.handleDrag.bind(this, columns, key, columnManager, store, nextColumnKey),
            onDrop: this.handleDrop.bind(this, index, columns),
            key,
            ref: key,
            style: {
                width: this.getWidth(col, key, columns, columnManager.config.defaultColumnWidth, index)
            }
        };

        const innerHTML = this.getHeaderText(col, index, columnManager, dragAndDropManager);

        return (
            <th { ...headerProps } >
                { innerHTML }
                { sortHandle }
                { dragHandle }
            </th>
        );
    }

    getEmptyHeader() {

        const headerProps = {
            style: {
                width: '100%'
            }
        };

        return (
            <th { ...headerProps } />
        );
    }

    addEmptyInsert(headers, visibleColumns) {

        const { GRID_ACTIONS } = this.props.plugins;

        if (visibleColumns.length === 0) {

            if (GRID_ACTIONS
                && GRID_ACTIONS.menu
                && GRID_ACTIONS.menu.length > 0) {

                headers.splice(1, 0, this.getEmptyHeader());
            }

            else {
                headers.push(this.getEmptyHeader());
            }
        }

    }

    render() {

        const { columns, selectionModel, columnManager } = this.props;
        const dragAndDropManager = new DragAndDropManager();
        const visibleColumns = columns.filter((col) => !col.hidden);
        const headers = visibleColumns.map((col, i) => this.getHeader(col, dragAndDropManager, visibleColumns, i));
        const headerProps = {
            className: prefix(CLASS_NAMES.HEADER)
        };

        selectionModel.updateCells(headers, columns, 'header');

        columnManager.addActionColumn(headers, 'header');

        this.addEmptyInsert(headers, visibleColumns);

        return (
            <thead>
                <tr { ...headerProps }>
                    { headers }
                </tr>
            </thead>
        );
    }
}

function mapStateToProps(state) {
    return {
        columnStates: state.columnManager.get('columnStates'),
        dataSource: state.dataSource.get('gridData'),
        pager: state.pager.get('pagerState')
    };
}

export default connect(mapStateToProps)(Header);
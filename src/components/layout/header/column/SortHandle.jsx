import React, { PropTypes } from 'react';

import { setSortDirection } from '../../../../actions/GridActions';

import { prefix } from './../../../../util/prefix';
import { CLASS_NAMES, SORT_DIRECTIONS, SORT_METHODS } from './../../../../constants/GridConstants';

export const SortHandle = ({ col, columns, columnManager, dataSource, pager, store }) => {

    const direction = col.sortDirection
        || col.defaultSortDirection
        || SORT_DIRECTIONS.ASCEND;
    const visibile = col.sortDirection !== undefined
        || columnManager.config.sortable.enabled
        ? CLASS_NAMES.SORT_HANDLE_VISIBLE : '';

    const handleProps = {
        className: prefix(CLASS_NAMES.SORT_HANDLE, direction.toLowerCase(), visibile),
        onClick: handleSort.bind(this, columns, col, columnManager, dataSource, direction, pager, store)
    };

    return (
        <span { ...handleProps } />
    );
};

SortHandle.propTypes = {
    col: PropTypes.object,
    columnManager: PropTypes.object,
    columns: PropTypes.array,
    dataSource: PropTypes.object,
    pager: PropTypes.object,
    store: PropTypes.object
};

export const handleSort = (columns, col, columnManager, dataSource, direction, pager, store) => {

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
};
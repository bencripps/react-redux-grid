import React, { PropTypes } from 'react';

import { prefix } from './../../../../util/prefix';
import { CLASS_NAMES } from './../../../../constants/GridConstants';

export const SortHandle = ({ direction, sortHandleCls }) => {

    const handleProps = {
        className: prefix(
            CLASS_NAMES.SORT_HANDLE, direction.toLowerCase(), sortHandleCls
        )
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
    direction: PropTypes.string,
    pager: PropTypes.object,
    sortHandleCls: PropTypes.string,
    store: PropTypes.object
};
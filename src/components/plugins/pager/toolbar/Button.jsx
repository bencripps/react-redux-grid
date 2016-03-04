import React, { PropTypes } from 'react';
import { prefix } from './../../../../util/prefix';
import { CLASS_NAMES } from './../../../../constants/GridConstants';

import {
    setPage,
    setPageAsync
} from './../../../../actions/plugins/pager/PagerActions';

export const Button = ({
        BUTTON_TYPES, type, pageIndex, pageSize, plugins,
        currentRecords, total, dataSource, backButtonText, nextButtonText, store
    }) => {

    const buttonProps = {
        onClick: handleButtonClick.bind(this, type, pageIndex, pageSize, dataSource, BUTTON_TYPES, plugins, store),
        children: type === BUTTON_TYPES.NEXT ? nextButtonText : backButtonText,
        disabled: isButtonDisabled(type, pageIndex, pageSize, currentRecords, total, BUTTON_TYPES),
        className: prefix(CLASS_NAMES.BUTTONS.PAGER, type.toLowerCase())
    };

    return (
        <button { ...buttonProps } />
    );
};

export const handleButtonClick = (type, pageIndex, pageSize, dataSource, BUTTON_TYPES, plugins, store) => {

    const PAGER = plugins.PAGER;

    if (PAGER.pagingType === 'local') {
        store.dispatch(setPage(pageIndex, type, BUTTON_TYPES));
    }

    else if (PAGER.pagingType === 'remote' && dataSource) {
        store.dispatch(setPageAsync(pageIndex, pageSize, type, BUTTON_TYPES, dataSource));
    }

    else {
        console.warn('Please configure paging plugin pagingType to local if no pagingSource is provided');
    }
};

export const isButtonDisabled = (type, pageIndex, pageSize, currentRecords, total, BUTTON_TYPES) => {

    if (type === BUTTON_TYPES.BACK) {
        return pageIndex === 0;
    }
    else if (type === BUTTON_TYPES.NEXT) {
        return currentRecords < pageSize || (pageIndex * pageSize) + currentRecords === total;
    }
};

Button.propTypes = {
    BUTTON_TYPES: PropTypes.object,
    backButtonText: PropTypes.string,
    currentRecords: PropTypes.number,
    dataSource: PropTypes.any,
    nextButtonText: PropTypes.string,
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
    plugins: PropTypes.object,
    store: PropTypes.object,
    total: PropTypes.number,
    type: PropTypes.string
};

Button.defaultProps = {
    BUTTON_TYPES: {
        NEXT: 'NEXT',
        BACK: 'BACK'
    },
    nextButtonText: 'Next',
    backButtonText: 'Back'
};
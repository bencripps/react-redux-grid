import PropTypes from 'prop-types';
import React from 'react';
import { prefix } from './../../../../util/prefix';
import { gridConfig } from './../../../../constants/GridConstants';

import {
    setPage,
    setPageAsync,
    setPageIndexAsync
} from './../../../../actions/plugins/pager/PagerActions';

export const Button = ({
        BUTTON_TYPES,
        backButtonText,
        currentRecords,
        dataSource,
        nextButtonText,
        pageIndex,
        pageSize,
        plugins,
        stateKey,
        store,
        total,
        type
    }) => {

    const { CLASS_NAMES } = gridConfig();

    const buttonProps = {
        onClick: handleButtonClick.bind(
            this,
            type,
            pageIndex,
            pageSize,
            dataSource,
            BUTTON_TYPES,
            plugins,
            stateKey,
            store
        ),
        children: type === BUTTON_TYPES.NEXT ? nextButtonText : backButtonText,
        disabled: isButtonDisabled(
            type, pageIndex, pageSize, currentRecords, total, BUTTON_TYPES
        ),
        className: prefix(CLASS_NAMES.BUTTONS.PAGER, type.toLowerCase())
    };

    return (
        <button { ...buttonProps } />
    );
};

export const handleButtonClick = (
    type,
    pageIndex,
    pageSize,
    dataSource,
    BUTTON_TYPES,
    plugins,
    stateKey,
    store
) => {

    const PAGER = plugins.PAGER;

    if (PAGER.pagingType === 'local') {
        store.dispatch(
            setPage({ index: pageIndex, type, BUTTON_TYPES, stateKey })
        );
    }

    else if (PAGER.pagingType === 'remote' && dataSource) {

        if (typeof dataSource === 'string') {
            return store.dispatch(
                setPageAsync({
                    index: pageIndex,
                    pageSize,
                    type,
                    BUTTON_TYPES,
                    dataSource,
                    stateKey
                })
            );
        }

        const nextIndex = type === BUTTON_TYPES.NEXT
            ? pageIndex + 1
            : (pageIndex - 1 || 0);

        return store.dispatch(
            setPageIndexAsync({
                pageIndex: nextIndex,
                pageSize,
                type,
                BUTTON_TYPES,
                dataSource,
                stateKey
            })
        );
    }

    else {
        /* eslint-disable no-console */
        console.warn([
            'Please configure paging plugin pagingType',
            'to local if no pagingSource is provided'
        ].join(' '));
    }
};

export const isButtonDisabled = (
    type, pageIndex, pageSize, currentRecords, total, BUTTON_TYPES
) => {

    if (type === BUTTON_TYPES.BACK) {
        return pageIndex === 0;
    }
    else if (type === BUTTON_TYPES.NEXT) {
        return (currentRecords < pageSize && total < currentRecords)
            || (pageIndex * pageSize) + currentRecords === total;
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
    stateKey: PropTypes.string,
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

import React, { PropTypes } from 'react';

import { prefix } from './../../../../util/prefix';
import filterUtils from './../../../../util/filterUtils';
import { CLASS_NAMES, FILTER_METHODS, DEFAULT_PAGE_SIZE } from './../../../../constants/GridConstants';
import {
    doLocalFilter,
    clearFilterLocal,
    doRemoteFilter,
    showFilterMenu
} from './../../../../actions/plugins/filter/FilterActions';

export const Button = ({
    buttonText, buttonTypes, dataSource, filter,
    plugins, pager, type, store }) => {

    const buttonProps = {
        text: buttonText[type],
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.BUTTON,
        type === buttonTypes.CANCEL ? CLASS_NAMES.SECONDARY_CLASS : ''),
        onClick: handleButtonClick.bind(this, buttonTypes, dataSource,
            filter, plugins, pager, type, store)
    };

    return (
        <button { ...buttonProps } >
            { buttonProps.text }
        </button>
    );

};

Button.propTypes = {
    buttonText: PropTypes.string,
    buttonTypes: PropTypes.object,
    dataSource: PropTypes.object,
    filter: PropTypes.object,
    pager: PropTypes.object,
    plugins: PropTypes.object,
    store: PropTypes.object.isRequired,
    type: PropTypes.object
};

Button.defaultProps = {

};

export const handleButtonClick = (buttonTypes, dataSource, filter, plugins, pager, type, store) => {

    const method = plugins.FILTER_CONTAINER.method
        ? plugins.FILTER_CONTAINER.method.toUpperCase()
        : FILTER_METHODS.LOCAL;
    const filterSource = plugins.FILTER_CONTAINER.filterSource;

    const pageSize = pager ? pager.pageSize : DEFAULT_PAGE_SIZE;
    let pageIndex = 0;

    if (pager) {
        pageIndex = pager.pageIndex;
    }

    if (type === buttonTypes.CANCEL) {
        store.dispatch(showFilterMenu(true, true));
        store.dispatch(clearFilterLocal(dataSource));
    }

    else if (type === buttonTypes.SUBMIT) {

        if (method === FILTER_METHODS.LOCAL) {
            store.dispatch(doLocalFilter(
                filterUtils.byMenu(filter.filterMenuValues, dataSource))
            );
        }

        else if (method === FILTER_METHODS.REMOTE) {
            store.dispatch(doRemoteFilter(filter.filterMenuValues, pageIndex, pageSize, filterSource));
        }

    }
};
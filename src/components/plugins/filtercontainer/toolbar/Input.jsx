import React, { PropTypes } from 'react';

import { prefix } from './../../../../util/prefix';
import {
    CLASS_NAMES, KEYBOARD_MAP, FILTER_METHODS
} from './../../../../constants/GridConstants';

import filterUtils from './../../../../util/filterUtils';
import { setFilter,
    doLocalFilter,
    doRemoteFilter
} from './../../../../actions/plugins/filter/FilterActions';

export const Input = ({
    dataSource,
    method,
    placeHolderText,
    inputValue,
    plugins,
    pager,
    pageSize,
    store
}) => {

    const inputProps = {
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.INPUT),
        placeholder: placeHolderText,
        onChange: setFilterValue.bind(this, store),
        onKeyUp: handleKeyUp.bind(this, inputValue, method, dataSource, plugins,
            pager, pageSize, store),
        value: inputValue
    };

    return <input { ...inputProps } />;
};

export const handleKeyUp = (
    value, method, dataSource, plugins, pager, pageSize, store, reactEvent
) => {

    const filterSource = plugins.FILTER_CONTAINER;

    const pageIndex = pager ? pager.pageIndex : 0;

    if (reactEvent.which !== KEYBOARD_MAP.ENTER) {
        return false;
    }

    if (method === FILTER_METHODS.LOCAL) {
        store.dispatch(doLocalFilter(
            filterUtils.byKeyword(value, dataSource))
        );
    }

    else if (method === FILTER_METHODS.REMOTE) {
        store.dispatch(doRemoteFilter({
            keyword: value
        }, pageIndex, pageSize, filterSource));
    }

    else {
        console.warn('The filter method has not been created!');
    }

};

export const setFilterValue = (store, reactEvent) => {

    const value = reactEvent.target.value;

    store.dispatch(setFilter(value));
};

Input.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any
};

Input.defaultProps = {

};

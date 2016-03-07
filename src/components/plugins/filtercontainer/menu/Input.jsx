import React, { PropTypes } from 'react';

import { prefix } from './../../../../util/prefix';
import { CLASS_NAMES } from './../../../../constants/GridConstants';
import { keyFromObject } from './../../../../util/keyGenerator';

import {
    setFilterMenuValues
} from './../../../../actions/plugins/filter/FilterActions';

export const Input = ({ filter, field, store }) => {

    const value = filter
        && filter.filterMenuValues
        && filter.filterMenuValues[field.name]
        ? filter.filterMenuValues[field.name]
        : null;

    const containerProps = {
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.FIELD.CONTAINER),
        key: keyFromObject(field, ['container'])
    };

    const inputProps = {
        type: field.type,
        key: keyFromObject(field),
        placeholder: field.placeholder,
        name: field.name,
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.FIELD.INPUT),
        onChange: handleDynamicInputChange.bind(this, filter, store),
        value
    };

    const labelProps = {
        key: keyFromObject(inputProps),
        text: field.label,
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.FIELD.LABEL)
    };

    return (
        <span { ...containerProps }>
            <label { ...labelProps }>
                { labelProps.text }
            </label>
            <input { ...inputProps } />
        </span>
    );
};

Input.propTypes = {
    field: PropTypes.object,
    filter: PropTypes.object,
    store: PropTypes.object
};

Input.defaultProps = {

};

export const handleDynamicInputChange = (filter, store, reactEvent) => {

    const name = reactEvent.target.name;
    const value = reactEvent.target.value;
    const existingFilter = filter && filter.filterMenuValues
        ? filter.filterMenuValues : {};
    const newFilterValues = Object.assign(existingFilter, {[name]: value});

    if (!name) {
        console.warn('All registered inputs require a name property for dynamic filtering!');
        return false;
    }

    store.dispatch(setFilterMenuValues(newFilterValues));
};
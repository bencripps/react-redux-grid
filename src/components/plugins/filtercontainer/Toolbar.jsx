import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import FilterMenu from './Menu.jsx';
import { Input } from './toolbar/Input.jsx';
import { SearchButton } from './toolbar/SearchButton.jsx';
import { ClearButton } from './toolbar/ClearButton.jsx';
import { FilterButton } from './toolbar/FilterButton.jsx';

import { prefix } from '../../../util/prefix';

import filterUtils from '../../../util/filterUtils';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES, FILTER_METHODS, KEYBOARD_MAP } from '../../../constants/GridConstants';
import { setFilter,
    doLocalFilter,
    doRemoteFilter
} from '../../../actions/plugins/filter/FilterActions';

export const FilterToolbar = ({ columnManager, dataSource, defaultSortMethod, filter,
    placeHolderText, pager, pageSize, plugins, store}) => {

    const customComponent = plugins
        && plugins.FILTER_CONTAINER.component
        ? plugins.FILTER_CONTAINER.component
        : null;

    if (customComponent) {
        return customComponent;
    }

    const toolbar = plugins
        && plugins.FILTER_CONTAINER
        && plugins.FILTER_CONTAINER.enabled
        ? getToolbar(columnManager, dataSource, defaultSortMethod, filter,
            placeHolderText, pager, pageSize, plugins, store)
        : <div />;

    return toolbar;
};

FilterToolbar.propTypes = {
    columnManager: PropTypes.object,
    dataSource: PropTypes.object,
    defaultSortMethod: PropTypes.string,
    filter: PropTypes.object,
    pageSize: PropTypes.number,
    pager: PropTypes.object,
    placeHolderText: PropTypes.string,
    plugins: PropTypes.object,
    selectionModel: PropTypes.object,
    store: PropTypes.object.isRequired
};

FilterToolbar.defaultProps = {
    defaultSortMethod: FILTER_METHODS.LOCAL,
    placeHolderText: 'Search'
};

export const getToolbar = (columnManager, dataSource, defaultSortMethod,
    filter, placeHolderText, pager, pageSize, plugins, store) => {

    const dataUri = columnManager.config.dataSource || '';

    const filterMenuShown = plugins
        && plugins.FILTER_CONTAINER
        && plugins.FILTER_CONTAINER.enableFilterMenu
        && filter
        && filter.filterMenuShown;

    const method = plugins
        && plugins.FILTER_CONTAINER
        && plugins.FILTER_CONTAINER.method
        ? plugins.FILTER_CONTAINER.method.toUpperCase()
        : defaultSortMethod;

    let inputValue = filter && filter.filterValue
        ? filter.filterValue : '';

    if (filter
        && filter.filterMenuValues
        && Object.keys(filter.filterMenuValues).length > 0) {
        inputValue = JSON.stringify(filter.filterMenuValues);
    }

    const applicableButton = inputValue && inputValue.length > 0
        ? <ClearButton { ...{ dataUri, method, store } } />
        : <SearchButton />;

    const filterMenuButton = plugins.FILTER_CONTAINER.enableFilterMenu
        ? <FilterButton { ...{ filter, filterMenuShown, store } }/>
        : null;

    const filterMenu = filterMenuShown
        ? <FilterMenu { ...{ store, plugins } } />
        : null;

    return (
        <div { ...{ className: prefix(CLASS_NAMES.FILTER_CONTAINER.CONTAINER) } }>
            <Input { ...{ dataSource, method, placeHolderText,
    inputValue, plugins, pager, pageSize, store } }
            />
            <div { ...{ className: prefix(CLASS_NAMES.FILTER_CONTAINER.BUTTON_CONTAINER) } }>
                { applicableButton }
                { filterMenuButton }
            </div>
            { filterMenu }
        </div>
    );
};

export const setFilterValue = (store, reactEvent) => {

    const value = reactEvent.target.value;

    store.dispatch(setFilter(value));
};

export const handleKeyUp = (value, method, dataSource, plugins, pager, pageSize, store, reactEvent) => {

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

function mapStateToProps(state, props) {

    return {
        dataSource: stateGetter(state, props, 'dataSource', 'gridData'),
        selectedRows: stateGetter(state, props, 'selection', 'selectedRows'),
        filter: stateGetter(state, props, 'filter', 'filterState'),
        pager: stateGetter(state, props, 'pager', 'pagerState')
    };
}

export default connect(mapStateToProps)(FilterToolbar);
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import FilterMenu from './Menu.jsx';
import filterUtils from '../../../util/filterUtils';
import { keyFromObject } from '../../../util/keygenerator';
import { CLASS_NAMES, FILTER_METHODS, KEYBOARD_MAP } from '../../../constants/GridConstants';
import { setFilter,
    doLocalFilter,
    clearFilterRemote,
    clearFilterLocal,
    doRemoteFilter,
    showFilterMenu
} from '../../../actions/plugins/filter/FilterActions';

class FilterToolbar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        plugins: React.PropTypes.object.isRequired,
        selectionModel: React.PropTypes.object.isRequired,
        placeHolderText: 'Search',
        defaultSortMethod: FILTER_METHODS.LOCAL
    }

    getToolbar(filter) {

        const { plugins, placeHolderText, columnManager, dataSource, store } = this.props;

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
            : this.props.defaultSortMethod;

        const inputValue = filter && filter.filterValue
            ? filter.filterValue : '';

        const containerProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.CONTAINER)
        };

        const inputProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.INPUT),
            placeholder: placeHolderText,
            onChange: this.setFilterValue.bind(this),
            onKeyUp: this.handleKeyUp.bind(this, inputValue, method, dataSource),
            value: inputValue
        };

        const buttonContainerProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.BUTTON_CONTAINER)
        }

        const searchButtonProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.SEARCH_BUTTON)
        };

        const clearButtonProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.CLEAR_BUTTON),
            onClick: this.clearFilter.bind(this, dataUri, method)
        }

        const filterMenuButtonProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU_BUTTON, 
                filterMenuShown ? CLASS_NAMES.ACTIVE_CLASS : ''),
            onClick: this.handleFilterMenuButtonClick.bind(this)
        };

        const filterMenuProps = {
            store,
            plugins
        };

        const applicableButton = inputValue && inputValue.length > 0
            ? <i { ...clearButtonProps } />
            : <i { ...searchButtonProps } />;

        const filterMenuButton = plugins.FILTER_CONTAINER.enableFilterMenu
            ? <i { ...filterMenuButtonProps } />
            : null;

        const filterMenu = filterMenuShown
            ? <FilterMenu { ...filterMenuProps } />
            : null;

        return (
            <div { ...containerProps }>
                <input { ...inputProps } />
                <div { ...buttonContainerProps } >
                    { applicableButton }
                    { filterMenuButton }
                </div>
                { filterMenu }
            </div>
        );
    }

    handleFilterMenuButtonClick() {
        const { store, filter } = this.props;
        const shown = filter ? filter.filterMenuShown : false;
        store.dispatch(showFilterMenu(shown));
    }

    setFilterValue(reactEvent) {
        const { store } = this.props;
        const value = reactEvent.target.value;
        
        store.dispatch(setFilter(value));
    }

    clearFilter(dataSource, method) {
        const { store } = this.props;

        if (method === FILTER_METHODS.LOCAL) {
            store.dispatch(clearFilterLocal()); 
        }

        else if (method === FILTER_METHODS.REMOTE) {
            store.dispatch(clearFilterRemote(dataSource)); 
        }

        store.dispatch(setFilter(''));
    }

    handleKeyUp(value, method, dataSource, reactEvent) {

        const { filterSource } = this.props.plugins.FILTER_CONTAINER;
        const { pager, store } = this.props;

        const pageIndex = 0;
        const pageSize = 20;

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

    }

    render() {

        const { plugins, filter } = this.props;

        const toolbar = plugins 
            && plugins.FILTER_CONTAINER 
            && plugins.FILTER_CONTAINER.enabled 
            ? this.getToolbar(filter) : null;

        return toolbar;
    }
}

function mapStateToProps(state) {
    
    return {
        dataSource: state.dataSource.get('gridData'),
        selectedRows: state.selection.get('selectedRows'),
        filter: state.filter.get('filterState'),
        pager: state.pager.get('pagerState')
    };
}

export default connect(mapStateToProps)(FilterToolbar);
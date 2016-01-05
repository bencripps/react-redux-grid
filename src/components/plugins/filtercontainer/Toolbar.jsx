import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import filter from '../../../util/filter';
import { keyFromObject } from '../../../util/keygenerator';
import { CLASS_NAMES, FILTER_METHODS } from '../../../constants/GridConstants';
import { setFilter, doLocalFilter, clearFilterRemote, clearFilterLocal } from '../../../actions/plugins/filter/FilterActions';

class FilterToolbar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        plugins: React.PropTypes.object.isRequired,
        selectionModel: React.PropTypes.object.isRequired,
        placeHolderText: 'Search',
        defaultSortMethod: FILTER_METHODS.LOCAL
    }

    getToolbar(filter) {

        const { plugins, placeHolderText, columnManager, dataSource } = this.props;

        const dataUri = columnManager.config.dataSource || '';

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

        const searchButtonProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.SEARCH_BUTTON)
        };

        const clearButtonProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.CLEAR_BUTTON),
            onClick: this.clearFilter.bind(this, dataUri, method)
        }

        const filterMenuButtonProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU_BUTTON)
        };

        const applicableButton = inputValue && inputValue.length > 0
            ? <span { ...clearButtonProps } />
            : <span { ...searchButtonProps } />;

        return (
            <div { ...containerProps }>
                <input { ...inputProps } />
                { applicableButton }
                <span { ...filterMenuButtonProps } />
            </div>
        );
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

        if (reactEvent.which !== 13) {
            return false;
        }

        const { store } = this.props;
        
        if (method === FILTER_METHODS.LOCAL) {
            store.dispatch(doLocalFilter(
                filter.byKeyword(value, dataSource))
            );
        }

        else if (method === FILTER_METHODS.REMOTE) {

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
        filter: state.filter.get('filterState')
    };
}

export default connect(mapStateToProps)(FilterToolbar);
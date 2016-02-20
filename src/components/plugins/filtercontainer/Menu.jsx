import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { ConnectedMenu as Menu } from '../../core/menu/Menu.jsx';
import filterUtils from '../../../util/filterUtils';
import { stateGetter } from '../../../util/stateGetter';
import { keyFromObject } from '../../../util/keygenerator';
import { CLASS_NAMES, FILTER_METHODS, DEFAULT_PAGE_SIZE } from '../../../constants/GridConstants';
import {
    doLocalFilter,
    clearFilterLocal,
    doRemoteFilter,
    showFilterMenu,
    setFilterMenuValues
} from '../../../actions/plugins/filter/FilterActions';

class FilterMenu extends Menu {

    static propTypes = {
        buttonText: PropTypes.object,
        buttonTypes: PropTypes.object,
        menuTitle: PropTypes.string.isRequired,
        plugins: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    };

    static defaultProps = {
        store: React.PropTypes.object.isRequired,
        menuTitle: 'Advanced Filter Menu',
        buttonTypes: {
            SUBMIT: 'SUBMIT',
            CANCEL: 'CANCEL'
        },
        buttonText: {
            SUBMIT: 'Submit',
            CANCEL: 'Cancel'
        },
        plugins: React.PropTypes.object.isRequired,
        selectionModel: React.PropTypes.object.isRequired,
        placeHolderText: 'Search',
        defaultSortMethod: FILTER_METHODS.LOCAL
    };

    getInput(field) {

        const { filter } = this.props;

        const value = filter
            && filter.filterMenuValues
            && filter.filterMenuValues[field.name]
            ? filter.filterMenuValues[field.name]
            : null;

        const containerProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.FIELD.CONTAINER),
            key: keyFromObject(field, ['container']),
        };

        const inputProps = {
            type: field.type,
            key: keyFromObject(field),
            placeholder: field.placeholder,
            name: field.name,
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.FIELD.INPUT),
            onChange: this.handleDynamicInputChange.bind(this),
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

    }

    handleDynamicInputChange(reactEvent) {

        const { store, filter } = this.props;
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
    }

    handleButtonClick(type) {

        const { buttonTypes, filter, store, dataSource, plugins, pager } = this.props;
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
    }

    getButton(type) {

        const { buttonText, buttonTypes } = this.props;

        const buttonProps = {
            text: buttonText[type],
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.BUTTON,
                type === buttonTypes.CANCEL ? CLASS_NAMES.SECONDARY_CLASS : ''),
            onClick: this.handleButtonClick.bind(this, type)
        };

        return (
            <button { ...buttonProps } >
                { buttonProps.text }
            </button>
        );
    }

    render() {

        const { plugins, menuTitle, buttonTypes } = this.props;

        const menuContainerProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.CONTAINER)
        };

        const menuTitleProps = {
            text: menuTitle,
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.TITLE)
        };

        const buttonContainerProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.BUTTON_CONTAINER)
        };

        const inputs = plugins.FILTER_CONTAINER.fields
            && plugins.FILTER_CONTAINER.fields.length > 0
            ? plugins.FILTER_CONTAINER.fields.map(this.getInput.bind(this))
            : null;

        const submitButton = this.getButton(buttonTypes.SUBMIT);

        const cancelButton = this.getButton(buttonTypes.CANCEL);

        return (
            <div { ...menuContainerProps } >
                <span { ...menuTitleProps } >
                    { menuTitleProps.text }
                </span>
                <div>
                    { inputs }
                </div>
                <div { ...buttonContainerProps }>
                    { submitButton }
                    { cancelButton }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        dataSource: stateGetter(state, 'dataSource', 'gridData'),
        selectedRows: stateGetter(state, 'selection', 'selectedRows'),
        filter: stateGetter(state, 'filter', 'filterState'),
        pager: stateGetter(state, 'pager', 'pagerState')
    };
}

export default connect(mapStateToProps)(FilterMenu);
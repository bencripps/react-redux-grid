import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import Menu from '../../core/menu/Menu.jsx';
import filter from '../../../util/filter';
import { keyFromObject } from '../../../util/keygenerator';
import { CLASS_NAMES, FILTER_METHODS, KEYBOARD_MAP } from '../../../constants/GridConstants';
import { setFilter,
    doLocalFilter,
    clearFilterRemote,
    clearFilterLocal,
    doRemoteFilter 
} from '../../../actions/plugins/filter/FilterActions';

class FilterMenu extends Menu {

    static propTypes = {
        store: PropTypes.object.isRequired,
        plugins: PropTypes.object.isRequired,
        menuTitle: PropTypes.string.isRequired,
        buttonTypes: PropTypes.object,
        buttonText: PropTypes.object
    }

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
    }

    getInput(field) {

        const containerProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.FIELD.CONTAINER)
        };

        const inputProps = {
            type: field.type,
            key: keyFromObject(field),
            placeholder: field.placeholder,
            name: field.name,
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.FIELD.INPUT)
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

    getButton(type) {

        const { buttonText } = this.props;

        const buttonProps = {
            text: buttonText[type],
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.BUTTON)
        };

        return (
            <button { ...buttonProps } >
                { buttonProps.text }
            </button>
        );
    }

    render() {

        const { plugins, filter, menuTitle, buttonTypes } = this.props;

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
            ? plugins.FILTER_CONTAINER.fields.map(this.getInput)
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
        dataSource: state.dataSource.get('gridData'),
        selectedRows: state.selection.get('selectedRows'),
        filter: state.filter.get('filterState'),
        pager: state.pager.get('pagerState')
    };
}

export default connect(mapStateToProps)(FilterMenu);
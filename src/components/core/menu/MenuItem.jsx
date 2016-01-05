import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import { emptyFn } from '../../../util/emptyFn';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { hideMenu } from '../../../actions/plugins/actioncolumn/MenuActions';

class MenuItem extends Component {

    static defaultProps = {
        data: React.PropTypes.String,
        menuItemsTypes: {
            checkbox: 'checkbox'
        }
    }

    handleMenuItemClick(data, reactEvent) {

        reactEvent.stopPropagation();

        const dismiss = data.dismissOnClick !== undefined 
            ? data.dismissOnClick : true;

        const { store } = this.props;

        if (dismiss) {
            store.dispatch(hideMenu());
        }

        if (data.EVENT_HANDLER) {
            data.EVENT_HANDLER.apply(this, arguments);
        }
    }

    getCheckbox(data) {

        const checkboxProps = {
            type: this.props.menuItemsTypes.checkbox,
            checked: data.checked,
            onChange: data.onCheckboxChange || emptyFn
        };

        return (
            <input { ...checkboxProps } />
        );
    }

    render() {
    	const { data, menuItemsTypes } = this.props;

    	const menuItemProps = {
    		className: prefix(CLASS_NAMES.GRID_ACTIONS.MENU.ITEM),
    		onClick: this.handleMenuItemClick.bind(this, data)
    	};

        const checkboxComponent = 
            data.menuItemType === menuItemsTypes.checkbox 
            ? this.getCheckbox(data) : null;
    	
        return (
            <li { ...menuItemProps } >
                { checkboxComponent }
            	{ data.text }
            </li>
        )
    }
}

function mapStateToProps(state) {
    return {
        columnStates: state.columnManager.get('columnStates')
    };
}

export default connect(mapStateToProps)(MenuItem);
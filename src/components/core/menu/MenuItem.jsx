import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import { emptyFn } from '../../../util/emptyFn';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { hideMenu } from '../../../actions/plugins/actioncolumn/MenuActions';

class MenuItem extends Component {

    static defaultProps = {
        data: React.PropTypes.String
    }

    handleMenuItemClick(data) {

        const { store } = this.props;
        
        store.dispatch(hideMenu());

        if (data.EVENT_HANDLER) {
            data.EVENT_HANDLER.apply(this, arguments);
        }
    }

    render() {
    	const { data } = this.props;

    	const menuItemProps = {
    		className: prefix(CLASS_NAMES.GRID_ACTIONS.MENU.ITEM),
    		onClick: this.handleMenuItemClick.bind(this, data)
    	};
    	
        return (
            <li { ...menuItemProps }>
            	{ data.text }
            </li>
        )
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(MenuItem);
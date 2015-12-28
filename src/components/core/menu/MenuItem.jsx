import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import { emptyFn } from '../../../util/emptyFn';
import { CLASS_NAMES } from '../../../constants/GridConstants';

class MenuItem extends Component {

    static defaultProps = {
        data: React.PropTypes.String
    }

    render() {
    	const { data } = this.props;

    	const menuItemProps = {
    		className: prefix(CLASS_NAMES.GRID_ACTIONS.MENU.ITEM),
    		onClick: data.EVENT_HANDLER.bind(this, data)
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
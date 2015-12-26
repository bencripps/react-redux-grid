import React, { PropTypes, Component } from 'react';
import MenuItem from './MenuItem.jsx';
import { connect } from 'react-redux';
import { keyGenerator } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import { emptyFn } from '../../../util/emptyFn';
import '../../../style/components/menu.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';

class Menu extends Component {

    static defaultProps = {
        menu: React.PropTypes.array
    }

    render() {

    	const { menu } = this.props;

    	const menuProps = {
    		className: prefix(CLASS_NAMES.GRID_ACTIONS.MENU.CONTAINER)
    	};
    	
    	const menuItems = menu && menu.length > 0 
    		? menu.map((item) => <MenuItem data={item} />)
    		: null;

        return (
            <ul { ...menuProps }>
            	{ menuItems }
            </ul>
        )
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Menu);
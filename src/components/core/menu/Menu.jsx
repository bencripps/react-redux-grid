import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ConnectedMenuItem as MenuItem } from './MenuItem.jsx';
import { keyFromObject } from '../../../util/keyGenerator';
import { prefix } from '../../../util/prefix';
import { CLASS_NAMES } from '../../../constants/GridConstants';

class Menu extends Component {

    static propTypes = {
        menu: React.PropTypes.array,
        metaData: React.PropTypes.object,
        store: React.PropTypes.object
    };

    static defaultProps = {
        metaData: {}
    };

    getMenuItem(item) {

        const { metaData, store } = this.props;

        const menuItemProps = {
            data: item,
            metaData,
            type: item.type,
            key: keyFromObject(item),
            store
        };

        return <MenuItem { ...menuItemProps } />;
    }

    render() {

        const { menu } = this.props;

        const menuProps = {
            className: prefix(CLASS_NAMES.GRID_ACTIONS.MENU.CONTAINER)
        };

        const items = getUniqueItems(menu);

        const menuItems = items && items.length > 0
            ? items.map(this.getMenuItem.bind(this))
            : null;

        return (
            <ul { ...menuProps }>
                { menuItems }
            </ul>
        );
    }
}

export const getUniqueItems = (items) => {
    const keys = items.map((obj) => { return obj.key; });
    const unique = items.filter((ob, i) => { return keys.indexOf(ob.key) === i; });
    return unique;
};

function mapStateToProps() {
    return {};
}

const ConnectedMenu = connect(mapStateToProps)(Menu);

export { Menu, ConnectedMenu };
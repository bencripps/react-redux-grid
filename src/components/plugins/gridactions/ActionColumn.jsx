import React, { PropTypes } from 'react';
import { Menu } from './actioncolumn/Menu.jsx';
import { showMenu } from '../../../actions/plugins/actioncolumn/MenuActions';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { setColumnVisibility } from '../../../actions/GridActions';

export const ActionColumn = ({ actions, columns, editor, iconCls, menuState, rowId, store, type, reducerKeys }) => {

    const menuShown = menuState && menuState[rowId] ? menuState[rowId] : false;

    const containerProps = {
        className: prefix(CLASS_NAMES.GRID_ACTIONS.CONTAINER, menuShown
            ? CLASS_NAMES.GRID_ACTIONS.SELECTED_CLASS : ''),
        onClick: handleActionClick.bind(this, type, actions, rowId, store)
    };

    const iconProps = {
        className: prefix(actions.iconCls) || prefix(iconCls)
    };

    return type === 'header'
        ? getHeader(containerProps, iconProps, menuShown, columns, store, editor, reducerKeys, rowId)
        : getColumn(containerProps, iconProps, menuShown, actions, store, editor, reducerKeys, rowId);
};

ActionColumn.propTypes = {
    actions: PropTypes.object,
    columns: PropTypes.array,
    editor: PropTypes.object,
    iconCls: PropTypes.string,
    menuState: PropTypes.object,
    rowId: PropTypes.string,
    store: PropTypes.object,
    type: PropTypes.string
};

ActionColumn.defaultProps = {
    iconCls: 'action-icon'
};

export const getHeader = (containerProps, iconProps, menuShown, columns, store, editor, reducerKeys, rowId) => {

    const actions = columns.map((col) => {

        const isChecked = col.hidden !== undefined
            ? !col.hidden : true;

        return {
            text: col.name,
            menuItemType: 'checkbox',
            checked: isChecked,
            onCheckboxChange: () => {},
            hideable: col.hideable,
            dismissOnClick: false,
            EVENT_HANDLER: () => {
                if (col.hideable === undefined || col.hideable) {
                    store.dispatch(setColumnVisibility(columns, col, col.hidden));
                }
            }
        };

    });

    const menuItems = {
        menu: actions
    };

    const menu = menuShown ? <Menu { ...{ menuItems, type: 'header', store, editor, reducerKeys, rowId } } /> : null;

    return (
        <th { ...containerProps }>
            <span { ...iconProps }></span>
            { menu }
        </th>
    );
};

export const getColumn = (containerProps, iconProps, menuShown, actions, store, editor, reducerKeys, rowId) => {

    const menu = menuShown ? <Menu { ...{ actions, type: null, store, editor, reducerKeys, rowId } } /> : null;
    
    return (
        <td { ...containerProps }>
            <span { ...iconProps }></span>
            { menu }
        </td>
    );
};

export const handleActionClick = (type, actions, id, store, reactEvent) => {
    reactEvent.stopPropagation();
    store.dispatch(showMenu(id));
};

function mapStateToProps(state, props) {

    return {
        menuState: stateGetter(state, props, 'menu', 'menuState'),
        gridState: stateGetter(state, props, 'grid', 'gridState')
    };
}

export default connect(mapStateToProps)(ActionColumn);
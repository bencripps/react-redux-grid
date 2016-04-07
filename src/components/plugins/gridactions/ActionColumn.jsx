import React, { PropTypes } from 'react';
import { Menu } from './actioncolumn/Menu.jsx';
import { showMenu, hideMenu } from '../../../actions/plugins/actioncolumn/MenuActions';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { keyFromObject } from '../../../util/keyGenerator';
import { elementContains } from '../../../util/elementContains';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { setColumnVisibility } from '../../../actions/GridActions';

export const ActionColumn = ({ actions, columns, editor, iconCls,
    menuState, rowId, rowData, store, type, rowIndex, reducerKeys }) => {

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
        ? getHeader(containerProps, iconProps, menuShown, columns, store, editor, reducerKeys, rowId, rowData, rowIndex)
        : getColumn(containerProps, iconProps, menuShown, actions, store, editor, reducerKeys, rowId, rowData, rowIndex);
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

let removeableEvent;

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
            key: keyFromObject(col),
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

    const menu = menuShown ?
        <Menu { ...{ actions: menuItems, type: 'header', store, editor, reducerKeys, rowId } } />
        : null;

    return (
        <th { ...containerProps }>
            <span { ...iconProps }></span>
            { menu }
        </th>
    );
};

export const addKeysToActions = (action) => {

    if (action && action.key) {
        return action;
    }

    else {
        action.key = keyFromObject(action);
        return action;
    }
};

export const getColumn = (containerProps, iconProps, menuShown,
    actions, store, editor, reducerKeys, rowId, rowData, rowIndex) => {

    const menu = menuShown
        ?
        <Menu { ...{
            actions: addKeysToActions(actions),
            type: null,
            rowData,
            store,
            editor,
            reducerKeys,
            rowId,
            rowIndex } }
        />
        : null;

    return (
        <td { ...containerProps }>
            <span { ...iconProps }></span>
            { menu }
        </td>
    );
};

export const handleHideMenu = (store, e) => {

    const isHeaderMenu = elementContains(e.target, prefix(CLASS_NAMES.HEADER));

    if (isHeaderMenu) {
        return false;
    }

    document.body.removeEventListener('click', removeableEvent, false);

    if (e.target.classList.contains('react-grid-action-icon')) {
        return false;
    }

    setTimeout(() => { store.dispatch(hideMenu()); }, 0);
};

export const handleActionClick = (type, actions, id, store, reactEvent) => {
    reactEvent.stopPropagation();
    store.dispatch(showMenu(id));

    removeableEvent = handleHideMenu.bind(null, store);

    document.body.addEventListener('click', removeableEvent, false);
};

function mapStateToProps(state, props) {
    return {
        menuState: stateGetter(state, props, 'menu', 'menuState'),
        gridState: stateGetter(state, props, 'grid', 'gridState')
    };
}

export default connect(mapStateToProps)(ActionColumn);
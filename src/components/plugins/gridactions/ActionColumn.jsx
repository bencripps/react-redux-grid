import React, { PropTypes } from 'react';
import { Menu } from './actioncolumn/Menu.jsx';
import {
    showMenu, hideMenu
} from '../../../actions/plugins/actioncolumn/MenuActions';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { keyFromObject } from '../../../util/keyGenerator';
import { elementContains } from '../../../util/elementContains';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { setColumnVisibility } from '../../../actions/GridActions';

export const ActionColumn = ({
    actions,
    columns,
    editor,
    headerActionItemBuilder,
    iconCls,
    menuState,
    rowId,
    rowData,
    store,
    stateKey,
    type,
    rowIndex,
    reducerKeys
}) => {

    const menuShown = menuState && menuState[rowId] ? menuState[rowId] : false;

    const containerProps = {
        className: prefix(CLASS_NAMES.GRID_ACTIONS.CONTAINER, menuShown
            ? CLASS_NAMES.GRID_ACTIONS.SELECTED_CLASS : ''),
        onClick: handleActionClick.bind(
            this, type, actions, rowId, stateKey, store, menuShown, reducerKeys
        )
    };

    const className = menuShown
        ? prefix(actions.iconCls, 'active') || prefix(iconCls, 'active')
        : prefix(actions.iconCls) || prefix(iconCls);

    const iconProps = {
        className
    };

    return type === 'header'
        ? getHeader(
            columns,
            containerProps,
            iconProps,
            menuShown,
            columns,
            store,
            editor,
            reducerKeys,
            rowId,
            rowData,
            rowIndex,
            stateKey,
            headerActionItemBuilder
        ) : getColumn(
            columns,
            containerProps,
            iconProps,
            menuShown,
            actions,
            store,
            editor,
            reducerKeys,
            rowId,
            rowData,
            rowIndex,
            stateKey
        );
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
let lastActionClicked;

export const getHeader = (
    cols,
    containerProps,
    iconProps,
    menuShown,
    columns,
    store,
    editor,
    reducerKeys,
    rowId,
    rowData,
    rowIndex,
    stateKey,
    headerActionItemBuilder
) => {

    let actions;

    if (!headerActionItemBuilder) {

        actions = columns.map((col) => {

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
                        store.dispatch(
                            setColumnVisibility({
                                columns,
                                column: col,
                                isHidden: col.hidden,
                                stateKey
                            })
                        );
                    }
                }
            };

        });
    }

    else {
        actions = columns.map(headerActionItemBuilder.bind(null, {
            store
        }));
    }

    const menuItems = {
        menu: actions
    };

    const menu = menuShown ?
        <Menu { ...{ columns: cols,
            actions: menuItems,
            type: 'header',
            store,
            editor,
            reducerKeys,
            rowId,
            stateKey } }
        />
        : null;

    return (
        <th { ...containerProps }>
            <span { ...iconProps }>
                { menu }
            </span>
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

export const getColumn = (
    cols,
    containerProps,
    iconProps,
    menuShown,
    actions,
    store,
    editor,
    reducerKeys,
    rowId,
    rowData,
    rowIndex,
    stateKey
) => {

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
            columns: cols,
            stateKey,
            rowIndex } }
        />
        : null;

    if (actions && actions.menu && actions.menu.length === 0) {
        iconProps.className += ` ${prefix(
            CLASS_NAMES.GRID_ACTIONS.NO_ACTIONS
        )}`;
    }

    return (
        <td { ...containerProps }>
            <span { ...iconProps }>
                { menu }
            </span>
        </td>
    );
};

export const handleHideMenu = (
    stateKey, store, initialTarget, reducerKeys, e
) => {

    const occurredInHeader = elementContains(
        e.target, 'react-grid-header'
    );

    const isHeaderMenu = occurredInHeader
        && e.target.classList.contains('react-grid-action-icon');

    const isHeaderAction = occurredInHeader && elementContains(
        e.target, 'react-grid-action-menu-container'
    );

    const isRowAction = elementContains(
        e.target, 'react-grid-row'
    ) && e.target.classList.contains('react-grid-action-icon');

    const isSameNode = initialTarget === e.target
        && !elementContains(e.target, 'react-grid-action-menu-container');

    const isActionMenu = isSameNode && elementContains(
        e.target, 'react-grid-action-container'
    );

    const menuKey = reducerKeys.menu || 'Menu';

    const menuState = store.getState()[menuKey]
        .get(stateKey);

    const headerMenuShown = menuState && menuState['header-row'];

    const hide = () => {
        setTimeout(() => { store.dispatch(hideMenu({ stateKey })); }, 0);
    };

    const removeEvent = () => {
        document.body.removeEventListener('click', removeableEvent);
    };

    if (!isRowAction && !isSameNode && !occurredInHeader) {
        hide();
        removeEvent();
    }

    else if (isRowAction && isSameNode) {
        hide();
        removeEvent();
    }

    else if (isActionMenu) {
        hide();
        removeEvent();
    }

    else if (occurredInHeader && !isHeaderAction && !isHeaderMenu) {
        hide();
        removeEvent();
    }

    // if the header menu is shown
    // and were clicking on the action button
    // close the menu
    else if (headerMenuShown && isHeaderMenu) {
        hide();
        removeEvent();
    }

    else if (!isSameNode && !isHeaderAction) {
        removeEvent();
    }
};

export const handleActionClick = (
    type, actions, id, stateKey, store, menuShown, reducerKeys, reactEvent
) => {

    reactEvent.stopPropagation();
    store.dispatch(showMenu({id, stateKey }));

    if (!menuShown) {
        removeableEvent = handleHideMenu.bind(
            null, stateKey, store, reactEvent.target, reducerKeys
        );
        document.body.addEventListener('click', removeableEvent);
    }

};

function mapStateToProps(state, props) {
    return {
        menuState: stateGetter(state, props, 'menu', props.stateKey),
        gridState: stateGetter(state, props, 'grid', props.stateKey)
    };
}

export default connect(mapStateToProps)(ActionColumn);
import PropTypes from 'prop-types';
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from './actioncolumn/Menu';
import {
    showMenu, hideMenu
} from '../../../actions/plugins/actioncolumn/MenuActions';
import { prefix } from '../../../util/prefix';
import { keyFromObject } from '../../../util/keyGenerator';
import { getRowBoundingRect } from '../../../util/getRowBoundingRect';
import { elementContains } from '../../../util/elementContains';
import { gridConfig } from '../../../constants/GridConstants';
import { setColumnVisibility } from '../../../actions/GridActions';

export class ActionColumn extends Component {

    render() {
        const { CLASS_NAMES } = gridConfig();
        const {
            columns,
            editor,
            events,
            headerActionItemBuilder,
            iconCls,
            menuState,
            reducerKeys,
            rowData,
            rowId,
            rowIndex,
            stateKey,
            stateful,
            store,
            type
        } = this.props;

        let {
            actions
        } = this.props;

        const {
            maxHeight,
            menuPosition
        } = this.state;

        const menuShown = menuState
            && menuState.get(rowId)
            ? menuState.get(rowId)
            : false;

        const containerProps = {
            className: prefix(CLASS_NAMES.GRID_ACTIONS.CONTAINER,
                menuShown ? CLASS_NAMES.GRID_ACTIONS.SELECTED_CLASS : '',
                menuPosition !== undefined ? menuPosition : ''
            ),
            /* eslint-disable react/jsx-no-bind */
            onClick: handleActionClick.bind(
                this,
                type,
                actions,
                rowId,
                stateKey,
                store,
                menuShown,
                reducerKeys
            )
            /* eslint-enable react/jsx-no-bind */
        };

        actions = enableActions(
            menuShown,
            actions,
            columns,
            rowData
        );

        const className = menuShown
            ? prefix(actions.iconCls || iconCls, 'active')
            : prefix(actions.iconCls || iconCls);

        const iconProps = {
            className
        };

        const actionArgs = [
            columns,
            containerProps,
            iconProps,
            menuShown,
            actions,
            columns,
            store,
            editor,
            reducerKeys,
            rowId,
            rowData,
            rowIndex,
            stateKey,
            stateful,
            headerActionItemBuilder,
            maxHeight,
            events
        ];

        return type === 'header'
            ? getHeader(...actionArgs)
            : getColumn(...actionArgs);
    }

    componentDidUpdate() {

        const { menuState, rowId } = this.props;
        const { menuPosition } = this.state;

        const menuShown = menuState
            && menuState.get(rowId)
            ? menuState.get(rowId)
            : false;

        if (menuShown && !menuPosition) {

            const node = ReactDOM.findDOMNode(this);
            const row = node.parentElement;
            const { position, maxHeight } = getRowBoundingRect(row);

            if (position) {
                this.setState({
                    maxHeight,
                    menuPosition: position
                });
            }
        }

        else if (!menuShown && menuPosition) {
            this.setState({
                menuPosition: null,
                maxHeight: null
            });
        }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        actions: PropTypes.object,
        columns: PropTypes.array,
        editor: PropTypes.object,
        events: PropTypes.object,
        headerActionItemBuilder: PropTypes.func,
        iconCls: PropTypes.string,
        menuState: PropTypes.object,
        reducerKeys: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        rowData: PropTypes.object,
        rowId: PropTypes.string,
        rowIndex: PropTypes.number,
        stateKey: PropTypes.string,
        stateful: PropTypes.bool,
        store: PropTypes.object,
        type: PropTypes.string
    };

    static defaultProps = {
        iconCls: 'action-icon'
    };
}

let removeableEvent;

export const enableActions = (
    menuShown,
    actions,
    columns,
    rowData
) => {

    if (menuShown
        && actions
        && typeof actions.onMenuShow === 'function') {

        const val = rowData && rowData.toJS
            ? rowData.toJS()
            : rowData;

        const disabled = actions.onMenuShow({
            columns,
            rowData: val
        });

        if (Array.isArray(disabled)) {
            actions.menu.forEach(action => {
                if (disabled.indexOf(action.key) !== -1) {
                    action.disabled = true;
                }
            });
        }

    }

    else {
        actions.menu.forEach(action => {
            action.disabled = false;
        });
    }

    return actions;

};

export const getHeader = (
    cols,
    containerProps,
    iconProps,
    menuShown,
    actions,
    columns,
    store,
    editor,
    reducerKeys,
    rowId,
    rowData,
    rowIndex,
    stateKey,
    stateful,
    headerActionItemBuilder
) => {

    let colActions;

    if (!headerActionItemBuilder) {

        colActions = columns.map((col) => {

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
                                stateKey,
                                stateful
                            })
                        );
                    }
                }
            };

        });
    }

    else {
        colActions = columns.map(headerActionItemBuilder.bind(null, {
            store,
            columns
        }));
    }

    const menuItems = {
        menu: colActions
    };

    const menu = menuShown ?
        <Menu {
            ...{
                columns: cols,
                actions: menuItems,
                type: 'header',
                store,
                editor,
                reducerKeys,
                rowId,
                stateKey
            }
        } />
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

    action.key = keyFromObject(action);
    return action;
};

export const getColumn = (
    cols,
    containerProps,
    iconProps,
    menuShown,
    actions,
    columns,
    store,
    editor,
    reducerKeys,
    rowId,
    rowData,
    rowIndex,
    stateKey,
    stateful,
    headerActionItemBuilder,
    maxHeight
) => {
    const { CLASS_NAMES } = gridConfig();
    const menu = menuShown
        ?
        <Menu {
            ...{
                actions: addKeysToActions(actions),
                type: null,
                rowData,
                store,
                editor,
                reducerKeys,
                rowId,
                columns: cols,
                stateKey,
                rowIndex,
                maxHeight
            }
        } />
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

    const { CLASS_NAMES } = gridConfig();

    const occurredInHeader = elementContains(
        e.target, prefix(CLASS_NAMES.HEADER)
    );

    const isHeaderMenu = occurredInHeader
        && e.target.classList.contains(prefix(CLASS_NAMES.GRID_ACTIONS.ICON));

    const isHeaderAction = occurredInHeader && elementContains(
        e.target, prefix(CLASS_NAMES.GRID_ACTIONS.MENU.CONTAINER)
    );

    const isRowAction = elementContains(
        e.target, prefix(CLASS_NAMES.ROW)
    ) && e.target.classList.contains(prefix(CLASS_NAMES.GRID_ACTIONS.ICON));

    const isSameNode = initialTarget === e.target
        && !elementContains(
            e.target,
            prefix(CLASS_NAMES.GRID_ACTIONS.MENU.CONTAINER)
        );

    const isActionMenu = isSameNode && elementContains(
        e.target, prefix(CLASS_NAMES.GRID_ACTIONS.MENU.CONTAINER)
    );

    const menuKey = reducerKeys.menu || 'menu';
    const menu = store.getState()[menuKey];
    const menuState = menu ? menu.get(stateKey) : null;

    const headerMenuShown = menuState && menuState.get('header-row');

    const hide = () => {
        setTimeout(() => { store.dispatch(hideMenu({ stateKey })); }, 0);
    };

    const actionDisabled = e.target
        && e.target.classList.contains(
            prefix(CLASS_NAMES.GRID_ACTIONS.DISABLED)
        );

    const removeEvent = () => {
        document.body.removeEventListener('click', removeableEvent);
    };

    if (actionDisabled) {
        return false;
    }

    if (!isRowAction && !isSameNode && !occurredInHeader) {
        hide(e);
        removeEvent();
    }

    else if (isRowAction && isSameNode) {
        hide(e);
        removeEvent();
    }

    else if (isActionMenu) {
        hide(e);
        removeEvent();
    }

    else if (occurredInHeader && !isHeaderAction && !isHeaderMenu) {
        hide(e);
        removeEvent();
    }

    // if the header menu is shown
    // and were clicking on the action button
    // close the menu
    else if (headerMenuShown && isHeaderMenu) {
        hide(e);
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

export default ActionColumn;

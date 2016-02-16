import React, { PropTypes, Component } from 'react';
import Menu from '../../core/menu/Menu.jsx';
import { showMenu } from '../../../actions/plugins/actioncolumn/MenuActions';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { editRow } from '../../../actions/plugins/editor/EditorActions';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { setColumnVisibility } from '../../../actions/GridActions';

class ActionColumn extends Component {

    static propTypes = {
        actions: PropTypes.object,
        columns: PropTypes.array,
        editor: PropTypes.object,
        iconCls: PropTypes.string,
        menuState: PropTypes.object,
        rowId: PropTypes.string,
        store: PropTypes.object,
        type: PropTypes.string
    };

    static defaultProps = {
        iconCls: 'action-icon'
    };

    getHeader(containerProps, iconProps, menuShown, columns) {

        const { store } = this.props;

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

        const menu = menuShown ? this.getMenu(menuItems, 'header') : null;

        return (
            <th { ...containerProps }>
                <span { ...iconProps }></span>
                { menu }
            </th>
        );
    }

    getColumn(containerProps, iconProps, menuShown, actions) {

        const menu = menuShown ? this.getMenu(actions) : null;

        return (
            <td { ...containerProps }>
                <span { ...iconProps }></span>
                { menu }
            </td>
        );
    }

    getEditAction(editor) {
        return {
            text: 'Edit',
            EVENT_HANDLER: this.handleEditClick.bind(this, editor)
        };
    }

    handleEditClick(editor, data, reactEvent) {
        const { store, rowId } = this.props;
        const rowPosition = reactEvent.target.getBoundingClientRect();
        const top = rowPosition.top + window.scrollY;

        if (editor.config.type === editor.editModes.inline) {
            store.dispatch(editRow(rowId, top));
        }
    }

    getMenu(actions, type) {

        const { store, editor } = this.props;

        if (editor.config.enabled && type !== 'header') {
            actions.menu.unshift(this.getEditAction(editor));
        }

        const menuProps = {
            store,
            ...actions
        };

        return (
            <Menu { ...menuProps } />
        );
    }

    handleActionClick(type, actions, id, reactEvent) {
        reactEvent.stopPropagation();

        const { store } = this.props;

        store.dispatch(showMenu(id));
    }

    render() {

        const { iconCls, type, actions, menuState, rowId, columns } = this.props;

        const menuShown = menuState && menuState[rowId] ? menuState[rowId] : false;

        const containerProps = {
            className: prefix(CLASS_NAMES.GRID_ACTIONS.CONTAINER, menuShown
                ? CLASS_NAMES.GRID_ACTIONS.SELECTED_CLASS : ''),
            onClick: this.handleActionClick.bind(this, type, actions, rowId)
        };

        const iconProps = {
            className: prefix(actions.iconCls) || prefix(iconCls)
        };

        return type === 'header'
         ? this.getHeader(containerProps, iconProps, menuShown, columns)
         : this.getColumn(containerProps, iconProps, menuShown, actions);
    }
}

function mapStateToProps(state) {

    return {
        menuState: stateGetter(state, 'menu', 'menuState'),
        gridState: stateGetter(state, 'grid', 'gridState')
    };
}

export default connect(mapStateToProps)(ActionColumn);
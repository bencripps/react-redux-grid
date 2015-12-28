import React, { PropTypes, Component } from 'react';
import Menu from '../../core/menu/Menu.jsx';
import { showMenu, hideMenu } from '../../../actions/plugins/actioncolumn/MenuActions';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';

class ActionColumn extends Component {

    static defaultProps = {
        store: React.PropTypes.func,
        iconCls: 'grid-action-icon'
    }

    getHeader(containerProps, iconProps, menuShown, actions) {

        const menu = menuShown ? this.getMenu(actions) : null;

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

    handleEditClick(editor) {
        debugger;
    }

    getMenu(actions) {

        const { store, editor } = this.props;

        if (editor.defaults.enabled) {
            actions.menu.unshift(this.getEditAction(editor));
        }

        const menuProps = {
            store,
            ...actions
        };

        return <Menu { ...menuProps } />
    }

    handleActionClick(type, actions, id, reactEvent) {
        reactEvent.stopPropagation();
        
        const { store } = this.props;

        store.dispatch(showMenu(id));
    }

    render() {

        const { iconCls, type, actions, menuState, rowId } = this.props;

        const menuShown = menuState && menuState[rowId] ? menuState[rowId] : false;
        
        const containerProps = {
            className: prefix(CLASS_NAMES.GRID_ACTIONS.CONTAINER, menuShown 
                ? CLASS_NAMES.GRID_ACTIONS.SELECTED_CLASS : ''),
            onClick: this.handleActionClick.bind(this, type, actions, rowId)
        };

        const iconProps = {
            className: actions.iconCls || iconCls,
        };

        return type === 'header'
         ? this.getHeader(containerProps, iconProps, menuShown, actions) 
         : this.getColumn(containerProps, iconProps, menuShown, actions);
    }
}

function mapStateToProps(state) {
    
    return {
        menuState: state.menu.get('menuState'),
    };
}

export default connect(mapStateToProps)(ActionColumn);
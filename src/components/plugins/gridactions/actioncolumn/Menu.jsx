import React, { PropTypes } from 'react';
import { ConnectedMenu as MenuCmp } from './../../../core/menu/Menu.jsx';
import { editRow } from './../../../../actions/plugins/editor/EditorActions';

export const Menu = ({ actions, type, store, editor, reducerKeys, rowId, rowData, rowIndex }) => {

    if (editor.config.enabled && type !== 'header') {
        actions.menu.unshift(getEditAction(editor, store, rowId, rowData, rowIndex));
    }

    const menuProps = {
        ...actions,
        metaData: {
            rowId,
            rowData,
            rowIndex
        },
        reducerKeys,
        store
    };

    return (
        <MenuCmp { ...menuProps } />
    );
};

export const getEditAction = (editor, store, rowId, rowData, rowIndex) => {
    return {
        text: 'Edit',
        EVENT_HANDLER: handleEditClick.bind(this, editor, store, rowId, rowData, rowIndex),
        key: 'grid-edit-action'
    };
};

export const handleEditClick = (editor, store, rowId, rowData, rowIndex, data) => {
    const rowPosition = data.reactEvent.target.getBoundingClientRect();
    const top = rowPosition.top + window.scrollY;

    if (editor.config.type === editor.editModes.inline) {
        store.dispatch(editRow(rowId, top, rowData, rowIndex));
    }
};

Menu.propTypes = {
    actions: PropTypes.object,
    editor: PropTypes.object,
    reducerKeys: PropTypes.object,
    rowId: PropTypes.string,
    store: PropTypes.object,
    type: PropTypes.string
};

Menu.defaultProps = {

};
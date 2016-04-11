import React, { PropTypes } from 'react';
import { ConnectedMenu as MenuCmp } from './../../../core/menu/Menu.jsx';
import { handleEditClick } from './../../../../util/handleEditClick';

export const Menu = (
    { actions, columns, type, store, editor, reducerKeys, rowId, rowData, rowIndex }
) => {

    if (editor.config.enabled && type !== 'header') {
        actions.menu.unshift(getEditAction(editor, store, rowId, rowData, rowIndex, columns));
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

export const getEditAction = (editor, store, rowId, rowData, rowIndex, columns) => {
    return {
        text: 'Edit',
        EVENT_HANDLER: handleEditClick.bind(this, editor, store, rowId, rowData, rowIndex, columns),
        key: 'grid-edit-action'
    };
};

Menu.propTypes = {
    actions: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
    editor: PropTypes.object,
    reducerKeys: PropTypes.object,
    rowId: PropTypes.string,
    store: PropTypes.object,
    type: PropTypes.string
};

Menu.defaultProps = {

};
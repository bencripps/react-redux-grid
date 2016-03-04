import React, { PropTypes } from 'react';
import { ConnectedMenu as MenuCmp } from './../../../core/menu/Menu.jsx';
import { editRow } from './../../../../actions/plugins/editor/EditorActions';

export const Menu = ({ actions, type, store, editor, reducerKeys, rowId }) => {

    if (editor.config.enabled && type !== 'header') {
        actions.menu.unshift(getEditAction(editor, store, rowId));
    }

    const menuProps = {
        ...actions,
        reducerKeys,
        store
    };

    return (
        <MenuCmp { ...menuProps } />
    );
};

export const getEditAction = (editor, store, rowId) => {
    return {
        text: 'Edit',
        EVENT_HANDLER: handleEditClick.bind(this, editor, store, rowId)
    };
};

export const handleEditClick = (editor, store, rowId, data, reactEvent) => {
    const rowPosition = reactEvent.target.getBoundingClientRect();
    const top = rowPosition.top + window.scrollY;

    if (editor.config.type === editor.editModes.inline) {
        store.dispatch(editRow(rowId, top));
    }
};

Menu.propTypes = {
    toolbarRenderer: PropTypes.func
};

Menu.defaultProps = {
    toolbarRenderer: (pageIndex, pageSize, total, currentRecords, recordType) => {
        if (!currentRecords) {
            return `No ${recordType} Available`;
        }

        return `${pageIndex * pageSize}
            through ${pageIndex * pageSize + currentRecords}
            of ${total} ${recordType} Displayed`;
    }
};
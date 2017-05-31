import PropTypes from 'prop-types';
import React from 'react';
import { ConnectedMenu as MenuCmp } from './../../../core/menu/Menu';
import { handleEditClick } from './../../../../util/handleEditClick';

export const Menu = ({
    actions,
    columns,
    editor,
    maxHeight,
    reducerKeys,
    rowData,
    rowId,
    rowIndex,
    stateKey,
    store,
    type
}) => {

    if (editor.config.enabled && type !== 'header') {
        actions.menu.unshift(
            getEditAction(
                editor, store, rowId, rowData, rowIndex, columns, stateKey
            )
        );
    }

    const menuProps = {
        ...actions,
        metaData: {
            rowId,
            rowData: rowData && rowData.toJS
                ? rowData.toJS()
                : rowData,
            rowIndex
        },
        maxHeight,
        reducerKeys,
        stateKey,
        store
    };

    return (
        <MenuCmp { ...menuProps } />
    );
};

export const getEditAction = (
    editor, store, rowId, rowData, rowIndex, columns, stateKey
) => {
    return {
        text: 'Edit',
        EVENT_HANDLER: handleEditClick.bind(
            this, editor, store, rowId, rowData, rowIndex, columns, stateKey, {}
        ),
        key: 'grid-edit-action'
    };
};

Menu.propTypes = {
    actions: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
    editor: PropTypes.object,
    maxHeight: PropTypes.number,
    reducerKeys: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    rowData: PropTypes.object,
    rowId: PropTypes.string,
    rowIndex: PropTypes.number,
    stateKey: PropTypes.string,
    store: PropTypes.object,
    type: PropTypes.string
};

Menu.defaultProps = {

};

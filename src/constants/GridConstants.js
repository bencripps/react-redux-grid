import PropTypes from 'prop-types';

export const ROW_HEIGHT = 5000;

export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_RENDERED_RECORDS_VISIBLE = 200;

export const BUFFER_MULTIPLIER = 1.5;
export const DEFAULT_VIEWABLE_RECORDS = 25;

export const SELECTION_MODES = {
    single: 'single',
    multi: 'multi',
    checkboxSingle: 'checkbox-single',
    checkboxMulti: 'checkbox-multi'
};

export const SORT_DIRECTIONS = {
    ASCEND: 'ASC',
    DESCEND: 'DESC'
};

export const SORT_METHODS = {
    LOCAL: 'LOCAL',
    REMOTE: 'REMOTE'
};

export const KEYBOARD_MAP = {
    ENTER: 13,
    ESCAPE: 27
};

export const GRID_TYPES = PropTypes.oneOf(['grid', 'tree']);

/*
* these constants can be overridden by applyGridConfig
*/

export let USE_GRID_STYLES = true;

export let CSS_PREFIX = 'react-grid';

export let CLASS_NAMES = {
    ACTIVE_CLASS: 'active',
    INACTIVE_CLASS: 'inactive',
    DRAG_HANDLE: 'drag-handle',
    SORT_HANDLE: 'sort-handle',
    SECONDARY_CLASS: 'secondary',
    CONTAINER: 'container',
    TABLE: 'table',
    TABLE_CONTAINER: 'table-container',
    HEADER: 'header',
    THEADER: 't-head',
    HEADER_HIDDEN: 'header-hidden',
    HEADER_FIXED: 'header-fixed',
    HEADER_FIXED_CONTAINER: 'header-fixed-container',
    HEADER_STUCK: 'header-stuck',
    HEADER_STUCK_BOTTOM: 'header-stuck-bottom',
    ROW: 'row',
    ROW_IS_DRAGGING: 'row-is-dragging',
    CELL: 'cell',
    CELL_TREE_ARROW: 'cell-tree-arrow',
    CELL_HANDNLE_CONTAINER: 'cell-handle-container',
    ROW_DRAG_HANDLE: 'row-drag-handle',
    PAGERTOOLBAR: 'pager-toolbar',
    EMPTY_ROW: 'empty-row',
    EDITED_CELL: 'edit',
    LOADING_BAR: 'loading-bar',
    DRAGGABLE_COLUMN: 'draggable-column',
    COLUMN: 'column',
    IS_LOADING: 'is-loading',
    SORT_HANDLE_VISIBLE: 'sort-handle-visible',
    BUTTONS: {
        PAGER: 'page-buttons'
    },
    SELECTION_MODEL: {
        CHECKBOX: 'checkbox',
        CHECKBOX_CONTAINER: 'checkbox-container'
    },
    ERROR_HANDLER: {
        CONTAINER: 'error-container',
        MESSAGE: 'error-message'
    },
    EDITOR: {
        INLINE: {
            CONTAINER: 'inline-editor',
            SHOWN: 'shown',
            HIDDEN: 'hidden',
            SAVE_BUTTON: 'save-button',
            CANCEL_BUTTON: 'cancel-button',
            BUTTON_CONTAINER: 'button-container',
            INPUT_WRAPPER: 'editor-wrapper'
        },
        INVALID: 'invalid-cell'
    },
    GRID_ACTIONS: {
        CONTAINER: 'action-container',
        SELECTED_CLASS: 'action-menu-selected',
        NO_ACTIONS: 'no-actions',
        DISABLED: 'disabled',
        ICON: 'action-icon',
        MENU: {
            CONTAINER: 'action-menu-container',
            ITEM: 'action-menu-item'
        }
    },
    BULK_ACTIONS: {
        CONTAINER: 'bulkaction-container',
        DESCRIPTION: 'bulkaction-description',
        SHOWN: 'shown',
        HIDDEN: 'hidden'
    }

};

export const applyGridConfig = (config = {})=> {
    Object.keys(config).forEach(k => {
        if (k === 'CLASS_NAMES') {
            CLASS_NAMES = {
                ...CLASS_NAMES,
                ...config[k]
            };
        }
        else if (k === 'CSS_PREFIX') {
            CSS_PREFIX = config[k];
        }
        else if (k === 'USE_GRID_STYLES') {
            USE_GRID_STYLES = config[k];
        }
    });
};

export const gridConfig = () => ({
    CLASS_NAMES,
    CSS_PREFIX,
    USE_GRID_STYLES
});

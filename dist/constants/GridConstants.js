'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gridConfig = exports.applyGridConfig = exports.CLASS_NAMES = exports.CSS_PREFIX = exports.USE_GRID_STYLES = exports.GRID_TYPES = exports.KEYBOARD_MAP = exports.FILTER_METHODS = exports.SORT_METHODS = exports.SORT_DIRECTIONS = exports.SELECTION_MODES = exports.DEFAULT_VIEWABLE_RECORDS = exports.BUFFER_MULTIPLIER = exports.DEFAULT_RENDERED_RECORDS_VISIBLE = exports.DEFAULT_PAGE_SIZE = exports.ROW_HEIGHT = undefined;

var _react = require('react');

var ROW_HEIGHT = exports.ROW_HEIGHT = 5000;

var DEFAULT_PAGE_SIZE = exports.DEFAULT_PAGE_SIZE = 20;

var DEFAULT_RENDERED_RECORDS_VISIBLE = exports.DEFAULT_RENDERED_RECORDS_VISIBLE = 200;

var BUFFER_MULTIPLIER = exports.BUFFER_MULTIPLIER = 1.5;
var DEFAULT_VIEWABLE_RECORDS = exports.DEFAULT_VIEWABLE_RECORDS = 25;

var SELECTION_MODES = exports.SELECTION_MODES = {
    single: 'single',
    multi: 'multi',
    checkboxSingle: 'checkbox-single',
    checkboxMulti: 'checkbox-multi'
};

var SORT_DIRECTIONS = exports.SORT_DIRECTIONS = {
    ASCEND: 'ASC',
    DESCEND: 'DESC'
};

var SORT_METHODS = exports.SORT_METHODS = {
    LOCAL: 'LOCAL',
    REMOTE: 'REMOTE'
};

var FILTER_METHODS = exports.FILTER_METHODS = {
    LOCAL: 'LOCAL',
    REMOTE: 'REMOTE'
};

var KEYBOARD_MAP = exports.KEYBOARD_MAP = {
    ENTER: 13
};

var GRID_TYPES = exports.GRID_TYPES = _react.PropTypes.oneOf(['grid', 'tree']);

/*
* these constants can be overridden by applyGridConfig
*/

var USE_GRID_STYLES = exports.USE_GRID_STYLES = true;

var CSS_PREFIX = exports.CSS_PREFIX = 'react-grid';

var CLASS_NAMES = exports.CLASS_NAMES = {
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
        }
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
    FILTER_CONTAINER: {
        CONTAINER: 'filter-container',
        INPUT: 'filter-input',
        SEARCH_BUTTON: 'filter-search-button',
        MENU_BUTTON: 'filter-menu-button',
        CLEAR_BUTTON: 'filter-clear-button',
        BUTTON_CONTAINER: 'filter-button-container',
        MENU: {
            CONTAINER: 'advanced-filter-menu-container',
            TITLE: 'advanced-filter-menu-title',
            BUTTON: 'advanced-filter-menu-button',
            BUTTON_CONTAINER: 'advanced-filter-menu-button-container',
            FIELD: {
                CONTAINER: 'advanced-filter-menu-field-container',
                LABEL: 'advanced-filter-menu-field-label',
                INPUT: 'advanced-filter-menu-field-input'
            }
        }
    },
    BULK_ACTIONS: {
        CONTAINER: 'bulkaction-container',
        DESCRIPTION: 'bulkaction-description',
        SHOWN: 'shown',
        HIDDEN: 'hidden'
    }

};

var applyGridConfig = exports.applyGridConfig = function applyGridConfig() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    Object.keys(config).forEach(function (k) {
        if (k === 'CLASS_NAMES') {
            exports.CLASS_NAMES = CLASS_NAMES = Object.assign({}, CLASS_NAMES, config[k]);
        } else if (k === 'CSS_PREFIX') {
            exports.CSS_PREFIX = CSS_PREFIX = config[k];
        } else if (k === 'USE_GRID_STYLES') {
            exports.USE_GRID_STYLES = USE_GRID_STYLES = config[k];
        }
    });
};

var gridConfig = exports.gridConfig = function gridConfig() {
    return {
        CLASS_NAMES: CLASS_NAMES,
        CSS_PREFIX: CSS_PREFIX,
        USE_GRID_STYLES: USE_GRID_STYLES
    };
};
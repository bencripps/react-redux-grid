'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleActionClick = exports.handleHideMenu = exports.getColumn = exports.addKeysToActions = exports.getHeader = exports.enableActions = exports.ActionColumn = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Menu = require('./actioncolumn/Menu');

var _MenuActions = require('../../../actions/plugins/actioncolumn/MenuActions');

var _prefix = require('../../../util/prefix');

var _keyGenerator = require('../../../util/keyGenerator');

var _getRowBoundingRect2 = require('../../../util/getRowBoundingRect');

var _elementContains = require('../../../util/elementContains');

var _GridConstants = require('../../../constants/GridConstants');

var _GridActions = require('../../../actions/GridActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-set-state */


var ActionColumn = exports.ActionColumn = function (_Component) {
    _inherits(ActionColumn, _Component);

    _createClass(ActionColumn, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                columns = _props.columns,
                editor = _props.editor,
                events = _props.events,
                headerActionItemBuilder = _props.headerActionItemBuilder,
                iconCls = _props.iconCls,
                menuState = _props.menuState,
                reducerKeys = _props.reducerKeys,
                rowData = _props.rowData,
                rowId = _props.rowId,
                rowIndex = _props.rowIndex,
                stateKey = _props.stateKey,
                stateful = _props.stateful,
                store = _props.store,
                type = _props.type;
            var actions = this.props.actions;
            var _state = this.state,
                maxHeight = _state.maxHeight,
                menuPosition = _state.menuPosition;


            var menuShown = menuState && menuState[rowId] ? menuState[rowId] : false;

            var containerProps = {
                className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.GRID_ACTIONS.CONTAINER, menuShown ? _GridConstants.CLASS_NAMES.GRID_ACTIONS.SELECTED_CLASS : '', menuPosition !== undefined ? menuPosition : ''),
                onClick: handleActionClick.bind(this, type, actions, rowId, stateKey, store, menuShown, reducerKeys)
            };

            actions = enableActions(menuShown, actions, columns, rowData);

            var className = menuShown ? (0, _prefix.prefix)(actions.iconCls || iconCls, 'active') : (0, _prefix.prefix)(actions.iconCls || iconCls);

            var iconProps = {
                className: className
            };

            var actionArgs = [columns, containerProps, iconProps, menuShown, actions, columns, store, editor, reducerKeys, rowId, rowData, rowIndex, stateKey, stateful, headerActionItemBuilder, maxHeight, events];

            return type === 'header' ? getHeader.apply(undefined, actionArgs) : getColumn.apply(undefined, actionArgs);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _props2 = this.props,
                menuState = _props2.menuState,
                rowId = _props2.rowId;
            var menuPosition = this.state.menuPosition;


            var menuShown = menuState && menuState[rowId] ? menuState[rowId] : false;

            if (menuShown && !menuPosition) {

                var node = _reactDom2.default.findDOMNode(this);
                var row = node.parentElement;

                var _getRowBoundingRect = (0, _getRowBoundingRect2.getRowBoundingRect)(row),
                    position = _getRowBoundingRect.position,
                    maxHeight = _getRowBoundingRect.maxHeight;

                if (position) {
                    this.setState({
                        maxHeight: maxHeight,
                        menuPosition: position
                    });
                }
            } else if (!menuShown && menuPosition) {
                this.setState({
                    menuPosition: null,
                    maxHeight: null
                });
            }
        }
    }]);

    function ActionColumn(props) {
        _classCallCheck(this, ActionColumn);

        var _this = _possibleConstructorReturn(this, (ActionColumn.__proto__ || Object.getPrototypeOf(ActionColumn)).call(this, props));

        _this.state = {};
        return _this;
    }

    return ActionColumn;
}(_react.Component);

ActionColumn.propTypes = {
    actions: _react.PropTypes.object,
    columns: _react.PropTypes.array,
    editor: _react.PropTypes.object,
    headerActionItemBuilder: _react.PropTypes.func,
    iconCls: _react.PropTypes.string,
    menuState: _react.PropTypes.object,
    reducerKeys: _react.PropTypes.object,
    rowData: _react.PropTypes.object,
    rowId: _react.PropTypes.string,
    rowIndex: _react.PropTypes.number,
    stateKey: _react.PropTypes.string,
    stateful: _react.PropTypes.bool,
    store: _react.PropTypes.object,
    type: _react.PropTypes.string
};
ActionColumn.defaultProps = {
    iconCls: 'action-icon'
};


var removeableEvent = void 0;

var enableActions = exports.enableActions = function enableActions(menuShown, actions, columns, rowData) {

    if (menuShown && actions && typeof actions.onMenuShow === 'function') {
        (function () {

            var disabled = actions.onMenuShow({
                columns: columns,
                rowData: rowData
            });

            if (Array.isArray(disabled)) {
                actions.menu.forEach(function (action) {
                    if (disabled.indexOf(action.key) !== -1) {
                        action.disabled = true;
                    }
                });
            }
        })();
    } else {
        actions.menu.forEach(function (action) {
            action.disabled = false;
        });
    }

    return actions;
};

var getHeader = exports.getHeader = function getHeader(cols, containerProps, iconProps, menuShown, actions, columns, store, editor, reducerKeys, rowId, rowData, rowIndex, stateKey, stateful, headerActionItemBuilder) {

    var colActions = void 0;

    if (!headerActionItemBuilder) {

        colActions = columns.map(function (col) {

            var isChecked = col.hidden !== undefined ? !col.hidden : true;

            return {
                text: col.name,
                menuItemType: 'checkbox',
                checked: isChecked,
                onCheckboxChange: function onCheckboxChange() {},
                hideable: col.hideable,
                dismissOnClick: false,
                key: (0, _keyGenerator.keyFromObject)(col),
                EVENT_HANDLER: function EVENT_HANDLER() {
                    if (col.hideable === undefined || col.hideable) {
                        store.dispatch((0, _GridActions.setColumnVisibility)({
                            columns: columns,
                            column: col,
                            isHidden: col.hidden,
                            stateKey: stateKey,
                            stateful: stateful
                        }));
                    }
                }
            };
        });
    } else {
        colActions = columns.map(headerActionItemBuilder.bind(null, {
            store: store,
            columns: columns
        }));
    }

    var menuItems = {
        menu: colActions
    };

    var menu = menuShown ? _react2.default.createElement(_Menu.Menu, {
        columns: cols,
        actions: menuItems,
        type: 'header',
        store: store,
        editor: editor,
        reducerKeys: reducerKeys,
        rowId: rowId,
        stateKey: stateKey
    }) : null;

    return _react2.default.createElement(
        'th',
        containerProps,
        _react2.default.createElement(
            'span',
            iconProps,
            menu
        )
    );
};

var addKeysToActions = exports.addKeysToActions = function addKeysToActions(action) {

    if (action && action.key) {
        return action;
    }

    action.key = (0, _keyGenerator.keyFromObject)(action);
    return action;
};

var getColumn = exports.getColumn = function getColumn(cols, containerProps, iconProps, menuShown, actions, columns, store, editor, reducerKeys, rowId, rowData, rowIndex, stateKey, stateful, headerActionItemBuilder, maxHeight) {

    var menu = menuShown ? _react2.default.createElement(_Menu.Menu, {
        actions: addKeysToActions(actions),
        type: null,
        rowData: rowData,
        store: store,
        editor: editor,
        reducerKeys: reducerKeys,
        rowId: rowId,
        columns: cols,
        stateKey: stateKey,
        rowIndex: rowIndex,
        maxHeight: maxHeight
    }) : null;

    if (actions && actions.menu && actions.menu.length === 0) {
        iconProps.className += ' ' + (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.GRID_ACTIONS.NO_ACTIONS);
    }

    return _react2.default.createElement(
        'td',
        containerProps,
        _react2.default.createElement(
            'span',
            iconProps,
            menu
        )
    );
};

var handleHideMenu = exports.handleHideMenu = function handleHideMenu(stateKey, store, initialTarget, reducerKeys, e) {

    var occurredInHeader = (0, _elementContains.elementContains)(e.target, 'react-grid-header');

    var isHeaderMenu = occurredInHeader && e.target.classList.contains('react-grid-action-icon');

    var isHeaderAction = occurredInHeader && (0, _elementContains.elementContains)(e.target, 'react-grid-action-menu-container');

    var isRowAction = (0, _elementContains.elementContains)(e.target, 'react-grid-row') && e.target.classList.contains('react-grid-action-icon');

    var isSameNode = initialTarget === e.target && !(0, _elementContains.elementContains)(e.target, 'react-grid-action-menu-container');

    var isActionMenu = isSameNode && (0, _elementContains.elementContains)(e.target, 'react-grid-action-container');

    var menuKey = reducerKeys.menu || 'menu';
    var menu = store.getState()[menuKey];
    var menuState = menu ? menu.get(stateKey) : null;

    var headerMenuShown = menuState && menuState.get('header-row');

    var hide = function hide() {
        setTimeout(function () {
            store.dispatch((0, _MenuActions.hideMenu)({ stateKey: stateKey }));
        }, 0);
    };

    var actionDisabled = e.target && e.target.classList.contains((0, _prefix.prefix)(_GridConstants.CLASS_NAMES.GRID_ACTIONS.DISABLED));

    var removeEvent = function removeEvent() {
        document.body.removeEventListener('click', removeableEvent);
    };

    if (actionDisabled) {
        return false;
    }

    if (!isRowAction && !isSameNode && !occurredInHeader) {
        hide(e);
        removeEvent();
    } else if (isRowAction && isSameNode) {
        hide(e);
        removeEvent();
    } else if (isActionMenu) {
        hide(e);
        removeEvent();
    } else if (occurredInHeader && !isHeaderAction && !isHeaderMenu) {
        hide(e);
        removeEvent();
    }

    // if the header menu is shown
    // and were clicking on the action button
    // close the menu
    else if (headerMenuShown && isHeaderMenu) {
            hide(e);
            removeEvent();
        } else if (!isSameNode && !isHeaderAction) {
            removeEvent();
        }
};

var handleActionClick = exports.handleActionClick = function handleActionClick(type, actions, id, stateKey, store, menuShown, reducerKeys, reactEvent) {

    reactEvent.stopPropagation();
    store.dispatch((0, _MenuActions.showMenu)({ id: id, stateKey: stateKey }));

    if (!menuShown) {
        removeableEvent = handleHideMenu.bind(null, stateKey, store, reactEvent.target, reducerKeys);
        document.body.addEventListener('click', removeableEvent);
    }
};

exports.default = ActionColumn;
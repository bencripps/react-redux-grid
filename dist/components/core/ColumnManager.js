'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActionColumn = require('../plugins/gridactions/ActionColumn');

var _ActionColumn2 = _interopRequireDefault(_ActionColumn);

var _GridConstants = require('../../constants/GridConstants');

var _keyGenerator = require('../../util/keyGenerator');

var _getData = require('../../util/getData');

var _GridActions = require('../../actions/GridActions');

var _sorter = require('../../util/sorter');

var _sorter2 = _interopRequireDefault(_sorter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnManager = function () {
    function ColumnManager() {
        _classCallCheck(this, ColumnManager);
    }

    _createClass(ColumnManager, [{
        key: 'init',
        value: function init(_ref) {
            var plugins = _ref.plugins,
                store = _ref.store,
                events = _ref.events,
                selModel = _ref.selModel,
                editor = _ref.editor,
                columns = _ref.columns,
                dataSource = _ref.dataSource;


            var visibleColumns = columns.filter(function (col) {
                return !col.hidden;
            });

            var defaults = {
                defaultColumnWidth: 100 / visibleColumns.length + '%',
                dataSource: dataSource,
                minColumnWidth: 10,
                moveable: false,
                resizable: false,
                headerActionItemBuilder: null,
                sortable: {
                    enabled: true,
                    method: _GridConstants.SORT_METHODS.LOCAL,
                    sortingSource: plugins && plugins.COLUMN_MANAGER && plugins.COLUMN_MANAGER.sortable && plugins.COLUMN_MANAGER.sortable.sortingSource ? plugins.COLUMN_MANAGER.sortable.sortingSource : ''
                },

                /**
                    @private properties used by components
                        if properties are not available
                        i wouldn't remove these, but the
                        values can be flipped
                **/
                defaultResizable: false,
                defaultSortable: true
            };

            var config = plugins && plugins.COLUMN_MANAGER ? Object.assign(defaults, plugins.COLUMN_MANAGER) : defaults;

            this.plugins = plugins;
            this.store = store;
            this.sorter = _sorter2.default;
            this.events = events;
            this.selModel = selModel;
            this.editor = editor;
            this.columns = columns;
            this.config = config;
        }
    }, {
        key: 'doSort',
        value: function doSort(_ref2) {
            var method = _ref2.method,
                column = _ref2.column,
                direction = _ref2.direction,
                dataSource = _ref2.dataSource,
                pagerState = _ref2.pagerState,
                stateKey = _ref2.stateKey;


            var propName = (0, _getData.nameFromDataIndex)(column);

            var sortParams = {
                sort: {
                    property: propName,
                    direction: direction
                }
            };

            var pageIndex = pagerState && pagerState.pageIndex ? pagerState.pageIndex : 0;

            var pageSize = pagerState && pagerState.pageSize ? pagerState.pageSize : _GridConstants.DEFAULT_PAGE_SIZE;

            if (typeof this.events.HANDLE_BEFORE_SORT === 'function') {
                this.events.HANDLE_BEFORE_SORT({
                    property: propName,
                    direction: direction,
                    store: this.store,
                    column: column
                });
            }

            if (method === _GridConstants.SORT_METHODS.LOCAL) {

                var data = typeof column.sortFn === 'function' ? dataSource.data.sort(column.sortFn.bind(null, direction)) : this.sorter.sortBy(column.dataIndex, direction, dataSource);

                this.store.dispatch((0, _GridActions.doLocalSort)({
                    data: data,
                    stateKey: stateKey
                }));
            } else {
                this.store.dispatch((0, _GridActions.doRemoteSort)({
                    dataSource: this.config.sortable.sortingSource,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    sortParams: sortParams,
                    stateKey: stateKey
                }));
            }
        }
    }, {
        key: 'addActionColumn',
        value: function addActionColumn(_ref3) {
            var cells = _ref3.cells,
                columns = _ref3.columns,
                type = _ref3.type,
                id = _ref3.id,
                reducerKeys = _ref3.reducerKeys,
                rowData = _ref3.rowData,
                rowIndex = _ref3.rowIndex,
                menuState = _ref3.menuState,
                stateKey = _ref3.stateKey,
                stateful = _ref3.stateful;
            var GRID_ACTIONS = this.plugins.GRID_ACTIONS;

            var cellsCopy = cells;
            var actionProps = {
                actions: GRID_ACTIONS,
                store: this.store,
                type: type,
                columns: columns || this.columns,
                rowId: id,
                rowData: rowData,
                rowIndex: rowIndex,
                editor: this.editor,
                reducerKeys: reducerKeys,
                selModel: this.selModel,
                stateful: stateful,
                stateKey: stateKey,
                menuState: menuState,
                gridState: columns,
                headerActionItemBuilder: this.config.headerActionItemBuilder,
                key: (0, _keyGenerator.keyFromObject)(cells, ['row', 'actionhandler'])
            };

            if (GRID_ACTIONS) {
                cells.push(_react2.default.createElement(_ActionColumn2.default, actionProps));
            }

            return cellsCopy;
        }
    }]);

    return ColumnManager;
}();

exports.default = ColumnManager;
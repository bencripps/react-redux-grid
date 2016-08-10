'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectedGrid = exports.Grid = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _FixedHeader = require('./layout/FixedHeader');

var _FixedHeader2 = _interopRequireDefault(_FixedHeader);

var _TableRow = require('./layout/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _Toolbar = require('./plugins/pager/Toolbar');

var _Message = require('./plugins/errorhandler/Message');

var _Toolbar2 = require('./plugins/bulkactions/Toolbar');

var _Toolbar3 = _interopRequireDefault(_Toolbar2);

var _LoadingBar = require('./plugins/loader/LoadingBar');

var _LoadingBar2 = _interopRequireDefault(_LoadingBar);

var _ColumnManager = require('./core/ColumnManager');

var _ColumnManager2 = _interopRequireDefault(_ColumnManager);

var _Model = require('./plugins/selection/Model');

var _Model2 = _interopRequireDefault(_Model);

var _Manager = require('./plugins/editor/Manager');

var _Manager2 = _interopRequireDefault(_Manager);

var _prefix = require('../util/prefix');

var _GridConstants = require('../constants/GridConstants');

var _GridActions = require('../actions/GridActions');

var _mapStateToProps = require('../util/mapStateToProps');

var _shouldComponentUpdate = require('../util/shouldComponentUpdate');

var _isPluginEnabled = require('../util/isPluginEnabled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _css = document.createElement('style');

_css.innerHTML = '.react-grid-page-buttons {   background-color: #2e7d32;   border-radius: 3px;   border: none;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1; } .react-grid-page-buttons:focus {   outline: none; } .react-grid-page-buttons:active {   opacity: 1;   background-color: #52bf57; } .react-grid-page-buttons:hover {   opacity: 0.6; } .react-grid-page-buttons:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-cell {   border-bottom: 1px solid #f7f7f7;   font-family: \'Open Sans\', sans-serif;   font-size: 13px;   height: 20px;   overflow: hidden;   padding: 4px 10px 4px 10px;   position: relative;   text-overflow: ellipsis; } .react-grid-cell.react-grid-edit {   overflow: visible; } .react-grid-cell .react-grid-inactive {   pointer-events: none; } .react-grid-container {   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   position: relative; } .react-grid-table {   border-radius: 4px;   border-collapse: collapse;   font-size: 14px;   position: relative;   text-align: left;   table-layout: fixed;   white-space: nowrap;   width: 100%; } .react-grid-table.react-grid-header-fixed {   box-shadow: none;   z-index: 9; } .react-grid-table.react-grid-header-fixed.react-grid-header-stuck {   margin-left: auto;   margin-right: auto;   position: fixed;   top: 0; } .react-grid-table.react-grid-header-fixed.react-grid-header-stuck-bottom {   position: absolute; } .react-grid-table.react-grid-header-hidden thead, .react-grid-table.react-grid-header-hidden thead * {   border: 0;   height: 0; } .react-grid-table.react-grid-header-hidden thead th * {   border: 0;   display: none;   height: 0; } .react-grid-table-container {   background-color: #fff;   overflow: hidden;   overflow-y: auto;   overflow-x: hidden;   position: relative; } .react-grid-header-fixed-container.react-grid-hidden {   opacity: 0; } .react-grid-header {   background-color: #f7f7f7;   border-bottom: 1px solid #e9e9e9;   color: #3f3f3f;   font-family: \'Open Sans\', sans-serif;   height: 24px; } .react-grid-header.react-grid-header-hidden {   visibility: hidden; } .react-grid-header.react-grid-header-hidden th {   border: none;   height: 0px;   padding-bottom: 0px;   padding-top: 0px; } .react-grid-header.react-grid-header-hidden th.react-grid-checkbox-container {   border: none;   height: 0;   margin: 0; } .react-grid-header th {   position: relative;   text-overflow: ellipsis; } .react-grid-header th.react-grid-checkbox-container {   border-bottom: 1px solid #e9e9e9; } .react-grid-header th .react-grid-column {   display: inline-block;   text-overflow: ellipsis;   overflow: hidden;   width: 80%; } .react-grid-header th.react-grid-sort-handle-visible .react-grid-sort-handle {   visibility: visible; } .react-grid-header th .react-grid-sort-handle {   float: left;   -webkit-transition-duration: 150ms;           transition-duration: 150ms;   -webkit-transition-property: opacity;   transition-property: opacity;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   visibility: hidden; } .react-grid-header th .react-grid-sort-handle.react-grid-desc {   cursor: pointer; } .react-grid-header th .react-grid-sort-handle.react-grid-desc::before {   font-family: FontAwesome;   font-size: 12px;   font-weight: normal;   font-style: normal;   content: \'\\F0D8\'; } .react-grid-header th .react-grid-sort-handle.react-grid-desc::before {   top: -1px; } .react-grid-header th .react-grid-sort-handle.react-grid-asc {   cursor: pointer; } .react-grid-header th .react-grid-sort-handle.react-grid-asc::before {   font-family: FontAwesome;   font-size: 12px;   font-weight: normal;   font-style: normal;   content: \'\\F0D7\'; } .react-grid-header th .react-grid-sort-handle::before {   cursor: pointer;   position: relative;   right: 1px; } .react-grid-header th .react-grid-drag-handle::after {   border-right: 1px solid #f7f7f7;   content: \' \';   cursor: ew-resize;   position: absolute;   right: 0px;   top: 0px;   width: 10px;   height: 100%;   -webkit-transition-duration: 150ms;           transition-duration: 150ms;   -webkit-transition-property: border;   transition-property: border;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); } .react-grid-header th:hover .react-grid-drag-handle::after {   border-color: #e9e9e9; } .react-grid-header th:nth-last-child(1), .react-grid-header th:nth-last-child(2) {   overflow: initial; } .react-grid-header th:nth-last-child(1) .react-grid-drag-handle::after, .react-grid-header th:nth-last-child(2) .react-grid-drag-handle::after {   border: none;   cursor: auto; } .react-grid-action-menu-container {   background-color: #fff;   border-radius: 3px;   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   right: 6px;   list-style-type: none;   list-style-position: outside;   padding: 0px;   position: absolute;   top: 10px;   z-index: 11; } .react-grid-action-menu-item {   border-radius: 3px;   font-family: \'Open Sans\', sans-serif;   font-size: 12px;   padding: 6px 30px 6px 6px;   line-height: 1.2; } .react-grid-action-menu-item:hover {   background-color: #f7f7f7; } .react-grid-row {   background-color: #fff;   cursor: pointer;   text-overflow: ellipsis;   -webkit-transition-duration: 150ms;           transition-duration: 150ms;   -webkit-transition-property: background-color;   transition-property: background-color;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); } .react-grid-row:hover {   background-color: #f5f5f5; } .react-grid-row.react-grid-empty-row {   text-align: center;   height: 80px; } .react-grid-row.react-grid-active {   background-color: #e9e9e9; } .react-grid-row.react-grid-edit {   color: #fff;   background-color: #b2b2b2;   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); } .react-grid-row.react-grid-edit .react-grid-action-menu-container {   color: initial; } .react-grid-row.react-grid-edit:hover {   background-color: #b2b2b2; } .react-grid-row.react-grid-edit td {   border-bottom: 2px solid transparent; } .react-grid-row.react-grid-edit td:focus {   border-bottom: 2px solid #2e7d32;   outline: none; } .react-grid-inline-editor {   opacity: 0;   position: absolute;   left: 0px;   -webkit-transform: translateX(0px) translateY(0px);           transform: translateX(0px) translateY(0px);   text-align: center;   margin: 0px auto;   -webkit-transition-duration: 150ms;           transition-duration: 150ms;   -webkit-transition-property: -webkit-transform opacity;   transition-property: -webkit-transform opacity;   transition-property: transform opacity;   transition-property: transform opacity, -webkit-transform opacity;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   pointer-events: none;   right: 0px; } .react-grid-inline-editor .react-grid-button-container {   background-color: #b2b2b2;   border-radius: 3px;   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   display: inline-block;   margin-top: 5px;   padding: 5px;   pointer-events: all; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button {   background-color: #2e7d32;   border-radius: 3px;   border: none;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button:focus {   outline: none; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button:active {   opacity: 1;   background-color: #52bf57; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button:hover {   opacity: 0.6; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button {   background-color: #f7f7f7;   border-radius: 3px;   border: none;   color: #161616;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button:focus {   outline: none; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button:active {   opacity: 1;   background-color: #f9f9f9; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button:hover {   opacity: 0.6; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-inline-editor.react-grid-shown {   opacity: 1;   display: block;   -webkit-transform: translateY(-7px);           transform: translateY(-7px); } .react-grid-inline-editor.react-grid-hidden {   top: -10000px; } .react-grid-error-container {   background-color: #f7f7f7;   bottom: 0px;   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   color: #e9e9e9;   height: 100px;   left: 0px;   margin: auto;   position: absolute;   -webkit-perspective: 1300px;           perspective: 1300px;   -webkit-transform-style: preserve-3d;           transform-style: preserve-3d;   -webkit-transform: rotateX(-70deg);           transform: rotateX(-70deg);   -webkit-transition-duration: 0.2s;           transition-duration: 0.2s;   -webkit-transition-property: -webkit-transform;   transition-property: -webkit-transform;   transition-property: transform;   transition-property: transform, -webkit-transform;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   opacity: 0;   right: 0px;   top: -10000px;   width: 50%;   z-index: 10; } .react-grid-error-container .react-grid-error-message {   color: #3f3f3f;   font-family: \'Open Sans\', sans-serif;   height: 20px;   margin-top: -20px;   top: 50%;   left: 0;   right: 0;   position: absolute; } .react-grid-error-container button {   background-color: #2e7d32;   border-radius: 3px;   border: none;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1;   position: absolute;   right: 10px;   bottom: 10px; } .react-grid-error-container button:focus {   outline: none; } .react-grid-error-container button:active {   opacity: 1;   background-color: #52bf57; } .react-grid-error-container button:hover {   opacity: 0.6; } .react-grid-error-container button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-error-container.react-grid-shown {   top: 0px;   -webkit-transform: rotateX(0deg);           transform: rotateX(0deg);   opacity: 1; } th.react-grid-action-container {   border-bottom: 1px solid #e9e9e9; } .react-grid-action-container {   cursor: pointer;   position: relative;   width: 5px;   border-bottom: 1px solid #f7f7f7;   height: 20px;   font-family: \'Open Sans\', sans-serif; } .react-grid-action-container .react-grid-no-actions {   display: none; } .react-grid-action-container .react-grid-action-icon {   cursor: pointer;   cursor: pointer;   padding-left: 5px;   position: relative; } .react-grid-action-container .react-grid-action-icon::before {   font-family: FontAwesome;   font-size: 12px;   font-weight: normal;   font-style: normal;   content: \'\\F142\'; } .react-grid-action-container .react-grid-action-icon::before {   cursor: pointer;   border-radius: 3px;   position: absolute;   text-align: center;   top: 5px;   right: 5px;   width: 6px; } .react-grid-action-container.react-grid-action-menu-selected span::before {   background-color: #e9e9e9; } .react-grid-loading-bar {   display: none;   position: absolute;   height: 4px;   width: 100%; } .react-grid-loading-bar.react-grid-active {   display: block; } .react-grid-loading-bar::before {   display: block;   position: absolute;   content: "";   left: -200px;   width: 200px;   height: 4px;   background-color: #2e7d32;   -webkit-animation: loading 2s linear infinite;           animation: loading 2s linear infinite; } @-webkit-keyframes loading {   from {     left: 0px;     width: 30%;   }   50% {     width: 30%;   }   70% {     width: 44%;   }   80% {     left: 55%;   }   95% {     left: 66%;   }   to {     left: 72%;   } } @keyframes loading {   from {     left: 0px;     width: 30%;   }   50% {     width: 30%;   }   70% {     width: 44%;   }   80% {     left: 55%;   }   95% {     left: 66%;   }   to {     left: 72%;   } } .react-grid-pager-toolbar {   background-color: #f7f7f7;   border-top: 1px solid #e9e9e9;   border-radius: 0px 0px 3px 3px;   font-family: \'Open Sans\', sans-serif;   font-size: 13px;   height: 24px;   text-indent: 10px; } .react-grid-pager-toolbar.react-grid-is-stuck {   bottom: 0;   position: fixed; } .react-grid-pager-toolbar.react-grid-is-stuck-bottom {   position: absolute;   width: 100%; } .react-grid-pager-toolbar span {   display: block;   float: right;   position: relative;   right: 5px;   top: 2px; } .react-grid-pager-toolbar span:first-child {   font-size: 14px;   font-family: \'Open Sans\', sans-serif;   float: left; } .react-grid-pager-toolbar button {   margin: 0px 10px; } .react-grid-checkbox-container {   border-bottom: 1px solid #f7f7f7;   height: 20px;   font-family: \'Open Sans\', sans-serif;   font-size: 13px;   padding: 4px 10px 4px 10px;   position: relative;   text-overflow: ellipsis;   overflow: hidden;   padding: 0px 10px;   width: 10px; } .react-grid-bulkaction-container {   background-color: #b2b2b2;   border-radius: 3px 3px 0px 0px;   height: 28px;   -webkit-transition-duration: 150ms;           transition-duration: 150ms;   -webkit-transition-property: -webkit-transform opacity top;   transition-property: -webkit-transform opacity top;   transition-property: transform opacity top;   transition-property: transform opacity top, -webkit-transform opacity top;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   position: absolute;   text-align: left;   -webkit-transform: translateX(0px) translateY(-37px);           transform: translateX(0px) translateY(-37px);   top: -37px;   opacity: 0;   z-index: 12;   width: 100%; } .react-grid-bulkaction-container .react-grid-bulkaction-description {   display: inline-block;   font-family: \'Open Sans\', sans-serif;   font-size: 13px;   overflow: hidden;   padding-left: 15px;   text-overflow: ellipsis;   min-width: 70px;   position: relative;   top: 3px; } .react-grid-bulkaction-container .react-grid-checkbox-container {   border-bottom: 1px solid transparent; } .react-grid-bulkaction-container button {   background-color: #2e7d32;   border-radius: 3px;   border: none;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1;   margin: 5px 8px;   position: relative;   top: -1px; } .react-grid-bulkaction-container button:focus {   outline: none; } .react-grid-bulkaction-container button:active {   opacity: 1;   background-color: #52bf57; } .react-grid-bulkaction-container button:hover {   opacity: 0.6; } .react-grid-bulkaction-container button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-bulkaction-container.react-grid-removed {   top: -100px; } .react-grid-bulkaction-container.react-grid-shown {   top: 0px;   opacity: 1;   -webkit-transform: translateY(0px);           transform: translateY(0px); } .react-grid-filter-container {   background-color: #f7f7f7;   border-radius: 3px 3px 0px 0px;   padding: 5px 0px;   position: relative;   text-align: center;   width: 100%; } .react-grid-filter-container .react-grid-filter-input {   border: 1px solid #e9e9e9;   border-radius: 3px;   font-family: \'Open Sans\', sans-serif;   font-size: 14px;   color: #b2b2b2;   display: inline-block;   padding: 0px;   text-indent: 5px;   -webkit-transition-duration: 150ms;           transition-duration: 150ms;   -webkit-transition-property: color;   transition-property: color;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   width: 99%; } .react-grid-filter-container .react-grid-filter-input:focus {   color: #8e8e8e;   outline: none; } .react-grid-filter-container:hover .react-grid-filter-input {   color: #8e8e8e; } .react-grid-filter-container .react-grid-filter-button-container {   display: inline-block;   position: absolute;   right: 5px; } .react-grid-filter-container .react-grid-filter-button-container > i {   padding: 0px 3px 0px 0px; } .react-grid-filter-container .react-grid-filter-button-container > i::before {   color: #b2b2b2;   -webkit-transition-duration: 150ms;           transition-duration: 150ms;   -webkit-transition-property: color;   transition-property: color;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); } .react-grid-filter-container .react-grid-filter-button-container > i:hover::before {   color: #8e8e8e; } .react-grid-filter-container .react-grid-filter-button-container > i.react-grid-active::before {   color: #2e7d32; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-search-button {   cursor: pointer; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-search-button::before {   font-family: FontAwesome;   font-size: 12px;   font-weight: normal;   font-style: normal;   content: \'\\F002\'; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-clear-button {   cursor: pointer; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-clear-button::before {   font-family: FontAwesome;   font-size: 12px;   font-weight: normal;   font-style: normal;   content: \'\\F00D\'; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-menu-button {   cursor: pointer; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-menu-button::before {   font-family: FontAwesome;   font-size: 12px;   font-weight: normal;   font-style: normal;   content: \'\\F0b0\'; } .react-grid-advanced-filter-menu-container {   background-color: #f7f7f7;   border-radius: 3px;   box-shadow: 10px 15px 30px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   font-family: \'Open Sans\', sans-serif;   position: absolute;   right: 10px;   top: 24px;   width: 400px;   z-index: 13; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-title {   display: inline-block;   padding: 5px 10px; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-field-container {   display: block;   padding: 5px 0px;   text-align: left;   font-size: 13px;   margin: 0px auto;   width: 90%; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-field-container .react-grid-advanced-filter-menu-field-label {   display: inline-block;   padding: 5px 0px; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-field-container .react-grid-advanced-filter-menu-field-input {   border: 1px solid #e9e9e9;   border-radius: 3px;   font-family: \'Open Sans\', sans-serif;   font-size: 14px;   color: #b2b2b2;   display: inline-block;   padding: 0px;   text-indent: 5px;   -webkit-transition-duration: 150ms;           transition-duration: 150ms;   -webkit-transition-property: color;   transition-property: color;   -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);           transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   width: 100%; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-field-container .react-grid-advanced-filter-menu-field-input:focus {   color: #8e8e8e;   outline: none; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container {   padding: 10px 10px;   margin: 0px auto;   width: 90%;   text-align: left; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button {   background-color: #2e7d32;   border-radius: 3px;   border: none;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1;   margin-right: 5px; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button:focus {   outline: none; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button:active {   opacity: 1;   background-color: #52bf57; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button:hover {   opacity: 0.6; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary {   background-color: #fff;   border-radius: 3px;   border: none;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1;   color: #161616; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary:focus {   outline: none; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary:active {   opacity: 1;   background-color: #fff; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary:hover {   opacity: 0.6; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } '
document.head.appendChild(_css)

var Grid = function (_Component) {
    _inherits(Grid, _Component);

    _createClass(Grid, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var classNames = _props.classNames;
            var columnState = _props.columnState;
            var gridData = _props.gridData;
            var height = _props.height;
            var loadingState = _props.loadingState;
            var pageSize = _props.pageSize;
            var plugins = _props.plugins;
            var events = _props.events;
            var reducerKeys = _props.reducerKeys;
            var stateKey = _props.stateKey;
            var store = _props.store;
            var pager = _props.pager;
            var editorState = _props.editorState;
            var selectedRows = _props.selectedRows;
            var menuState = _props.menuState;


            var columns = columnState && columnState.columns ? columnState.columns : [];

            if ((!columns || columns.length === 0) && this.columnManager.columns) {
                columns = this.columnManager.columns;
            }

            var editorComponent = this.editor.getComponent(plugins, reducerKeys, store, events, this.selectionModel, this.editor, columns);

            var containerProps = {
                className: _prefix.prefix.apply(undefined, [_GridConstants.CLASS_NAMES.CONTAINER].concat(_toConsumableArray(classNames))),
                reducerKeys: reducerKeys
            };

            var messageProps = {
                reducerKeys: reducerKeys,
                store: store
            };

            var bulkActionProps = {
                plugins: plugins,
                reducerKeys: reducerKeys,
                selectionModel: this.selectionModel,
                stateKey: stateKey,
                store: store
            };

            var bulkActionCmp = (0, _isPluginEnabled.isPluginEnabled)(plugins, 'BULK_ACTIONS') ? _react2.default.createElement(_Toolbar3.default, bulkActionProps) : null;

            var headerProps = {
                columnManager: this.columnManager,
                columns: columns,
                plugins: plugins,
                reducerKeys: reducerKeys,
                dataSource: gridData,
                pager: pager,
                columnState: columnState,
                selectionModel: this.selectionModel,
                stateKey: stateKey,
                store: store,
                visible: false,
                menuState: menuState
            };

            var fixedHeaderProps = Object.assign({
                visible: true,
                gridData: gridData
            }, headerProps);

            var tableContainerProps = {
                className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.TABLE_CONTAINER),
                style: {
                    height: height
                }
            };

            var rowProps = {
                columnManager: this.columnManager,
                columns: columns,
                editor: this.editor,
                columnState: columnState,
                dataSource: gridData,
                pager: pager,
                editorState: editorState,
                selectedRows: selectedRows,
                events: events,
                pageSize: pageSize,
                plugins: plugins,
                reducerKeys: reducerKeys,
                selectionModel: this.selectionModel,
                stateKey: stateKey,
                store: store,
                menuState: menuState
            };

            var tableProps = {
                className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.TABLE, _GridConstants.CLASS_NAMES.HEADER_HIDDEN),
                cellSpacing: 0,
                reducerKeys: reducerKeys,
                store: store
            };

            var pagerProps = {
                dataSource: gridData,
                pageSize: pageSize,
                plugins: plugins,
                reducerKeys: reducerKeys,
                stateKey: stateKey,
                store: store
            };

            var loadingBarProps = {
                plugins: plugins,
                reducerKeys: reducerKeys,
                stateKey: stateKey,
                store: store,
                loadingState: loadingState
            };

            return _react2.default.createElement(
                'div',
                containerProps,
                _react2.default.createElement(_Message.Message, messageProps),
                bulkActionCmp,
                _react2.default.createElement(_FixedHeader2.default, fixedHeaderProps),
                _react2.default.createElement(
                    'div',
                    tableContainerProps,
                    _react2.default.createElement(
                        'table',
                        tableProps,
                        _react2.default.createElement(_Header2.default, headerProps),
                        _react2.default.createElement(_TableRow2.default, rowProps)
                    ),
                    editorComponent
                ),
                _react2.default.createElement(_Toolbar.ConnectedPagerToolbar, pagerProps),
                _react2.default.createElement(_LoadingBar2.default, loadingBarProps)
            );
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props2 = this.props;
            var columns = _props2.columns;
            var dataSource = _props2.dataSource;
            var events = _props2.events;
            var plugins = _props2.plugins;
            var reducerKeys = _props2.reducerKeys;
            var stateKey = _props2.stateKey;
            var store = _props2.store;


            if (!store || !store.dispatch) {
                throw new Error('Component must be intialized with a valid store');
            }

            if (!stateKey) {
                throw new Error('A stateKey is required to intialize the grid');
            }

            this.setColumns();

            this.setData();

            this.columnManager.init({
                plugins: plugins,
                store: store,
                events: events,
                selectionModel: this.selectionModel,
                editor: this.editor,
                columns: columns,
                dataSource: dataSource,
                reducerKeys: reducerKeys
            });

            this.selectionModel.init(plugins, stateKey, store, events);

            this.editor.init(plugins, stateKey, store, events);
        }
    }]);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, props));

        _this.shouldComponentUpdate = _shouldComponentUpdate.shouldGridUpdate.bind(_this);

        _this.columnManager = new _ColumnManager2.default();

        _this.editor = new _Manager2.default();

        _this.selectionModel = new _Model2.default();
        return _this;
    }

    _createClass(Grid, [{
        key: 'setData',
        value: function setData() {
            var _props3 = this.props;
            var dataSource = _props3.dataSource;
            var data = _props3.data;
            var stateKey = _props3.stateKey;
            var store = _props3.store;


            if (typeof dataSource === 'string' || typeof dataSource === 'function') {
                store.dispatch((0, _GridActions.getAsyncData)({ stateKey: stateKey, dataSource: dataSource }));
            } else if (data) {
                store.dispatch((0, _GridActions.setData)({ stateKey: stateKey, data: data }));
            } else {
                throw new Error('A data source, or a static data set is required');
            }
        }
    }, {
        key: 'setColumns',
        value: function setColumns() {
            var _props4 = this.props;
            var columns = _props4.columns;
            var stateKey = _props4.stateKey;
            var store = _props4.store;


            if (!columns) {
                throw new Error('A columns array is required');
            } else {
                store.dispatch((0, _GridActions.setColumns)({ columns: columns, stateKey: stateKey }));
            }
        }
    }]);

    return Grid;
}(_react.Component);

Grid.propTypes = {
    classNames: _react.PropTypes.array,
    columnState: _react.PropTypes.object,
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
    data: _react.PropTypes.arrayOf(_react.PropTypes.object),
    dataSource: _react.PropTypes.any,
    editorState: _react.PropTypes.object,
    events: _react.PropTypes.object,
    gridData: _react.PropTypes.object,
    height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    loadingState: _react.PropTypes.object,
    menuState: _react.PropTypes.object,
    pageSize: _react.PropTypes.number,
    pager: _react.PropTypes.object,
    plugins: _react.PropTypes.object,
    reducerKeys: _react.PropTypes.object,
    selectedRows: _react.PropTypes.object,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object
};
Grid.defaultProps = {
    classNames: [],
    columns: [],
    events: {},
    height: '500px',
    pageSize: 25,
    reducerKeys: {}
};


var ConnectedGrid = (0, _reactRedux.connect)(_mapStateToProps.mapStateToProps)(Grid);

exports.Grid = Grid;
exports.ConnectedGrid = ConnectedGrid;
import React, { PropTypes, Component } from 'react';
import ActionColumn from '../plugins/gridactions/ActionColumn.jsx';
import { CSS_PREFIX, CLASS_NAMES } from '../../constants/GridConstants';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import { elementContains } from '../../util/elementContains';
import { hideMenu } from '../../actions/plugins/actioncolumn/MenuActions';

export default class ColumnManager {

	constructor(plugins, store, events, selModel, editor, columns) {

		const defaults = {
			defaultColumnWidth: `${100 / columns.length}%`,
            minColumnWidth: 10,
            defaultResizable: false,
            resizable: false
		};

        const config = plugins.COLUMN_MANAGER 
            ? Object.assign(defaults, plugins.COLUMN_MANAGER) : defaults;

		this.plugins = plugins;
		this.store = store;
		this.events = events;
        this.selModel = selModel;
        this.editor = editor;
		this.config = config;

		document.addEventListener('click', this.setDismissEvent.bind(this));
	}

	setDismissEvent(e) {

		if (!elementContains(e.target, `${CSS_PREFIX}-action-container`)) {
			this.store.dispatch(hideMenu());
		}

	}

	addActionColumn(cells, type, id) {
		const cellsCopy = cells;
        const { GRID_ACTIONS } = this.plugins;
        const actionProps = {
            actions: GRID_ACTIONS,
            store: this.store,
            type: type,
            rowId: id,
            editor: this.editor,
            selModel: this.selModel,
            key: keyFromObject(cells, ['row', 'actionhandler'])
        }

        if (GRID_ACTIONS) {
            cells.push(<ActionColumn { ...actionProps } />);
        }

        return cellsCopy;
	}
}
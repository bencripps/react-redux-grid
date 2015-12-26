import React, { PropTypes, Component } from 'react';
import ActionColumn from '../plugins/gridactions/ActionColumn.jsx';
import { CSS_PREFIX, CLASS_NAMES } from '../../constants/GridConstants';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';

export default class ColumnManager {

	constructor(plugins, store, events) {

		const defaults = {
			
		};

		this.plugins = plugins;
		this.store = store;
		this.events = events;
		
	}

	addActionColumn(cells, type, id) {
		const cellsCopy = cells;
        const { GRID_ACTIONS } = this.plugins;
        const actionProps = {
            actions: GRID_ACTIONS,
            store: this.store,
            type: type,
            rowId: id,
            key: keyFromObject(cells, ['row', 'actionhandler'])
        }

        if (GRID_ACTIONS) {
            cells.push(<ActionColumn { ...actionProps } />);
        }

        return cellsCopy;
	}
}
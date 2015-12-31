import React, { PropTypes, Component } from 'react';
import { CSS_PREFIX, CLASS_NAMES } from '../../../constants/GridConstants';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';
import { setSelection } from '../../../actions/plugins/selection/ModelActions';
import CheckBox from './CheckBox.jsx';

export default class Model {

	constructor(plugins, store, events) {

		const eventTypes = {
			singleclick: 'singleclick',
			doubleclick: 'doubleclick'
		};

		const modes = {
			single: 'single',
			multi: 'multi',
			checkboxSingle: 'checkbox-single',
			checkboxMulti: 'checkbox-multi'
		};

		const defaults = {
			mode: modes.single,
			enabled: true,
			allowDeselect: true,
        	activeCls: 'active-class',
        	editCls: 'edit-class',
        	selectionEvent: eventTypes.singleclick,
        	store: store
		}

		const config = plugins.SELECTION_MODEL 
			? Object.assign(defaults, plugins.SELECTION_MODEL) : defaults;

		this.defaults = config;
		this.eventTypes = eventTypes;
		this.modes = modes;
		this.store = config.store;
		this.events = events;
	}

	handleSelectionEvent(selectionEvent) {

		if (this.events.HANDLE_BEFORE_SELECTION) {
			this.events.HANDLE_BEFORE_SELECTION(selectionEvent);
		}

		if (this.events.HANDLE_BEFORE_BULKACTION_SHOW) {
			this.events.HANDLE_BEFORE_BULKACTION_SHOW(selectionEvent);
		}

		this.store.dispatch(setSelection(selectionEvent.id, this.defaults, this.modes));

		if (this.events.HANDLE_AFTER_SELECTION) {
			this.events.HANDLE_AFTER_SELECTION(selectionEvent);
		}

		if (this.events.HANDLE_AFTER_BULKACTION_SHOW) {
			this.events.HANDLE_AFTER_BULKACTION_SHOW(selectionEvent);
		}

	}

	updateCells(cells, rowId, type) {

		const cellsUpdate = cells;

		const checkBoxProps = {
			key: keyFromObject(rowId, ['checkbox-']),
			rowId,
			type,
			store: this.store
		}

		if (this.defaults.mode === this.modes.checkboxSingle 
			|| this.defaults.mode === this.modes.checkboxMulti) {
			cellsUpdate.unshift(<CheckBox { ...checkBoxProps } />);
		}

		return cellsUpdate;
	}
}
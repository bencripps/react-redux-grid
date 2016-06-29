import React from 'react';
import { keyFromObject } from '../../../util/keyGenerator';
import { setSelection } from '../../../actions/plugins/selection/ModelActions';
import { ConnectedCheckBox as CheckBox } from './CheckBox.jsx';
import { SELECTION_MODES } from './../../../constants/GridConstants';

export default class Model {

    init(plugins, stateKey, store, events) {

        const eventTypes = {
            singleclick: 'singleclick',
            doubleclick: 'doubleclick'
        };

        const modes = SELECTION_MODES;

        const defaults = {
            mode: modes.single,
            enabled: true,
            editEvent: 'none',
            allowDeselect: true,
            activeCls: 'active',
            editCls: 'edit',
            selectionEvent: eventTypes.singleclick,
            store: store
        };

        const config = plugins && plugins.SELECTION_MODEL
            ? Object.assign(defaults, plugins.SELECTION_MODEL) : defaults;

        this.defaults = config;
        this.eventTypes = eventTypes;
        this.modes = modes;
        this.store = config.store;
        this.stateKey = stateKey;
        this.events = events;
    }

    handleSelectionEvent(selectionEvent) {

        if (this.events.HANDLE_BEFORE_SELECTION) {
            this.events.HANDLE_BEFORE_SELECTION(selectionEvent);
        }

        if (this.events.HANDLE_BEFORE_BULKACTION_SHOW) {
            this.events.HANDLE_BEFORE_BULKACTION_SHOW(selectionEvent);
        }

        this.store.dispatch(
            setSelection({
                id: selectionEvent.id,
                defaults: this.defaults,
                modes: this.modes,
                stateKey: this.stateKey
            })
        );

        if (this.events.HANDLE_AFTER_SELECTION) {
            this.events.HANDLE_AFTER_SELECTION(selectionEvent);
        }

        if (this.events.HANDLE_AFTER_BULKACTION_SHOW) {
            this.events.HANDLE_AFTER_BULKACTION_SHOW(selectionEvent);
        }

    }

    updateCells(cells, rowId, type, reducerKeys, stateKey) {

        const cellsUpdate = cells;

        const checkBoxProps = {
            key: keyFromObject(rowId, ['checkbox-']),
            rowId,
            type,
            reducerKeys,
            stateKey,
            store: this.store
        };

        if (this.defaults.mode === this.modes.checkboxSingle
            || this.defaults.mode === this.modes.checkboxMulti) {
            cellsUpdate.unshift(<CheckBox { ...checkBoxProps } />);
        }

        return cellsUpdate;
    }
}

import React from 'react';

import { setSelection } from '../../../actions/plugins/selection/ModelActions';
import { ConnectedCheckBox as CheckBox } from './CheckBox';
import { SELECTION_MODES } from './../../../constants/GridConstants';
import { fireEvent } from './../../../util/fire';

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

        fireEvent(
            'HANDLE_BEFORE_SELECTION',
            this.events,
            {
                ...selectionEvent
            },
            null
        );

        fireEvent(
            'HANDLE_BEFORE_BULKACTION_SHOW',
            this.events,
            {
                ...selectionEvent
            },
            null
        );

        this.store.dispatch(
            setSelection({
                id: selectionEvent.id,
                index: selectionEvent.index,
                defaults: this.defaults,
                modes: this.modes,
                stateKey: this.stateKey
            })
        );

        fireEvent(
            'HANDLE_AFTER_SELECTION',
            this.events,
            {
                ...selectionEvent
            },
            null
        );

        fireEvent(
            'HANDLE_AFTER_BULKACTION_SHOW',
            this.events,
            {
                ...selectionEvent
            },
            null
        );
    }

    updateCells({
        cells,
        rowId,
        index,
        type,
        reducerKeys,
        stateKey,
        rowData,
        isSelected
    }) {

        const cellsUpdate = cells;

        const checkBoxProps = {
            key: rowId,
            rowId,
            type,
            reducerKeys,
            stateKey,
            store: this.store,
            index,
            rowData,
            onSelect: this.handleSelectionEvent.bind(this),
            selectionModelConfig: this.defaults,
            events: this.events,
            isSelected
        };

        if (this.defaults.mode === this.modes.checkboxSingle
            || this.defaults.mode === this.modes.checkboxMulti) {
            cellsUpdate.unshift(<CheckBox { ...checkBoxProps } />);
        }

        return cellsUpdate;
    }
}

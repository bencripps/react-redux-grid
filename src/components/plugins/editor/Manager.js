import React from 'react';
import Inline from './Inline';

export default class Manager {

    init(plugins, stateKey, store) {

        const defaults = {
            type: 'inline',
            enabled: false,
            focusOnEdit: true
        };

        const editModes = {
            inline: 'inline',
            grid: 'grid'
        };

        const config = plugins && plugins.EDITOR
            ? Object.assign(defaults, plugins.EDITOR) : defaults;

        this.stateKey = stateKey;
        this.config = config;
        this.editModes = editModes;
        this.store = store;
    }

    getComponent(
        plugins, reducerKeys, store, events, selectionModel, editor, columns
    ) {

        const editorProps = {
            columns,
            config: this.config,
            reducerKeys,
            store,
            stateKey: this.stateKey,
            events
        };

        if (!this.config.enabled) {
            return null;
        }

        else if (this.config.type === this.editModes.inline) {
            return (
                <Inline { ...editorProps} />
            );
        }

        return null;
    }

}

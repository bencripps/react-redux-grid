import React from 'react';
import thunk from 'redux-thunk';
import TestUtils from 'react-addons-test-utils';
import configureMockStore from 'redux-mock-store';
import ColumnManager from '../../src/components/core/ColumnManager';
import Model from '../../src/components/plugins/selection/Model';
import { gridColumns } from './data';

export const mockStore = getMockStore;

export function setup(thing) {
    const renderer = TestUtils.createRenderer();
    renderer.render(thing);

    const output = renderer.getRenderOutput();

    return {
        output,
        renderer
    };
}

export const sampleReactEvent = {
    stopPropagation: () => {}
};

export function getSelModel() {

    const model = new Model();

    model.init(
        // plugins
        {},
        // store,
        mockStore,
        // events
        {}
    );

    return model;
}

export function getColumnManager() {
    const columnManager = new ColumnManager();

    columnManager.init(
        // plugins
        {},
        // store
        mockStore,
        // events
        {},
        // selModel,
        getSelModel(),
        // editor,
        {},
        // columns
        gridColumns,
        // dataSource
        ''
    );

    return columnManager;
}

function getMockStore(state: {}, ...actions) {
    const getState = state;
    const middleWares = [thunk];
    const store = configureMockStore(middleWares);
    return store(getState, actions);
}

import React from 'react';
import thunk from 'redux-thunk';
import TestUtils from 'react-addons-test-utils';
import configureMockStore from 'redux-mock-store';
import ColumnManager from '../../src/components/core/ColumnManager';
import Model from '../../src/components/plugins/selection/Model';
import { gridColumns } from './data';

export const mockStore = getMockStore;

export function setup(thing) {
    let renderer = TestUtils.createRenderer();
    renderer.render(thing);

    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

export const sampleReactEvent = {
    stopPropagation: () => {}
};

export function getSelModel() {

    return new Model(
        // plugins
        {},
        // store,
        mockStore,
        // events
        {}
    );
}

export function getColumnManager() {
    return new ColumnManager(
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
}

function getMockStore(state: {}, ...actions) {
    const getState = state;
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    return mockStore(getState, actions);
}

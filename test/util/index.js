import React from 'react';
import thunk from 'redux-thunk';
import TestUtils from 'react-addons-test-utils';
import configureMockStore from 'redux-mock-store';

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

function getMockStore(state: {}, ...actions) {
    const getState = state;
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    return mockStore(getState, actions);
}

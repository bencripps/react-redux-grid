import React from 'react';
import TestUtils from 'react-addons-test-utils';
import configureMockStore from 'redux-mock-store';

export const mockStore = configureMockStore([]);

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
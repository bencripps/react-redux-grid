import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

export function setup(cmp, props) {
    const renderer = TestUtils.createRenderer();
    renderer.render(<cmp {...props} />);

    const output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}
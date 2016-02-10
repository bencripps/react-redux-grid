import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { jsdom } from 'jsdom';

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
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Cell } from './../../../src/components/layout/Cell.jsx';
import { setup, mockStore, mockReducer } from './../../util/index';
import { cellData } from './../../util/data';

const props = {
    cellData
};

function cell(cmpProps) {
    const element = React.createElement(Cell, cmpProps);
    const renderer = TestUtils.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();
}

describe('Cell Default Props', () => {
    const cell = <Cell { ...props } />;
    const internalProps = cell.props;

    it('Should be rendered with correct default props', () => {
        expect(internalProps.cellData).toEqual(props.cellData);
    });
    
    it('Should be rendered with correct default props', () => {
        expect(internalProps.cellData).toEqual(props.cellData);
    });
});
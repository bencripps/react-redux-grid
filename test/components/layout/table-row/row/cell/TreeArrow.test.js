import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';

import store from './../../../../../../src/store/store';
import {
    TreeArrow,
    handleArrowClick
} from './../../../../../../src/components/layout/table-row/row/cell/TreeArrow.jsx'; // eslint-disable-line

describe('The Tree Arrow Component', () => {

    const props = {
        depth: 2,
        hasChildren: true,
        id: 11,
        isEditable: false,
        isExpandable: false,
        readFunc: () => {},
        showRootTreeNode: false,
        shouldNest: true,
        stateful: false,
        stateKey: 'tree-arrow-tests',
        store
    };

    it('Should render a tree arrow', () => {

        const component = mount(<TreeArrow { ...props }/>);

        expect(component.find('span').props().className)
            .toContain([
                'react-grid-cell-tree-arrow',
                'react-grid-tree-nested',
                'react-grid-tree-node-depth-2',
                'react-grid-node-unexpanded'
            ].join(' '));

    });

    it('Should render an expandable arrow', () => {

        const component = mount(
            <TreeArrow { ...{ ...props, isExpandable: true } }/>
        );

        expect(component.find('span').props().className)
            .toContain([
                'react-grid-cell-tree-arrow',
                'react-grid-expand',
                'react-grid-tree-nested',
                'react-grid-tree-node-depth-2'
            ].join(' '));

    });

    it('Should render an unnested', () => {

        const component = mount(
            <TreeArrow { ...{ ...props, shouldNest: false } }/>
        );

        expect(component.find('span').props().className)
            .toContain([
                'react-grid-cell-tree-arrow',
                'react-grid-tree-node-depth-2',
                'react-grid-node-unexpanded'
            ].join(' '));

    });

    it('Should render an editable node', () => {

        const component = mount(
            <TreeArrow { ...{ ...props, isEditable: true } }/>
        );

        expect(component.find('span').props().className)
            .toContain([
                'react-grid-cell-tree-arrow',
                'react-grid-edit',
                'react-grid-tree-nested',
                'react-grid-tree-node-depth-2',
                'react-grid-node-unexpanded'
            ].join(' '));

    });

    it('Should call the readFunc on click', () => {
        const clickProps = {
            ...props,
            hasChildren: false,
            readFunc: sinon.spy()
        };

        handleArrowClick(clickProps, { stopPropagation: () => {} });

        expect(clickProps.readFunc.called)
            .toEqual(true);

    });

    it('Should update the node visilbility on click', () => {
        const clickProps = {
            ...props,
            hasChildren: true,
            store: { dispatch: sinon.spy() }
        };

        handleArrowClick(clickProps, { stopPropagation: () => {} });

        expect(clickProps.store.dispatch.called)
            .toEqual(true);
    });

    it('Should update the stateful local storage', () => {
        const clickProps = {
            ...props,
            hasChildren: true,
            stateful: true,
            store: { dispatch: sinon.spy() }
        };

        handleArrowClick(clickProps, { stopPropagation: () => {} });

        expect(clickProps.store.dispatch.called)
            .toEqual(true);
    });

});

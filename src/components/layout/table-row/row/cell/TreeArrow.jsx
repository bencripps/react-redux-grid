import React, { PropTypes } from 'react';

import { prefix } from './../../../../../util/prefix';
import { CLASS_NAMES } from './../../../../../constants/GridConstants';
import { setTreeNodeVisibility } from './../../../../../actions/GridActions';
import
    localStorageManager
from './../../../../core/LocalStorageManager';

const debouncedSetStateItem = localStorageManager.debouncedSetStateItem();

export const TreeArrow = ({
    depth,
    hasChildren,
    id,
    isEditable,
    isExpandable,
    isExpanded,
    readFunc,
    showTreeRootNode,
    shouldNest,
    stateful,
    stateKey,
    store
}) => {

    const arrowProps = {
        className: prefix(CLASS_NAMES.CELL_TREE_ARROW,
            isEditable ? 'edit' : '',
            isExpandable ? 'expand' : '',
            shouldNest ? 'tree-nested' : '',
            depth !== undefined ? `tree-node-depth-${depth}` : '',
            isExpanded ? 'node-expanded' : 'node-unexpanded'
        ),
        onClick: handleArrowClick.bind(null, {
            hasChildren,
            id,
            isExpanded,
            readFunc,
            showTreeRootNode,
            stateKey,
            stateful,
            store
        })
    };

    return <span { ...arrowProps } />;
};

export const handleArrowClick = ({
    hasChildren,
    id,
    isExpanded,
    readFunc,
    showTreeRootNode,
    stateKey,
    stateful,
    store
}, e) => {
    e.stopPropagation();

    if (!hasChildren) {
        readFunc({
            parentId: id
        });
    }

    else {
        store.dispatch(
            setTreeNodeVisibility({
                stateKey,
                id,
                showTreeRootNode
            })
        );
    }

    if (stateful) {
        // if stateful
        // save which node ids have been expanded
        const expandedColumns = localStorageManager.getStateItem({
            stateKey,
            property: 'expandedNodes',
            shouldSave: false
        }) || {};

        expandedColumns[id] = !isExpanded;

        debouncedSetStateItem({
            stateKey,
            property: 'expandedNodes',
            value: expandedColumns
        });
    }

};

const { any, bool, func, object, oneOfType, number, string } = PropTypes;

TreeArrow.propTypes = {
    depth: number,
    gridType: oneOfType([
        'grid', 'tree'
    ]),
    hasChildren: bool,
    id: any,
    isEditable: bool,
    isExpandable: bool,
    isExpanded: bool,
    readFunc: func,
    shouldNest: bool,
    showTreeRootNode: bool,
    stateKey: string,
    stateful: bool,
    store: object
};

TreeArrow.defaultProps = {};

export default TreeArrow;

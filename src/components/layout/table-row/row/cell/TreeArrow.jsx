import React, { PropTypes } from 'react';

import { prefix } from './../../../../../util/prefix';
import { CLASS_NAMES } from './../../../../../constants/GridConstants';
import { setTreeNodeVisibility } from './../../../../../actions/GridActions';

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
            store, stateKey, showTreeRootNode, hasChildren, id, readFunc
        })
    };

    return <span { ...arrowProps } />;
};

export const handleArrowClick = (
    { showTreeRootNode, store, stateKey, hasChildren, id, readFunc }, e
) => {
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
    store: object
};

TreeArrow.defaultProps = {};

export default TreeArrow;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { shouldRowUpdate } from '../../../../util/shouldComponentUpdate';

const { object } = PropTypes;

export default DecoratedComponent => (
    class RowContainer extends Component {
        render() {
            return (
                <DecoratedComponent
                    { ...{ ...this.props, getTreeData: this.getTreeData } }
                />
            );
        }

        constructor(props) {
            super(props);
            this.shouldComponentUpdate = shouldRowUpdate.bind(this);
        }

        static propTypes = {
            treeData: object
        };

        getTreeData = () => this.props.treeData;
    }
);

import React, { Component } from 'react';

const { object } = React.PropTypes;

export default DecoratedComponent => (
    class RowContainer extends Component {
        render() {
            return (
                <DecoratedComponent
                    { ...{ ...this.props, getTreeData: this.getTreeData } }
                />
                );
        }

        static propTypes = {
            treeData: object
        };

        getTreeData = () => this.props.treeData;
    }
);

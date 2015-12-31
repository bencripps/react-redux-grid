import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { selectAll, deselectAll } from '../../../actions/plugins/selection/ModelActions';

class CheckBox extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired
    }

    handleChange(type, reactEvent) {
        const { store, dataSource } = this.props;
        const target = reactEvent.target;
        if (type === 'header') {
            if (target.checked) {
                store.dispatch(selectAll(dataSource));
            }
            else {
                store.dispatch(deselectAll());
            }
        }

    }

    render() {

        const { rowId, selectedRows, type } = this.props;

        const checkBoxContainerProps = {
            className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER)
        }

        const checkBoxProps = {
            className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
            checked: selectedRows ? selectedRows[rowId] : false,
            onChange: this.handleChange.bind(this, type)
        }

        return (
            <td { ...checkBoxContainerProps } >
                <input type="checkbox" { ...checkBoxProps } />
            </td>
        );
    }
}

function mapStateToProps(state) {
    
    return {
        pager: state.pager.get('pagerState'),
        dataSource: state.dataSource.get('gridData'),
        selectedRows: state.selection.get('selectedRows')
    };
}

export default connect(mapStateToProps)(CheckBox);
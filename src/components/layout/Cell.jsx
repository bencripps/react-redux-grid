import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator } from '../../util/keygenerator';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Cell extends Component {

    static defaultProps = {
        data: React.PropTypes.String
    }

    render() {

        const { cellData, events, rowId, editorState } = this.props;
        
        const isEditable = editorState 
            && editorState.row
            && editorState.row.key === rowId ? true : false;

        const cellProps = {
            className: prefix(CLASS_NAMES.CELL),
            contentEditable: isEditable,
            onClick: events.HANDLE_CELL_CLICK.bind(this, cellData) || emptyFn,
            onDoubleClick: events.HANDLE_CELL_DOUBLE_CLICK.bind(this, cellData) || emptyFn
        };

        return (
            <td { ...cellProps }>
                { cellData }
            </td>
        );
    }
}

function mapStateToProps(state) {
    return {
        editorState: state.editor.get('editorState')
    };
}

export default connect(mapStateToProps)(Cell);
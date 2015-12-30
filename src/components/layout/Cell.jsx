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

    handleClick(events, cellData, reactEvent) {

        if (reactEvent.target && reactEvent.target.contentEditable === 'true') {
            reactEvent.stopPropagation();
        }
        
        if (events.HANDLE_CELL_CLICK) {
            events.HANDLE_CELL_CLICK.apply(this, arguments);
        }
    }

    handleDoubleClick(events, cellData, reactEvent) {

        if (reactEvent.target && reactEvent.target.contentEditable === 'true') {
            reactEvent.stopPropagation();
        }

        if (events.HANDLE_CELL_CLICK) {
            events.HANDLE_CELL_DOUBLE_CLICK.apply(this, arguments);
        }
    }

    render() {

        const { cellData, events, rowId, editorState } = this.props;
        
        const isEditable = editorState 
            && editorState.row
            && editorState.row.key === rowId ? true : false;

        const cellProps = {
            className: prefix(CLASS_NAMES.CELL),
            contentEditable: isEditable,
            onClick: this.handleClick.bind(this, events, cellData),
            onDoubleClick: this.handleDoubleClick.bind(this, events, cellData)
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
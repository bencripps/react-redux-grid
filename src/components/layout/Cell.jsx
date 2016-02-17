import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../util/prefix';
import { stateGetter } from '../../util/stateGetter';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Cell extends Component {

    static propTypes = {
        cellData: PropTypes.any,
        columns: PropTypes.array,
        data: PropTypes.func,
        editorState: PropTypes.object,
        events: PropTypes.object,
        index: PropTypes.number,
        rowId: PropTypes.string
    };

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

        const { cellData, events, rowId, editorState, columns, index } = this.props;

        const isEditable = editorState
            && editorState.row
            && editorState.row.key === rowId;

        const hidden = columns
            && columns[index]
            && columns[index].hidden !== undefined
            ? columns[index].hidden
            : null;

        const cellProps = {
            className: prefix(CLASS_NAMES.CELL),
            contentEditable: isEditable,
            onClick: this.handleClick.bind(this, events, cellData),
            onDoubleClick: this.handleDoubleClick.bind(this, events, cellData),
            style: {
                display: hidden ? 'none' : ''
            }
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
        editorState: stateGetter(state, 'editor', 'editorState')
    };
}

export default connect(mapStateToProps)(Cell);
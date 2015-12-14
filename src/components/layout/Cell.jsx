import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator } from '../../util/keygenerator';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import '../../style/components/cell.styl';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Cell extends Component {

    static defaultProps = {
        data: React.PropTypes.String
    }

    render() {

        const { cellData } = this.props;

        const cellProps = {
            className: prefix(CLASS_NAMES.CELL)
        };

        return (
            <td { ...cellProps }>
                { cellData }
            </td>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Cell);
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ActionColumn from '../plugins/gridactions/ActionColumn.jsx';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import '../../style/components/header.styl';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Header extends Component {

    static defaultProps = {
        columnManager: React.PropTypes.object.isRequired,
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        plugins: React.PropTypes.object,
        store: React.PropTypes.func
    }

    getHeader(col) {

        let headerProps = {
            className: col.className,
            onClick: col.HANDLE_CLICK || emptyFn
        };

        if (col.width) {
            headerProps = Object.assign(
                headerProps, { style: { width: col.width } });
        }

        const innerHTML = col.renderer ? col.renderer(col) : col.name;

        return (
            <th { ...headerProps } key={keyGenerator(col.name, col.value) }>
                { innerHTML }
            </th>
        );
    }

    getAdditionalClasses() {

    }

    render() {

        const { columns, selectionModel, columnManager } = this.props;
        const headers = columns.map((col) => this.getHeader(col));
        const headerProps = {
            className: prefix(CLASS_NAMES.HEADER)
        }

        selectionModel.updateCells(headers, columns);

        columnManager.addActionColumn(headers, 'header');

        return (
            <thead>
                <tr { ...headerProps }>
                    { headers }
                </tr>
            </thead>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Header);
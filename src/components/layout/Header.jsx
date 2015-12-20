import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator } from '../../util/keygenerator';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import '../../style/components/header.styl';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Header extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired
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

        const { columns } = this.props;
        const headers = columns.map((col) => this.getHeader(col));
        const headerProps = {
            className: prefix(CLASS_NAMES.HEADER)
        }

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
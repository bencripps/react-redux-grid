import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { selectAll, deselectAll } from '../../../actions/plugins/selection/ModelActions';

class BulkActionToolbar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired
    }

    render() {

        return (
            <div>Toolbar</div>
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

export default connect(mapStateToProps)(BulkActionToolbar);
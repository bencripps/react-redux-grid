import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { keyFromObject } from '../../../util/keygenerator';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { showToolbar, hideToolbar } from '../../../actions/plugins/bulkactions/ToolbarActions';

class FilterToolbar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        plugins: React.PropTypes.object.isRequired,
        selectionModel: React.PropTypes.object.isRequired,
        placeHolderText: 'Search'
    }

    getToolbar() {

        const { plugins, placeHolderText } = this.props;

        const containerProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.CONTAINER)
        };

        const inputProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.INPUT),
            placeholder: placeHolderText
        };

        const searchButtonProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.SEARCH_BUTTON)
        };

        const filterMenuButtonProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU_BUTTON)
        };

        return (
            <div { ...containerProps }>
                <input { ...inputProps } />
                <span { ...searchButtonProps } />
                <span { ...filterMenuButtonProps } />
            </div>
        );
    }

    render() {

        const { plugins } = this.props;

        const toolbar = plugins 
            && plugins.FILTER_CONTAINER 
            && plugins.FILTER_CONTAINER.enabled 
            ? this.getToolbar() : null;

        return toolbar;
    }
}

function mapStateToProps(state) {
    
    return {
        dataSource: state.dataSource.get('gridData'),
        selectedRows: state.selection.get('selectedRows')
    };
}

export default connect(mapStateToProps)(FilterToolbar);
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import Menu from '../../core/menu/Menu.jsx';
import filter from '../../../util/filter';
import { keyFromObject } from '../../../util/keygenerator';
import { CLASS_NAMES, FILTER_METHODS, KEYBOARD_MAP } from '../../../constants/GridConstants';
import { setFilter,
    doLocalFilter,
    clearFilterRemote,
    clearFilterLocal,
    doRemoteFilter 
} from '../../../actions/plugins/filter/FilterActions';

class FilterMenu extends Menu {

    static propTypes = {
        store: PropTypes.object.isRequired,
        plugins: PropTypes.object.isRequired,
        menuTitle: PropTypes.string.isRequired
    }

    static defaultProps = {
        store: React.PropTypes.object.isRequired,
        menuTitle: 'Advanced Filter Menu',
        plugins: React.PropTypes.object.isRequired,
        selectionModel: React.PropTypes.object.isRequired,
        placeHolderText: 'Search',
        defaultSortMethod: FILTER_METHODS.LOCAL
    }

    render() {

        const { plugins, filter, menuTitle } = this.props;

        const menuContainerProps = {
            className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.CONTAINER)
        };

        return (
            <div { ...menuContainerProps } >
                { menuTitle }
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    return {
        dataSource: state.dataSource.get('gridData'),
        selectedRows: state.selection.get('selectedRows'),
        filter: state.filter.get('filterState'),
        pager: state.pager.get('pagerState')
    };
}

export default connect(mapStateToProps)(FilterMenu);
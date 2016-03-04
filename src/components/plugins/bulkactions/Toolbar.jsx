import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { keyFromObject } from '../../../util/keyGenerator';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { removeToolbar } from '../../../actions/plugins/bulkactions/ToolbarActions';
import { selectAll, deselectAll } from '../../../actions/plugins/selection/ModelActions';

class BulkActionToolbar extends Component {

    static propTypes = {
        bulkActionState: PropTypes.object,
        dataSource: PropTypes.object,
        plugins: PropTypes.object.isRequired,
        selectedRows: PropTypes.object,
        selectionModel: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.removeTimeout = null;
    }

    componentDidUpdate() {
        const { store, bulkActionState, selectedRows } = this.props;
        const isRemoved = bulkActionState && bulkActionState.isRemoved;
        const totalCount = getTotalSelection(selectedRows);

        if (totalCount === 0 && !isRemoved) {
            clearTimeout(this.removeTimeout);
            this.removeTimeout = setTimeout(() => {
                store.dispatch(removeToolbar(true));
            }, 300);
        }

        else if (totalCount > 0 && isRemoved) {
            store.dispatch(removeToolbar(false));
        }
    }

    handleChange(reactEvent) {

        const { store, dataSource } = this.props;

        if (reactEvent.target && reactEvent.target.checked) {
            store.dispatch(selectAll(dataSource));
        }

        else {
            store.dispatch(deselectAll());
        }
    }

    render() {

        const { bulkActionState, selectedRows, plugins } = this.props;

        const toolbar = plugins
            && plugins.BULK_ACTIONS
            && plugins.BULK_ACTIONS.enabled
            && plugins.BULK_ACTIONS.actions
            && plugins.BULK_ACTIONS.actions.length > 0
            ? getToolbar(plugins.BULK_ACTIONS.actions, bulkActionState, selectedRows)
            : null;

        return toolbar;
    }
}

export const getTotalSelection = (selectedRows) => {
    const count = selectedRows
            && Object.keys(selectedRows).length
            ? Object.keys(selectedRows).filter((k) => selectedRows[k]).length
            : 0;

    return count;
};

export const getToolbar = (actions, bulkActionState, selectedRows) => {
    const totalCount = getTotalSelection(selectedRows);

    const shownCls = totalCount > 0
        ? CLASS_NAMES.BULK_ACTIONS.SHOWN
        : CLASS_NAMES.BULK_ACTIONS.HIDDEN;

    const removedCls = bulkActionState && bulkActionState.isRemoved
        ? 'removed' : null;

    const containerProps = {
        className: prefix(CLASS_NAMES.BULK_ACTIONS.CONTAINER, shownCls, removedCls)
    };

    const spanProps = {
        className: prefix(CLASS_NAMES.BULK_ACTIONS.DESCRIPTION),
        text: `${totalCount} Selected`
    };

    const buttons = actions.map(getAction);

    return (
        <div { ...containerProps } >
            <span { ...spanProps } >
                { spanProps.text }
            </span>
            { buttons }
        </div>
    );
};

export const getAction = (action) => {

    const buttonProps = {
        text: action.text,
        onClick: action.EVENT_HANDLER,
        key: keyFromObject(action)
    };

    return (
        <button { ...buttonProps } >
            { buttonProps.text }
        </button>
    );
};

function mapStateToProps(state, props) {

    return {
        dataSource: stateGetter(state, props, 'dataSource', 'gridData'),
        selectedRows: stateGetter(state, props, 'selection', 'selectedRows'),
        bulkActionState: stateGetter(state, props, 'bulkaction', 'bulkActionState')
    };
}

export default connect(mapStateToProps)(BulkActionToolbar);
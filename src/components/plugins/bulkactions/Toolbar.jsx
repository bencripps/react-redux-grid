import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { keyFromObject } from '../../../util/keyGenerator';
import { isPluginEnabled } from '../../../util/isPluginEnabled';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import {
    removeToolbar
} from '../../../actions/plugins/bulkactions/ToolbarActions';
import {
    selectAll, deselectAll
} from '../../../actions/plugins/selection/ModelActions';

class BulkActionToolbar extends Component {

    render() {

        const { bulkActionState, selectedRows, plugins } = this.props;

        const toolbar = isPluginEnabled(plugins, 'BULK_ACTIONS')
            && plugins.BULK_ACTIONS.actions
            && plugins.BULK_ACTIONS.actions.length > 0
            ? getToolbar(
                plugins.BULK_ACTIONS.actions, bulkActionState, selectedRows
            )
            : <div></div>;

        return toolbar;
    }

    componentDidUpdate() {
        const { store, stateKey, bulkActionState, selectedRows } = this.props;
        const isRemoved = bulkActionState && bulkActionState.isRemoved;
        const totalCount = getTotalSelection(selectedRows);

        if (bulkActionState) {
            if (totalCount === 0 && !isRemoved) {
                clearTimeout(this.removeTimeout);
                this.removeTimeout = setTimeout(() => {
                    store.dispatch(removeToolbar({ state: true, stateKey }));
                }, 300);
            }

            else if (totalCount > 0 && isRemoved) {
                store.dispatch(removeToolbar({ state: false, stateKey }));
            }
        }
    }

    constructor() {
        super();
        this.removeTimeout = null;
    }

    static propTypes = {
        bulkActionState: PropTypes.object,
        dataSource: PropTypes.object,
        plugins: PropTypes.object.isRequired,
        selectedRows: PropTypes.object,
        selectionModel: PropTypes.object.isRequired,
        stateKey: PropTypes.string,
        store: PropTypes.object.isRequired
    };

    handleChange(reactEvent) {

        const { stateKey, store, dataSource } = this.props;

        if (reactEvent.target && reactEvent.target.checked) {
            store.dispatch(selectAll({ data: dataSource, stateKey }));
        }

        else {
            store.dispatch(deselectAll({ stateKey }));
        }
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
        className: prefix(
            CLASS_NAMES.BULK_ACTIONS.CONTAINER,
            shownCls,
            removedCls
        )
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
        dataSource: stateGetter(state, props, 'dataSource', props.stateKey),
        selectedRows: stateGetter(state, props, 'selection', props.stateKey),
        bulkActionState: stateGetter(state, props, 'bulkaction', props.stateKey)
    };
}

export default connect(mapStateToProps)(BulkActionToolbar);

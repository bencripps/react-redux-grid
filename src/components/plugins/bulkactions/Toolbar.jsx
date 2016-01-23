import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { keyFromObject } from '../../../util/keygenerator';
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
    }

    constructor() {
        super();
        this.removeTimeout = null;
    }

    componentDidUpdate() {
        const { store, bulkActionState } = this.props;
        const isRemoved = bulkActionState && bulkActionState.isRemoved;
        const totalCount = this.getTotalSelection();

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

    getAction(action) {

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

    getTotalSelection() {
        const { selectedRows } = this.props;

        const count = selectedRows
                && Object.keys(selectedRows).length
                ? Object.keys(selectedRows).filter((k) => selectedRows[k]).length
                : 0;

        return count;
    }

    getToolbar() {
        const { actions } = this.props.plugins.BULK_ACTIONS;
        const { bulkActionState } = this.props;

        const totalCount = this.getTotalSelection();

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

        const buttons = actions.map(this.getAction);

        return (
            <div { ...containerProps } >
                <span { ...spanProps } >
                    { spanProps.text }
                </span>
                { buttons }
            </div>
        );
    }

    render() {

        const { plugins } = this.props;

        const toolbar = plugins
            && plugins.BULK_ACTIONS
            && plugins.BULK_ACTIONS.enabled
            && plugins.BULK_ACTIONS.actions
            && plugins.BULK_ACTIONS.actions.length > 0 ? this.getToolbar() : null;

        return toolbar;
    }
}

function mapStateToProps(state) {

    return {
        dataSource: state.dataSource.get('gridData'),
        selectedRows: state.selection.get('selectedRows'),
        bulkActionState: state.bulkaction.get('bulkActionState')
    };
}

export default connect(mapStateToProps)(BulkActionToolbar);
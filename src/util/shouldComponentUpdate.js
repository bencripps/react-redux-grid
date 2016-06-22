import { fromJS, is } from 'immutable';
import deepEqual from 'deep-equal';
import { keyGenerator } from './keyGenerator';
import { getLastUpdate } from './lastUpdate';

export function shouldGridUpdate(nextProps) {
    let result = true;

    const { reducerKeys, stateKey, store } = this.props;

    const nextUpdate = getLastUpdate(store, stateKey, reducerKeys);

    result = (
        !deepEqual(nextUpdate, this._lastUpdate)
        || !equalProps(nextProps, this._lastProps)
    );

    this._lastUpdate = nextUpdate;
    this._lastProps = nextProps;

    return result;
}

export function shouldRowUpdate(nextProps) {
    let result = true;
    const {
        columns,
        editorState,
        menuState,
        row,
        index,
        selectedRows
    } = nextProps;

    // create id for row a single time
    this.id = this.id || keyGenerator('row', index);

    // update if selection change
    const isSelected = Boolean(selectedRows && selectedRows[this.id]);

    // update if menu is shown or hidden
    const isMenuShown = Boolean(menuState && menuState[this.id]);

    // update if editor state changes for only this row
    const isEdited = Boolean(editorState
        && editorState.row
        && editorState.row.rowIndex === index);

    // if row is currently being edited, cache the last value
    if (isEdited) {
        this._previousEditorState = editorState;
    }

    nextProps = fromJS({
        columns,
        isSelected,
        isMenuShown,
        index,
        row,
        isEdited,
        rowValuesUpdated: this._previousEditorState
    });

    // if this is the first pass, no previous values have been
    // cached, thusly just return true and create _lastProps
    if (!this._lastProps) {
        this._lastProps = nextProps;
        return true;
    }

    result = (
        !is(nextProps, this._lastProps)
    );

    this._lastProps = nextProps;

    return result;
}

export const equalProps = (props = {}, newProps = {}) => {
    return props.height === newProps.height
        && deepEqual(props.classNames, newProps.classNames)
        && deepEqual(props.events, newProps.events);
};

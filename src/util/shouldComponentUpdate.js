import { fromJS, is } from 'immutable';
import { mapStateToProps } from './mapStateToProps';
import { keyGenerator } from './keyGenerator';

export function shouldGridUpdate(nextProps) {
    let result = true;

    try {
        const { store } = this.props;

        const propsWithoutPlugins = {
            ...this.props,
            plugins: {},
            columns: ''
        };

        const nextPropsWithoutPlugins = {
            ...nextProps,
            plugins: {},
            columns: ''
        };

        const nextStateProps =
            fromJS(mapStateToProps(store.getState(), propsWithoutPlugins));

        nextProps = fromJS(nextPropsWithoutPlugins);

        result = (
            !is(nextProps, this._lastProps)
            || !is(nextStateProps, this._stateProps)
        );

        this._stateProps = nextStateProps;
        this._lastProps = nextProps;
    } catch (e) { } // eslint-disable-line

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
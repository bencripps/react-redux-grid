import { stateGetter } from './stateGetter';

export const mapStateToProps = (state, props) => ({
    columnState: stateGetter(state, props, 'grid', props.stateKey),
    gridData: stateGetter(state, props, 'dataSource', props.stateKey),
    editorState: stateGetter(state, props, 'editor', props.stateKey),
    pager: stateGetter(state, props, 'pager', props.stateKey),
    selectedRows: stateGetter(state, props, 'selection', props.stateKey),
    menuState: stateGetter(state, props, 'menu', props.stateKey),
    loadingState: stateGetter(state, props, 'loader', props.stateKey)
});

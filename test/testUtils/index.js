import { OrderedMap } from 'immutable';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import ColumnManager from '../../src/components/core/ColumnManager';
import Model from '../../src/components/plugins/selection/Model';
import configureStore from './../../src/store/configureStore';
import { gridColumns } from './data';

export { localGridData, gridColumns } from './data';

const store = configureStore();

export const initializedStore = store;

export function setup(thing) {
    const renderer = TestUtils.createRenderer();
    renderer.render(thing);

    const output = renderer.getRenderOutput();

    return {
        output,
        renderer
    };
}

export const sampleReactEvent = {
    stopPropagation: () => {}
};

export function getSelModel() {

    const model = new Model();

    model.init(
        // plugins
        {},
        // store,
        store: initializedStore,
        // events
        {}
    );

    return model;
}

export function getColumnManager() {
    const columnManager = new ColumnManager();

    columnManager.init({
        plugins: {},
        store: initializedStore,
        events: {},
        selModel: getSelModel(),
        editor: {},
        columns: gridColumns,
        dataSource: ''
    });

    return columnManager;
}

export const testState = cfg => new OrderedMap(cfg);

export const mountWithContext = (cmp, additionalOptions = {}) => mount(
    cmp, {
        context: { store: initializedStore }, ...additionalOptions
    });

export const shallowWithContext = (cmp, additionalOptions = {}) => shallow(
    cmp, {
        context: { store: initializedStore }, ...additionalOptions
    });

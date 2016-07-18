import expect from 'expect';

import store from './../../../../src/store/store';
import Model from './../../../../src/components/plugins/selection/Model';

describe('The selection model class', () => {

    const plugins = {};
    const stateKey = 'test-grid';
    const events = {};

    it('Should return a selection model with defaults', () => {

        const model = new Model();

        model.init(
            plugins, stateKey, store, events
        );

        expect(model).toBeTruthy();

        expect(
            model.defaults
        ).toEqual({
            mode: 'single',
            activeCls: 'active',
            allowDeselect: true,
            editCls: 'edit',
            editEvent: 'none',
            enabled: true,
            selectionEvent: 'singleclick',
            store
        });

    });

    it('Should return a selection model with joined props', () => {

        const model = new Model();

        const joined = {
            SELECTION_MODEL: {
                mode: 'checkbox-single',
                allowDeselect: false
            }
        };

        model.init(
            joined, stateKey, store, events
        );

        expect(model).toBeTruthy();

        expect(
            model.defaults
        ).toEqual({
            mode: 'checkbox-single',
            activeCls: 'active',
            allowDeselect: false,
            editCls: 'edit',
            editEvent: 'none',
            enabled: true,
            selectionEvent: 'singleclick',
            store
        });

    });

    it('Should fire selection events', () => {

        const model = new Model();

        const customEvents = {
            HANDLE_BEFORE_SELECTION: sinon.spy(),
            HANDLE_BEFORE_BULKACTION_SHOW: sinon.spy(),
            HANDLE_AFTER_SELECTION: sinon.spy(),
            HANDLE_AFTER_BULKACTION_SHOW: sinon.spy()
        };

        const selectionEvent = {
            id: 'some-id',
            index: 4
        };

        model.init(
            plugins, stateKey, store, customEvents
        );

        expect(model).toBeTruthy();

        model.handleSelectionEvent(selectionEvent);

        expect(
            customEvents.HANDLE_BEFORE_SELECTION.called
        ).toEqual(true);

        expect(
            customEvents.HANDLE_BEFORE_BULKACTION_SHOW.called
        ).toEqual(true);

        expect(
            customEvents.HANDLE_AFTER_SELECTION.called
        ).toEqual(true);

        expect(
            customEvents.HANDLE_AFTER_BULKACTION_SHOW.called
        ).toEqual(true);

        const selectionState = store
            .getState()
            .selection.get('test-grid');

        expect(
            selectionState.get('some-id')
        ).toEqual(true);

        expect(
            selectionState.get('indexes').toJS()
        ).toEqual([4]);

    });

});

import expect from 'expect';

import {
    handleEditClick
} from './../../src/util/handleEditClick';

describe('The handleEditClick utility', () => {

    const dataEvent = {
        reactEvent: {
            target: {}
        }
    };

    const editor = {
        config: {
            type: 'inline'
        }
    };

    it('Should fire the before_edit event', () => {

        const store = {};
        store.dispatch = sinon.spy();
        const editEvent = sinon.spy();

        handleEditClick(
            editor,
            store,
            4,
            {},
            4,
            [],
            'stateKey1',
            {
                HANDLE_BEFORE_EDIT: editEvent
            },
            dataEvent
        );

        expect(store.dispatch.called)
            .toEqual(true);

        expect(editEvent.called)
            .toEqual(true);

    });

    it('Should fire the before_edit event and not call store event', () => {

        const store = {};
        store.dispatch = sinon.spy();
        const editEvent = () => false;

        handleEditClick(
            editor,
            store,
            4,
            {},
            4,
            [],
            'stateKey1',
            {
                HANDLE_BEFORE_EDIT: editEvent
            },
            dataEvent
        );

        expect(store.dispatch.called)
            .toEqual(false);

    });

});

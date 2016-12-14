/* eslint-enable describe it sinon */
import expect from 'expect';
import { fromJS } from 'immutable';

import { fire, fireEvent } from './../../src/util/fire';

describe('the fireEvent utility', () => {

    const events = {
        HANDLE_CLICK: sinon.spy(),
        HANDLE_AFTER_CLICK: sinon.spy(),
        HANDLE_BEFORE_SORT: sinon.spy()
    };

    it('Should not fire the event', () => {
        fireEvent(
            'HANDLE_BEFORE_CLICK',
            events,
        );

        expect(events.HANDLE_CLICK.called)
            .toEqual(false);
    });

    it('Should fire the event', () => {
        fireEvent(
            'HANDLE_CLICK',
            events,
        );

        expect(events.HANDLE_CLICK.called)
            .toEqual(true);
    });

    it('Should return the result of the event', () => {
        expect(
            fireEvent(
            'HANDLE_CLICK',
            { HANDLE_CLICK: () => 'return event' },
        )).toEqual('return event');
    });

    it('Should pass the required arguments', () => {

        fireEvent(
            'HANDLE_AFTER_CLICK',
            events,
            {
                editor: { edited: true },
                events,
                isSelected: true,
                row: { data: 1 },
                rowId: 4,
                rowIndex: undefined
            },
            { preventDefault: {} }
        );

        expect(events.HANDLE_AFTER_CLICK.calledWith({
            editor: { edited: true },
            events,
            isSelected: true,
            row: { data: 1 },
            rowId: 4,
            rowIndex: undefined
        }, { preventDefault: {} })).toEqual(true);
    });

    it('Should pass dynamic args as well', () => {
        fireEvent(
            'HANDLE_BEFORE_SORT',
            events,
            {
                editor: { edited: true },
                events,
                isSelected: true,
                row: fromJS({ data: 1 }),
                rowId: 4,
                rowIndex: undefined,
                sortDirection: 'ASC'
            },
            { preventDefault: {} }
        );

        expect(events.HANDLE_BEFORE_SORT.calledWith({
            editor: { edited: true },
            events,
            isSelected: true,
            row: { data: 1 },
            rowId: 4,
            rowIndex: undefined,
            sortDirection: 'ASC'
        }, { preventDefault: {} })).toEqual(true);
    });
});

describe('the fire utility', () => {
    const listener = sinon.spy();
    const events = {
        HANDLE_CLICK: listener,
        HANDLE_BEFORE_CLICK: val => val === 'a',
        NOT_A_FUNCTION: {a: 1}
    };

    it('should call the event listener with the correct arguments', () => {
        fire(
            'HANDLE_CLICK', events,
            null, 'a', {a: 1}
        );

        expect(
            listener.calledOnce
        ).toBe(true);

        expect(
            listener.args[0]
        ).toEqual(
            ['a', {a: 1}]
        );
    });

    it('should return value of listener', () => {
        expect(
            fire(
                'HANDLE_BEFORE_CLICK', events,
                null, 'a'
            )
        ).toBe(true);

        expect(
            fire(
                'HANDLE_BEFORE_CLICK', events,
                null, 'b'
            )
        ).toBe(false);
    });

    it('should return `undefined` when not a valid event', () => {
        expect(
            fire('NOT_A_FUNCTION', events)
        ).toBe(undefined);

        expect(
            fire('', events)
        ).toBe(undefined);

        expect(
            fire('HANDLE_BEFORE_CLICK', undefined)
        ).toBe(undefined);
    });
});

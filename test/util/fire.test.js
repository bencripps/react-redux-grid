/* eslint-enable describe it sinon */
import expect from 'expect';
import { fromJS } from 'immutable';

import { fireEvent } from './../../src/util/fire';

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

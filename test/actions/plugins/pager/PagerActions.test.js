import expect from 'expect';

import {
    PAGE_LOCAL
} from './../../../../src/constants/ActionTypes';

import {
    setPage
} from './../../../../src/actions/plugins/pager/PagerActions';

const BUTTON_TYPES = {
    NEXT: 'next',
    BACK: 'back'
};

describe('The Pager back Action', () => {

    it('Should reduce the index by 1', () => {

        const type = 'next';
        const index = 1;
        const pageIndex = type === BUTTON_TYPES.NEXT
            ? index + 1
            : index - 1;

        const action = {
            index: pageIndex,
            type: PAGE_LOCAL,
            BUTTON_TYPES: BUTTON_TYPES
        };

        expect(setPage(action))
            .toEqual({
                type: PAGE_LOCAL,
                pageIndex: 1
            });

    });
});

describe('The Pager next Action', () => {

    it('Should increase the index by 1', () => {
        const type = 'back';
        const index = 1;
        const pageIndex = type === BUTTON_TYPES.BACK ? index + 1 : index - 1;

        const action = {
            index: pageIndex,
            type: PAGE_LOCAL,
            BUTTON_TYPES: BUTTON_TYPES
        };

        expect(setPage(action))
            .toEqual({
                type: PAGE_LOCAL,
                pageIndex: 1
            });

    });

});

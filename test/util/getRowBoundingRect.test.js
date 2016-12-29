import expect from 'expect';
import {
    getRowBoundingRect
} from './../../src/util/getRowBoundingRect';

describe('The getRowBoundingRect utility', () => {

    it('Should return no offsets', () => {
        const row = document.createElement('div');
        document.body.appendChild(row);

        expect(getRowBoundingRect(row))
            .toEqual({});
    });

    it('Should return bottom', () => {
        const row = document.createElement('div');
        document.body.appendChild(row);

        expect(getRowBoundingRect(row, document.body))
            .toEqual({
                maxHeight: 0,
                position: 'bottom',
                spaceBottom: 0,
                spaceTop: 0
            });
    });

});

import expect from 'expect';

import {
    Actions
} from './../../src/actions';

describe('The Grid Actions Export', () => {

    it('Should export a central Actions object', () => {
        expect(Actions).toBeA('object');
    });

    it('Should export all actions from object', () => {
        expect(Actions.BulkActions).toBeA('object');
        expect(Actions.ColumnManagerActions).toBeA('object');
        expect(Actions.EditorActions).toBeA('object');
        expect(Actions.ErrorHandlerActions).toBeA('object');
        expect(Actions.LoaderActions).toBeA('object');
        expect(Actions.MenuActions).toBeA('object');
        expect(Actions.PagerActions).toBeA('object');
        expect(Actions.SelectionActions).toBeA('object');
    });

});

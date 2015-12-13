import { fromJS } from 'immutable';

const initialState = fromJS({
    gridState: fromJS.Map
});

export default function game(state = initialState, action) {
    switch (action.type) {

    default:

        return state;
    }
}
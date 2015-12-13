import {
    GET_INITIAL_CARDS,
    MOVE_OCCURRED,
    GET_CARD_STATE,
    MATCH_OCCURRED,
    NO_MATCH_OCCURRED,
    SET_DIFFICULTY,
    GAME_WON,
    GAME_LOST
} from '../constants/ActionTypes';

import { CARD_IMAGE_SOURCES, CARD_STATE, NUMBER_OF_WRONG_TURNS_ALLOWED } from '../constants/GameConstants';
import { shuffle } from '../util/shuffle';
import { idSanitizer } from '../util/idSanitizer';

export function getInitialCards(difficulty) {
    const deck = CARD_IMAGE_SOURCES.slice(0, difficulty);
    const cards = shuffle(deck);
    return { type: GET_INITIAL_CARDS, cards };
}

export function getCardState(key) {
    return { type: GET_CARD_STATE, key };
}

export function moveOccured(key, value, moveCount) {
    const lastMove = idSanitizer(key);
    return { type: MOVE_OCCURRED, key, value, lastMove, moveCount };
}

export function matchOccurred(id, matches, totalCardCount) {
    const key = idSanitizer(id);
    const correctMatches = matches ? matches + 1 : 1;
    const hasWon = () => {
        return correctMatches === (totalCardCount / 2);
    };

    if (hasWon()) {
        return { type: GAME_WON, key };
    }

    else {
        return { type: MATCH_OCCURRED, key, correctMatches };
    }
    
}

export function setDifficulty(difficulty) {
    return { type: SET_DIFFICULTY, difficulty };
}

export function noMatchOccurred(currentState, key, incorrectTotal) {
    const unmatched = {};
    const incorrectMoves = Number(incorrectTotal) ? incorrectTotal + 1 : 1;
    const hasLost = () => {
        return incorrectMoves === NUMBER_OF_WRONG_TURNS_ALLOWED;
    };

    for (let k in currentState) {
        if (currentState[k] === CARD_STATE.SELECTED) {
            unmatched[k] = CARD_STATE.UNSELECTED;
        }
    }

    if (key) {
        unmatched[key] = CARD_STATE.UNSELECTED;
    }

    if (hasLost()) {
        return { type: GAME_LOST };
    }
    else {
        return { type: NO_MATCH_OCCURRED, unmatched, incorrectMoves};
    }
}
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "../actions/actionsTypes"

const inititalState = {
    quiz: []
}

export default function createReducer(state = inititalState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz: []
            }
        default:
            return state
    }
}
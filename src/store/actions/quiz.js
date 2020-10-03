import axios from '../../axios';
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, QUIZ_RETRY
} from './actionsTypes';

export function fetchQuizes(params) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, idx) => {
                quizes.push({
                     id: key,
                     name: `Тест №${idx + 1}`
                });  
            });
 
        dispatch(fetchQuizesSuccess(quizes))
        } catch(e) {
            fetchQuizesError(e);
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart);
        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        const {quiz, activeQuestion, answerState, results} = state;
        if (answerState) {
            const key = Object.keys(answerState)[0];
            if (answerState[key] === 'success') return;
        }
        const question = quiz[activeQuestion];
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuestion(activeQuestion + 1));
                }
                window.clearTimeout(timeout);
            }, 1000)
            
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

function isQuizFinished(state) {
    const {activeQuestion, quiz} = state;
    return activeQuestion + 1 === quiz.length;
}
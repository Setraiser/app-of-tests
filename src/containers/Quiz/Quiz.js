import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import Loader from '../../components/UI/Loader';
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz';
//import quizReducer from '../../store/reducers/quiz';

class Quiz extends Component {

    componentDidMount() {
        const {fetchQuizById, match} = this.props;
        fetchQuizById(match.params.id)
    }

    componentWillUnmount() {
        const {retryQuiz} = this.props;
        retryQuiz();
    }

    render() {
        const {quiz, activeQuestion, answerState, isFinished, results, loading, quizAnswerClick, retryQuiz} = this.props;
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        loading || !quiz
                            ? <Loader />
                            : isFinished ? <FinishedQuiz results={results} quiz={quiz} onRetry={retryQuiz} />
                            :
                            <ActiveQuiz 
                                onAnswerClick = {quizAnswerClick}
                                answers={quiz[activeQuestion].answers}
                                question={quiz[activeQuestion].question}
                                quizLength = {quiz.length}
                                answerNumber = {activeQuestion + 1}
                                state={answerState} 
                            />
                    }

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {quiz} = state;
    return {
        results: quiz.results,
        isFinished: quiz.isFinished,
        activeQuestion: quiz.activeQuestion,
        answerState: quiz.answerState,
        quiz: quiz.quiz,
        loading: quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
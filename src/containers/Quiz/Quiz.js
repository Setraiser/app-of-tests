import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import axios from '../../axios';
import Loader from '../../components/UI/Loader';

class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }
    
    onAnswerClickHandler = (answerId) => {
        const {quiz, activeQuestion, answerState, results} = this.state;
        if (answerState) {
            const key = Object.keys(answerState)[0];
            if (answerState[key] === 'success') return;
        }
        const question = quiz[activeQuestion];
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 1000)
            
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                 results
            })
        }
        
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}

        });
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        try {
            const response = await axios.get(`/quizes/${id}.json`);
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {

        }
    }

    isQuizFinished = () => {
        const {quiz, activeQuestion} = this.state;
        return activeQuestion + 1 === quiz.length;
    }

    render() {
        const {quiz, activeQuestion, answerState, isFinished, results, loading} = this.state;
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        loading 
                            ? <Loader />
                            : isFinished ? <FinishedQuiz results={results} quiz={quiz} onRetry={this.retryHandler} />
                            :
                            <ActiveQuiz 
                                onAnswerClick = {this.onAnswerClickHandler}
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

export default Quiz;
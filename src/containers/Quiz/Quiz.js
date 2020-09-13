import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';

class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [ 
            {   
                id: 1,
                rightAnswerId: 2,
                question: 'Какого цвета небо?',
                answers: [
                    { text: 'Черного', id: 1},
                    { text: 'Синего', id: 2},
                    { text: 'Зеленого', id: 3},
                    { text: 'Желтого', id: 4},
                ]
            },
            {   
                id: 2,
                rightAnswerId: 3,
                question: 'В каком году основали Санкт-Петербург?',
                answers: [
                    { text: '1700', id: 1},
                    { text: '1705', id: 2},
                    { text: '1703', id: 3},
                    { text: '1803', id: 4},
                ]
            }
        ],

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

    isQuizFinished = () => {
        const {quiz, activeQuestion} = this.state;
        return activeQuestion + 1 === quiz.length;
    }

    render() {
        const {quiz, activeQuestion, answerState, isFinished, results} = this.state;
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        isFinished ? <FinishedQuiz results={results} quiz={quiz} onRetry={this.retryHandler} />
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
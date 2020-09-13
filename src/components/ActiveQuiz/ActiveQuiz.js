import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/';

const ActiveQuiz = (props) => {
    const {answerNumber, question, onAnswerClick, answers, state, quizLength} = props;
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{answerNumber}. </strong>
                    {question}
                </span>
                
            <small>{answerNumber} из {quizLength}</small>
            </p>
            <AnswersList onAnswerClick = {onAnswerClick} answers={answers} state={state}/>
        </div>
    );
}

export default ActiveQuiz;
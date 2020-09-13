import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from './AnswerItem';

const AnswersList = (props) => {
    const {answers, onAnswerClick, state} = props;
    return (
        <ul className={classes.AnswersList}>
            {answers.map((answer, idx) => {
                return (
                    <AnswerItem key={idx} answer={answer} onAnswerClick={onAnswerClick} state={state ? state[answer.id] : null}/>
                );
            })}
        </ul>
    );
    }
export default AnswersList;
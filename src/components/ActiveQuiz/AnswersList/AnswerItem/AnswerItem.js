import React from 'react';
import classes from './AnswerItem.module.css';

const AnswerItem = (props) => {
    const classesArr = [classes.AnswerItem];
    const {state, answer, onAnswerClick} = props;
    if (state) {
        classesArr.push(classes[state])
    }
    return (
        <li className={classesArr.join(' ')} onClick={() => onAnswerClick(answer.id)}>
            {answer.text}
        </li>
    );
}

export default AnswerItem;
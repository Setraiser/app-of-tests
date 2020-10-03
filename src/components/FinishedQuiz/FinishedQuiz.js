import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = (props) => {
    
    const {quiz, results, onRetry} = props;
    const successCounter = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success') total++;
        return total;
    }, 0)
    return (
        <div className = {classes.FinishedQuiz}>
            <ul>
                {
                    quiz.map((quizItem, idx) => {
                        const classesArr = [
                            'fa', results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            classes[results[quizItem.id]]
                        ];
                        return (
                            <li key={idx}>
                                <strong>{idx + 1}</strong>.&nbsp;
                                {quizItem.question}
                                <i className={classesArr.join(' ')} />
                            </li>
                        );
                    })
                }
            </ul>
            <p>Правильно: {successCounter} из {quiz.length}</p>
            <div>
                <Button onClick={onRetry} type='primary'>Повторить</Button>
                <Link to={'/'}>
                    <Button type='succes'>Перейти в список тестов</Button>
                </Link>
                
            </div>
        </div>
    )
}

export default FinishedQuiz;
import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    const {disabled, onClick, type} = props;
    const classesArr = [
        classes.Button,
        classes[type]
    ];
    return (
        <button onClick={onClick} className={classesArr.join(' ')} disabled={disabled}>
            {props.children}
        </button>
    );
}

export default Button;
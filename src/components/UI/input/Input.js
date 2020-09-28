import React from 'react';
import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = (props) => {
    const {type, label, value, onChange, errorMessage} = props;
    const inputType = type || 'text';
    const classesArr = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        classesArr.push(classes.invalid);
    }

    return (
        <div className={classesArr.join(' ')}>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={value}
                onChange={onChange}
            />
            {
                isInvalid(props) ? <span>{errorMessage || 'Введите верное значение'}</span> : null
            }
            
        </div>
    );
}

export default Input;
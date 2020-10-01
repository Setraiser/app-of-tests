import React from 'react';
import classes from './Select.module.css';

const Select = (props) => {
    const {label, value, onChange, options} = props;
    const htmlFor = `${label}--${Math.random()}`;
    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}></label>
            <select
                id={htmlFor}
                value={value}
                onChange={onChange}
            >
                {options.map((option, idx) => {
                    const {text, value} = option;
                    return (
                        <option
                            value={value}
                            key={value + idx}
                        >
                            {text}
                        </option>
                    )
                })}

            </select>
        </div>
    )
}

export default Select;
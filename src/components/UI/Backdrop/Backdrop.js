import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = (props) => {
    const {onClick}= props;
    return (
        <div className={classes.Backdrop} onClick={onClick}></div>
    );
}

export default Backdrop;
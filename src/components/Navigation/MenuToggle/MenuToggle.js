import React from 'react';
import classes from './MenuToggle.module.css';

const MenuToggle = (props) => {
    const {onToggle, isOpen} = props;
    const classesArr = [
        classes.MenuToggle,
        'fa',
    ];
    if (isOpen) {
        classesArr.push('fa-times');
        classesArr.push(classes.open);
    } else {
        classesArr.push('fa-bars');
    }
    return (
        <i 
            className={classesArr.join(' ')}
            onClick={onToggle}
        />
    );
}

export default MenuToggle;
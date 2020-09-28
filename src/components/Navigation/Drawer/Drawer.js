import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop';

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: true},
    {to: '/quiz-creator', label: 'Создать тест', exact: true}
];

class Drawer extends Component {

    renderLinks() {
        const {onClose} = this.props;
        return links.map((link, idx) => {
            const {to, label, exact} = link;
            return (
                <li key={idx}>
                   <NavLink 
                        to={to}
                        exact={exact}
                        activeClassName={classes.active}
                        onClick={onClose}
                    >
                       {label}
                   </NavLink>
                </li>
            )
        }) 
    }

    render() {
        const {isOpen, onClose} = this.props;
        const classesArr = [classes.Drawer];
        if (!isOpen) {
            classesArr.push(classes.close)
        } else {
            classesArr.push(classes.active)
        }

        

        return (
            <React.Fragment>
                <nav className={classesArr.join(' ')}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
            {isOpen ? <Backdrop onClick={onClose}/> : null} 
            </React.Fragment>
            
        );
    }
}

export default Drawer;
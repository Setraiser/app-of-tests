import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop';

class Drawer extends Component {

    renderLinks(links) {
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
        const {isOpen, onClose, isAuthenticated} = this.props;
        const classesArr = [classes.Drawer];
        if (!isOpen) {
            classesArr.push(classes.close)
        } else {
            classesArr.push(classes.active)
        }

        const links = [
            {to: '/', label: 'Список', exact: true},
        ];

        if (isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: true});
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false});
        }

        

        return (
            <React.Fragment>
                <nav className={classesArr.join(' ')}>
                <ul>
                    {this.renderLinks(links)}
                </ul>
            </nav>
            {isOpen ? <Backdrop onClick={onClose}/> : null} 
            </React.Fragment>
            
        );
    }
}

export default Drawer;
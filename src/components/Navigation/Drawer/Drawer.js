import React, {Component} from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop';

const links = [1, 2, 3];

class Drawer extends Component {

    renderLinks() {
        return links.map((link, idx) => {
            return (
                <li key={idx}>
                   <a>Link {link}</a>
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
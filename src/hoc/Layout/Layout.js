import React, {Component} from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle';
import Drawer from '../../components/Navigation/Drawer';

class Layout extends Component {

    state = {
        menu: false
    }

    
    onToggleMenuHandler = () => {
        let {menu} = this.state;
        this.setState({
            menu: !menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        let {menu} = this.state;
        return (
            <div className={classes.Layout}>
                <Drawer isOpen={menu} onClose={this.menuCloseHandler}/>
                <MenuToggle 
                    onToggle={this.onToggleMenuHandler}
                    isOpen={menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;
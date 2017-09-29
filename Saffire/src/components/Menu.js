import React from 'react';
import { bubble as Menu } from 'react-burger-menu'
import {styles } from '../styles/styles_burgerMenu';
import firebase from 'firebase';

class BurgerMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
    
  }

  render () {
    return (
      <Menu styles={styles}>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/login">Login</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
        <a onClick={() => (firebase.auth().signOut()).catch(err => console.log(err))} href=''>Logout</a>
      </Menu>
    );
  }
}


export default BurgerMenu;
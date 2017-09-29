import React from 'react';
import { bubble as Menu } from 'react-burger-menu'
import {styles } from '../styles/styles_burgerMenu';
import firebase from 'firebase';
import history from '../history';

class BurgerMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
    
  }

  render () {
    return (
      <Menu styles={styles}>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="mypassport" className="menu-item" href="/mypassport">My Passport</a>
        {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
        <a id="Itineraries" className="menu-item" href="/itineraries">Itineraries</a> 
        <a id="MyFriends" className="menu-item" href="/myfriends">My Friends</a>
        <a className="menu-item" onClick={() => (firebase.auth().signOut()).then(history.push('/')).catch(err => console.log(err))} href=''>Logout</a>
      </Menu>
    );
  }
}


export default BurgerMenu;
import React from 'react';
import { bubble as Menu } from 'react-burger-menu'
import {styles } from '../styles/styles_burgerMenu';
import firebase from 'firebase';
import history from '../history';

class BurgerMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
    
  }

  signout() {
    firebase.auth().signOut()
    .then(history.push('/'))
    .catch(err => console.log(err))
  }
  
  render () {
    return (
      
      <Menu styles={styles}>
        <li><a className="menu-item" id="home" href="/">HOME</a></li>
        <li><a className="menu-item" id="mypassport"  href="/mypassport">MY PASSPORT</a></li>
        <li><a className="menu-item" id="Itineraries"  href="/itineraries">ITINERARIES</a></li> 
        <li><a className="menu-item" id="MyFriends"  href="/myfriends">FRIENDS</a></li>
        <li><a className="menu-item" onClick={this.signout} href=''>LOGOUT</a></li>
      </Menu>
    );
  }
}


export default BurgerMenu;
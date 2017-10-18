import React from 'react';
import * as firebase from 'firebase';
import 'babel-polyfill';
import {Route, Router} from 'react-router'
import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import {spy} from 'sinon';
import  {Main}  from '../src/components/main';
import  BurgerMenu  from '../src/components/Menu';
import {UserLogin} from '../src/components/userLogin';
import {UserSignup} from '../src/components/userSignup'
import  WhereTo  from '../src/components/WhereTo';
import history from '../src/history';
import Adapter from 'enzyme-adapter-react-16';
import {Link} from 'react-router-dom';
import {Provider} from 'react-redux'

//node_env=test had to be written down
//firebase not read if it is a test
//babel-polyfill to be read by older browsers
//export class component itself, not connected component
// import { UserLogin, UserSignup, AllItineraries, IdeaBoard, UserHome, FindFriends, SingleItinerary, FriendRequests, StatusUpdate, MyFriends, WhereTo, UserSettings, NotFound, Loading, Routes} from '../src/components'

configure({ adapter: new Adapter() })

describe('React Components', () => {
    beforeEach('define wrapper', () => {
    //     <Provider store={store} >  
    //     <Routes />
    // </Provider>
    })
    describe('Main Component', () => {
        let mainWrapper;
        beforeEach('define mainWrapper', () => {
            mainWrapper = shallow(<Main  currentUser={{}}/>)
        })
        it('links to a login and signup page', () => {
            expect(mainWrapper.find('Link')).to.have.length(2)
        })
        it('renders the Burger Menu', () => {
            expect(mainWrapper.find(BurgerMenu)).to.have.length(1)
        })
        it('renders the WhereTo Component', () => {
            expect(mainWrapper.find(WhereTo)).to.have.length(1)
        })
        it('shows the title of the app', () => {
            expect(mainWrapper.find('.sapphire-app-title').text()).to.equal('SAFFIRE')
        })
    })
    describe('UserLogin Component', () => {
        let userLoginWrapper;
        beforeEach('define userLoginWrapper', () => {
            userLoginWrapper = shallow(<UserLogin/>)
        })
        it('has a form', () => {
            expect(userLoginWrapper.find('form')).to.have.length(1)
        })
        it('has a onSubmit function', () => {
            expect(userLoginWrapper.find('button')).to.have.length(1)
            expect(userLoginWrapper.props().children[2].props.children.props.onSubmit).to.be.a('Function')
        })
        it('has an onChange function on email input', () => {
            expect(userLoginWrapper.props().children[2].props.children.props.children[1].props.children.props.onChange).to.be.a('Function')
        })
        it('has an onChange function on password input', () => {
            //console.log('userLoginWrapperprops', userLoginWrapper.props().children[2].props.children.props.children[2].props.children.props.onChange)
            expect(userLoginWrapper.props().children[2].props.children.props.children[2].props.children.props.onChange).to.be.a('Function')
        })
    })
    describe('UserSignup Component', () => {
        let userSignupWrapper
        let inputArr
        beforeEach('define userSignup', () => {
            userSignupWrapper = shallow(<UserSignup/>)
            inputArr = userSignupWrapper.find('.sapphire-user-signup-input')
        })
        it('has a form', () => {
            expect(userSignupWrapper.find('form')).to.have.length(1)
            //console.log('usersignupprops', userSignupWrapper.props())
        })
        it('has a submit function', () => {
            expect(userSignupWrapper.props().children[2].props.children.props).to.have.property('onSubmit')
        })
        it('has inputs for name, email, and password', () => {
            console.log(inputArr.at(0).props().children.props)
            expect(inputArr.at(0).props().children.props.name).to.equal('name')
            expect(inputArr.at(1).props().children.props.name).to.equal('email')
            expect(inputArr.at(2).props().children.props.name).to.equal('password')
        })
        it('has onChange functions on each input', () => {
            expect(inputArr.at(0).props().children.props.onChange).to.be.a('Function')
            expect(inputArr.at(1).props().children.props.onChange).to.be.a('Function')
            expect(inputArr.at(2).props().children.props.onChange).to.be.a('Function')
        })


    })
    describe('AllItineraries Component', () => {
        
    })
    describe('Ideaboard Component', () => {
        
    })
    describe('UserHome Component', () => {
        
    })
    describe('FindFriends Component', () => {
        
    })
    describe('SingleItinerary Component', () => {

    })
    describe('FriendRequests Component', () => {
        
    })
    describe('MyFriends Component', () => {
        
    })
    describe('WhereTo Component', () => {
        
    })
    describe('UserSettings', () => {
        
    })
})
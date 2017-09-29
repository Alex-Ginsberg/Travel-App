import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import WhereTo from './WhereTo';
import {IdeaBoard} from './IdeaBoard';
import {LinkPreview} from './LinkPreview'

describe('React components', () => {
    let whereTo;
    beforeEach('Create component', () => {
        whereTo = shallow(<WhereTo/>)
    })
    describe('WhereTo Page Component', () => {
        it('local state is a string', () => {
            
            expect(whereTo.is('div')).to.be.equal(true)
        })
        it('creates a new itinerary when you click on the Enter button', () => {

        })
    })
    describe('IdeaBoard Component', () => {
        it('renders a node')
        it('only accepts a url')
        it('increases the votes of users when thumbs up is clicked')
        it('adds your event to the itinerary when you click the plus button')
        it('deletes a node when delete button is clicked')
        it('puts the node at a higher level when it has more likes')
    })
    describe('LinkPreview', () => {
        it('renders the linkPreview node')
    })

})

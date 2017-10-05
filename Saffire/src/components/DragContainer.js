import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dustbin from './DragDustbin';
import Box from './DragBox';
import { connect } from 'react-redux';

export class Container extends Component {
    constructor(props) {
        super(props)
    }
  render() {

    // this.props.props
      console.log('THIS PROPS!!!!', this.props)
    //   console.log('THIS PROPS!!!!', this.props.props[0].title)
    //   const { currentEvents}  = this.props;
    //   console.log('THIS PROPS EVENTS!!!!', currentEvents)

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <Dustbin />
          </div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
              {/* {
                  currentEvents.map()
              } */}
              {
                this.props.currentEvents.map(event => (          
                    <Box name={event.title} />)) 
                }
                {/* <LinkPreview  eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={itineraryName.key} likes={event.likes} likedBy={event.likedBy}/> */}
                         
                ))
                }
            <Box name='something' />
            <Box name="Banana" />
            <Box name="Paper" />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}


// const mapStateToProps = (state) => {
//     return {
//         itineraryName: state.currentItinerary,
//         currentEvents: state.currentEvents,
//         currentUser: state.currentUser
//     }
// }

// const DragContainer = connect(mapStateToProps, null)(Container);
// export default DragContainer;
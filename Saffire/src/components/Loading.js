import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <div className = "loading-comp">
    <ReactLoading type={"bubbles"} color="#000000" height='300px' width='300px' />
    </div>
);
 
export default Loading;
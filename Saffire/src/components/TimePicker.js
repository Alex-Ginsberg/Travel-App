import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const TimePick = () => (
  <div>
      <MuiThemeProvider>
    <TimePicker
      hintText="12hr Format"
    />
    </MuiThemeProvider>
  </div>
);

export default TimePick;
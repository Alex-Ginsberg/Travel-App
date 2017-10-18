import React from 'react'
import {connect} from 'react-redux'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class NotificationCounter extends React.Component {
  constructor() {
    super()
    this.state = {
      showNotifications: false
    }
  }
  
  render () {
    const notificationsArray = []
    for (let key in this.props.currentUser.notifications) {
      notificationsArray.push(this.props.currentUser.notifications[key].body)
    }

    return (
        <div className="notification-counter">
            <MuiThemeProvider>
                <a href='/myfriends'>
                <Badge badgeContent={notificationsArray.length} primary={true}>
                <IconButton tooltip="Notifications">
                    <NotificationsIcon />
                </IconButton>
                </Badge>
                </a>
            </MuiThemeProvider>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser,
  }
}


const NotificationCounterContainer = connect(mapStateToProps, null)(NotificationCounter)
export default NotificationCounterContainer
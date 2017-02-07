import React, {Component} from 'react';

class ChatBar extends React.Component {
  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" value={this.props.username} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;
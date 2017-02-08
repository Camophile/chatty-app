import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.currentUser,
      message: ""
    }
  }

  newMessage(event) {
    if(event.key === 'Enter'){
      this.props.addMsg(this.state.message);
    };
  }

  updateContent(event){
    this.setState({message: event.target.value})
  }

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" value={this.props.username} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onChange={this.updateContent.bind(this)}
          value={this.props.messages} onKeyPress={this.newMessage.bind(this)} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;
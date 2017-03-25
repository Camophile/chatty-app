import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: props.currentUser,
      message: ""
    }
  }

  newMessage(event) {
    if(event.key === 'Enter'){
      this.props.addMsg(this.state.message);
    };
  }

  newUser(event) {
    if(event.key === 'Enter'){
      // if(event.target.value){
        console.log("ChatBar.jsx: event.target", event.target);
        this.props.addUsr(this.state.username);
      // };
    };
  }

  updateMessage(event){
    this.setState({message: event.target.value});
  }

  updateUsername(event){
    this.state.username = event.target.value;
    this.setState({ username: event.target.value });
  }

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" onChange={ this.updateUsername.bind(this) }
        value={this.state.username} onKeyPress={this.newUser.bind(this)} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onChange={ this.updateMessage.bind(this) }
          value={this.state.messages} onKeyPress={ this.newMessage.bind(this) } placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;
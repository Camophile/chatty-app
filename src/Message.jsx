import React, {Component} from 'react';

class Message extends React.Component {
  render(){
    if(this.props.messages.type === "incomingMessage") {
      return (
        <div>
          <div className="message">
            <span className="message-username">{this.props.messages.username}</span>
            <span className="message-content">{this.props.messages.content}</span>
          </div>
        </div>
    );
    } else {
      return (
        <div>
          <div className="message system">
            {this.props.messages.content}
          </div>
        </div>
        );
    }
  }
}

export default Message;
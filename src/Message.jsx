import React, {Component} from 'react';

class Message extends React.Component {
  render(){
    const messages = this.props.messages;
    const messagesArray = messages.map((element, index) =>
        <div className="message" key={element.id}>
          <span className="message-username">{element.username}</span>
          <span className="message-content">{element.content}</span>
        </div>
    );
     return <div>{messagesArray}</div>;
  }
}

export default Message;
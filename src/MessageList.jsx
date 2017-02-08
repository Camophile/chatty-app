import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  render(){
    const messages = this.props.messages;
    const messagesArray = messages.map(element => (
      <main className="messages" key={element.id}>
        <Message messages={element} />
      </main>
    ));
      return <div>{messagesArray}</div>;
  }
}


export default MessageList;
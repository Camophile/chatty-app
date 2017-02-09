import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var counter = 5;

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:4000'); //connect to websocket server
    this.socket.onerror = function(event) {
      console.log("ws error:", event);
    }
    this.socket.onopen = function(event) { //same as "addEvenListener()"
      console.log("Client message: Connected to server");
    }

    this.socket.onmessage = (event) => {
      console.log("event", event);
      console.log("server said:", event.data)
      const message = JSON.parse(event.data);
      console.log("message", message);
      console.log("message.type", message.type)
      console.log("this.state.data.messages", event.data.message);


    // Add a new message to the list of messages in the data store
    const newMessage = {
      id: message.id,
      content: message.content,
      username: message.username
    };
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})

  }
}

  addMessage(content) {
    const newMessage = {
                        username: this.state.currentUser.name,
                        content: content
                       }

    // console.log(event.target.value);
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    console.log("newMessage:", newMessage);
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <div className="content">
          <MessageList messages={this.state.messages}/>
          <ChatBar username={this.state.currentUser.name} addMsg={this.addMessage.bind(this)} />
        </div>
      </div>
    );
  }
}
export default App;
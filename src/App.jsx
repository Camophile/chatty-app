import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var counter = 5;

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
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
      const message = JSON.parse(event.data);
    // Add a new message to the list of messages in the data store
      console.log("Message from server", message);
      const newMessage = {
        id: message.id,
        content: message.content,
        username: message.username,
        type: message.type
      };
      console.log("newMessage", newMessage);
      const messages = this.state.messages.concat(newMessage)
      console.log("messages", messages);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})

    }
  }

  addMessage(content) {
    // this.state.currentUser.messages = content;
    const newMessage = {
                        type: "postMessage",
                        username: this.state.currentUser.name,
                        content: content
                       }

    // console.log(event.target.value);
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.socket.send(JSON.stringify(newMessage));
  }

  addUserName(name) {
    //this.state.currentUser.name = name;
    const newMessage = {
                        type: "postNotification",
                        content: `${this.state.currentUser.name} has changed their name to ${name}`
                       }

   this.setState({currentUser: { name: name }});
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
          <ChatBar currentUser={this.state.currentUser.name} addUsr={this.addUserName.bind(this)} addMsg={this.addMessage.bind(this)} />
        </div>
      </div>
    );
  }
}
export default App;
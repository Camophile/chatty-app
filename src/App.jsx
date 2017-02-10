import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var counter = 5;

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous", colour: "" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      usersOnline: 0
    }

    this.addUserName = this.addUserName.bind(this);
    this.addMessage = this.addMessage.bind(this);
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

      if (message.type === "change_color") {
          let newState = this.state;
          newState.currentUser.colour = message.colour;
          this.setState(newState);
      }

      if (message.type === 'incomingMessage' || message.type === 'incomingNotification') {
          let newState = this.state;
          newState.messages.push(message);
          this.setState(newState);
      }

      if(message.hasOwnProperty("clients_online")){
        this.setState({usersOnline: message.clients_online});
      }
      if(message.username !== this.state.currentUser) {

      }
       else{
        console.log("Message from server", message);
        const newMessage = {
          id: message.id,
          content: message.content,
          username: message.username,
          type: message.type
        };
      }
    }
  }

  addMessage(content) {
    const newMessage = {
                        type: "postMessage",
                        username: this.state.currentUser.name,
                        content: content
                       }
    this.socket.send(JSON.stringify(newMessage));
  }

  addUserName(name) {
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
          <span className="user-counter">{this.state.usersOnline} user(s) online</span>
        </nav>
        <div className="content">
          <MessageList currentUser= { this.state.currentUser } messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser.name} addUsr={this.addUserName} addMsg={this.addMessage} />
        </div>
      </div>
    );
  }
}

export default App;
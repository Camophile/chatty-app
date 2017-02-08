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
    // this.addMessage = this.addMessage.bind(this);
    // this.submitMessage = this.submitMessage.bind(this);
  }

  // submitMessage(event) {
  //   event
  // }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:4000'); //connect to websocket server
    this.socket.onerror = function(event) {
      console.log("ws error:", event);
    }
    this.socket.onopen = function(event) { //same as "addEvenListener()"
      console.log("Client message: Connected to server");
      // this.socket.send("Sample message");
      // this.socket.send("Hello from client");
    }

    this.socket.onmessage = (event) => {
      console.log("server said:", event.data)
      const message = JSON.parse(event.data);
    }
    // console.log('user', newMessage.username, 'said', newMessage.content);

    // console.log('Connected to server');
    // this.connection.onmessage = evt => {
    //   this.setState({
    //     messages: messages
    //   })
    // }
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 4, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }

  addMessage(content) {
      const newMessage = {
                          id: counter++,
                          username: this.state.currentUser.name,
                          content:content
                         }

      // this.socket.send(event.target.value);
      const messages = this.state.messages.concat(newMessage)

      // console.log(event.target.value);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
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
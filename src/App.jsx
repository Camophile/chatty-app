import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentUser: "Bob", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
                {
                  id: 1,
                  username: "Bob",
                  content: "Has anyone seen my marbles?",
                },
                {
                  id: 2,
                  username: "Bob",
                  content: "please?",
                },
                {
                  id: 3,
                  username: "Anonymous",
                  content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                }
              ]
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: true})
    }, 3000);
  }

  render() {
    // if(this.state.loading) {
      return (
        <div className="container">
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <div className="content">
            <MessageList messages={this.state.messages}/>
            <ChatBar username={this.state.currentUser} />
          </div>
        </div>
      );
    // }
    // return <h1>Page is loaded</h1>;
  }
}
export default App;
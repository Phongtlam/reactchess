import * as React from 'react';
import { Input, Button } from 'antd';
const InputGroup = Input.Group;

import '@App/stylesheets/ChatClient.css';

interface ChatClientProps {
  sendMessage: (message: string) => void;
  messagesArray: any[];
}

interface ChatClientState {
  message: string;
}

const buttonStyle = {
  backgroundColor: '#bae637',
  borderColor: '#bae637'
};

class ChatClient extends React.Component<ChatClientProps, ChatClientState> {
  state = {
    message: ''
  };

  private messagesEnd: HTMLDivElement | null;

  componentDidUpdate() {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleMessageSend = () => {
    this.setState({ message: '' });
    this.props.sendMessage(this.state.message);
  }

  onMessageInput = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="chatclient--textarea">
          {
            this.props.messagesArray.map( (messageObj, i) => {
              let content;
              const chatWrapperClass = ['chatclient-wrapper'];
              let from = '';

              if (messageObj.from === 'chatbot') {
                from = 'chatbot';
              } else if (messageObj.from === 'self') {
                from = 'self';
              }
              chatWrapperClass.push(from);

              if (messageObj.from === 'chatbot') {
                let newUser;
                let message;
                if (messageObj.message !== '') {
                  const messageArray = messageObj.message.split(' ');
                  newUser = messageArray[0];
                  message = messageArray.slice(1).join(' ');
                }

                content = (
                  <div className={chatWrapperClass.join(' ')}>
                    <img src="../../../favicon.ico" />
                    {
                      messageObj.message === '' ?
                        (
                          <div>
                            <p>
                              Welcome to room&#032;
                              <span className="chatclient-user chatbot">{messageObj.roomId}</span>. You can:
                            </p>
                            <ul>
                              <li>Invite your friend(s) to join on this room ID</li>
                              <li>Join a different room via the left side menu</li>
                              <li>Switch to play vs the AI(me of course)</li>
                            </ul>
                          </div>
                        ) : (
                          <span><span className="chatclient-user chatbot">{newUser}&#032;</span>{message}</span>
                        )
                    }
                  </div>
                );
              } else {
                content = (
                  <div className={chatWrapperClass.join(' ')}>
                    <div className={messageObj.from === 'self' ? 'chatclient--user self' : 'chatclient--user'}>
                      <span className="chatclient--username">{messageObj.userName}</span>
                      <span className="chatclient--timestamp">{messageObj.timestamp}</span>
                    </div>
                    <div className={messageObj.from === 'self' ? 'chatclient--message self' : 'chatclient--message'}>
                      {messageObj.message}
                    </div>
                  </div>
                );
              }
              return (
                <div key={i}>
                  {content}
                  <div
                    style={{ float: 'left', clear: 'both' }}
                    ref={(node) => { this.messagesEnd = node; }}
                  />
                </div>
              );
            })
          }
        </div>
        <InputGroup compact={true}>
          <Input
            onChange={this.onMessageInput}
            value={this.state.message}
            style={{ width: '313px' }}
            onPressEnter={this.handleMessageSend}
          />
          <Button type="primary" icon="message" onClick={this.handleMessageSend} style={buttonStyle}>Send</Button>
        </InputGroup>
      </div>
    );
  }
}

export default ChatClient;
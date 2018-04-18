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
              return (
                <div key={i} className={messageObj.isSelf ? 'chatclient-wrapper self' : 'chatclient-wrapper'}>
                  <div className={messageObj.isSelf ? 'chatclient--user self' : 'chatclient--user'}>
                    <span className="chatclient--username">{messageObj.userName}</span>
                    <span className="chatclient--timestamp">{messageObj.timestamp}</span>
                  </div>
                  <div className={messageObj.isSelf ? 'chatclient--message self' : 'chatclient--message'}>
                    {messageObj.message}
                  </div>
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
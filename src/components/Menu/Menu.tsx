import * as React from 'react';
import { Input, Button } from 'antd';
import '@App/stylesheets/Menu.css';

interface MenuProps {
  roomId: string;
  roomUsers: string[];
  currentUser: string;
  subscribeUser: (userInfo: { userName: string; roomId: string }) => void;
}

interface MenuState {

}

class Menu extends React.Component<MenuProps, MenuState> {
  state = {
    roomIdInput: '',
  };

  public render() {
    return (
      <div className="menu-wrapper">
        <div className="menu--header">
          <p className="menu--header-room-text">Current Room ID:</p>
          <p className="menu--header-room-id">{this.props.roomId}</p>
          <span className="menu--header-room-text">Current users: {this.props.roomUsers.length}</span>
        </div>
        <div className="menu--content">
          <div className="menu--content-item">
            <Input
              placeholder="new room ID"
              value={this.state.roomIdInput}
              onChange={this.onRoomIdInput}
            />
            <Button onClick={this.joinNewRoom} type="primary" className="menu--content-join-btn">Join</Button>
          </div>
        </div>
      </div>
    );
  }

  private onRoomIdInput = (e) => {
    this.setState({ roomIdInput: e.target.value });
  }

  private joinNewRoom = () => {
    if (this.state.roomIdInput === '') {
      return;
    }
    this.props.subscribeUser({
      userName: this.props.currentUser,
      roomId: this.state.roomIdInput
    });
    this.setState({
      roomIdInput: ''
    });
  }

}

export default Menu;
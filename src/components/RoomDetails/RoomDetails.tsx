import * as React from 'react';
import { Card } from 'antd';
import ChatClient from '@App/components/ChatClient/ChatClient';
import ChessBoard from '@App/components/Chess/Chessboard';
import ChessFooter from '@App/components/ChessFooter/ChessFooter';
import '@App/stylesheets/RoomDetails.css';
import GameStatus from '@App/components/GameStatus/GameStatus';

const RoomDetails = (props) => {
  return (
    <Card
      title={
          <GameStatus
            message={props.gameStatus.message}
            type={props.gameStatus.type}
            showIcon={props.gameStatus.showIcon}
          />
        }
    >
      <div className="roomdetails-wrapper">
        <div>
          <ChessBoard
            isReset={props.isReset}
            fen={props.fen}
            onMoveCallback={props.onMoveCallback}
            afterUpdateCallback={props.afterUpdateCallback}
            orientation={props.orientation}
          />
          <ChessFooter 
            onGameTypeSelected={props.onGameTypeSelected}
            setOrientation={props.setOrientation}
            resetGame={props.resetGame}
            gameType={props.gameType}
          />
        </div>
        <div className="roomdetails--mid-pane">
          <p className="roomdetails--mid-pane-title">Users</p>
          <div className="roomdetails--mid-pane-users">
            {props.roomUsers.map( (user, i) => <p className="roomdetails--mid-pane-user" key={i}>{user}</p>)}
          </div>
        </div>
        <ChatClient sendMessage={props.sendMessage} messagesArray={props.messagesArray} />
      </div>
    </Card>
  );
};

export default RoomDetails;
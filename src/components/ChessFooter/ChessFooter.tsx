import * as React from 'react';
import { Button, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import '@App/stylesheets/ChessFooter.css';
const RadioGroup = Radio.Group;

interface ChessFooterProps {
  gameType: 'friends' | 'ai';
  setOrientation: (side: 'w' | 'b') => void;
  resetGame: () => void;
  onGameTypeSelected: (e: RadioChangeEvent) => void;
}

const ChessFooter = (props: ChessFooterProps) => {
  return (
    <div className="chessfooter-wrapper">
      <Button type="primary" onClick={props.resetGame}>Start New Game</Button>
      <Button onClick={() => props.setOrientation('w')}>White</Button>
      <Button onClick={() => props.setOrientation('b')}>Black</Button>
      <RadioGroup onChange={e => props.onGameTypeSelected(e)} value={props.gameType}>
        <Radio value={'friends'}>Vs. Friends</Radio>
        <Radio value={'ai'}>Vs. AI</Radio>
      </RadioGroup>
    </div>
  );
};

export default ChessFooter;
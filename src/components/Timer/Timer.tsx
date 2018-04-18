import * as React from 'react';
import '@App/stylesheets/Timer.css';

interface TimerProps {
  timerObj: {
    minutes: number;
    seconds: number;
  };
  startTimer: boolean;
}

interface TimerState {
  timer: number;
  minutes: string;
  seconds: string;
  miliseconds: string;
}

class Timer extends React.Component<TimerProps, TimerState> {
  private timerCycle;
  private miliInterval;

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      timer: 0,
      minutes: '00',
      seconds: '00',
      miliseconds: '00',
    };
  }

  public render() {
    return (
      <div className="timer-wrapper">
        {this.state.minutes}:{this.state.seconds}:{this.state.miliseconds}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { minutes, seconds } = this.props.timerObj;
    if (
      prevProps.timerObj.minutes !== minutes ||
      prevProps.timerObj.seconds !== seconds
    ) {
      this.setState({
        timer: minutes * 60 * 1000 + seconds * 1000
      }, () => {
        this.startTimer();
      });
    }
  }

  private startTimer() {
    clearInterval(this.timerCycle);
    clearInterval(this.miliInterval);
    this.timerCycle = setInterval( () => {
      const newMin = Math.floor((this.state.timer % (1000 * 60 * 60)) / (1000 * 60));
      const newSec = Math.floor((this.state.timer % (1000 * 60)) / 1000);
      this.setState({
        timer: this.state.timer - 1000,
        minutes: ('' + newMin).length === 1 ? '0' + newMin : '' + newMin,
        seconds: ('' + newSec).length === 1 ? '0' + newSec : '' + newSec,
      });
    }, 1000);
    
    let newMili = 99;
    setTimeout( () => {
      this.miliInterval = setInterval( () => {
        this.setState({
          miliseconds: newMili - 1 + ''
        });
        newMili -= 1;
        if (newMili < 0) {
          newMili = 99;
        }
        if (this.state.timer < 0) {
          clearInterval(this.timerCycle);
          clearInterval(this.miliInterval);
          this.setState({
            timer: this.props.timerObj.minutes * 60 * 1000 + this.props.timerObj.seconds * 1000,
            miliseconds: '00'
          });
        }
      }, 10);
    }, 1000);
  }

}

export default Timer;
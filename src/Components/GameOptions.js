import React from 'react';
import Scoreboard from './Scoreboard';
import { useHistory } from 'react-router-dom';

export default function GameOptions(props) {

  let currentGame = props.currentGame;
  let timeStr = props.currentGameTime || '00:00';
  let timer = props.gameTimer;
  let timerPaused = props.timerPaused;
  let setTimerPaused = props.setTimerPaused;

  let history = useHistory();

  return (
    <div className='game-options'>
      <div className='btn-container'>
        <button
          className='btn'
          onClick={() => props.setConfirmFinish(true)}
        >Finish & Save</button>
        <button
          className='btn'
          onClick={() => {
            props.setActiveTimeOut(!props.activeTimeOut);
          }}
        >Start TimeOut</button>
        <button
          className='btn'
          onClick={props.undoAction}
        >Undo<span className='material-icons md-18'>undo</span></button>
      </div>

      <div className='timer-controls'>
        <button className='btn' onClick={() => history.push('/')}>Exit Game</button>
        <h1 className='game-clock'>{`${timeStr}`}</h1>
        <button className={`btn`} onClick={() => {
          if (timer.isRunning()) {
            setTimerPaused(true);
            timer.stop();
            props.addTimerEntry('timer-paused');
          } else {
            setTimerPaused(false);
            timer.start({
              startValues: {
                minutes: parseInt(timeStr.split(':')[0]),
                seconds: parseInt(timeStr.split(':')[1]),
              }
            });
            props.addTimerEntry('timer-started');
          }
        }}
        >{timerPaused ? 'Start Time' : 'Pause Time'}</button>
      </div>
      <Scoreboard game={currentGame} />
    </div>
  )
}

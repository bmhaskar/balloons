
import './App.css'
import {useEffect, useRef} from "react";
import {Game} from "./Game.js";

import {useGamepadEvents} from "@beskar-labs/use-gamepad-events";


const restartGame = (ballons, gameRef) => {
    if(ballons.length == 0) {
        gameRef.current =  new Game();
        gameRef.current.initGame();
        gameRef.current.startGame();
    }
}
function App() {
    const gameRef = useRef();
    useEffect(() => {
        if(gameRef.current) return;
        gameRef.current =  new Game();
        gameRef.current.initGame();
    },[]);

    const gamepadEvents = useGamepadEvents({
        onConnect: (gamepad) => console.log(`Gamepad ${gamepad?.id} connected`,gamepad),
        onDisconnect: () => console.log('Gamepad disconnected'),
        onReady: () => console.log('Gamepad ready'),
    });



    gamepadEvents.on('a', (e) => {
        const baloons = document.getElementsByClassName('balloon');
       if(gameRef.current && e) {
           baloons.length == 2 && baloons[0] && baloons[0].click();
       }
        restartGame(baloons, gameRef);

    });

    gamepadEvents.on('b', (e) => {
        const baloons = document.getElementsByClassName('balloon');
        if(gameRef.current && e) {
            baloons.length == 1 && baloons[0] && baloons[0].click();
        }
        restartGame(baloons, gameRef);
    });
    return (
      <div id="main-wrapper">
          <div id="canvas">
          </div>
          <div id="score-label">
              Score: <span id="score-count">0</span>
          </div>
          <div id="start-btn" onClick={() => {
              gameRef.current.startGame();
          }}>
              <span>Play</span>
          </div>
          <div id="pause-btn">
          </div>
      </div>
  )
}

export default App

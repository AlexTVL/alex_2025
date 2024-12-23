// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
//import Goomba from './EnemyGoomba.js';
//import Coin from './Coin.js';


class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_back = path + "/images/rpg/anorLondo.jpg";
    const image_data_back = {
        name: 'back',
        src: image_src_back,
        pixels: {height: 900, width: 1600}
    };

    // Player 1 sprite data (turtle)
    const PLAYER1_SCALE_FACTOR = 10;
    const sprite_src_player1 = path + "/images/rpg/skeleton.png";
    const sprite_data_player1 = {
        name: 'player1',
        src: sprite_src_player1,
        SCALE_FACTOR: PLAYER1_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/PLAYER1_SCALE_FACTOR) }, 
        pixels: {height: 256, width: 576},
        orientation: {rows: 4, columns: 9 },
        down: {row: 2, start: 0, columns: 9 },
        left: {row: 1, start: 0, columns: 9 },
        right: {row: 3, start: 0, columns: 9 },
        up: {row: 0, start: 0, columns: 9 },
    };

    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_back },
      { class: PlayerOne, data: sprite_data_player1 },
    ];
  }

}

export default GameLevelWater;
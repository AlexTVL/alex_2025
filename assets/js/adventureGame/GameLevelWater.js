import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Npc from './Npc.js';
import Character from './Character.js';
import Player from './Player.js';

class GameLevelWater {
    constructor(path) {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        // Values dependent on GameEnv.create()
        let width = GameEnv.innerWidth;
        let height = GameEnv.innerHeight;

        // Background data
        const image_src_background = path + "/images/gamify/adventureBackground.png";
        const image_data_background = {
            id: 'Background',
            src: image_src_background,
            pixels: { height: 1440, width: 2560 }
        };

        const sprite_src_ninja = path + "/images/gamify/ninja(1).png"; // be sure to include the path
        const NINJA_SCALE_FACTOR = 8;
        const sprite_data_ninja = {
            id: 'NinjaCat',
            greeting: "Meow!",
            src: sprite_src_ninja,
            SCALE_FACTOR: NINJA_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 20,
            INIT_POSITION: { x: 200, y: height - (height / NINJA_SCALE_FACTOR) }, // Adjusted position
            pixels: { height: 136, width: 277 },
            orientation: { rows: 2, columns: 4 },
            down: { row: 1, start: 1, columns: 3 },
            left: { row: 0, start: 0, columns: 2 },
            right: { row: 1, start: 1, columns: 3 },
            up: { row: 1, start: 1, columns: 3 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };

        const sprite_src_bird = path + "/images/gamify/birdCat.png"; // be sure to include the path
        const BIRD_SCALE_FACTOR = 10;
        const sprite_data_bird = {
            id: 'BirdCat',
            greeting: "Chirp! Chirp! There's cat food around here, but watch out for the Face!",
            src: sprite_src_bird,
            SCALE_FACTOR: BIRD_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 10,
            INIT_POSITION: { x: width - 200, y: (height / 2) - (136 / 2) }, // Adjusted position to middle right
            pixels: { height: 66, width: 379 },
            orientation: { rows: 1, columns: 4 },
            down: { row: 0, start: 0, columns: 4 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }, // Decreased hitbox size
        };

        // Define collision areas for the four corners
        GameEnv.collisionAreas = [
            { position: { x: 0, y: 0 }, width: 500, height: 100 }, // Top-left corner
            { position: { x: width - 200, y: 0 }, width: 400, height: 100 }, // Top-right corner
            { position: { x: 0, y: height - 200 }, width: 500, height: 800 }, // Bottom-left corner
            { position: { x: width - 200, y: height - 200 }, width: 200, height: 600 } // Bottom-right corner
        ];

        GameEnv.gameObjects.push(new Background(image_data_background));
        GameEnv.gameObjects.push(new Player(sprite_data_ninja));
        GameEnv.gameObjects.push(new Npc(sprite_data_bird));

        // List of objects definitions for this level
        this.objects = [
            { class: Background, data: image_data_background },
            { class: Player, data: sprite_data_ninja },
            { class: Npc, data: sprite_data_bird },
        ];

        GameEnv.currentLevel = this;
        console.log("GameLevelWater initialized with objects:", this.objects);
    }
}

export default GameLevelWater;
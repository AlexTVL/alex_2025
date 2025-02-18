import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Npc from './Npc.js';
import Character from './Character.js';
import Player from './Player.js';
import Collectible from './Collectibles.js'; // Import the Collectible class
import * as StatsManager from './StatsManager.js'; // Import the entire StatsManager module

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
            greeting: "Chirp! Chirp! There's cat food around here, but watch out for the Face! Press R to reveal the cat food, the order to collect them in is top, left, right, and down.",
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
            { position: { x: width - 450, y: 0 }, width: 400, height: 100 }, // Top-right corner
            { position: { x: 0, y: height - 250 }, width: 500, height: 200 }, // Bottom-left corner
            { position: { x: width - 300, y: height - 200 }, width: 400, height: 600 } // Bottom-right corner
        ];

        GameEnv.gameObjects.push(new Background(image_data_background));
        GameEnv.gameObjects.push(new Player(sprite_data_ninja));
        const npc = new Npc(sprite_data_bird);
        GameEnv.gameObjects.push(npc);

        // Collectibles data (initially hidden)
        const sprite_src_collectible = path + "/images/gamify/catFood.png"; // be sure to include the path
        const COLLECTIBLE_SCALE_FACTOR = 10;
        const collectiblePositions = [
            { x: width / 2, y: height / 4 - 100 }, // Move the top collectible higher
            { x: width / 4 - 50, y: height / 4 }, // Move the left collectible lefter
            { x: (3 * width) / 4, y: height / 4 },
            { x: width / 2, y: height - 100 } // Move the bottom collectible lower
        ];

        this.collectiblesData = collectiblePositions.map(position => ({
            id: 'Collectible',
            src: sprite_src_collectible,
            SCALE_FACTOR: COLLECTIBLE_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 10,
            INIT_POSITION: position,
            pixels: { height: 128, width: 164 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 }, // Ensure direction data is defined
            hitbox: { widthPercentage: 0.5, heightPercentage: 0.5 }
        }));

        // List of objects definitions for this level
        this.objects = [
            { class: Background, data: image_data_background },
            { class: Player, data: sprite_data_ninja },
            { class: Npc, data: sprite_data_bird }
        ];

        GameEnv.currentLevel = this;
        console.log("GameLevelWater initialized with objects:", this.objects);

        // Add event listener for the "R" key to reveal collectibles
        addEventListener('keydown', this.handleKeyDown.bind(this));

        // Update collectibles remaining
        this.updateCollectiblesRemainingDisplay();
    }

    handleKeyDown(event) {
        if (event.key === 'r' || event.key === 'R') {
            if (!this.collectiblesInitialized) {
                this.initializeCollectibles();
                this.collectiblesInitialized = true;
            }
            this.updateCollectiblesRemainingDisplay();
        }
    }

    initializeCollectibles() {
        this.collectibles = this.collectiblesData.map(data => new Collectible(data));
        this.collectibles.forEach(collectible => {
            GameEnv.gameObjects.push(collectible);
        });
    }

    updateCollectiblesRemainingDisplay() {
        const collectiblesRemaining = this.collectibles ? this.collectibles.filter(collectible => !collectible.collected).length : 0;
        const collectiblesRemainingElement = document.getElementById('collectibles-remaining');
        if (collectiblesRemainingElement) {
            collectiblesRemainingElement.innerText = `Collectibles Remaining: ${collectiblesRemaining}`;
        } else {
            const newElement = document.createElement('div');
            newElement.id = 'collectibles-remaining';
            newElement.innerText = `Collectibles Remaining: ${collectiblesRemaining}`;
            newElement.style.position = 'absolute';
            newElement.style.top = '10px';
            newElement.style.right = '10px';
            newElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            newElement.style.color = 'white';
            newElement.style.padding = '5px';
            newElement.style.borderRadius = '5px';
            document.body.appendChild(newElement);
        }
    }
}

export default GameLevelWater;
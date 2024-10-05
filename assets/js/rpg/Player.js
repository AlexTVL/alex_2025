import GameEnv from './GameEnv.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate

// Skeleton sprite sheet data
const skeletonSprite = {
    src: 'images/rpg/skeleton.png', // Path to the skeleton sprite sheet
    data: {
        pixels: { width: 512, height: 256 }, // Total size of the sprite sheet
        orientation: { columns: 8, rows: 4 }, // 8 frames per row, 4 rows for directions
        SCALE_FACTOR: 20, // Scaling the skeleton
        STEP_FACTOR: 50, // Movement speed
        ANIMATION_RATE: 6, // Slower animation rate
        // Define the row and frame data for each direction
        up: { start: 0, row: 0, columns: 8 },
        left: { start: 0, row: 1, columns: 8 },
        down: { start: 0, row: 2, columns: 8 },
        right: { start: 0, row: 3, columns: 8 }
    }
};

/**
 * Player is a dynamic class that manages the data and events for a player object.
 * 
 * @class Player
 */
class Player {
    constructor(sprite = null) {
        this.scale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        if (sprite) {
            this.scaleFactor = sprite.data.SCALE_FACTOR || SCALE_FACTOR;
            this.stepFactor = sprite.data.STEP_FACTOR || STEP_FACTOR;
            this.animationRate = sprite.data.ANIMATION_RATE || ANIMATION_RATE;

            this.spriteSheet = new Image();
            this.spriteSheet.src = sprite.src;

            this.frameIndex = 0;
            this.frameCounter = 0;
            this.direction = 'down'; // Initial direction
            this.spriteData = sprite.data;
        } else {
            this.scaleFactor = SCALE_FACTOR;
            this.stepFactor = STEP_FACTOR;
            this.animationRate = ANIMATION_RATE;
            this.spriteSheet = null;
        }

        this.size = GameEnv.innerHeight / this.scaleFactor;
        this.position = { x: 0, y: GameEnv.innerHeight - this.size };
        this.velocity = { x: 0, y: 0 };

        this.resize();
        this.bindEventListeners();
    }

    resize() {
        const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };
        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;
        this.scale = newScale;
        this.size = this.scale.height / this.scaleFactor;
        this.xVelocity = this.scale.width / this.stepFactor;
        this.yVelocity = this.scale.height / this.stepFactor;
        this.width = this.size;
        this.height = this.size;
    }

    draw() {
        if (this.spriteSheet) {
            const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
            const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;
            const directionData = this.spriteData[this.direction];

            let frameX = (directionData.start + this.frameIndex) * frameWidth;
            let frameY = directionData.row * frameHeight;

            GameEnv.ctx.drawImage(
                this.spriteSheet,
                frameX, frameY, frameWidth, frameHeight,
                this.position.x, this.position.y, this.width, this.height
            );

            this.frameCounter++;
            if (this.frameCounter % this.animationRate === 0) {
                this.frameIndex = (this.frameIndex + 1) % directionData.columns;
            }
        } else {
            GameEnv.ctx.fillStyle = 'red';
            GameEnv.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
    }

    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 87: // W
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 65: // A
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 83: // S
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 68: // D
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
    }

    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 87: // W
                this.velocity.y = 0;
                break;
            case 65: // A
                this.velocity.x = 0;
                break;
            case 83: // S
                this.velocity.y = 0;
                break;
            case 68: // D
                this.velocity.x = 0;
                break;
        }
    }
}

// Initialize the player with the skeleton sprite
const player = new Player(skeletonSprite);

export default Player;

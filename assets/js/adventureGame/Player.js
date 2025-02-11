import GameEnv from './GameEnv.js';
import Character from './Character.js';
import Npc from './Npc.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate

/**
 * Player is a dynamic class that manages the data and events for objects like a player 
 * 
 * This class uses a classic Java class pattern which is nice for managing object data and events.
 * 
 * @method bindEventListeners - Binds key event listeners to handle object movement.
 * @method handleKeyDown - Handles key down events to change the object's velocity.
 * @method handleKeyUp - Handles key up events to stop the object's velocity.
 */
class Player extends Character {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} data - The sprite data for the object. If null, a default red square is used.
     */
    constructor(data = null) {
        super(data);
        this.keypress = data?.keypress || {up: 87, left: 65, down: 83, right: 68};
        this.velocity = { x: 0, y: 0 };
        this.position = {
            x: (GameEnv.innerWidth - (data?.pixels?.width || 0)) / 2 + 150, // Move the player 150 pixels to the right
            y: GameEnv.innerHeight - (data?.pixels?.height || 0)
        };
        this.hasGreeted = false;
        this.bindEventListeners();
    }

    /**
     * Binds key event listeners to handle object movement.
     * 
     * This method binds keydown and keyup event listeners to handle object movement.
     * The .bind(this) method ensures that 'this' refers to the object object.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case this.keypress.up:
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case this.keypress.left:
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case this.keypress.down:
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case this.keypress.right:
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * 
     * @param {Object} event - The keyup event object.
     */
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case this.keypress.up:
                this.velocity.y = 0;
                break;
            case this.keypress.left:
                this.velocity.x = 0;
                break;
            case this.keypress.down: 
                this.velocity.y = 0;
                break;
            case this.keypress.right: 
                this.velocity.x = 0;
                break;
        }
    }

    /**
     * Draws the player on the canvas.
     * 
     * This method renders the player using the sprite sheet if provided, otherwise a red square.
     */
    draw() {
        if (this.spriteSheet) {
            // Sprite Sheet frame size: pixels = total pixels / total frames
            const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
            const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;

            // Sprite Sheet direction data source (e.g., front, left, right, back)
            const directionData = this.spriteData[this.direction];

            // Sprite Sheet x and y declarations to store coordinates of current frame
            let frameX, frameY;
            // Sprite Sheet x and y current frame: coordinate = (index) * (pixels)
            frameX = (directionData.start + this.frameIndex) * frameWidth;
            frameY = directionData.row * frameHeight;

            // Draw the current frame of the sprite sheet
            GameEnv.ctx.drawImage(
                this.spriteSheet,
                frameX, frameY, frameWidth, frameHeight, // Source rectangle
                this.position.x, this.position.y, this.width, this.height // Destination rectangle
            );

            // Update the frame index for animation at a slower rate
            this.frameCounter++;
            if (this.frameCounter % this.animationRate === 0) {
                this.frameIndex = (this.frameIndex + 1) % directionData.columns;
            }
        } else {
            // Draw default red square
            GameEnv.ctx.fillStyle = 'red';
            GameEnv.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Check collision with NPC only
        const npc = GameEnv.gameObjects.find(obj => obj instanceof Npc);
        if (npc && this.isCollidingWithArea(npc)) {
            if (!this.hasGreeted) {
                this.hasGreeted = true; // Prevents repeated triggers
                npc.shareGreeting();
            }
            // Stop movement upon collision
            this.position.x -= this.velocity.x;
            this.position.y -= this.velocity.y;
            this.velocity.x = 0;
            this.velocity.y = 0;
        } else {
            this.hasGreeted = false; // Reset when no longer colliding
        }

        // Check collision with defined collision areas
        if (GameEnv.collisionAreas) {
            for (const collisionArea of GameEnv.collisionAreas) {
                if (this.isCollidingWithArea(collisionArea)) {
                    // Stop movement upon collision
                    this.position.x -= this.velocity.x;
                    this.position.y -= this.velocity.y;
                    this.velocity.x = 0;
                    this.velocity.y = 0;
                    break;
                }
            }
        }

        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
            this.velocity.x = 0; 
        }
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }

        // Call the draw method to render the player
        this.draw();
    }

    isCollidingWithArea(area) {
        return (
            this.position.x < area.position.x + area.width &&
            this.position.x + this.width > area.position.x &&
            this.position.y < area.position.y + area.height &&
            this.position.y + this.height > area.position.y
        );
    }
}

export default Player;
import GameEnv from './GameEnv.js';
import Character from './Character.js';

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
            x: (GameEnv.innerWidth - (data?.pixels?.width || 0)) / 2,
            y: GameEnv.innerHeight - (data?.pixels?.height || 0)
        };
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

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (GameEnv.currentLevel && GameEnv.currentLevel.collisionAreas) {
            for (let area of GameEnv.currentLevel.collisionAreas) {
                if (this.isCollidingWithArea(area)) {
                    // Handle collision (e.g., stop movement)
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
    }

    isCollidingWithArea(area) {
        return (
            this.position.x < area.x + area.width &&
            this.position.x + this.width > area.x &&
            this.position.y < area.y + area.height &&
            this.position.y + this.height > area.y
        );
    }
}

export default Player;
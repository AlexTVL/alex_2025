import GameEnv from './GameEnv.js';
import Collectible from './Collectibles.js'; // Import the Collectible class
import Npc from './Npc.js'; // Import the Npc class
import Prompt from './Prompt.js'; // Import the Prompt module
import Player from './Player.js'; // Import the Player class

/**
 * Updates the display of collectibles remaining.
 */
export function updateCollectiblesRemaining() {
    const collectiblesRemaining = GameEnv.gameObjects.filter(obj => obj instanceof Collectible && !obj.collected).length;
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

/**
 * Updates the display of collectibles collected.
 */
export function updateCollectiblesCollected() {
    const collectiblesCollected = GameEnv.gameObjects.filter(obj => obj instanceof Collectible && obj.collected).length;
    const collectiblesCollectedElement = document.getElementById('collectibles-collected');
    if (collectiblesCollectedElement) {
        collectiblesCollectedElement.innerText = `Collectibles Collected: ${collectiblesCollected}`;
    } else {
        const newElement = document.createElement('div');
        newElement.id = 'collectibles-collected';
        newElement.innerText = `Collectibles Collected: ${collectiblesCollected}`;
        newElement.style.position = 'absolute';
        newElement.style.top = '10px';
        newElement.style.right = '10px';
        newElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        newElement.style.color = 'white';
        newElement.style.padding = '5px';
        newElement.style.borderRadius = '5px';
        document.body.appendChild(newElement);
    }

    // Check if all collectibles have been collected
    const totalCollectibles = GameEnv.gameObjects.filter(obj => obj instanceof Collectible).length;
    if (collectiblesCollected === totalCollectibles) {
        displayMoveToMiddleText();
        triggerBirdNpcFlyOff();
        displayWaitText();
        setTimeout(() => {
            initializeFaceNpc(); // Initialize "The Face" NPC after 5 seconds
            setTimeout(() => {
                gameOver(); // End the game 0.5 seconds after "The Face" NPC appears
            }, 500);
        }, 5000);
    }
}

/**
 * Displays temporary text in the middle of the screen instructing the player to move to the middle.
 */
function displayMoveToMiddleText() {
    const moveToMiddleText = document.createElement('div');
    moveToMiddleText.id = 'move-to-middle-text';
    moveToMiddleText.innerText = 'Move to the middle of the screen!';
    moveToMiddleText.style.position = 'absolute';
    moveToMiddleText.style.top = '60%'; // Move the text lower
    moveToMiddleText.style.left = '50%';
    moveToMiddleText.style.transform = 'translate(-50%, -50%)';
    moveToMiddleText.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    moveToMiddleText.style.color = 'white';
    moveToMiddleText.style.padding = '10px';
    moveToMiddleText.style.borderRadius = '5px';
    moveToMiddleText.style.fontSize = '24px';
    document.body.appendChild(moveToMiddleText);

    // Remove the text after 3 seconds
    setTimeout(() => {
        moveToMiddleText.remove();
    }, 3000);
}

/**
 * Displays temporary text in the same location as the NPC interaction saying "Wait! Where are you going?".
 */
function displayWaitText() {
    Prompt.showCustomPrompt('Wait! Where are you going?', '60%', '60%'); // Adjust the position

    // Remove the text after 3 seconds
    setTimeout(() => {
        Prompt.closeCustomPrompt();
    }, 3000);
}

/**
 * Triggers the Bird NPC to fly off to the right of the screen.
 */
function triggerBirdNpcFlyOff() {
    const birdNpc = GameEnv.gameObjects.find(obj => obj instanceof Npc && obj.spriteData.id === 'BirdCat');
    if (birdNpc) {
        birdNpc.flyOff();
    }
}

/**
 * Initializes "The Face" NPC and makes it fly across the screen.
 */
function initializeFaceNpc() {
    const path = "/alex_2025"; // Ensure this path is correct
    const faceNpc = new Npc({
        id: 'TheFace',
        src: `${path}/images/gamify/face.png`, // Ensure this path is correct
        SCALE_FACTOR: 3,
        ANIMATION_RATE: 20,
        pixels: { height: 166, width: 676 },
        INIT_POSITION: { x: -100, y: GameEnv.innerHeight / 2 - 200 }, // Move up by 100 pixels
        orientation: { rows: 1, columns: 4 },
        up: { start: 1, row: 0, columns: 3 },
        down: { start: 1, row: 0, columns: 3 },
        left: { start: 1, row: 0, columns: 3 },
        right: { start: 1, row: 0, columns: 3 },
        flyOff: function() {
            const move = () => {
                this.position.x += 20; // Increase position increment for faster movement
                console.log(`Current position: ${this.position.x}`); // Add logging for debugging
                if (this.position.x > GameEnv.innerWidth) {
                    this.destroy(); // Remove the NPC from the game environment
                } else {
                    requestAnimationFrame(move);
                }
            };
            requestAnimationFrame(move);
        }
    });

    // Add error handling for image loading
    faceNpc.spriteSheet.onerror = () => {
        console.error('Failed to load image:', faceNpc.spriteSheet.src);
    };

    GameEnv.gameObjects.push(faceNpc);
    faceNpc.flyOff();
}

/**
 * Handles game over state.
 */
function gameOver() {
    alert('Game Over!');
    // Stop the game loop or any other necessary cleanup
    // For example, you can reload the page to restart the game
    location.reload();
}

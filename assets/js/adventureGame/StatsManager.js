import GameEnv from './GameEnv.js';
import Collectible from './Collectibles.js'; // Import the Collectible class
import Npc from './Npc.js'; // Import the Npc class

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
    moveToMiddleText.style.top = '50%';
    moveToMiddleText.style.left = '50%';
    moveToMiddleText.style.transform = 'translate(-50%, -50%)';
    moveToMiddleText.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    moveToMiddleText.style.color = 'white';
    moveToMiddleText.style.padding = '10px';
    moveToMiddleText.style.borderRadius = '5px';
    moveToMiddleText.style.fontSize = '24px';
    document.body.appendChild(moveToMiddleText);

    // Remove the text after 5 seconds
    setTimeout(() => {
        moveToMiddleText.remove();
    }, 5000);
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
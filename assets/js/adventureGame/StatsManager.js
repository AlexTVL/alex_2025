import GameEnv from './GameEnv.js';
import Collectible from './Collectibles.js'; // Import the Collectible class

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
 * Retrieves the player's balance.
 * @returns {number} The player's balance.
 */
export function getBalance() {
    // Placeholder implementation
    return 100;
}

/**
 * Retrieves the player's chat score.
 * @returns {number} The player's chat score.
 */
export function getChatScore() {
    // Placeholder implementation
    return 50;
}

/**
 * Retrieves the number of questions answered by the player.
 * @returns {number} The number of questions answered.
 */
export function getQuestionsAnswered() {
    // Placeholder implementation
    return 10;
}

import GameEnv from './GameEnv.js';
import Character from './Character.js';
import * as StatsManager from './StatsManager.js'; // Import the entire StatsManager module

class Collectible extends Character {
    constructor(data) {
        super(data);
        this.collected = false;
        // Ensure direction data is defined
        this.spriteData.orientation = this.spriteData.orientation || { rows: 1, columns: 1 };
        this.spriteData.down = this.spriteData.down || { row: 0, start: 0, columns: 1 };
    }

    collect() {
        this.collected = true;
        this.destroy(); // Use the destroy function to remove the collectible from the screen
        console.log(`${this.spriteData.id} collected!`);
        StatsManager.updateCollectiblesRemaining(); // Update the collectibles remaining display
        StatsManager.updateCollectiblesCollected(); // Update the collectibles collected display
    }

    update() {
        if (!this.collected) {
            this.draw();
        }
    }
}

export default Collectible;
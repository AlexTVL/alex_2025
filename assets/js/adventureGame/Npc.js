import GameEnv from './GameEnv.js';
import Character from './Character.js';
import Prompt from './Prompt.js';
import Player from './Player.js'; // Import the Player class

class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.dialogueOptions = data.dialogueOptions || [
            "Option 1: Uh, ok?",
            "Option 2: Who are you?",
            "Option 3: Where am I?",
            "Option 4: What's the face?"
        ];
        this.responses = data.responses || [
            "What?",
            "Sorry, should've introduced myself. My name is Bird Cat!",
            "The Crossroads, it's been a while since i've seen anyone though..haha...",
            "A truly dreadful monster, you'll know when you see it!"
        ];
        this.greeting = data.greeting || "Hello!";
        this.bindEventListeners();
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     */
    update() {
        this.draw();
    }

    /**
     * Bind key event listeners for proximity interaction.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    /**
     * Handle keydown events for interaction.
     * @param {Object} event - The keydown event.
     */
    handleKeyDown({ key }) {
        if (key === 'e' && this.isPlayerNearby()) {
            this.shareQuizQuestion();
        }
    }

    /**
     * Check if the player is nearby.
     * @returns {boolean} - True if the player is nearby, false otherwise.
     */
    isPlayerNearby() {
        const player = GameEnv.gameObjects.find(obj => obj instanceof Player);
        if (!player) return false;

        const distance = Math.sqrt(
            Math.pow(player.position.x - this.position.x, 2) +
            Math.pow(player.position.y - this.position.y, 2)
        );

        // Increase the range for detecting proximity
        return distance < 100; // Adjust this value as needed
    }

    /**
     * Handle proximity interaction and share a greeting.
     */
    shareGreeting() {
        if (!Prompt.isOpen) {
            // Assign this NPC as the current NPC in the Prompt system
            Prompt.currentNpc = this;
            // Open the Prompt panel with this NPC's greeting
            Prompt.showCustomPrompt(this.greeting);
        }
    }

    /**
     * Handle key press interaction and share a quiz question.
     */
    shareQuizQuestion() {
        if (!Prompt.isOpen) {
            // Assign this NPC as the current NPC in the Prompt system
            Prompt.currentNpc = this;
            // Open the Prompt panel with this NPC's dialogue options
            Prompt.showDialogueOptions(this.dialogueOptions, this.handleDialogueResponse.bind(this));
        }
    }

    /**
     * Handle the player's response to the dialogue options.
     * @param {number} choice - The player's choice (1-4).
     */
    handleDialogueResponse(choice) {
        const response = this.responses[choice - 1];
        Prompt.showCustomPrompt(response);
        if (choice === 1) { // Assuming choice 1 reveals the collectibles
            if (this.interact) {
                this.interact();
            }
        }
    }

    /**
     * Check if this NPC is colliding with a given area.
     * @param {Object} area - The area to check for collision.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isCollidingWithArea(area) {
        return (
            this.position.x < area.position.x + area.width &&
            this.position.x + this.width > area.position.x &&
            this.position.y < area.position.y + area.height &&
            this.position.y + this.height > area.position.y
        );
    }
}

export default Npc;
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

    update() {
        this.draw();
    }

    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown({ key }) {
        if (key === 'e' && this.isPlayerNearby()) {
            this.shareQuizQuestion();
        }
    }

    isPlayerNearby() {
        const player = GameEnv.gameObjects.find(obj => obj instanceof Player);
        if (!player) return false;

        const distance = Math.sqrt(
            Math.pow(player.position.x - this.position.x, 2) +
            Math.pow(player.position.y - this.position.y, 2)
        );

        return distance < 100; // Adjust this value as needed
    }

    shareGreeting() {
        if (!Prompt.isOpen) {
            Prompt.currentNpc = this;
            Prompt.showCustomPrompt(this.greeting);
        }
    }

    shareQuizQuestion() {
        if (!Prompt.isOpen) {
            Prompt.currentNpc = this;
            Prompt.showDialogueOptions(this.dialogueOptions, this.handleDialogueResponse.bind(this));
        }
    }

    handleDialogueResponse(choice) {
        const response = this.responses[choice - 1];
        Prompt.showCustomPrompt(response);
        if (this.interact) {
            this.interact();
        }
    }

    flyOff() {
        this.velocity.x = 5; // Adjust the speed as needed
        const flyOffInterval = setInterval(() => {
            this.position.x += this.velocity.x;
            if (this.position.x > GameEnv.innerWidth) {
                clearInterval(flyOffInterval);
                this.destroy(); // Remove the NPC from the game environment
            }
        }, 1000 / 60); // 60 FPS
    }
}

export default Npc;
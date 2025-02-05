import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Npc from './Npc.js';
import Character from './Character.js';
import Player from './Player.js';

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
        pixels: {height: 1440, width: 2560}
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
        INIT_POSITION: { x: 0, y: height - (height/NINJA_SCALE_FACTOR) }, 
        pixels: {height: 136, width: 277},
        orientation: {rows: 2, columns: 4 },
        down: {row: 1, start: 1, columns: 3 },
        left: {row: 0, start: 0, columns: 2 },
        right: {row: 1, start: 1, columns: 3 },
        up: {row: 1, start: 1, columns: 3},
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    // NPC Data for Byte Nomad (Smaller Version)
    const sprite_src_bird = path + "/images/gamify/birdCat.png"; // be sure to include the path
    const sprite_data_bird = {
        id: 'Bird',
        greeting: "Chirp! Chrip! Hey, there is some cat food around here, but watch out for the Face!",
        src: sprite_src_bird,
        SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 15,
        pixels: {height: 66, width: 379},
        INIT_POSITION: { x: (width * 3 / 4), y: (height * 3 / 4)},
        orientation: {rows: 1, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Linux command quiz
        quiz: { 
          title: "Jupyter Notebook Command Quiz",
          questions: [
            "Which keyword is used to define a class in Java?\n1. define\n2. class\n3. Class\n4. struct",
            "Which data type is used to store a single character in Java?\n1. String\n2. char\n3. Character\n4. ch",
            "What is the default value of an int variable in Java?\n1. 0\n2. null\n3. undefined\n4. -1",
            "Which of these is NOT a Java access modifier?\n1. public\n2. private\n3. protected\n4. external",
            "What is the purpose of the 'final' keyword in Java?\n1. It defines a constant variable\n2. It prevents method overriding\n3. It prevents class inheritance\n4. All of the above",
            "Which Java loop is guaranteed to execute at least once?\n1. for loop\n2. while loop\n3. do-while loop\n4. foreach loop",
            "What is the parent class of all Java classes?\n1. Object\n2. BaseClass\n3. Root\n4. Core",
            "How do you correctly create a new object in Java?\n1. Object obj = Object();\n2. Object obj = new Object();\n3. Object obj = new();\n4. new Object obj;",
            "Which Java keyword is used to handle exceptions?\n1. throw\n2. try\n3. error\n4. exception",
            "Which Java collection allows key-value pairs?\n1. ArrayList\n2. HashMap\n3. HashSet\n4. LinkedList"
          ] 
        }
      };


    // List of objects definitions for this level
    this.objects = [
      { class: Background, data: image_data_background },
      { class: Player, data: sprite_data_ninja },
      { class: Npc, data: sprite_data_bird },
    ];
  }
}

export default GameLevelWater;
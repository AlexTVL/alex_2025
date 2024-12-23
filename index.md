---
layout: base
title: Student Home 
description: Home Page
image: /images/mario_animation.png
hide: true
---


<!-- Liquid:  statements -->

<!-- Include submenu from _includes to top of pages -->
{% include nav/home.html %}
<!--- Concatenation of site URL to frontmatter image  --->
{% assign sprite_file = site.baseurl | append: page.image %}
<!--- Has is a list variable containing mario metadata for sprite --->
{% assign hash = site.data.mario_metadata %}  
<!--- Size width/height of Sprit images --->
{% assign pixels = 256 %}

<!--- HTML for page contains <p> tag named "Mario" and class properties for a "sprite"  -->

<p id="mario" class="sprite"></p>
  
<!--- Embedded Cascading Style Sheet (CSS) rules, 
        define how HTML elements look 
--->
<style>

  /*CSS style rules for the id and class of the sprite...
  */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  /*background position of sprite element
  */
  #mario {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}}* -1px);
  }
</style>

<!--- Embedded executable code--->
<script>
  ////////// convert YML hash to javascript key:value objects /////////

  var mario_metadata = {}; //key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  //key
  var values = {} //values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  mario_metadata[key] = values; //key with values added

  {% endfor %}

  ////////// game object for player /////////

  class Mario {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario"); //HTML element of sprite
      this.pixels = {{pixels}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 100; //animation time interval
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }

    animate(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startWalking() {
      this.stopAnimate();
      this.animate(this.obj["Walk"], 3);
    }

    startRunning() {
      this.stopAnimate();
      this.animate(this.obj["Run1"], 6);
    }

    startPuffing() {
      this.stopAnimate();
      this.animate(this.obj["Puff"], 0);
    }

    startCheering() {
      this.stopAnimate();
      this.animate(this.obj["Cheer"], 0);
    }

    startFlipping() {
      this.stopAnimate();
      this.animate(this.obj["Flip"], 0);
    }

    startResting() {
      this.stopAnimate();
      this.animate(this.obj["Rest"], 0);
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  const mario = new Mario(mario_metadata);

  ////////// event control /////////

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed === 0) {
          mario.startWalking();
        } else if (mario.currentSpeed === 3) {
          mario.startRunning();
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        mario.startPuffing();
      }
    }
  });

  //touch events that enable animations
  window.addEventListener("touchstart", (event) => {
    event.preventDefault(); // prevent default browser action
    if (event.touches[0].clientX > window.innerWidth / 2) {
      // move right
      if (currentSpeed === 0) { // if at rest, go to walking
        mario.startWalking();
      } else if (currentSpeed === 3) { // if walking, go to running
        mario.startRunning();
      }
    } else {
      // move left
      mario.startPuffing();
    }
  });

  //stop animation on window blur
  window.addEventListener("blur", () => {
    mario.stopAnimate();
  });

  //start animation on window focus
  window.addEventListener("focus", () => {
     mario.startFlipping();
  });

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    sprite.style.transform = `scale(${0.2 * scale})`;
    mario.startResting();
  });

</script>


### Markdown samples [ [markdown cheatsheet] ](https://www.markdownguide.org/getting-started/)
Using Markdown form index.md. We are learning Markdown.

- This text below is something called Markdown. This is a heading, inside of code scaffolding

```markdown
## Investing in Your Technical Future XXXYYY
```
- This is emphasis

```markdown
> Explore the Computer Science Pathway at Del Norte High School and invest in your technical skills. All Del Norte CompSci classes are designed to provide a real-world development experience. Class time includes tech talks (lectures), peer collaboration, communication with teachers, critical thinking while coding, and creativity in projects. Grading is focused on time invested, participation with peers, and engagement in learning.
```
- Sample of bullets

```markdown
- Introduction to concepts and requirements by the teacher
- Project-based learning with teacher support, performing Agile/Scrum development
- Coding, frontend, backend, devops, version control and algorithmic thinking
- Creativity, research, design, data structures, and utilizing ChatGPT
- Performing team work, team communication and collaboration, peer reviews/grading
- Focus on tehnical communications through project presentations and student led teaching
- Grades are on projects, learnt concepts, and live reviews between student(s) and teacher
```

Frontend Development Hacks: Dead Cells Theme

<div style="border: 4px solid blue; padding: 20px;">
  <p style="border: 4px solid red; font-size: 1.5em; padding: 10px;">Rapier</p>
  <button style="border: 4px solid green; font-size: 1.5em; padding: 10px;">Pretty Good Weapon! But....</button>
</div>

<br>
<br>

<div style="border: 4px solid white; padding: 20px;">
  <a style="border: 4px solid blue; font-size: 1.5em; padding: 10px; display: block; width: 25%" href="https://deadcells.fandom.com/wiki/Vorpan">Pan</a>
  <a style="border: 4px solid blue; font-size: 1.5em; padding: 10px; display: block; width: 25%" href="https://deadcells.fandom.com/wiki/Panchaku">More Pan</a>
  <p style="border: 4px solid red; font-size: 1.5em; padding: 10px;">The real best weapons!</p>
</div>

# My Projects 

Here are some things that I am very proud about!

## Snake Game

Took a little bit of debugging, but getting the game to properly work was nothing short of satisfying.

![alt text](<Screenshot 2024-09-26 190841.png>)

## My Interests Page 

Probably the thing I am the most proud of with all the time I put into it, and it surely paid off

![alt text](<Screenshot 2024-09-26 191318.png>)

## My RPG (Outdated)

Have had some issues with the sprites, but was able to change the background, and the sprite at least faces the direction it is going!

![alt text](<Screenshot 2024-09-26 191507.png>)

<br>
<br>
<br>

# Coding Journey

<br>

## Resources
Here are the resources I use for coding

<br>

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="https://github.com/AlexTVL/alex_2025">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
    <a href="https://AlexTVL.github.io/alex_2025/">
        <img src="https://img.shields.io/badge/GitHub%20Pages-327FC7?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages">
    </a>
    <a href="https://vscode.dev/">
        <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VSCode">
    </a>
</div>

<br>

## My Games
Here are some of my games and the verisons related to them

<br> 

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/navigation/snake" style="text-decoration: none;">
        <div style="background-color: #42a1f5; color: black; padding: 15px 25px; border-radius: 8px; font-weight: bold;">
            Snake
        </div>
    </a>
    <a href="{{site.baseurl}}/navigation/rpgv0.3" style="text-decoration: none;">
        <div style="background-color: #42f593; color: black; padding: 15px 25px; border-radius: 8px; font-weight: bold;">
            RPG v0.3
        </div>
    </a>
    <a href="{{site.baseurl}}/navigation/rpgv0.2" style="text-decoration: none;">
        <div style="background-color: #44fcf0; color: black; padding: 15px 25px; border-radius: 8px; font-weight: bold;">
            RPG v0.2
        </div>
    </a>
    <a href="{{site.baseurl}}/navigation/rpgv0.1" style="text-decoration: none;">
        <div style="background-color: #eef573; color: black; padding: 15px 25px; border-radius: 8px; font-weight: bold;">
            RPG v0.1
        </div>
    </a>
    <a href="{{site.baseurl}}/navigation/rpgv0.0" style="text-decoration: none;">
        <div style="background-color: #ff3814; color: black; padding: 15px 25px; border-radius: 8px; font-weight: bold;">
            RPG v0.0
        </div>
    </a>
</div>

<br>

## My Notebooks
Here are my current Sprint2 Jupyter Notebooks that I have completed so far

<br>

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/csse/javascript/fundamentals/variables" style="text-decoration: none;">
        <div style="background-color: #3aeb34; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Variables I/O
        </div>
    </a>
    <a href="{{site.baseurl}}/csse/javascript/fundamentals/data-types/" style="text-decoration: none;">
        <div style="background-color: #34ebd9; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Data Types
        </div>
    </a>
    <a href="{{site.baseurl}}/game/intro/json" style="text-decoration: none;">
        <div style="background-color: #eb34dc; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            JSON Objects
        </div>
    </a>
    <a href="{{site.baseurl}}/csse/javascript/fundamentals/for-loops/" style="text-decoration: none;">
        <div style="background-color: #bc42f5; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            For-Loops
        </div>
    </a>
</div>

<br>

### Sprint 3 Notebooks: What I Have Completed So Far

<br>

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/csse/javascript/fundamentals/conditionals/hacks" style="text-decoration: none;">
        <div style="background-color: #b0261c; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Conditions
        </div>
    </a>
    <a href="{{site.baseurl}}/mathexpressions/" style="text-decoration: none;">
        <div style="background-color: #ba34cf; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Math Expressions
        </div>
    </a>
    <a href="{{site.baseurl}}/nestedconditionals/" style="text-decoration: none;">
        <div style="background-color: #8ecf34; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Nested Conditionals 
        </div>
    </a>
    <a href="{{site.baseurl}}/variableshw/" style="text-decoration: none;">
        <div style="background-color: #4b34cf; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Variables
        </div>
    </a>
    <a href="{{site.baseurl}}/csse/javascript/fundamentals/classes/intro/" style="text-decoration: none;">
        <div style="background-color: #7176d1; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Arrays
        </div>
    </a>
    <a href="{{site.baseurl}}/first/" style="text-decoration: none;">
        <div style="background-color: #2fbdd6; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Booleans
        </div>
    </a>
    <a href="{{site.baseurl}}/csse/javascript/fundamentals/data-abstraction-hacks" style="text-decoration: none;">
        <div style="background-color: #34eb96; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Data Abstractions 
        </div>
    </a>
    <a href="{{site.baseurl}}/csse/javascript/fundamentals/iteration/p1" style="text-decoration: none;">
        <div style="background-color: #b1eb34; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Iteration
        </div>
    </a>
    <a href="{{site.baseurl}}csse/lessons/strings/2024-10-30-strings-lesson-4-2.ipynb/" style="text-decoration: none;">
        <div style="background-color: #eb9834; color: black; padding: 15px 25px; border-radius: 10px; font-weight: bold;">
            Strings
        </div>
    </a>
</div>


<script src="https://utteranc.es/client.js"
        repo="AlexTVL/alex_2025"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
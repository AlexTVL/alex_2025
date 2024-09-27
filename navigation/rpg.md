---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    // Background data
    const image_src = "{{site.baseurl}}/images/rpg/anorLondo.jpg";
    const image_data = {
        pixels: {height: 580, width: 1038}
    };
    const image = {src: image_src, data: image_data};

    // Sprite data
    const sprite_src = "{{site.baseurl}}/images/rpg/link.png";
    const sprite_data = {
        SCALE_FACTOR: 10,
        STEP_FACTOR: 2000,
        ANIMATION_RATE: 50,
        pixels: {height: 347, width: 145},
        orientation: {rows: 0, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 0, start: 0, columns: 2 },
        right: {row: 0, start: 0, columns: 4 },
        up: {row: 0, start: 0, columns: 1 },
    };
    const sprite = {src: sprite_src, data: sprite_data};

    // Assets for game
    //const assets = {}
    //const assets = {image: image}
    //const assets = {sprite: sprite}
    const assets = {image: image, sprite: sprite}

    // Start game engine
    GameControl.start(assets);
</script>

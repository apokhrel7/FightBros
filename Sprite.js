/*
    * Course: SENG 513
    * Date: Oct 23, 2023
    * Assignment 2 - Part 2
    * Name: Anish Pokhrel
    * UCID: 30115576
*/

import { c } from "/index.js";


// ****** This file is responsible for creating the general sprites used in animation ********* 


// Help with animations are credited to https://chriscourses.com/

// Class 'Sprite' used to initialize sprite attributes (dimensions, scale, position)
// This class is used to draw sprites in the canvas, update each sprite, and create a smooth animation

class Sprite {
    constructor({position, image_src, scale = 1, framesMax = 1,  offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();  // creates HTML image inside JS
        this.image.src = image_src; 
        this.scale = scale;
        this.framesCurrent = 0;
        this.framesMax = framesMax;

        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
    }

    // draw frames onto canvas
    draw() {
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax), 
            0, 
            this.image.width/this.framesMax, 
            this.image.height, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width/this.framesMax) * this.scale, 
            this.image.height * this.scale
        ) 
    }

    // goes through all frames and creates smooth animation
    animateFrames() {
        this.framesElapsed += 1;

        if (this.framesElapsed % this.framesHold === 0) {
            // Go through all the frames 
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent += 1;   // go to next frame
            }
            // reset back to first frame once all frames are passed
            else {
                this.framesCurrent = 0;
            }
        }
    }


    // For every frame, update sprites
    update() {
        this.draw();   // call draw method again
        this.animateFrames();
    }
}

export default Sprite;
/*
    * Course: SENG 513
    * Date: Oct 23, 2023
    * Assignment 2
    * Name: Anish Pokhrel
    * UCID: 30115576
*/


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


// This file is responsible for creating the general sprites used in animation  


// Class 'Sprite' used to initialize sprite attributes (dimensions, scale, position)
// This class is used to draw sprites in the canvas and update each sprite

class Sprite {
    constructor(position) {
        this.position = position;
    }

    // Draw the sprites in the canvas (tag in html file).
    draw() {
        c.fillStyle = "green";  // sprite is green
        c.fillRect(this.position.x, this.position.y, 50, 150); 
    }


    // For every frame, update sprites
    update() {
        this.draw();   // call draw method again
    }
}



/******************************************************************************************** */

// Create instance of class Sprite for the background

// export const background = new Sprite({
// })


/******************************************************************************************** */


export default Sprite;
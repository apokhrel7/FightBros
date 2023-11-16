// /*
//     * Course: SENG 513
//     * Date: Oct 23, 2023
//     * Assignment 2
//     * Name: Anish Pokhrel
//     * UCID: 30115576
// */



// // This file is responsible for creating the general sprites used in animation  


// // Class 'Sprite' used to initialize sprite attributes (dimensions, scale, position)
// // This class is used to draw sprites in the canvas and update each sprite

class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKeyPressed;
    }

    // Draw the sprites in the canvas (tag in html file).
    draw() {
        c.fillStyle = 'green';  // sprite is green
        c.fillRect(this.position.x, this.position.y, 50, this.height); 
    }


    // For every frame, update sprites
    update() {
        this.draw();   // call draw method again

        // Determines how to move players
        this.position.x += this.velocity.x;   // move in x-direction
        this.position.y += this.velocity.y;   // move in y-direction

        // Prevents sprite from falling down canvas
        // If overall position of sprite is greater than or equal to canvas...
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }   

        // gravity is ONLY ADDED if sprites (players) haven't reached bottom of canvas
        else {
            this.velocity.y += gravity;
        }

    }
}

const player1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})


const player2 = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})



// /******************************************************************************************** */

// // Create instance of class Sprite for the background

// // export const background = new Sprite({
// // })


// /******************************************************************************************** */


// export default Sprite;
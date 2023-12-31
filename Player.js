/*
    * Course: SENG 513
    * Date: Oct 23, 2023
    * Assignment 2 - Part 2
    * Name: Anish Pokhrel
    * UCID: 30115576
*/



import Sprite from '/Sprite.js'
import { canvas } from '/index.js';


// ****** This file creates Players from the Sprite class in Sprite.js ********
// Help with animations are credited to https://chriscourses.com/

const damagePoint = 10;  // each time a player gets hit, their health decreases by 10%
const gravity = 0.8; // gravity for the players (required for when they jump and fall)

class Player extends Sprite {
    constructor({position, velocity, colour = "green", offset = { x: 0, y: 0 }, sprites, attackBox = { offset: {}, width: undefined, height: undefined }, image_src, hit_audio_src, scale = 1, framesMax = 1}) {
        super({
            position,
            image_src,
            scale,
            framesMax,
            offset
        })   // calls constructor of parent (class 'Sprite')
        
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKeyPressed;

        this.isOnTheGround = false;
        
        this.hit_audio = new Audio();
        this.hit_audio.src = hit_audio_src;
        this.attack_audio = new Audio("./assets/audio/sound-effects-library-knife-slash.mp3");
        
        // area that determines where players can attack
        this.attackBox = {
            position: {
                x: this.position.x, 
                y: this.position.y
            },
            offset: attackBox.offset,   // offset for attack box
            width: attackBox.width,
            height: attackBox.height 
        }
        this.colour = colour;
        this.isAttacking = false;
        this.health = 100;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

        this.sprites = sprites;
        this.dead = false;

        // loop through all the frames
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].image_src
        }

       
    }

    // For every frame, update sprites
    update() {
        this.draw();   // call draw method again

        // keep on animating frames if player is not dead
        if (!this.dead) {
            this.animateFrames();
        }


        // attack box positions
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // Determines how to move players
        this.position.x += this.velocity.x;   // move in x-direction
        this.position.y += this.velocity.y;   // move in y-direction

        // Prevents sprite from falling down canvas
        // If overall position of sprite is greater than or equal to canvas...
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.isOnTheGround = true;  // player is in the ground, they can jump again 
            this.velocity.y = 0;
            this.position.y = 330;
        }   
        // gravity is ONLY ADDED if sprites (players) haven't reached bottom of canvas
        else {
            this.isOnTheGround = false;           // player is in the air, they can't jump
            this.velocity.y += gravity;
        }
    }

    // funcitonality for when a player attacks
    attack() {
        this.attack_audio.play();   // play sword slash sound
        this.switchSprite("attack1");   // display 'attack' sprite (animation)
        this.isAttacking = true;        // update attack state to true
    }

    // functionality for when a player is hit
    takeHit() {
        this.health -= damagePoint;   // health is reduced
    
        // if health is 0, show death animation
        if (this.health <= 0) {
          this.switchSprite('death');
        } 

        // if player is getting hit, but still alive show player 'taking hit' animation
        else {
            this.hit_audio.play();
            this.switchSprite('takeHit');
        }
    }


    switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
        if (this.framesCurrent === this.sprites.death.framesMax - 1) {
            this.dead = true
        }
        return;
    }

    // overriding all other animations with the attack animation
    if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) {
        return;
    }

    // override when fighter gets hit
    if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) {
        return;
    }


    // Decides which frames to choose when player is in the following states: 'idle', 'run', 'jump', 'fall', 'attack',
    // 'takeHit', 'death'
    switch (sprite) {
        case 'idle':
            if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image;
                this.framesMax = this.sprites.idle.framesMax;
                this.framesCurrent = 0;
            }
            break;
        case 'run':
            if (this.image !== this.sprites.run.image) {
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
                this.framesCurrent = 0;
            }
            break;
        case 'jump':
            if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax;
                this.framesCurrent = 0;
            }
            break;

        case 'fall':
            if (this.image !== this.sprites.fall.image) {
                this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax;
                this.framesCurrent = 0;
            }
            break;

        case 'attack1':
            if (this.image !== this.sprites.attack1.image) {
                this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax;
                this.framesCurrent = 0;
            }
            break;

        case 'takeHit':
            if (this.image !== this.sprites.takeHit.image) {
                this.image = this.sprites.takeHit.image;
                this.framesMax = this.sprites.takeHit.framesMax;
                this.framesCurrent = 0;
            }
            break;

        case 'death':
            if (this.image !== this.sprites.death.image) {
                this.image = this.sprites.death.image;
                this.framesMax = this.sprites.death.framesMax;
                this.framesCurrent = 0;
            }
            break;
    }
  }
}

export default Player;

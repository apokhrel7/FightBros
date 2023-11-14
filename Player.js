/*
    * Course: SENG 513
    * Date: Oct 23, 2023
    * Assignment 2
    * Name: Anish Pokhrel
    * UCID: 30115576
*/

// This file creates the functionality for the two players

import Sprite from '/Sprite.js';


// Set dimensions of canvas (where the game will be) 
canvas.width = 1024;
canvas.height = 576;


// initialize gravity for the players (required for when they jump and fall)
gravity = 0.9;

// Create class Player that implements class 'Sprite' from the Sprite.js file.
// This class will store all attributes of the Player, such as health, velocity, their attack state (attacking or not), etc.
// class Fighter extends Sprite {
   
    // Function 'attack()' to handle what happens when a player attacks
    // Input: opposing player
    // attack(opposingPlayer) {}


    // Function 'isFighting' hanldles logic to check if a player is fighting their opposition.
    // Input: opposing player
    // Return: Boolean

    // isFighting(enemyFighter) {}



    // Function 'movement()' finds if a player is moving to the left, right, or up (jumping).
    // Input: none
    // Return: boolean

    // movement() {
           // if user is pressing right key, go right
           // if user is pressing left key, go left
           // if user is pressing space bar, jump up 
    // }

//}

/******************************************************************************************** */

// Creating player1
const player1 = new Player({
    x: 0,
    y: 0
})

player1.draw();


const player2 = new Player({
    x: 0,
    y: 0
})

player2.draw();

export default Player;
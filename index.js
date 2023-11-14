/*
    * Course: SENG 513
    * Date: Oct 23, 2023
    * Assignment 2
    * Name: Anish Pokhrel
    * UCID: 30115576
*/

// This the JavaScript "driver" function that runs the game  

const canvas = document.querySelector("canvas");    //get the canvas from html
const c = canvas.getContext("2d");                  // make a 2d canvas

// Set dimensions of canvas (where the game will be) 
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);      // This is to differentiate where the game is 
                                                    // and what the background is



/*  Track the following attributes:
        * Game time
        * Flag to check if game has ended
        * Player 1 and Player 2 event listeners to check their states
 */



/******************************************************************************************** */

// Function to start the game 
function beginGame () {
    //activate animations
    // update player states
}


// Now invoke the method
// beginGame();



/******************************************************************************************** */

// Function to decrease the timer. If timer reaches 0 announce the winner based on remaining health. If both players have same health, declare it a draw.
// function decrementTimer() {
// }


/******************************************************************************************** */

// Function to add animations for players, frame by frame 
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "yellow";      // sets background as yellow
    c.fillRect(0, 0, canvas.width, canvas.height);   // make sure we are clearing canvas for each frame we loop 

    player1.update();
    player2.update();

}

animate();


// decides what happens when a key is pressed
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            player.velocity.x = 1    // move player 1 pixel right when key d is pressed
            break;
        case 'a':
            player.velocity.x = -1  // move player 1 pixel left when key 'a' is pressed
            break;
    }
})

// decides what happens when key is lifted (not pressed anymore)
window.addEventListener('keyup', (event) => {

    // decide what happens when a key is pressed
    switch (event.key) {
        case 'd':
            player.velocity.x = 0    // stop player from moving when key 'd' (right) is not pressed
            break;
        case 'a':
            player.velocity.x = 0  // stop player from moving when key 'a' (left) is not pressed
            break;
    }
})


//     Check if either player is attacking the other:
//                  player1.attack(player2)
//                  player2.attack(player1)

//     if game has not ended, but one or both of the players have died then find the winner


/******************************************************************************************** */


// Function to find the winner when game has ended or a player has been defeated
// Inputs: player1, player2, timer

// function findWinnder({ player1, player2, timer }) {
//     Stop the timer as game ended.
//     Set gameEnded flag to true.
//     Display the result (whether player1 or player 2 won, or if it was a draw)
// }
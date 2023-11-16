/*
    * Course: SENG 513
    * Date: Oct 23, 2023
    * Assignment 2
    * Name: Anish Pokhrel
    * UCID: 30115576
*/

// This the JavaScript "driver" function that runs the game  

const canvas = document.querySelector('canvas');    //get the canvas from html
const c = canvas.getContext('2d');                  // make a 2d canvas

// Set dimensions of canvas (where the game will be) 
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5; // gravity for the players (required for when they jump and fall)
const jumpForce = 22;  // force of each jump (how high players can jump)
const movementRate = 6; //each player moves 6 pixels per frame
const damagePoint = 20;  // each time a player gets hit, their health decreases by 20%
let timer = 30;       // the game length is 30 seconds


c.fillRect(0, 0, canvas.width, canvas.height);      // This is to differentiate where the game is 
                                                    // and what the background is

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image_src: "./assets/img/background.png"
})



const player1 = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})


const player2 = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    colour: 'blue',
    offset: {
        x: -50,
        y: 0
    }
})


const keyboardKeys = {
    a: {
        isPressed: false
    },
    d: {
        isPressed: false
    },
    ArrowLeft: {
        isPressed: false
    },
    ArrowRight: {
        isPressed: false
    }
}

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.width + rectangle1.attackBox.position.x >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player1, player2, trackTimer}) {
    clearTimeout(trackTimer);  // once winner is determined, timer is stopped

    // if player1-health is same as player2-health, then it's a tie
    if (player1.health === player2.health) {
        document.querySelector("#result-message").innerHTML = "TIE";
        document.querySelector("#result-message").style.display = "flex";
    }
    // if player1 health is more than player2
    else if (player1.health > player2.health) {
        document.querySelector("#result-message").innerHTML = "Player 1 Victory!";
        document.querySelector("#result-message").style.display = "flex";
    }
    // if player2 health is more than player1
    else if (player1.health < player2.health) {
        document.querySelector("#result-message").innerHTML = "Player 2 Victory!";
        document.querySelector("#result-message").style.display = "flex";
    }
}

let trackTimer;  // allows to cancel timer once winner is found
function decrementTimer () {
    if (timer > 0) {
        trackTimer = setTimeout(decrementTimer, 1000);
        timer-=1;   // decrease timer by 1 second
        document.querySelector("#timer").innerHTML = timer;  // update timer in html as it decreases
    }

    // if the timer is 0 (game has ended)
    else {
        determineWinner({player1, player2, trackTimer});
    }
    
}
decrementTimer();  // call function that activates timer

// Function to add animations for players, frame by frame 
function displayAnimation() {
    window.requestAnimationFrame(displayAnimation);  // inifinetly loop animate function
    c.fillStyle = "yellow";      // sets background as yellow
    c.fillRect(0, 0, canvas.width, canvas.height);   // make sure we are clearing canvas for each frame we loop 

    background.update();        // puts background image onto canvas

    player1.update();
    player2.update();

    player1.velocity.x = 0;  // stops player1 movement when keys are lifted up
    player2.velocity.x = 0;  // stops movement when keys are lifted up


    // movement for player1
    if (keyboardKeys.d.isPressed && player1.lastKeyPressed === 'd') {
        player1.velocity.x = movementRate;  
    } 
    else if (keyboardKeys.a.isPressed && player1.lastKeyPressed === 'a') {
        player1.velocity.x = -movementRate;
    }

    // movement for player2
    if (keyboardKeys.ArrowRight.isPressed && player2.lastKeyPressed === 'ArrowRight') {
        player2.velocity.x = movementRate;
    } 
    else if (keyboardKeys.ArrowLeft.isPressed && player2.lastKeyPressed === 'ArrowLeft') {
        player2.velocity.x = -movementRate;
    }


    // ****** Logic for detection collision ********

    // player 1 collision detection
    if (rectangularCollision({rectangle1: player1, rectangle2: player2}) && player1.isAttacking) {
        player1.isAttacking = false;
        player2.health -= damagePoint;   // decrease player1 health
        document.querySelector("#player2-healthbar").style.width = player2.health + "%";  // update visual healthbar by decreasing it
    }

    // player 2 collision detection
    if (rectangularCollision({rectangle1: player2, rectangle2: player1}) && player2.isAttacking) {
        player2.isAttacking = false;
        player1.health -= damagePoint;   // decrease player2 health 
        document.querySelector("#player1-healthbar").style.width = player1.health + "%"; // update visual healthbar by decreasing it
    }


    // terminate the game if player1 or player2 health is finished
    if (player1.health <= 0 || player2.health <= 0) {
        determineWinner({player1, player2, trackTimer});
    }

}

displayAnimation();   // call animate function to display canvas


// decides what happens when a key is pressed
window.addEventListener('keydown', (event) => {
    switch (event.key) {

        // cases for when keys 'd', 'a', 'w' is pressed
        case 'd':
            keyboardKeys.d.isPressed = true;    // move player 1 pixel right when key d is pressed
            player1.lastKeyPressed = 'd';
            break;
        case 'a':
            keyboardKeys.a.isPressed = true;  // move player 1 pixel left when key 'a' is pressed
            player1.lastKeyPressed = 'a';
            break;
        // when keybaord 'w' is pressed, jump up
        case 'w':
            player1.velocity.y = -jumpForce;
            break;
        // when player1 spaces 'spacebar', attack 
        case ' ':
            player1.attack();
            break;

        // ################################################## //
        // cases for when arrow keys 'right', 'left', 'up' are pressed
        case 'ArrowRight':
            keyboardKeys.ArrowRight.isPressed = true;    // move player 1 pixel right when key d is pressed
            player2.lastKeyPressed = "ArrowRight";
            break;
        case 'ArrowLeft':
            keyboardKeys.ArrowLeft.isPressed = true;  // move player 1 pixel left when key 'a' is pressed
            player2.lastKeyPressed = "ArrowLeft";
            break;
        // when keybaord 'w' is pressed, jump up
        case 'ArrowUp':
            player2.velocity.y = -jumpForce;
            break;
        case 'ArrowDown':
            player2.attack();
            break;
    }
})

// decides what happens when key is lifted (not pressed anymore)
window.addEventListener('keyup', (event) => {

    // for player1
    switch (event.key) {
        case 'd':
            keyboardKeys.d.isPressed = false;   // stop player from moving when key 'd' (right) is not pressed
            break;
        case 'a':
            keyboardKeys.a.isPressed = false;  // stop player from moving when key 'a' (left) is not pressed
            break;
        case 'w':
            keyboardKeys.w.isPressed = false;  // stop player from moving when key 'a' (left) is not pressed
            break;
    }

    // for player2
    switch (event.key) {
        case 'ArrowRight':
            keyboardKeys.ArrowRight.isPressed = false;   // stop player from moving when key 'd' (right) is not pressed
            break;
        case 'ArrowLeft':
            keyboardKeys.ArrowLeft.isPressed = false;  // stop player from moving when key 'a' (left) is not pressed
            break;
        case 'ArrowUp':
            keyboardKeys.ArrowUp.isPressed = false;  // stop player from moving when key 'a' (left) is not pressed
            break;
    }
})


//     Check if either player is attacking the other:
//                  player1.attack(player2)
//                  player2.attack(player1)

//     if game has not ended, but one or both of the players have died then find the winner


/******************************************************************************************** */

/*  Track the following attributes:
        * Game time
        * Flag to check if game has ended
        * Player 1 and Player 2 event listeners to check their states
 */



/******************************************************************************************** */

// Function to start the game 
// function beginGame () {
//     //activate animations
//     // update player states
// }


// Now invoke the method
// beginGame();



/******************************************************************************************** */

// Function to decrease the timer. If timer reaches 0 announce the winner based on remaining health. If both players have same health, declare it a draw.
// function decrementTimer() {
// }


/******************************************************************************************** */

// Function to control all keys in the game




// Function to find the winner when game has ended or a player has been defeated
// Inputs: player1, player2, timer

// function findWinnder({ player1, player2, timer }) {
//     Stop the timer as game ended.
//     Set gameEnded flag to true.
//     Display the result (whether player1 or player 2 won, or if it was a draw)
// }
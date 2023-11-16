/*
    * Course: SENG 513
    * Date: Oct 23, 2023
    * Assignment 2
    * Name: Anish Pokhrel
    * UCID: 30115576
*/

// This the JavaScript "driver" function that runs the game

import Player from '/Player.js'
import Sprite from '/Sprite.js'

export const canvas = document.querySelector("canvas");    //get the canvas from html
export const c = canvas.getContext('2d');                  // make a 2d canvas

// Set dimensions of canvas (where the game will be) 
canvas.width = 1024;
canvas.height = 576;

const jumpForce = 22;  // force of each jump (how high players can jump)
const movementRate = 6; //each player moves 6 pixels per frame
let timer = 30;       // the game length is 30 seconds


let isGameFinished = false;  // determines if game is finished


c.fillRect(0, 0, canvas.width, canvas.height);      // This is to differentiate where the game is 
                                                    // and what the background is

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image_src: "./assets/img/background.png"
})

const player1 = new Player({
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
    },
    image_src: "./assets/img/Martial Hero 3/Sprite/Idle.png",
    hit_audio_src: "./assets/audio/486943__matrixxx__human-aah.wav",    

    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 50,
        y: 56
    },

    sprites: {
        idle: {
            image_src: './assets/img/Martial Hero 3/Sprite/Idle.png',
            framesMax: 10
        },
        run: {
            image_src: './assets/img/Martial Hero 3/Sprite/Run.png',
            framesMax: 8
        },
        jump: {
            image_src: './assets/img/Martial Hero 3/Sprite/Going Up.png',
            framesMax: 3
        },
        fall: {
            image_src: './assets/img/Martial Hero 3/Sprite/Going Down.png',
            framesMax: 3
        },
        attack1: {
            image_src: './assets/img/Martial Hero 3/Sprite/Attack2.png',
            framesMax: 6
        },
        takeHit: {
            image_src: './assets/img/Martial Hero 3/Sprite/Take Hit.png',
            framesMax: 3
        },
        death: {
            image_src: './assets/img/Martial Hero 3/Sprite/Death.png',
            framesMax: 11
        }
    },

    attackBox: {
        offset: {
            x: 85,
            y: 50
        },
    width: 170,
    height: 50
    }
})


const player2 = new Player({
    position: {
        x: 900,
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
    },

    image_src: './assets/img/kenji/Idle.png',
    hit_audio_src: "./assets/audio/553285__deleted_user_12367688__hurt4.ogg",
    framesMax: 4,
    scale: 2.5,
    offset: {
    x: 215,
    y: 167
    },
    sprites: {
        idle: {
            image_src: './assets/img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            image_src: './assets/img/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            image_src: './assets/img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            image_src: './assets/img/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            image_src: './assets/img/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            image_src: './assets/img/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            image_src: './assets/img/kenji/Death.png',
            framesMax: 7
        }
  },
  attackBox: {
    offset: {
        x: -220,
        y: 50
    },
    width: 170,
    height: 50
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
    document.getElementById("game-over-container").style.display = "flex";


    // if player1-health is same as player2-health, then it's a tie
    if (player1.health === player2.health) {
        document.getElementById("result-message").innerHTML = "GAME OVER: TIE";
    }
    // if player1 health is more than player2
    else if (player1.health > player2.health) {
        document.getElementById("result-message").innerHTML = "Player 1 Victory!";
    }
    // if player2 health is more than player1
    else if (player1.health < player2.health) {
        document.getElementById("result-message").innerHTML = "Player 2 Victory!";
    }

    document.getElementById("replay-button").addEventListener("click", () => {
        document.getElementById("game-over-container").style.display = "none";
        location.reload();


    });

    isGameFinished = true;
}


let trackTimer;  // allows to cancel timer once winner is found
function decrementTimer () {
    if (timer > 0) {
        trackTimer = setTimeout(decrementTimer, 1000);
        timer-=1;   // decrease timer by 1 second
        document.getElementById("timer").innerHTML = timer;  // update timer in html as it decreases
    }

    // if the timer is 0 (game has ended)
    else {
        determineWinner({player1, player2, trackTimer});
    }
    
}


// Function to add animations for players, frame by frame
function displayAnimation() {

    if (isGameFinished) return;
    
    requestAnimationFrame(displayAnimation);  // inifinetly loop animate function

    document.querySelector(".healthbar-container").style.display = "flex";  // display player healthbar

    c.fillStyle = "black";      // sets background as yellow
    c.fillRect(0, 0, canvas.width, canvas.height);   // make sure we are clearing canvas for each frame we loop 

    background.update();        // puts background image onto canvas

    c.fillStyle = 'rgba(255, 255, 255, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    player1.update();
    player2.update();

    player1.velocity.x = 0;  // stops player1 movement when keys are lifted up
    player2.velocity.x = 0;  // stops movement when keys are lifted up


    // movement for player1, also makes sure player1 doesn't go off the screen
    if (keyboardKeys.d.isPressed && player1.lastKeyPressed === 'd' && player1.position.x <= (canvas.width - player1.width - player1.attackBox.offset.x)) {
        player1.velocity.x = movementRate;  
        player1.switchSprite('run');
    } 
    else if (keyboardKeys.a.isPressed && player1.lastKeyPressed === 'a' && player1.position.x >= 0-player1.offset.x) {
        player1.velocity.x = -movementRate;
        player1.switchSprite('run');
    }
    else {
        player1.switchSprite("idle");
    }

    // movement for player2,  also makes sure player2 doesn't go off the screen
    if (keyboardKeys.ArrowRight.isPressed && player2.lastKeyPressed === 'ArrowRight' && player2.position.x <= (canvas.width - player2.width)) {
        player2.velocity.x = movementRate;
        player2.switchSprite('run');

    } 
    else if (keyboardKeys.ArrowLeft.isPressed && player2.lastKeyPressed === 'ArrowLeft' && player2.position.x >= 0) {
        player2.velocity.x = -movementRate;
        player2.switchSprite('run');
    }
    else {
        player2.switchSprite("idle");
    }



    // player1 jumping movement
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump');
    } 
    else if (player1.velocity.y > 0) {
        player1.switchSprite('fall');
    }

    // player2 jumping movement
    if (player2.velocity.y < 0) {
        player2.switchSprite('jump');
    } 
    else if (player2.velocity.y > 0) {
        player2.switchSprite('fall');
    }



    // ****** Logic for detection collision ********

    // player 1 collision detection
    if (rectangularCollision({rectangle1: player1, rectangle2: player2}) && player1.isAttacking && player1.framesCurrent === 4) {
        player2.takeHit();
        player1.isAttacking = false;
    
        document.getElementById("player2-healthbar").style.width = player2.health + "%";  // update visual healthbar by decreasing it
    }

    // if player misses
    if (player1.isAttacking && player1.framesCurrent === 4) {
        player1.isAttacking = false;
    }

    // player 2 collision detection
    if (rectangularCollision({rectangle1: player2, rectangle2: player1}) && player2.isAttacking && player2.framesCurrent === 2) {
        player1.takeHit();
        player2.isAttacking = false;

        document.getElementById("player1-healthbar").style.width = player1.health + "%"; // update visual healthbar by decreasing it
        // gsap.to('#player1-healthbar', {
        //     width: player1.health + '%'
        // });
    
    }

     // if player misses
    if (player2.isAttacking && player2.framesCurrent === 2) {
        player2.isAttacking = false;
    }

    // terminate the game if player1 or player2 health is finished
    if (player1.health <= 0 || player2.health <= 0) {
        determineWinner({player1, player2, trackTimer});
    }

}


let isEnterKeyPressed = false;

// Function to handle key and click events
function handleInteraction() {
    // Check if interaction has already occurred
    if (!isEnterKeyPressed) {
        // Update the interaction status
        isEnterKeyPressed = true;

        document.getElementById("starting-screen").style.display = "none";
        startGame();
    }
}

document.addEventListener("click", function () {
    // Handle the interaction
    handleInteraction();
});

// Attach event listeners to the document for key press and click events
document.addEventListener("keydown", function (event) {
    // Check if the pressed key is the "Enter" key (key code 13)
    if (event.key === "Enter") {
        // Handle the interaction
        handleInteraction();
    }
});


// function that starts the game
function startGame() {
    decrementTimer();  // call function that activates timer
    displayAnimation();  // call animate function to display canvas
}

// decides what happens when a key is pressed
window.addEventListener('keydown', (event) => {
    
    // player1 can only move if they are not dead
    if (!player1.dead) {

        // cases for when keys 'd', 'a', 'w' is pressed
        switch (event.key) {
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
                if (player1.isOnTheGround) player1.velocity.y = -jumpForce;  // player can jump only if they are in the ground
                break;
            // when player1 spaces 'spacebar', attack 
            case 'v':
                player1.attack();
                break;
        }
    }

    // player1 can only move if they are not dead
    if (!player2.dead) {

        // cases for when arrow keys 'right', 'left', 'up' are pressed
        switch(event.key) {
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
                if (player2.isOnTheGround) player2.velocity.y = -jumpForce;  // player can jump only if they are in the ground
                break;
            case 'p':
                player2.attack();
                break;

        }
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
        // case 'w':
        //     keyboardKeys.w.isPressed = false;  // stop player from moving when key 'a' (left) is not pressed
        //     break;
    }

    // for player2
    switch (event.key) {
        case 'ArrowRight':
            keyboardKeys.ArrowRight.isPressed = false;   // stop player from moving when key 'd' (right) is not pressed
            break;
        case 'ArrowLeft':
            keyboardKeys.ArrowLeft.isPressed = false;  // stop player from moving when key 'a' (left) is not pressed
            break;
        // case 'ArrowUp':
        //     keyboardKeys.ArrowUp.isPressed = false;  // stop player from moving when key 'a' (left) is not pressed
        //     break;
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
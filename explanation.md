# Explanation of Three Complex Parts of the Game

## 1. Collision Detection
Here is a code snippet of the collision detection algorithm I implemented in 'index.js':
```javascript
// ****** Logic for detection collision ********

// player 1 collision detection
if (spriteCollision({rectangle1: player1, rectangle2: player2}) && player1.
    isAttacking && player1.framesCurrent === 4) {
        player2.takeHit();
        player1.isAttacking = false;

        document.getElementById("player2-healthbar").style.width = player2.health + "%";  // update visual healthbar by decreasing it
}

// if player1 misses
if (player1.isAttacking && player1.framesCurrent === 4) {
    player1.isAttacking = false;
}

// player 2 collision detection
if (spriteCollision({rectangle1: player2, rectangle2: player1}) && player2.
    isAttacking && player2.framesCurrent === 2) {
        player1.takeHit();
        player2.isAttacking = false;

        document.getElementById("player1-healthbar").style.width = player1.health + "%"; // update visual healthbar by decreasing it
}

    // if player2 misses
if (player2.isAttacking && player2.framesCurrent === 2) {
    player2.isAttacking = false;
}

// terminate the game if player1 or player2 health is 0 (either or both died)
if (player1.health <= 0 || player2.health <= 0) {
    determineWinner({player1, player2, trackTimer});
}


// Helper function for collision detection
// Two objects (sprites/rectangles) collide if they overlap each other 
function spriteCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.width + rectangle1.attackBox.position.x >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

```

The first thing I did was implement the 'spriteCollision()' function. I started out with drawing basic moving rectangles on the screen and seeing if I could make detect them colliding. To do this, I had to keep track of their current position as they were moving across the screen. Then, I also had to take into account their width and height. After I implemented that, I created an area called 'attackBox', which is to detect a collision for when a player attacks. Once a player attacks, their sword will take up more width and height than their own dimensions. If another player is within that area, they should be hit. 

After I successfully implemented basic sprite collision detection, I had to take into account the player's health, their current animation frame (if player gets hit, their animation should change), and their attack state. This is what I did in the sections that are commented as "// player 1 collision detection", "// player 2 collision detection", etc.


## 2. Animation
The following code is from 'Sprite.js' that animates all frames
```javascript
// goes through all frames and creates smooth animation
    animateFrames() {
        this.framesElapsed += 1;

        // If a single frame has been fully passed (onto next frame)
        if (this.framesElapsed % this.framesHold === 0) {
            // Go through all the frames and check if last frame is reached
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent += 1;   // go to next frame
            }
            // reset back to first frame once all frames are passed
            else {
                this.framesCurrent = 0;
            }
        }
    }
```
Since the assets that I have used contain a number of frames, the task was to go through those frames one by one. Once the last frame is reached, I had to reset back to the initial frame to create an 'illusion' that an image was moving or animating. First, I had to find out when each frame has been passed. This can be done by seeing if the frames that have been elapsed (framesElapsed) is divisible by the full frames (framesHold). In essence, I'm checking a single frame has been passed through and not just a part of it has been passed. This must be done so the animation looks smooth transitoning to all the other frames.

If the last frame has been reached, we must go back to the initial frame ('loop' back to it). This was done in the last 'else-statement'.


## 3. Gravity 
The following code is from 'Player.js' implenting gravity on the players
```javascript

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
```

In the first if statement, it is preventing the sprite (player) from falling down canvas by detecting where the canvas is and adding some padding to make the player perfectly land on the ground (hence the -96). I also had to make sure to add gravity only when the player has jumped up (otherwise the players would fall down the screen).
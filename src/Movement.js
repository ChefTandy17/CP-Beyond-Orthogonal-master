class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init(){
        this.PLAYER_VELOCITY = 350; //all caps is not necessary, but since its a constant, we should capitalize it
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png',{
            frameWidth: 48
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)
        
        
        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2)


        //console.log('now in movement scene 👍')
        this.player.body.setCollideWorldBounds(true)        //the sprite doesn't go off the screen
        this.player.body.setSize(32, 32).setOffset(8,16)

        //NOTE: FINISH WALKING ANIMATIONS BEFORE TURNING IT IN
        this.anims.create({
            key:'idle-down',
            frameRate: 0, //idle down have no animation. just one frame just for this
            repeat: -1, //repeat forever by using -1
            frames: this.anims.generateFrameNumbers('character', {  //animation woah (its just idle)
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key:'walk-down',
            frameRate: 5,
            repeat: -1, //repeat forever by using -1
            frames: this.anims.generateFrameNumbers('character', {  //animation woah (its just idle)
                start: 0,
                end: 2
            })
        })


        //redoing it testing
        this.anims.create({
            key:'idle-up',
            frameRate: 5, //idle down have no animation. just one frame just for this
            repeat: -1, //repeat forever by using -1
            frames: this.anims.generateFrameNumbers('character', {  //animation woah (its just idle)
                start: 10,
                end: 10
            })
        })
/* commented out to find error
        this.anims.create({
            key:'walk-down', 
            frameRate: 5,      //frame rate 
            repeat: -1,         //repeat forever by using -1
            frames: this.anims.generateFrameNumbers
            ('character', {  //animation woah (its just idle)
                start: 0,       //look at spritesheet
                end: 2
            })
        })
*/
        this.anims.create({
            key:'walk-up', 
            frameRate: 5,      //frame rate 
            repeat: -1,         //repeat forever by using -1
            frames: this.anims.generateFrameNumbers('character', {  //animation woah (its just idle)
                start: 9,       //frame 9-10-11
                end: 11
            })
        })

        this.anims.create({
            key:'walk-left', 
            frameRate: 5,      //frame rate 
            repeat: -1,         //repeat forever by using -1
            frames: this.anims.generateFrameNumbers
            ('character', {  //animation woah (its just idle)
                start: 3,       //look at spritesheet
                end: 5
            })
        })

        this.anims.create({
            key:'walk-right', 
            frameRate: 5,      //frame rate 
            repeat: -1,         //repeat forever by using -1
            frames: this.anims.generateFrameNumbers
            ('character', {  //animation woah (its just idle)
                start: 6,       //look at spritesheet
                end: 8
            })
        })

        cursors = this.input.keyboard.createCursorKeys()    //an object that stores in cursors for the four arrow keys
    
    }

    update() {
        //this.player.play('walk-down', true)    //for testing

        let playerVector = new Phaser.Math.Vector2(0, 0) //creating a new vector with x and y coordinates from Phaser 
        let playerDirection = 'down'

        //if player holds left, the x,y coord is -1,0
        if (cursors.left.isDown) {
            playerVector.x -= 1
            playerDirection = 'left'
        }
        //if player holds right, the x,y coord is 1,0
        else if (cursors.right.isDown) {
            playerVector.x += 1
            playerDirection = 'right'
        }

        //if player holds up, the x,y coord is 0,-1
        if (cursors.up.isDown) {
            playerVector.y -= 1
            playerDirection = 'up'
        }
        //if player holds down, the x,y coord is 0,1
        else if (cursors.down.isDown) {
            playerVector.y += 1
            playerDirection = 'down'
        }

        //the key to make it work. Normalize the vector  
        playerVector.normalize();


        
        /*
        //make it move at the sae velocity in all directions
        //Nathan says theres a better way to do this 
        this.player.x += playerVector.x * this.PLAYER_VELOCITY
        this.player.y += playerVector.y * this.PLAYER_VELOCITY
        */
    /*
        //left/right
        if(cursors.left.isDown) {
            this.player.x -= this.PLAYER_VELOCITY //subtracting x corrdinates to move the sprite left
        }
        else if(cursors.right.isDown){
            this.player.x += this.PLAYER_VELOCITY //adding x corrdinates to move the sprite right
        }

        //up/down
        if(cursors.up.isDown) {
            this.player.y -= this.PLAYER_VELOCITY //subtracting x corrdinates to move the sprite up
        }
        else if(cursors.down.isDown){
            this.player.y += this.PLAYER_VELOCITY //adding y corrdinates to move the sprite down
        }
    */
        this.player.setVelocity(this.PLAYER_VELOCITY * 
        playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
        
        let playerMovement 
        playerVector.length() ? playerMovement = 'walk' : 
        playerMovement = 'idle'     //if the character length is not zero, walk. or player movement is idle

       // playerMovement = 'idle'
        
       this.player.play(playerMovement + '-' + playerDirection, true)
    }

}
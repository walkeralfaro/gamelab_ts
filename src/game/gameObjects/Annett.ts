import { InputState } from "../../input/InputManager"

export class Annett extends Phaser.Physics.Arcade.Sprite {

    private sfx: {
        jump: Phaser.Sound.BaseSound,
        walk: Phaser.Sound.BaseSound
    }
    private coyoteTime = 90 // ms
    private coyoteTimer = 0
    private walkTimer = 0

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'annett')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)

        this.body?.setSize(24, 42)
        this.body?.setOffset(24, 22)

        this.initAnimations()

        this.sfx = {
            jump: scene.sound.add('jumpSound'),
            walk: scene.sound.add('walkSound')
        }
    }

    initAnimations() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('annett', { start: 0, end: 3 }),
            frameRate: 5
        })

        this.anims.create({
            key: 'jump',
            frames: [{ key: 'annett', frame: 10 }],
            frameRate: 1
        })

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('annett', { start: 4, end: 7 }),
            frameRate: 8
        })

        this.anims.create({
            key: 'fall',
            frames: [{ key: 'annett', frame: 11 }],
            frameRate: 1
        })
    }

    // 👇 Solo se encarga de movimiento
    moveLeft() {
        this.setVelocityX(-200)
        this.setFlipX(true)
        this.body?.setOffset(16, 22)
    }

    moveRight() {
        this.setVelocityX(200)
        this.setFlipX(false)
        this.body?.setOffset(24, 22)
        this.playWalkSound()
    }

    stopMove() {
        this.setVelocityX(0)
    }

    jump() {
        if (this.coyoteTimer > 0) {
            this.setVelocityY(-320)
            this.sfx.jump.play()
            this.coyoteTimer = 0 // evita doble salto con el mismo coyote
        }
    }

    handleInput(input: InputState) {
        if (input.left) this.moveLeft()
        else if (input.right) this.moveRight()
        else this.stopMove()

        if (input.jump) this.jump()
    }

    updateAnimationState() {
        const isOnGround = this.body!.blocked.down
        const isFalling = this.body!.velocity.y > 0 && !isOnGround
        const isJumping = this.body!.velocity.y < 0 && !isOnGround
        const isMoving = this.body!.velocity.x !== 0

        switch (true) {
            case isFalling:
                this.anims.play('fall', true)
                break

            case isJumping:
                this.anims.play('jump', true)
                break

            case isOnGround && isMoving:
                this.anims.play('walk', true)
                break

            case isOnGround:
                this.anims.play('idle', true)
                break
        }
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        if (this.body?.blocked.down) {
            this.coyoteTimer = this.coyoteTime // resetea coyote cuando está en el suelo
        } else {
            this.coyoteTimer -= delta // va bajando con el tiempo
        }
    }

    private playWalkSound() {
        const now = this.scene.time.now

        if (
            this.body?.blocked.down &&       // Solo cuando toca el suelo
            now - this.walkTimer > 550 &&    // Delay entre pasos
            this.body.velocity.x !== 0       // Solo si está moviéndose
        ) {
            this.sfx.walk.play()
            this.walkTimer = now
        }
    }

}

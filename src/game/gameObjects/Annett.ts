export class Annett extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'annett')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)

        this.body?.setSize(24, 42)
        this.body?.setOffset(24, 22)

        this.initAnimations()
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
    }

    stopMove() {
        this.setVelocityX(0)
    }

    jump() {
        if (this.body?.blocked.down) {
            this.setVelocityY(-320)
        }
    }

    // 👇 Solo animaciones ahora:
    playIdle() {
        this.anims.play('idle', true)
    }

    playWalk() {
        this.anims.play('walk', true)
    }

    playJump() {
        this.anims.play('jump', true)
    }

    playFall() {
        this.anims.play('fall', true)
    }

}

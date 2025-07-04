import { Physics, Scene } from 'phaser'
import { Annett } from '../gameObjects/Annett'

export class Game extends Scene {
    platforms!: Physics.Arcade.StaticGroup
    annett!: Annett
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super('Game')
    }

    create() {
        // background
        // this.add.image(0, 0, 'bg').setOrigin(0)

        // límites del mundo
        this.physics.world.setBounds(0, 0, 2000, 640)
        this.cameras.main.setBounds(0, 0, 2000, 640)

        // plataformas
        const map = this.make.tilemap({ key: 'tilemap_nivel0' })
        const tileset = map.addTilesetImage('suelo', 'tileset_nivel0')
        if (!tileset) throw new Error('Tileset no encontrado o mal nombrado')
        const ground = map.createLayer('patrones1', tileset)
        if (!ground) throw new Error('No se pudo crear la capa ground desde el mapa')
        ground?.setCollisionByProperty({ collision: true })

        // player - annett
        this.annett = new Annett(this, 50, 100)
        this.physics.add.collider(this.annett, ground)

        // control - teclado
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys()
        }

        // camara
        this.cameras.main.startFollow(this.annett)


    }

    update() {
        const isOnGround = this.annett.body!.blocked.down
        const isFalling = this.annett.body!.velocity.y > 0 && !isOnGround
        const isJumping = this.annett.body!.velocity.y < 0 && !isOnGround

        // 👉 Movimiento horizontal
        if (this.cursors.left.isDown) {
            this.annett.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.annett.moveRight()
        } else {
            this.annett.stopMove()
        }

        // 👉 Salto
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.annett.jump()
        }

        // 👉 Animaciones
        switch (true) {
            case isFalling:
                this.annett.playFall()
                break

            case isJumping:
                this.annett.playJump()
                break

            case isOnGround && this.annett.body!.velocity.x !== 0:
                this.annett.playWalk()
                break

            case isOnGround:
                this.annett.playIdle()
                break
        }

    }




}

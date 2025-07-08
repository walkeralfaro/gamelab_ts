import { Physics, Scene } from 'phaser'
import { Annett } from '../gameObjects/Annett'

import { InputManager } from '../../input/InputManager'

export class Game extends Scene {
    platforms!: Physics.Arcade.StaticGroup
    annett!: Annett
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    music!: Phaser.Sound.BaseSound

    constructor() {
        super('Game')
    }

    create() {

        // límites del mundo
        this.physics.world.setBounds(0, 0, 1600, 640)
        this.cameras.main.setBounds(0, 0, 1600, 640)

        // sounds

        // music
        this.music = this.sound.add('music_nivel0', { loop: true, volume: 0.5 })
        this.music.play()

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

        // input
        InputManager.getInstance().init(this)

        // camara
        this.cameras.main.startFollow(this.annett)

    }

    update() {
        const inputManager = InputManager.getInstance()
        inputManager.update()
        const input = inputManager.getInputState()

        this.annett.handleInput(input)
        this.annett.updateAnimationState()
    }

}

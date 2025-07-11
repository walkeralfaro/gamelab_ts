import { Physics, Scene } from 'phaser'
import { Annett } from '../gameObjects/Annett'

import { InputManager } from '../../input/InputManager'

export class Game extends Scene {
    platforms!: Physics.Arcade.StaticGroup
    annett!: Annett
    music!: Phaser.Sound.BaseSound
    debugText!: Phaser.GameObjects.Text

    constructor() {
        super('Game')
    }

    create() {

        // límites del mundo
        this.physics.world.setBounds(0, 0, 1600, 640)
        this.cameras.main.setBounds(0, 0, 1600, 640)

        // sounds

        // music
        this.music = this.sound.add('music_nivel0', { loop: true, volume: 0.2 })
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

        // DEBUG ****************************************************
        this.debugText = this.add.text(10, 10, '', {
            font: '10px monospace',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setScrollFactor(0).setDepth(1000)

    }

    update() {
        const inputManager = InputManager.getInstance()
        inputManager.update()
        const input = inputManager.getInputState()

        this.annett.handleInput(input)
        this.annett.updateAnimationState()

        // DEBUG **********************************************************
        const velocity = this.annett.body?.velocity
        const acceleration = this.annett.body?.acceleration
        const fps = this.game.loop.actualFps.toFixed(1)

        const pad = inputManager.getGamepad()
        const buttonStates = pad
            ? pad.buttons
                .map((btn, i) => `${i}:${btn.pressed ? '1' : '0'}`)
                .join(' ')
            : 'No Gamepad'

        this.debugText.setText([
            `FPS: ${fps}`,
            `Vel X: ${velocity?.x.toFixed(2)}`,
            `Vel Y: ${velocity?.y.toFixed(2)}`,
            `Acc X: ${acceleration.x.toFixed(2)}`,
            `Acc Y: ${acceleration.y.toFixed(2)}`,
            `Input: ${inputManager.getInputType()}`,
            `Jump: ${input.jump}`,
            `Buttons: ${buttonStates}`
        ])
        // DEBUG **********************************************************

    }

}

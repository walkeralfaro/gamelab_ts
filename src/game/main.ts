import { Game as MainGame } from './scenes/Game'
import { AUTO, Game, Scale, Types } from 'phaser'
import { Preloader } from './scenes/Preloader'

const physicsConfig: Types.Core.PhysicsConfig = {
    default: 'arcade',
    arcade: {
        debug: true,
        gravity: { x: 0, y: 700 }
    }
}

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 640,
    height: 360,
    pixelArt: true,
    parent: 'game-container',
    backgroundColor: '#9488e0',
    physics: physicsConfig,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    input: {
        gamepad: true
    },
    scene: [
        Preloader,
        MainGame
    ],
}

const StartGame = (parent: string) => {
    return new Game({ ...config, parent })
}

export default StartGame
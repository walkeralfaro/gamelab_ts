import { Game as MainGame } from './scenes/Game'
import { AUTO, Game, Scale, Types } from 'phaser'
import { Preloader } from './scenes/Preloader'

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const physicsConfig: Types.Core.PhysicsConfig = {
    default: 'arcade',
    arcade: {
        debug: false,
        gravity: { x: 0, y: 500 }
    }
}

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: physicsConfig,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        MainGame
    ]
}

const StartGame = (parent: string) => {
    return new Game({ ...config, parent })
}

export default StartGame
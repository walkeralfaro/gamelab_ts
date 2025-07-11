import { Game as MainGame } from './scenes/Game'
import { AUTO, Game, Scale, Types } from 'phaser'
import { Preloader } from './scenes/Preloader'

document.getElementById('start-btn')?.addEventListener('click', () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();

    // Ocultamos el botón de inicio y mostramos el canvas
    document.getElementById('start-screen')!.style.display = 'none';
    document.getElementById('game-container')!.style.display = 'block';

    // Iniciar el juego
    StartGame('game-container');
});


const physicsConfig: Types.Core.PhysicsConfig = {
    default: 'arcade',
    arcade: {
        debug: true,
        gravity: { x: 0, y: 700 }
    }
}

const config: Types.Core.GameConfig = {
    type: AUTO,
    // width: 640,
    // height: 360,
    pixelArt: true,
    parent: 'game-container',
    backgroundColor: '#9488e0',
    physics: physicsConfig,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: 640,
        height: 360,
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
export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader')
    }

    preload() {
        this.load.setPath('assets')
        this.load.image('logo')
        this.load.image('bg')
        this.load.image('sky', 'sky.png')
        this.load.image('star', 'star.png')
        this.load.spritesheet('annett', 'annett-export.png', { frameWidth: 64, frameHeight: 64 })

        // tileset
        this.load.image('tileset_nivel0', 'tileset.png')
        this.textures.get('tileset_nivel0').setFilter(Phaser.Textures.FilterMode.NEAREST)
        this.load.tilemapTiledJSON('tilemap_nivel0', 'nivel0.json')

        // sounds
        this.load.audio('jumpSound', ['sounds/jump_1.ogg'])
        this.load.audio('walkSound', ['sounds/walk.ogg'])

        // music
        this.load.audio('music_nivel0', ['music/music_nivel0.ogg'])
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Game')
    }
}

// input/inputManager.ts
export type InputType = 'keyboard' | 'touch' | 'gamepad'

interface InputState {
    left: boolean
    right: boolean
    jump: boolean
}

export class InputManager {
    private static instance: InputManager
    private inputType: InputType = 'keyboard'
    private pad?: Phaser.Input.Gamepad.Gamepad
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private inputState: InputState = { left: false, right: false, jump: false }

    private constructor() { }

    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager()
        }
        return InputManager.instance
    }

    public init(scene: Phaser.Scene) {
        // Detectar gamepad
        scene.input.gamepad?.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
            console.log('connected', pad.id)
            this.pad = pad
            this.inputType = 'gamepad'
        })

        // Detectar puntero
        scene.input.on('pointerdown', () => {
            this.inputType = 'touch'
        })

        // Detectar teclado
        scene.input.keyboard?.on('keydown', () => {
            console.log('teclado')
            this.inputType = 'keyboard'
        })

        // Guardamos cursores para teclado
        this.cursors = scene.input.keyboard?.createCursorKeys()
    }

    public update() {
        // Si se detecta uso de botones del gamepad, cambia inputType
        if (this.pad?.buttons.some(btn => btn.value > 0)) {
            this.inputType = 'gamepad'
        }

        // console.log(this.inputType)

        // Leer y guardar el estado actual del input
        switch (this.inputType) {
            case 'keyboard': {
                this.inputState.left = !!this.cursors?.left.isDown
                this.inputState.right = !!this.cursors?.right.isDown
                this.inputState.jump = Phaser.Input.Keyboard.JustDown(this.cursors?.up!)
                break
            }

            case 'gamepad': {
                if (!this.pad) break
                const axis = this.pad.axes.length > 0 ? this.pad.axes[0].getValue() : 0
                this.inputState.left = axis < -0.1 || this.pad.left
                this.inputState.right = axis > 0.1 || this.pad.right
                this.inputState.jump = this.pad.A || this.pad.buttons[0].pressed
                break
            }

            case 'touch': {
                // Aquí irán botones táctiles (más adelante)
                this.inputState = { left: false, right: false, jump: false }
                break
            }
        }
    }

    public getInputType(): InputType {
        return this.inputType
    }

    public getGamepad(): Phaser.Input.Gamepad.Gamepad | undefined {
        return this.pad
    }

    public getInputState(): InputState {
        return this.inputState
    }
}

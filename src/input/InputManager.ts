// input/inputManager.ts
export type InputType = 'keyboard' | 'touch' | 'gamepad'

export interface InputState {
    left: boolean
    right: boolean
    jump: boolean
}

export class InputManager {
    private static instance: InputManager
    private inputType: InputType = 'keyboard'
    private pad?: Phaser.Input.Gamepad.Gamepad
    private inputState: InputState = { left: false, right: false, jump: false }
    private keys!: {
        left: Phaser.Input.Keyboard.Key
        right: Phaser.Input.Keyboard.Key
        jump: Phaser.Input.Keyboard.Key
    }
    private jumpPressed = false

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
            console.log('connected', pad.index)
            this.pad = pad
            this.inputType = 'gamepad'

            // detecta si esta presionado salto
            pad.on('down', (index: number) => {
                if (index === 0) {
                    this.jumpPressed = true
                }
            })

        })

        // Detectar puntero
        scene.input.on('pointerdown', () => {
            this.inputType = 'touch'
        })

        // Detectar teclado
        const keyboard = scene.input.keyboard
        if (keyboard) {
            this.keys = {
                left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
                right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
                jump: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
            }

            keyboard.on('keydown', () => {
                console.log('teclado')
                this.inputType = 'keyboard'
            })
        }
    }

    public update() {
        // Si se detecta uso de botones del gamepad, cambia inputType
        if (this.pad?.buttons.some(btn => btn.value > 0)) {
            this.inputType = 'gamepad'
        }

        // Leer y guardar el estado actual del input
        switch (this.inputType) {
            case 'keyboard': {
                if (!this.keys) break
                this.inputState.left = this.keys.left.isDown
                this.inputState.right = this.keys.right.isDown
                this.inputState.jump = Phaser.Input.Keyboard.JustDown(this.keys.jump)
                break
            }

            case 'gamepad': {
                if (!this.pad) break
                const axis = this.pad.axes.length > 0 ? this.pad.axes[0].getValue() : 0
                const deadZone = 0.4
                const processedAxis = Math.abs(axis) < deadZone ? 0 : axis

                this.inputState.left = processedAxis < 0 || this.pad.left
                this.inputState.right = processedAxis > 0 || this.pad.right
                this.inputState.jump = this.jumpPressed
                break
            }

            case 'touch': {
                // TODO: Aquí irán botones táctiles (más adelante)
                this.inputState = { left: false, right: false, jump: false }
                break
            }
        }

        this.jumpPressed = false
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

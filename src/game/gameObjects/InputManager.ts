// export type InputType = 'keyboard' | 'touch' | 'gamepad'

// export class InputManager {
//     public inputType: InputType = 'keyboard'
//     private pad?: Phaser.Input.Gamepad.Gamepad

//     constructor(scene: Phaser.Scene) {
//         if (scene.input.gamepad) {
//             scene.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
//                 this.pad = pad
//                 this.inputType = 'gamepad'
//             })
//         }

//         scene.input.on('pointerdown', () => {
//             this.inputType = 'touch'
//         })

//         scene.input.keyboard?.on('keydown', () => {
//             this.inputType = 'keyboard'
//         })
//     }

//     update() {
//         if (this.pad?.buttons.some(btn => btn.value > 0)) {
//             this.inputType = 'gamepad'
//         }
//     }

//     getGamepad(): Phaser.Input.Gamepad.Gamepad | undefined {
//         return this.pad
//     }

//     getInputType(): InputType {
//         return this.inputType
//     }
// }

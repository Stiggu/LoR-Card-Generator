Currently in Development, it is not published at the moment!

# Library of Ruina Card Generator

Small library to generate cards as if they were from Library of Ruina.

## How to use

- Get NodeJs.
- After creating a folder, run in a terminal.
  - `npm i lor-card-generator`
- Now you can use the CLI to generate cards!

The CLI is accessed by using `lor-card` in the terminal. You have to pass in the following options:

| Option  | Accepts                                  | Description                                                                         | Example                                     |
| ------- | ---------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------- |
| image   | string                                   | Path to the image.                                                                  | `./images/krooming.jpg`                     |
| cost    | number                                   | The cost of the card.                                                               | 3                                           |
| attacks | `slash` `blunt` `pierce` `evade` `block` | The attack slots in the bottom of the card, can be separated by a slash (/). Max 5. | `blunt` `blunt/blunt` `pierce/blunt/pierce` |
| name    | string                                   | The name or title of the card.                                                      | Bonk                                        |
| type    | [CardType](./src/docs/CardTypes.md)      | The type of the card based on Library of Ruina combat pages.                        | limited                                     |
| range   | `melee` `range` `mass`                   | The type of range of the card, included mass attacks.                               | melee                                       |

Example command:

- `npx lor-card --image path/to/image.png --cost 1 --attacks blunt/slash/blunt --name TestCard --type limited`

## Examples

| Ryoshu                                 | Ishmael                                   |
| -------------------------------------- | ----------------------------------------- |
| ![](./src//assets/examples/ryoshu.png) | ![](./src//assets/examples/sloshmael.png) |

### TODO Before publishing

- Refactor + Clean up
- Error handling / Messages about the generation
- Version bump (1.0.0)

### TODO after the TODO

- Work on the right side of the page (Skill effects / damage)
- Lose less quality when rotating icons

### Special thanks

- Lunartique07 & R.Anakova & CasualWatson for publishing a drive link with all the sprites from the game.

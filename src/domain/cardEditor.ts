import AttackIcon from "./attackIcon.js"
import { AttackPage } from "./attackPage.js"
import AttackType from "./attackType.js"
import { Background } from "./background.js"
import { Card } from "./card.js"
import { CardDefinition } from "./cardDefinition.js"
import Cost from "./cost.js"
import Details from "./details.js"
import { Overlay } from "./overlay.js"
import Name from "./text.js"

export class CardEditor {
    constructor(public definition: CardDefinition) {}
    card = new Card()
    
    load = () => {
        this.card.add(new Background(this.definition))
        this.card.add(new Overlay(this.definition))
        this.card.add(new Cost(this.definition))
        this.card.add(new AttackType(this.definition))
        this.card.add(new Name(this.definition))
        this.card.add(new AttackPage(this.definition))
        this.card.add(new AttackIcon(this.definition))
        this.card.add(new Details())
    }
}
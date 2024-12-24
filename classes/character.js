import { Player } from "./player.js";

export class Character extends Player {
    constructor(id, name, age, skin, characterName, characterHealth, characterDamage) {
        super(id, name, age);
        this.skin = skin;
        this.characterName = characterName;
        this.characterHealth = characterHealth;
        this.characterDamage = characterDamage;
    }

    save(saveId) {
        const characterData = {
            id: this.id,
            name: this.name,
            age: this.age,
            skin: this.skin,
            characterName: this.characterName,
            characterHealth: this.characterHealth,
            characterDamage: this.characterDamage,
        };

        localStorage.setItem(saveId, JSON.stringify(characterData));
        console.log("Character saved to local storage");
    }

    static fromLocalStorage(saveId) {
        const characterData = localStorage.getItem(saveId);
        console.log(`Reading data from local storage ${saveId}`);
        if (characterData) {
            const parsedData = JSON.parse(characterData);
            console.log(`Read data is `, parsedData);
            return new Character(
                parsedData.id,
                parsedData.name,
                parsedData.age,
                parsedData.skin,
                parsedData.characterName,
                parsedData.characterHealth,
                parsedData.characterDamage
            );
        } else {
            console.log("No character found in local storage");
            return null;
        }
    }

    static createFromPlayer(player, skin, characterName, characterHealth, characterDamage) {
        return new Character(player.id, player.name, player.age, skin, characterName, characterHealth, characterDamage);
    }
}

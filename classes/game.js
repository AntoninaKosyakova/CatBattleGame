import { Player } from "./player.js";
import { Character } from "./character.js";

export class Game {
    static PLAYER1_ID = "player1";
    static PLAYER2_ID = "player2";

    static savePlayer(player) {
        player.save("player_" + player.id);
    }

    static newChoiceForPlayer(playerId) {
        return {
            player: Player.fromLocalStorage("player_" + playerId),
            character: null,
            skin: null,
        };
    }

    static saveCharacter(character) {
        character.save("character_" + character.id);
    }

    static readCharacter(playerId) {
        return Character.fromLocalStorage("character_" + playerId);
    }
}

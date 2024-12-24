import { Player } from "../classes/player.js";
import { Character } from "../classes/character.js";
import { Game } from "../classes/game.js";
import { Template } from "../classes/template.js";

function UpdatePlayerView(character, rootElement) {
    const UI = new Template(rootElement);
    UI.field("name").innerText = character.name;
    UI.field("age").innerText = character.age;
    UI.field("health").innerText = character.characterHealth;
}

function Main() {
    UpdatePlayerView(Game.readCharacter(Game.PLAYER1_ID), document.getElementById("player1"));
    UpdatePlayerView(Game.readCharacter(Game.PLAYER2_ID), document.getElementById("player2"));
}

Main();

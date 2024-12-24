import { Player } from "../classes/player.js";
import { Character } from "../classes/character.js";
import { Game } from "../classes/game.js";
import { Template } from "../classes/template.js";

function UpdatePlayerView(character, rootElement) {
    const UI = new Template(rootElement);
    UI.field("skin").src = character.skin;
    UI.field("name").innerText = character.name;
    UI.field("age").innerText = character.age;
    UI.field("health").innerText = character.characterHealth;
    UI.field("character-name").innerText = character.characterName;
    UI.field("damage").innerText = character.characterDamage;
}

function whenGameTimeElapses() {
    alert("Time's up! Game over!");
    toCharacterSelection();
}

function toCharacterSelection() {
    window.location.href = "/pages/character-selection.html";
}

function startGameTimer(durationMinutes, timerElement) {
    const endTime = Date.now() + durationMinutes * 60 * 1000;

    function updateTimer() {
        const remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerElement.innerText = "00:00";
            whenGameTimeElapses();
        } else {
            const minutes = Math.floor(remainingTime / 1000 / 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);
            timerElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

const player1Element = document.getElementById("player1");
const player2Element = document.getElementById("player2");
const timerElement = document.getElementById("timeRemaining");
const attackButton = document.getElementById("attackButton");

const player1 = Game.readCharacter(Game.PLAYER1_ID);
const player2 = Game.readCharacter(Game.PLAYER2_ID);
let currentTurnPlayer = player1;

function Attack() {
    let recepientPlayer = currentTurnPlayer.id == player1.id ? player2 : player1;
    recepientPlayer.characterHealth -= currentTurnPlayer.characterDamage;
    UpdateView();
    if (recepientPlayer.characterHealth <= 0) {
        alert(`Game over. Player ${currentTurnPlayer.name} wins!`);
        toCharacterSelection();
    } else {
        currentTurnPlayer = recepientPlayer;
    }
    UpdateView();
}

function UpdateView() {
    UpdatePlayerView(player1, player1Element);
    UpdatePlayerView(player2, player2Element);
    document.getElementById("currentPlayerName").innerText = currentTurnPlayer.name;
}

function Main() {
    UpdateView();

    const durationMinutes = Game.getDurationMinutes();
    startGameTimer(durationMinutes, timerElement);

    attackButton.onclick = (t, e) => {
        Attack();
    };
}

Main();

import { Player } from "../classes/player.js";
import { Character } from "../classes/character.js";
import { Game } from "../classes/game.js";
import { Template } from "../classes/template.js";

const DEFAULT_IMAGE_URL = "../public/default.jpg";
const CATS_API_KEY = "live_vnvV5nLn10sgWeC6otCVzYpiVj6tpzt04je6Ma65XDmXjJM0YonDATy18bjbN94Z";

async function getAvailableCats() {
    return [
        {
            name: "Turkish Angora",
            skin1: "../public/turkishAngoraSkin2.jpg",
            skin2: null,
            stats_name: "lauren",
            hp: null,
            damage: null,
        },
        {
            name: "Russian Blue",
            skin1: "../public/RussianBlueSkin2.jpg",
            skin2: null,
            stats_name: "Susan",
            hp: null,
            damage: null,
        },
        {
            name: "British Shorthair",
            skin1: "../public/britishShorthairSkin2.jpg",
            skin2: null,
            stats_name: "Micheal",
            hp: null,
            damage: null,
        },
        {
            name: "Maine Coon",
            skin1: "../public/MaineCoonSkin2.jpg",
            skin2: null,
            stats_name: "David",
            hp: null,
            damage: null,
        },
        {
            name: "Persian",
            skin1: "../public/PersianCatSkin2.jpg",
            skin2: null,
            stats_name: "Bruce",
            hp: null,
            damage: null,
        },
        {
            name: "Ragdoll",
            skin1: "../public/RagdollSkin2.jpg",
            skin2: null,
            stats_name: "Kevin",
            hp: null,
            damage: null,
        },
        {
            name: "Siberian",
            skin1: "../public/SiberianSkin2.jpg",
            skin2: null,
            stats_name: "Wesley",
            hp: null,
            damage: null,
        },
        {
            name: "Scottish Fold",
            skin1: "../public/ScottishFoldSkin2.jpg",
            skin2: null,
            stats_name: "John",
            hp: null,
            damage: null,
        },
    ];
}

async function getAvailableCharactersWithAnotherSkin() {
    const withSkin2 = getAvailableCats().then(async (characters) => {
        return Promise.all(
            // use a list of objects to create a list of promises:
            characters.map(async (character) => {
                const breed = character.name;
                const url2 = await fetch(
                    `https://api.thecatapi.com/v1/breeds/search?api_key=${CATS_API_KEY}&q=${breed}`
                ).then(async (response) => {
                    const json = await response.json();
                    const url = json.length > 0 && json[0].image !== undefined ? json[0].image.url : DEFAULT_IMAGE_URL;
                    return url;
                });

                const [hp, damage] = await fetch(`https://api.tvmaze.com/search/people?q=${character.stats_name}`).then(
                    async (response) => {
                        const json = await response.json();
                        if (json.length > 0 && json[0].person !== undefined) {
                            const person = json[0].person;
                            const dmg = person.updated.toString().slice(8, 9);
                            return [parseInt(person.id.toString().slice(0, 2)), parseInt(dmg)];
                        } else {
                            console.warn("Got json without person for " + character.stats_name, json);
                            return [20, 4];
                        }
                    }
                );

                character.skin2 = url2;
                character.hp = hp;
                character.damage = damage;
                return character;
            })
        );
    });
    return await withSkin2;
}

const player1Choice = Game.newChoiceForPlayer(Game.PLAYER1_ID);

const player2Choice = Game.newChoiceForPlayer(Game.PLAYER2_ID);

function registerPlayerChoice(playerChoice, character, skinUrl) {
    playerChoice.character = character;
    playerChoice.skin = skinUrl;
    Game.saveCharacter(
        new Character(
            playerChoice.player.id,
            playerChoice.player.name,
            playerChoice.player.age,
            playerChoice.skin,
            playerChoice.character.name,
            playerChoice.character.hp,
            playerChoice.character.damage
        )
    );
    console.log("Updated player", playerChoice);
}

function updatePlayerInformation(playerChoice, rootElement) {
    console.log(player1Choice, player2Choice);
    const userChoiceUi = new Template(rootElement);
    userChoiceUi.field("name").innerText = playerChoice.player.name;
    userChoiceUi.field("age").innerText = playerChoice.player.age;
    userChoiceUi.field("skinImage").src = playerChoice.skin;
    userChoiceUi.field("character").innerText = playerChoice.character.name;
    userChoiceUi.field("hp").innerText = playerChoice.character.hp;
    userChoiceUi.field("damage").innerText = playerChoice.character.damage;
}

async function displayCharacterChoices(
    parentElement, // HTML Element
    characters,
    imageClickCallback //  this is a funciton (character, skinUrl) => void
) {
    parentElement.innerHTML = "";

    for (let i in characters) {
        const character = characters[i];
        var charDiv = document.createElement("div");
        var characterName = document.createElement("p");
        var skin1Image = document.createElement("img");
        var skin2Image = document.createElement("img");
        parentElement.appendChild(charDiv);
        charDiv.appendChild(characterName);
        charDiv.appendChild(skin1Image);
        charDiv.appendChild(skin2Image);

        characterName.innerText = character.name;
        skin1Image.src = character.skin1;
        skin2Image.src = character.skin2;

        skin1Image.onclick = (t, e) => {
            imageClickCallback(character, character.skin1);
        };
        skin2Image.onclick = (t, e) => {
            imageClickCallback(character, character.skin2);
        };
    }
}

function Main() {
    const player1InfoElement = document.getElementById("Player1Information");
    const player2InfoElement = document.getElementById("Player2Information");

    getAvailableCharactersWithAnotherSkin().then(async (characters) => {
        displayCharacterChoices(document.getElementById("scrollForPlayer1"), characters, (ch, sk) => {
            registerPlayerChoice(player1Choice, ch, sk);
            updatePlayerInformation(player1Choice, player1InfoElement);
        });
        displayCharacterChoices(document.getElementById("scrollForPlayer2"), characters, (ch, sk) => {
            registerPlayerChoice(player2Choice, ch, sk);
            updatePlayerInformation(player2Choice, player2InfoElement);
        });
    });
}

const slider = document.getElementById("durationSlider");
const valueDisplay = document.getElementById("sliderValue");

slider.oninput = function () {
    valueDisplay.textContent = `${this.value} minute${this.value > 1 ? "s" : ""}`;
};

document.getElementById("startGameButton").onclick = (t, e) => {
    const duration = slider.value;
    Game.saveDuration(duration);

    if (player1Choice.skin == null || player2Choice.skin == null) {
        alert("Player selections are not finished");
    } else window.location.href = "../pages/gameplay.html";
};

Main();

"use strict";

import { Player } from "../classes/player.js";

function isAValidName(str) {
    return str.length > 0;
}

function isAValidAge(str) {
    return str.length > 0;
}

// listen for a submit event on the login form
$("#loginForm").on("submit", function (event) {
    // Get the values from the form fields
    const nameOfPlayer1 = $("#nameOfPlayer1").val();
    const ageOfPlayer1 = $("#ageOfPlayer1").val();
    const nameOfPlayer2 = $("#nameOfPlayer2").val();
    const ageOfPlayer2 = $("#ageOfPlayer2").val();

    const nameIsValid = isAValidName(nameOfPlayer1);
    const ageIsValid = isAValidAge(ageOfPlayer1);
    const nameIsValid2 = isAValidName(nameOfPlayer2);
    const ageIsValid2 = isAValidAge(ageOfPlayer2);

    // error showing
    if (!nameIsValid) {
        $("#nameError").show();
    } else {
        $("#nameError").hide();
    }

    if (!ageIsValid) {
        $("#ageError").show();
    } else {
        $("#ageError").hide();
    }

    if (!nameIsValid2) {
        $("#nameError2").show();
    } else {
        $("#nameError2").hide();
    }

    if (!ageIsValid2) {
        $("#ageError2").show();
    } else {
        $("#ageError2").hide();
    }

    if (!nameIsValid || !ageIsValid || !nameIsValid2 || !ageIsValid2) {
        // prevent default behavior
        event.preventDefault();
    } else {
        const player1 = {
            name: nameOfPlayer1,
            age: ageOfPlayer1,
        };

        const player2 = {
            name: nameOfPlayer2,
            age: ageOfPlayer2,
        };

        Player.save("player1", new Player(nameOfPlayer1, ageOfPlayer1));
        Player.save("player2", new Player(nameOfPlayer2, ageOfPlayer2));
    }
});

const state = {
    score:{
        playetScore: 0,
        computerScore:0,
        scoreBox: document.getElementById(score_points),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name : document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
    player: document.getElementById("player-field-card"),
    player: document.getElementById("computer-field-card"),
    },
    actions:{
    button: document.getElementById("next-duel"),
    }
};
const playerSides = {

    player1: "player-cards",
    player1BOX: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#computer-cards"),
};
const cardData = [
    {
        id:0,
        name: "Blue eyes White Dragon",
        type: "Paper",
        img: "./src/assets/icons/dragon.png",
        WinOf:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: "./src/assets/icons/magician.png",
        WinOf:[2],
        LoseOf:[0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: "./src/assets/icons/exodia.png",
        WinOf:[0],
        LoseOf:[1],
    },
];

function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

}

init();
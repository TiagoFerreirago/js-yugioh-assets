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

    player1: "player-field-card",
    computer: "computer-field-card"
};
const cardData = [
    {
        id:0,
        name: "Blue eyes White Dragon",
        type: "Paper",
        img: ".src/assets/icons/dragon.png",
        WinOf:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: ".src/assets/icons/magician.png",
        WinOf:[2],
        LoseOf:[0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: ".src/assets/icons/exodia.png",
        WinOf:[0],
        LoseOf:[1],
    },
];
async function getRandomCardId(){
    const radomIndex = Math.floor(Math.radom() * cardData.length);
    return cardData[radomIndex].id;
}
async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

    cardImage.addEventListener("mouseover", ()=>{
        drawSelectCard(randomIdCard);
    });
    return cardImage;
}
async function drawCards(cardNumbers, fieldSide) {
    for(let i =0; i <cardNumbers; i++){
        const radomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(radomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

}

init();
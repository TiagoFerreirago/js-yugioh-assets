const state = {
    score:{
        playetScore: 0,
        computerScore:0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name : document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
    },
    actions:{
    button: document.getElementById("next-duel"),
    },

    playerSides:{

        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    }
};
const playerSides = {

    player1: "player-cards",
    computer: "computer-cards",
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
async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
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

        cardImage.addEventListener("mouseover", ()=>{
            drawSelectCard(randomIdCard);
        });
    }

   
    return cardImage;
}
async function removeAllCardsImages() {
    let cards = state.playerSides.computerBOX;
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    cards = state.playerSides.player1BOX;
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

async function setCardsField(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await showHiddenCardFieldsImage(true);

    await hiddenCardDetails();

    await drawCardInFields(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawCardInFields(cardId, computerCardId) {
    
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function showHiddenCardFieldsImage(value) {

    if(value === true){
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }
    else{
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
    
}

async function hiddenCardDetails() {
    state.cardSprites.avatar.src = "";

    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];

    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = "Win";
        await playAudio(duelResults);
        state.score.playetScore++
    }

    if(playerCard.LoseOf.includes(computerCardId)){

        duelResults = "lose";
        await playAudio(duelResults)
        state.score.computerScore++;
    }
        return duelResults;
    }

async function drawButton(text) {
    
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playetScore} | Lose: ${state.score.computerScore}`
}

async function  drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attibute : "+cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i =0; i <cardNumbers; i++){
        const radomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(radomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    
    state.cardSprites.avatar.src="";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
   try{
    audio.play();
   }
   catch{

   }
}

function init() {
    
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
    showHiddenCardFieldsImage(false);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();
const pictures = [
    {
        url: "./images/bear.png",
        id: 0,
        counter: 2
    },
    {
        url: "./images/cool.png",
        id: 1,
        counter: 2
    },
    {
        url: "./images/cow.png",
        id: 2,
        counter: 2
    },
    {
        url: "./images/hedgehog.png",
        id: 3,
        counter: 2
    },
    {
        url: "./images/lion.png",
        id: 4,
        counter: 2
    },
    {
        url: "./images/panda.png",
        id: 5,
        counter: 2
    },
    {
        url: "./images/pig.png",
        id: 6,
        counter: 2
    },
    {
        url: "./images/sheep.png",
        id: 7,
        counter: 2
    }
];

const card = {
    id: Number,
    word: String,
    flipped: Boolean,
    guessedCorrectly: Boolean

}

let first_flipped_value = ""
let first_flipped_card = ""
let pointCounter = 0
let totalTimer = 0

const startButton = document.getElementById("btnStartGame")
const gameArea = document.getElementById("game-area-board")
const timer_time = document.getElementById("timer-time")
const modal = document.getElementById("myModal")
const winnerTimer = document.getElementById("winner-timer")
const btnSubmitResults = document.getElementById("btnSubmitResults")


//event listeners
btnSubmitResults.addEventListener("click", (e) => {
    sendResultsToDB()
})

startButton.addEventListener("click", () => {

    startButton.disabled = true
    displayCards()
    startTimer()
})

//fetch to get the json contents
//put it in here
function displayCards(jsonObject) {

    //looping to display & create the cards
    for (let i = 0; i < 16; i++) {
        //get images from backend, populate them randomly
        let randomPicture = pictures[Math.floor(Math.random() * pictures.length)];
        while (randomPicture.counter === 0) {
            randomPicture = pictures[Math.floor(Math.random() * pictures.length)];
        }
        randomPicture.counter--;

        //creating the cards dynamically
        const card = document.createElement("div")
        card.className = "card"
        card.setAttribute("isFlipped", "false")
        card.style = "width: 12rem; height: 12rem;"
        card.id = randomPicture.id;

        card.addEventListener("click", (e) => {

            card.classList.toggle("card-flipped")
            console.log(e.target)

            if (first_flipped_card == "card card-success"){
                return
            }

            //dealing with the user inputs
            if (first_flipped_value === "") {
                first_flipped_value = e.target.id
                first_flipped_card = e.target
            } else if (first_flipped_value === e.target.id) {
                first_flipped_value = ""
                first_flipped_card.className = "card card-success"
                e.target.className = "card card-success"

                pointCounter += 1
                console.log(pointCounter)

                if (pointCounter == 1) {

                    stopTimer()
                    modal.style.display = "block"
                    winnerTimer.innerHTML = totalTimer + " seconds"

                }
            } else {
                first_flipped_value = ""
                first_flipped_card.className = "card"
                e.target.className = "card card-wrong"
            }

        })

        const cardFront = document.createElement("div")
        cardFront.className = "card-body-front"
        cardFront.id = 3

        const cardFrontTitle = document.createElement("h5")
        cardFrontTitle.innerHTML = "?"

        cardFront.appendChild(cardFrontTitle)
        card.appendChild(cardFront)

        const cardBack = document.createElement("div")

        cardBack.className = "card-body-back"

        const cardBackTitle = document.createElement("div")

        cardBackTitle.style.backgroundImage = (`url('${randomPicture.url}')`);

        cardBack.appendChild(cardBackTitle)
        card.appendChild(cardBack)

        gameArea.appendChild(card)

    }
}

function sendResultsToDB() {

    let usernameInput = document.getElementById("usernameInput").value

    let data = { username: usernameInput, time: winnerTimer.innerHTML.split(" ")[0] }
    data = JSON.stringify(data)
    console.log(data)

    fetch("/submitWinnerDetails", {
        
        method: "POST",
        body: data,
        headers: { 'Content-Type': 'application/json' }

    })

    fetch("/leaderboards", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
}

function startTimer() {

    var start = Date.now();
    setInterval(function () {
        var delta = Date.now() - start;

        timer_time.innerHTML = (Math.floor(delta / 1000));
        totalTimer = (Math.floor(delta / 1000));

        // console.log(totalTimer)
        return totalTimer
    }, 1000);

}

function stopTimer() {
    clearInterval(totalTimer);

}


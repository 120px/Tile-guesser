let first_flipped_value = ""
let first_flipped_card = ""

const card = {
    id: Number,
    word: String,
    flipped: Boolean,
    guessedCorrectly: Boolean

}

const arrayOfWords = ["dog", "cat", "bird"]
const gameArea = document.getElementById("game-area-board")
const timer_time = document.getElementById("timer-time")
//fetch to get the json contents
//put it in here

function displayCards(jsonObject) {

    // arrayOfWords = jsonObject["words"]

    for (let i = 0; i < 16; i++) {
        const card = document.createElement("div")
        card.className = "card"
        card.setAttribute("isFlipped", "false")
        card.style = "width: 12rem; height: 12rem;"
        card.id = 1

        card.addEventListener("click", (e) => {

            card.classList.toggle("card-flipped")
            console.log(e.target)

            if (first_flipped_value === "") {
                first_flipped_value = e.target.id
                first_flipped_card = e.target
            }else if (first_flipped_value === e.target.id){
                first_flipped_value = ""
                first_flipped_card.className = "card card-success"
                e.target.className = "card card-success"
            }else{
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
        cardBackTitle.style.backgroundImage = ("url('https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o=')")
        cardBackTitle.id = 3

        cardBack.appendChild(cardBackTitle)
        card.appendChild(cardBack)

        gameArea.appendChild(card)

    }
}

function startTimer() {

    var start = Date.now();
setInterval(function() {
    var delta = Date.now() - start; // milliseconds elapsed since start
    
    timer_time.innerHTML = (Math.floor(delta / 1000)); // in seconds

}, 1000); // update about every second

}

const startButton = document.getElementById("btnStartGame")
startButton.addEventListener("click", () => {

    startButton.disabled = true
    displayCards(json)
    startTimer()


})

let json = {
    "words": [
        "bird", "cat", "dog", "elephant", "tiger", "frog", "cow", "horse", "bird", "cat", "dog", "elephant", "tiger", "frog", "cow", "horse"
    ]
}
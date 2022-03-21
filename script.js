let first_flipped_value = ""

const card = {
    id: Number,
    word: String,
    flipped: Boolean,
    guessedCorrectly: Boolean

}

const arrayOfWords = ["dog", "cat", "bird"]
const gameArea = document.getElementById("game-area-board")

//fetch to get the json contents
//put it in here

function displayCards(jsonObject) {

    // arrayOfWords = jsonObject["words"]

    for (let i = 0; i < 16; i++) {
        const element = document.createElement("div")
        element.className = "card"
        element.setAttribute("isFlipped", "false")
        element.style = "width: 12rem; height: 12rem;"

        element.addEventListener("click", (e) => {
            if (e.target.getAttribute("isFlipped") == "true"){
                return
            }

            if (first_flipped_value === ""){
                first_flipped_value = e.target.innerText
                e.target.className = "card-body card-flipped"
                e.target.setAttribute("isFlipped", "true")
                console.log(first_flipped_value)


            }else if (first_flipped_value === e.target.innerText){
                first_flipped_value = ""
                e.target.setAttribute("isFlipped", "true")
                element.className = "card card-flipped"
                console.log(first_flipped_value)

            }else {
                e.target.setAttribute("isFlipped", "false")
                element.setAttribute("isFlipped", "false")
                element.className = "card card-not-flipped"
                first_flipped_value = ""
                console.log(first_flipped_value)
                
            }

            // if (element.getAttribute("isFlipped") == "false") {
            //     element.setAttribute("isFlipped", "true")
            //     element.className = "card card-flipped"
            // }
            // else if (element.getAttribute("isFlipped") == "true") {
            //     element.setAttribute("isFlipped", "false")
            //     element.className = "card card-not-flipped"
            // }

        })

        const element2 = document.createElement("div")
        element2.className = "card-body"

        const title = document.createElement("h5")
        title.className = "card-title"
        title.innerHTML = jsonObject["words"][i]

        element2.appendChild(title)
        element.appendChild(element2)

        gameArea.appendChild(element)
    }
}

const startButton = document.getElementById("btnStartGame")
startButton.addEventListener("click", () => {


    displayCards(json)
})

let json = {
    "words": [
        "bird", "cat", "dog", "elephant", "tiger", "frog", "cow", "horse", "bird", "cat", "dog", "elephant", "tiger", "frog", "cow", "horse"
    ]
}
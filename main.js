// Init elem
const betAmount = document.getElementById("BetAmount")

const Money = document.getElementById("Money")
const gameContainer = document.getElementById("Game")
const startButton = document.getElementById("Start")

// Settings
let moneyAmount = 1000
let withdrawAmount = 0
let withdrawMultipliyer = 1
let gameActive = false

updateMoney()
generateBoard()
playSound("music.mp3", 0.2, true)

// Start/Withdraw button
function game() {
    // Check if game is active
    if (gameActive == false) {
        start()
    }else{
        withdraw()
    }
}

// Squere is clicked (Reveal if bomb has been hit or not)
function spaceClicked(num) {
    if (gameActive == false) {
        return
    }

    if (bombLocation == num) {
        bomb(num)
    }else{
        addMultiplier(num)
    }
}

function start() {
    // Check if bet is valid
    if ( isNaN(betAmount.value) ) {
        return
    }

    if (betAmount.value > moneyAmount) {
        playSound("error.mp3", 0.2, false)
        return
    }

    if (betAmount.value <= 0) {
        return
    }

    // Start the game
    gameActive = true

    moneyAmount -= betAmount.value
    withdrawAmount = betAmount.value
    bombLocation = Math.floor(Math.random() * 25)
    console.log(betAmount.value, parseInt(betAmount.value))

    updateWithdraw()
    updateMoney()
    generateBoard()
    playSound("click.mp3", 0.2, false)

    // Reset bet value
    betAmount.value = ""
}

// Withdraw the earnings
function withdraw() {
    gameActive = false
    moneyAmount += withdrawAmount * withdrawMultipliyer

    withdrawMultipliyer = 1

    // For the looks (Spicy)
    startButton.innerHTML = "Start"

    generateBoard()
    updateMoney()
    playSound("click.mp3", 0.2, false)
}

// Reset the game on bomb
function bomb(num) {
    // Reset whole game (Do same thing as withdraw, but not returning the money)
    gameActive = false
    withdrawAmount = 0
    withdrawMultipliyer = 1
    startButton.innerHTML = "Start"
    playSound("explosion.mp3", 0.2, false)

    // Visualize it (Show bomb location)
    gameContainer.children[num].style.backgroundImage = "url('images/bomb.png')"

    // Disable all buttons
    gameContainer.querySelectorAll("#Space").forEach(space => {space.disabled = true})
}

// Rais the multiplier for withraw
function addMultiplier(num) {
    // Cauculate multiplier
    withdrawMultipliyer += 0.1
    
    updateWithdraw()
    playSound("correct.wav", 0.4, false)

    // Visualize it (Update withdraw money, show the diamond or multiplier)
    gameContainer.children[num].style.backgroundImage = "url('images/gems.png')"
    gameContainer.children[num].disabled = true
}

// Generate game board
function generateBoard() {
    gameContainer.innerHTML = ""
    for (let i = 0; i < 25; i++) {
        gameContainer.innerHTML += "<button onclick='spaceClicked(" + i + ")' id='Space'></button>"
    }
}

// Usless update money function (Just looks cleaner)
function updateMoney() {
    Money.innerHTML = moneyAmount.toFixed(2)
}

// Withdraw earnings
function updateWithdraw() {
    startButton.innerHTML = "Withdraw: $" + (withdrawAmount * withdrawMultipliyer).toFixed(2) + " (x" + withdrawMultipliyer.toFixed(1) + ")"
}

// Play a sound from the "sounds" folder
function playSound(sound, volume, bool) {
    var audio = new Audio('sounds/' + sound);
    audio.volume = volume
    audio.loop = bool
    audio.play();
}
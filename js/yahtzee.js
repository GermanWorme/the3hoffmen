// Global variables for Yahtzee Game
var status = "playing";
var isWinner = false;
var rollCount = 1;
var yahtzeeDice = {
    dice: [
        {
            number: 0,
            iskept: false
        },
        {
            number: 0,
            iskept: false
        },
        {
            number: 0,
            iskept: false
        },
        {
            number: 0,
            iskept: false
        },
        {
            number: 0,
            iskept: false
        }
    ],
    
    isWinner: function() {
        for(let i = 1; i < this.dice.length; i++) {
	       if(this.dice[i].number !== this.dice[0].number) {
                return false;
            }
        }
        return true;
    }
};
// Function to play Yahtzee
function rollYahtzeeDice() {
    if (rollCount <= 3 && status != "Game Over") {
        console.log(rollCount);
        for (let i = 0; i < yahtzeeDice.dice.length; i++) {
            if (yahtzeeDice.dice[i].iskept == false) {
                yahtzeeDice.dice[i].number = Math.ceil(Math.random() * 6);
                document.querySelector("#yDie-" + i).setAttribute("src", "images/dice-" + yahtzeeDice.dice[i].number + ".png");
            }
        }
        isWinner = yahtzeeDice.isWinner();
        if (isWinner) {
            document.querySelector("#yahtzeeMsg").textContent = "YAHTZEE! YOU WIN!";
            document.querySelector("#yahtzeeMsg").className = "winner";
            status = "Game Over";
            document.querySelector("#rollCount").textContent = "Reset";
        } else {
            console.log(yahtzeeDice);
            console.log(isWinner);
            if (rollCount !== 3) {
                rollCount++;
                document.querySelector("#rollCount").textContent = rollCount;
            } else {
                status = "Game Over";
                document.querySelector("#yahtzeeMsg").textContent = "Sorry. Try Again!";
                document.querySelector("#rollCount").textContent = "Reset";
            }
            //console.log(yahtzeeDice);
        }
    } else {
        resetYahtzee();
    }
}

function holdReleaseDie(num) {
    var button = document.querySelector("#hold-"+num);
    if (rollCount === 1) {
        alert("You must roll at least once before you can hold any dice.");
    } else if (status === "Game Over") {
        alert("Click the reset button to try again.");
    } else {
        switch (yahtzeeDice.dice[(num-1)].iskept) {
            case false:
                yahtzeeDice.dice[(num-1)].iskept = true;
                button.style.opacity = "1";
                button.innerHTML = "KEPT";
                console.log("You kept die " + num);
                break;
            case true:
                yahtzeeDice.dice[(num-1)].iskept = false;
                button.style.opacity = ".4";
                button.innerHTML = "HOLD";
                console.log("You returned die " + num);
                break;
        }
    }
}


// Function to reset Yahtzee
function resetYahtzee() {
    rollCount = 1;
    for (let i = 0; i < yahtzeeDice.dice.length; i++) {
        yahtzeeDice.dice[i].number = 0;
        yahtzeeDice.dice[i].iskept = false;
        document.querySelector("#yDie-" + i).setAttribute("src", "images/dice-0.png");
        document.querySelector("#rollCount").textContent = 1;
        document.querySelector("#hold-" + (i+1)).style.opacity = ".4";
        document.querySelector("#hold-" + (i+1)).innerHTML = "HOLD";
        document.querySelector("#yahtzeeMsg").className = "yahtzeeMsg";
    }
    status = "playing";
    console.log("Game Reset");
    document.querySelector("#yahtzeeMsg").textContent = "You Get 3 Rolls. Hold the dice you want to keep after each roll. Five of a kind Wins!";
    console.log(yahtzeeDice);
}

// Yahtzee button variables & event listeners
var btnYahtzeeRoll = document.querySelector("#btnYahtzeeRoll");
btnYahtzeeRoll.addEventListener("click", rollYahtzeeDice);

var btnHold1 = document.querySelector("#hold-1");
btnHold1.addEventListener("click", function() {holdReleaseDie(1);});

var btnHold2 = document.querySelector("#hold-2");
btnHold2.addEventListener("click", function() {holdReleaseDie(2);});

var btnHold3 = document.querySelector("#hold-3");
btnHold3.addEventListener("click", function() {holdReleaseDie(3);});

var btnHold4 = document.querySelector("#hold-4");
btnHold4.addEventListener("click", function() {holdReleaseDie(4);});

var btnHold5 = document.querySelector("#hold-5");
btnHold5.addEventListener("click", function() {holdReleaseDie(5);});
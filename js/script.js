"use strict";
// AJAX request to load external data files
var requestTXT, requestJSON;
if (window.XMLHttpRequest) {
    requestTXT = new XMLHttpRequest(), requestJSON = new XMLHttpRequest();
} else {
    requestTXT = new ActiveXObject("Microsoft.XMLHTTP"), requestJSON = new ActiveXObject("Microsoft.XMLHTTP");
}
//request data.txt file
requestTXT.open('GET', 'data.txt');
requestTXT.onreadystatechange = function () {
    "use strict";
    if (requestTXT.status === 200) {
        console.log('XHTTP Request was successful and data.txt file loaded.');
    } else {
        console.log('Failed to open XHTTP Request.');
    }
}
requestTXT.send();
//request favoriteSongs.json file
requestJSON.open('GET', 'favoriteSongs.json');
requestJSON.onreadystatechange = function () {
    "use strict";
    if (requestJSON.status === 200) {
        console.log('XHTTP Request was successful and favoriteSongs.json file loaded.');
    } else {
        console.log('Failed to open XHTTP Request.');
    }
}
requestJSON.send();

// **** FUNCTIONS **** 
// Function to replace the existimg html text with text from the data.txt file.
function updateNow() { 
    "use strict";        
    let textReplace = document.querySelector("#textReplace");
    textReplace.innerHTML = requestTXT.responseText;
    console.log("The 'Update Now' button was clicked.");
}

// Function to replace the existing html text after 5 seconds with new text from the prompt.
function update5sec() { 
    "use strict";
    let newText = prompt("Enter the new text that will update in 5 seconds.");
    newText;
    setTimeout(function () { 
        let textReplace = document.querySelector("#textReplace");
        textReplace.innerHTML = "Success. 5 seconds has passed and you entered the following text: " + newText;
        }, 5000);
    console.log("The 'Update in 5 seconds' button was clicked.");
}

// Function to load name:value objects from a JSON file.
function loadSongs() {        
    "use strict"; 
    var songs = JSON.parse(requestJSON.responseText);
    var output = "<ol class=\"favSongs\">";
    for (let key in songs) {
        output += "<li>" + songs[key].Song + "<ul>";
        output += "<li class=\"alt\"> Artist: <strong>" + songs[key].Artist + "</strong></li>";
        output += "<li> Album: " + songs[key].Album + "</li>";
        output += "<li class=\"alt\"> Song Length: " + songs[key].Time + "</li>";
        output += "<li> Year Released: " + songs[key].Year + "</li>";
        output += "</ul>";
    }
    output += "</li></ol>";
    document.querySelector("#songsList").innerHTML = output;
    console.log("The 'Load Songs' button was clicked.");
}

// Function to toggle the stylesheets on the page.
function addRemoveCSS() {
    var styles = document.styleSheets;
    if (styles[0].disabled === false) {
        for (let i = 0; i < styles.length; i++) {
            document.styleSheets[i].disabled = true;
        }
        btnRemoveCSS.innerHTML = "APPLY CSS";
        console.log("Stylesheet disabled.");
    } else {
        for (let i = 0; i < styles.length; i++) {
            document.styleSheets[i].disabled = false;
        }
        btnRemoveCSS.innerHTML = "REMOVE CSS";
        console.log("Stylesheet enabled.");
    }
}

// Function to dynamically create a menu item of all the section headers on the page.
function createSectionsMenu() {
    var sections = document.querySelectorAll("h2");
    var menuContaniner = document.querySelector("#menuItems");
    menuContaniner.innerHTML += "<ul class='sectionsMenu'>";
    for (let i = 0; i < sections.length; i++) {
        menuContaniner.querySelector("ul").innerHTML += "<li><a href='#section-" + [i+1] + "'>" + sections[i].innerHTML.toString() + "</a></li>";
    }
    
}

// Function to roll dice and display results
function rollDice() {
    var dice = [0,0];
    var total = 0;
    var diceElms =document.querySelector(".diceContainer").childNodes;
    for (let i = 0; i < dice.length; i++) {
        dice[i] = Math.ceil(Math.random() * 6);
        document.querySelector("#die-" + i).setAttribute("src", "images/dice-" + dice[i] + ".png");
        total +=  dice[i];
    }
    document.querySelector("#diceTotal").textContent = total;
    diceElms[2].style.display = "inline-block";
    diceElms[4].style.display = "inline-block";
    diceElms[6].style.display = "inline-block";
    console.log("You rolled the dice! " + total);
}


// Button variables with event listeners and assigned behaviors.
var btnUpdateNow = document.querySelector("#updateNow");
btnUpdateNow.addEventListener("click", updateNow);

var btnUpdate5sec = document.querySelector("#update5sec");
btnUpdate5sec.addEventListener("click", update5sec);

var btnLoadSongs = document.querySelector("#loadSongs");
btnLoadSongs.addEventListener("click", loadSongs);

var btnRemoveCSS = document.querySelector("#removeCSS");
btnRemoveCSS.addEventListener("click", addRemoveCSS);

var btnCreateMenu = document.querySelector("#createMenu");
btnCreateMenu.addEventListener("click", createSectionsMenu);

var btnRollDice = document.querySelector("#rollDice");
btnRollDice.addEventListener("click", rollDice);
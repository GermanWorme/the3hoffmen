var letters = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7,
    h: 6, i: 5, j: 4, k: 3, l: 2, m: 1, n: 1,
    o: 2, p: 3, q: 4, r: 5, s: 6, t: 7, u: 6,
    v: 5, w: 4, x: 3, y: 2, z: 1,
    trimNonAlpha: function(str) {
        var input = str.toLowerCase().replace(/[^a-z]/g, "");
        return input;
    },
    separate: function(str){
        var input = str.split("");
        return input;
    },
    alphaToNum: function(arr){
        for(var i = 0; i < arr.length; i++) {
            var letter = arr[i].valueOf();
            arr[i] = letters[letter];
        }
        return arr;
    }
};

var btnCalcGematria = document.querySelector("#calcBtn").addEventListener("click", getGematria);

function getValue(total, num) {
    return total + num;
}

function getGematria() {
    txtinput = document.querySelector("#input").value;
    console.log(txtinput);
    if (txtinput) {
        var trimInput = letters.trimNonAlpha(txtinput);
        console.log(trimInput);
        var alphaArray = letters.separate(trimInput);
        console.log(alphaArray);
        var numsArray = letters.alphaToNum(alphaArray);
        console.log(numsArray);
        var total = numsArray.reduce(getValue, 0);
        console.log(total);
        var output = document.querySelector("#output");
        output.innerHTML += "<tr><td>" + txtinput + "</td><td>" + trimInput + "</td><td>" + total + "</td></tr>";
        console.log(output);
    } else {
        console.log("No Input");
        alert("Enter text in the text field to calculate Gematria value.");
    }
}

document.onkeydown = function(e) {
  e = e || window.event;
  switch (e.which || e.keyCode) {
        case 13: getGematria();
        break;
  }
}



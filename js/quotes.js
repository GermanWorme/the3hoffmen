var rweQuotes = [
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Always do what you are afraid to do.",
    "Shallow men believe in luck. Strong men believe in cause and effect.",
    "All life is an experiment. The more experiments you make the better.",
    "I hate quotations. Tell me what you know.",
    "People only see what they are prepared to see.",
    "A foolish consistency is the hobgoblin of little minds."
];

var mlkQuotes = [
    "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
    "The time is always right to do what is right.",
    "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin, but by the content of their character.",
    "In the End, we will remember not the words of our enemies, but the silence of our friends.",
    "Our lives begin to end the day we become silent about things that matter."
];

var teslaQuotes = [
    "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    "Today's scientists have substituted mathematics for experiments, and they wander off through equation after equation, and eventually build a structure which has no relation to reality.",
    "The feeling is constantly growing on me that I had been the first to hear the greeting of one planet to another.",
    "Let the future tell the truth, and evaluate each one according to his work and accomplishments. The present is theirs; the future, for which I have really worked, is mine."
];

var tpaineQuotes = [
    "We have it in our power to begin the world over again.",
    "Those who expect to reap the blessings of freedom must, like men, undergo the fatigue of supporting it.",
    "The World is my country, all mankind are my brethren, and to do good is my religion.",
    "The harder the conflict, the more glorious the triumph."
];

var platoQuotes = [
    "People are like dirt. They can either nourish you and help you grow as a person or they can stunt your growth and make you wilt and die.",
    "He who commits injustice is ever made more wretched than he who suffers it.",
    "One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.",
    "The measure of a man is what he does with power."
];

var rweQnum, mlkQnum, tesQnum, tpQnum, platQnum;

function quotes(name, status) {
    switch (name) {
        case "Ralph Waldo Emmerson":
            if (status === "Start") {
                var qNum = Math.floor((Math.random()*rweQuotes.length));
                rweQnum = qNum;
                quote.innerText = rweQuotes[rweQnum];
                console.log(rweQnum);
            } else {
                if (rweQnum === rweQuotes.length - 1) {
                    quote.innerText = rweQuotes[0];
                    rweQnum = 0;
                    console.log(rweQnum);
                } else {
                    rweQnum++;
                    quote.innerText = rweQuotes[rweQnum];
                    console.log(rweQnum);
                }
            }
            break;
        case "Martin Luther King Jr":
            if (status === "Start") {
                var qNum = Math.floor((Math.random()*mlkQuotes.length));
                mlkQnum = qNum;
                quote.innerText = mlkQuotes[mlkQnum];
            } else {
                if (mlkQnum === mlkQuotes.length - 1) {
                    quote.innerText = mlkQuotes[0];
                    mlkQnum = 0;
                } else {
                    mlkQnum++;
                    quote.innerText = mlkQuotes[mlkQnum];
                }
            }
            break;
        case "Plato":
            if (status === "Start") {
                var qNum = Math.floor((Math.random()*platoQuotes.length));
                platQnum = qNum;
                quote.innerText = platoQuotes[platQnum];
            } else {
                if (platQnum === platoQuotes.length - 1) {
                    quote.innerText = platoQuotes[0];
                    platQnum = 0;
                } else {
                    platQnum++;
                    quote.innerText = platoQuotes[platQnum];
                }
            }
            break;
        case "Thomas Paine":
            if (status === "Start") {
                var qNum = Math.floor((Math.random()*tpaineQuotes.length));
                tpQnum = qNum;
                quote.innerText = tpaineQuotes[tpQnum];
            } else {
                if (tpQnum === tpaineQuotes.length - 1) {
                    quote.innerText = tpaineQuotes[0];
                    tpQnum = 0;
                } else {
                    tpQnum++;
                    quote.innerText = tpaineQuotes[tpQnum];
                }
            }
            break;
        case "Nikola Tesla":
            if (status === "Start") {
                var qNum = Math.floor((Math.random()*teslaQuotes.length));
                tesQnum = qNum;
                quote.innerText = teslaQuotes[tesQnum];
            } else {
                if (tesQnum === teslaQuotes.length - 1) {
                    quote.innerText = teslaQuotes[0];
                    tesQnum = 0;
                } else {
                    tesQnum++;
                    quote.innerText = teslaQuotes[tesQnum];
                }
            }
            break;
    }
}

function changeQuote() {
    quotes(option.innerText, "Next");
}

function getSelectedIndex(select) {
    for (var i = 0; i < select.options.length; i++) {
        option = select.options[i];
        if (option.selected === true) {
            break;
        }
    }
    if (options.options.selectedIndex != 0) {
        quotes(option.innerText, "Start");
        quoteWrapper.style.display = "block";
        btnShowQuote.style.display = "inline-block";
    } else {
        quoteWrapper.style.display = "none";
        btnShowQuote.style.display = "none";
    }
}

var quoteWrapper = document.querySelector("#displayQuote");
var quote = document.querySelector("#quote");
var option;

var options = document.querySelector("#quotePersons");
options.addEventListener("change", function() { getSelectedIndex(options); });

var btnShowQuote = document.querySelector("#nextQuote");
btnShowQuote.addEventListener("click", changeQuote);
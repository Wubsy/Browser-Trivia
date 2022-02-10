let questionData = {
    correct_answer: "",
    incorrect_answers: [],
    question: "",
    type: ""
}

let guessed
let questionNum = 0
//Get data passed from the previous page


//Not complete, may still cause issues
function fixHtmlChars(text) {
    return text
        .replaceAll("&iacute;", "í")
        .replaceAll("&aacute;", "á")
        .replaceAll("&deg;", "°")
        .replaceAll("&amp;", "&")
        .replaceAll("&gt;", ">")
        .replaceAll("&lt;", "<")
        .replaceAll("&quot;", "\"")
        .replaceAll("&#039;", "\'");
}

let addOnce = 0

let score = 0

// This needs to be done on start game as well
setScoreData()


window.onload = async () => {
    setScoreData(true)
    await newQuestion()
}

function addListeners() {
    if (addOnce >= 1) { return }
    Array.from(document.getElementsByClassName('multiple')).forEach(function (element) {
        element.addEventListener('click', function () {
            checkAnswer(element)
            guessed = true
        })
    })
    document.getElementById('next-question').addEventListener('click',  async function () {
        if(guessed) {
            if (questionNum !== 10) {await newQuestion()}
        } else {
            document.getElementById('guess-result').innerHTML = "You have to answer before going to the next question."
        }
    })
    addOnce++
}
/*
function onlyVisibleButtons(show, hide) {
    unHideElementByClassName(show)
    hideElementByClassName(hide)
}

function hideElement(element) {
    if (element.parentElement === "flex-box") {
        element.parentElement.setAttribute("hidden", "true")
    }
    element.setAttribute("hidden", "true")
}

function unHideElement(element) {
    if (element.parentElement === "flex-box") {
        element.parentElement.removeAttribute("hidden")
    }
    element.removeAttribute("hidden")
}*/

function checkAnswer(element) {
    if (element.innerHTML === fixHtmlChars(questionData[0].correct_answer)) {
        showResult(true)
    } else {
        showResult(false)
    }
}
/*
function checkTrueFalseAnswer(element) {
    guessed = true
    if (element.innerHTML === questionData[0].correct_answer) {
        showResult(true)
    } else {
        showResult(false)
    }
}

function hideElementByClassName(className) {
    Array.from(document.getElementsByClassName(className)).forEach(function (element) {
        hideElement(element)
    })
}

function unHideElementByClassName(className) {
    Array.from(document.getElementsByClassName(className)).forEach(function (element) {
        unHideElement(element)
    })
}
*/
async function newQuestion() {
    questionNum++

    guessed = false

    document.getElementById('guess-result').innerHTML = ""

    questionData = await getAPIData(localStorage.getItem('triviaKey'))
    document.getElementById('question-box').innerHTML = questionData[0].question

    //console.log(questionData)
    let answers = []
    answers.push(questionData[0].correct_answer)

    for (let i = 0; i < questionData[0].incorrect_answers.length; i++) {
        answers.push(questionData[0].incorrect_answers[i])
    }
    //shuffle the answers
    let shuffledAnswers = shuffleAnswers(answers)

    if (questionData[0].type === "multiple") {
        //onlyVisibleButtons('multiple', 'tf')
        document.getElementById('a').innerHTML = shuffledAnswers[0]
        document.getElementById('b').innerHTML = shuffledAnswers[1]
        document.getElementById('c').innerHTML = shuffledAnswers[2]
        document.getElementById('d').innerHTML = shuffledAnswers[3]
    } else {
        //onlyVisibleButtons('tf', 'multiple')
    }
    console.log(fixHtmlChars(questionData[0].correct_answer))
    await addListeners()
}

function shuffleAnswers(array) {
    //Array to be returned
    let newArray = []

    for (let i = 0; i < array.length; i++) {
        //If closer to 0, add to the beginning of the new array
        //If closer to 1, add to the end of the new array
        let result = Math.random()

        if (result >= .5) {
            newArray.push(array[i])
        } else {
            newArray.unshift(array[i])
        }
    }
    return newArray
}

function addScore() {
    score += 1
    setScoreString()
}

async function showResult(check) {
    if (check) {
        document.getElementById('guess-result').innerHTML = "Correct!"
        if (!guessed) {addScore()}
        await checkWin()
    } else {
        document.getElementById('guess-result').innerHTML = "Incorrect..."
        await checkWin()
    }
    document.getElementById('scoreData').innerHTML = score
}

function setScoreString() {
    localStorage.setItem("gameScore", score.toString())
}

function setScoreData(newGame) {
    if (newGame === true) {
        localStorage.setItem("gameScore", "0")
        score = 0
        return
    }
    if (localStorage.getItem("gameScore") === null || localStorage.getItem("gameScore") === "NaN") {
        localStorage.setItem("gameScore", "0")
        score = 0
    } else {
        score = parseInt(localStorage.getItem("gameScore"))
    }
}

async function win() {
    document.body.style.backgroundImage = "url('https://acegif.com/wp-content/gif/confetti-40.gif')"
    await new Promise(r => setTimeout(r, 10000)) //Wait 10 seconds
    document.body.style.backgroundImage = "" //Remove confetti
    window.location.reload(); //Reload the page
}

async function checkWin() {
    if (questionNum === 10) {
        let result = document.getElementById('guess-result').innerHTML
        if (score >= 6) {
            document.getElementById('guess-result').innerHTML = `${result} You Win!   Final score: ${score}/10`
            await win()
        } else {
            document.getElementById('guess-result').innerHTML = `${result} You lost...   Final score: ${score}/10`
            await new Promise(r => setTimeout(r, 5000))
            window.location.reload(); //Reload the page
        }
    }
}
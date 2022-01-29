let questionData = {
    correct_answer: "",
    incorrect_answers: [],
    question: "",
    type: ""
}

let addOnce = 0

let score
if (!!localStorage.getItem("gameScore")) {
    localStorage.setItem("gameScore", "0")
    score = 0
} else {
    score = parseInt(localStorage.getItem("gameScore"))
}

window.onload = async () => {
    await newQuestion()
}

function addListeners() {
    if (addOnce >= 1) { return }
    Array.from(document.getElementsByClassName('multiple')).forEach(function (element) {
        element.addEventListener('click', function () {
            checkAnswer(element)
        })
    })
    Array.from(document.getElementsByClassName('tf')).forEach(function (element) {
        element.addEventListener('click', function () {
            checkTrueFalseAnswer(element)
        })
    })
    addOnce++
}

function onlyVisibleButtons(show, hide) {
    unHideElementByClassName(show)
    hideElementByClassName(hide)
}

function hideElement(element) {
    element.setAttribute("hidden", "true")
}

function unHideElement(element) {
    element.removeAttribute("hidden")
}

function checkAnswer(element) {
    if (element.innerHTML === questionData[0].correct_answer) {
        showResult(true)
    } else {
        showResult(false)
    }
}

function checkTrueFalseAnswer(element) {
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

async function newQuestion() {
    document.getElementById('guess-result').innerHTML = ""

    questionData = await getAPIData(localStorage.getItem('triviaKey'))
    document.getElementById('question-box').innerHTML = questionData[0].question

    console.log(questionData)
    let answers = []
    answers.push(questionData[0].correct_answer)

    for (let i = 0; i < questionData[0].incorrect_answers.length; i++) {
        answers.push(questionData[0].incorrect_answers[i])
    }
    //shuffle the answers
    let shuffledAnswers = shuffleAnswers(answers)

    if (questionData[0].type === "multiple") {
        onlyVisibleButtons('multiple', 'tf')
        document.getElementById('a').innerHTML = shuffledAnswers[0]
        document.getElementById('b').innerHTML = shuffledAnswers[1]
        document.getElementById('c').innerHTML = shuffledAnswers[2]
        document.getElementById('d').innerHTML = shuffledAnswers[3]
    } else {
        onlyVisibleButtons('tf', 'multiple')
    }
    console.log("Page updated.")
    addListeners()
}

// https://bost.ocks.org/mike/shuffle/
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
    console.log(score)
    setScoreString()
    return
}

function showResult(check) {
    if (check) {
        document.getElementById('guess-result').innerHTML = "Correct!"
        addScore()
    } else {
        document.getElementById('guess-result').innerHTML = "Try again..."
    }
}

function setScoreString() {
    localStorage.setItem("gameScore", score.toString())
}
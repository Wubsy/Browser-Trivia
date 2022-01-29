let questionData = {
    correct_answer: "",
    incorrect_answers: [],
    question: "",
    type: ""
}

let multipleChoiceButtons = Array.from(document.getElementsByClassName('multiple'))
let trueFalseButtons =  Array.from(document.getElementsByClassName('tf'))
window.onload = async () => {
    await newQuestion()
}

function addListeners() {
    if (questionData[0].type === "multiple") {
        Array.from(document.getElementsByClassName('multiple')).forEach(function (element) {
            element.addEventListener('click', function () {
                checkAnswer(element)
            })
        })
    } else {
        Array.from(document.getElementsByClassName('tf')).forEach(function (element) {
            element.addEventListener('click', function () {
                checkTrueFalseAnswer(element)
            })
        })
    }
}

function hideElement(element) {
    element.setAttribute("hidden", "true")
}

function checkAnswer(element) {
    if (element.innerHTML === questionData[0].correct_answer) {
        console.log("Correct")
    } else {
        console.log("Nope")
    }
}

function checkTrueFalseAnswer(element) {
    if (element.innerHTML === questionData[0].correct_answer ) {
        console.log("Correct")
    } else {
        console.log("Incorrect")
    }
}

function hideElementByClassName(className) {
    Array.from(document.getElementsByClassName(className)).forEach(function (element) {
        hideElement(element)
    })
}

async function newQuestion() {
    questionData = await getAPIData(localStorage.getItem('triviaKey'))
    document.getElementById('question-box').innerHTML = questionData[0].question

    console.log(questionData)
    let answers = []
    answers.push(questionData[0].correct_answer)

    for (let i = 0; i < questionData[0].incorrect_answers.length; i++) {
        answers.push(questionData[0].incorrect_answers[i])
    }

    if (questionData[0].type === "multiple") {
        hideElementByClassName('tf')
        document.getElementById('a').innerHTML = answers[0]
        document.getElementById('b').innerHTML = answers[1]
        document.getElementById('c').innerHTML = answers[2]
        document.getElementById('d').innerHTML = answers[3]
    } else {
        hideElementByClassName('multiple')
    }
    addListeners()
}
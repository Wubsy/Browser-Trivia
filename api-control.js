async function getAPIData(prevToken) {
    let tokenCurrent
    let numOfQuestions = 1
    //let questions = []
    if(prevToken !== "") {
        let testOld = await fetch('https://opentdb.com/api.php?amount=1&token='+prevToken)
        let testOldResp = await testOld.json()
        if (testOldResp.response_code === 0) {
            tokenCurrent = prevToken
        } else {
            tokenCurrent = await getNewToken()
        }
    } else {
        tokenCurrent = await getNewToken()
    }

    //Request questions and answers https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
    let request = await fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&token=${tokenCurrent}&type=multiple`)
    let questionsResp = await request.json()

    let {response_code, results} = questionsResp

    return results
}

async function getNewToken() {
    //Request API key (token) https://opentdb.com/api_token.php?command=request
    //Only get once every 6 hours
    //Alternatively, check to see if previous token returns a response code of 0 (good) or 3 (invalid) 4 is empty
    let apiToken = await fetch('https://opentdb.com/api_token.php?command=request')
    let tokenResp = await apiToken.json()

    //Process response
    let {token_response_code, token_response_message, token} = tokenResp
    localStorage.setItem('triviaKey', token)

    return token
}

//Topics
/*
    General Knowledge
    Entertainment: Books
    Entertainment: Film
    Entertainment: Music
    Entertainment: Musicals & Theatres
    Entertainment: Television
    Entertainment: Video Games
    Entertainment: Board Games
    Entertainment: Comics
    Entertainment: Japanese Anime & Manga
    Entertainment: Cartoon & Animations
    Science & Nature
    Science: Computers
    Science: Mathematics
    Science: Gadgets
    Mythology
    Sports
    Geography
    History
    Politics
    Art
    Celebrities
    Animals
    Vehicles
 */

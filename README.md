# Browser-Trivia

## Sections
* [Initial Idea](#initial-idea)<br>
* [Issues](#issues)<br>
* [Features and Debugging](#features-and-debugging)<br>
  * [Things to know when playing](#things-to-know-when-playing)<br>
* [TODO](#todo)
* [Attributions](#attribution)


## Initial Idea
I intially had a landing page planned that would allow you to input what kind of questions you wanted to see.
That included true or false questions and multiple choice questions. I eventually decided against the ability to choose which questions you wanted to see because it transformed your chances from 1/4 to 1/2 even if you didn't know the answer.
I still plan to add a landing page but I wanted to make sure that the actual game was ready to play on time. The landing page will allow you to choose which categories for which you will receive questions.

## Issues
The first roadblock was related to getting the next question after answering the first question. This was resolved by throwing everything that was running onload into a function and then calling that function onclick from the 'Next Question' button.

The next problem I encountered was that I was adding the correct answer to the front of the incorrect answer array, given by the API. As this would always make the first button the correct answer, I needed a way to shuffle the answers that were assigned to the buttons.
I initially had planned to use the algorithm here: [https://bost.ocks.org/mike/shuffle/](https://bost.ocks.org/mike/shuffle/).
I instead decided to use a random number to decide whether an answer should be added to the beginning of the array or the end.

Another issue I didn't even realize I had until halfway through was that I was using an invalid falsy check to see if the previous token taken from localstorage was valid. The purpose of the token is to *try* to prevent you from getting the same question more than once in a game.
The game functions without an API token but it's still possible to get questions from previous games or even the current game.

One of the major issues I mostly resolved was the handling of unusual characters passed from the API. I tried to look for an easy and lightweight way to resolve things like `&quot;` to `"`.
I settled for setting up a function to change the characters with a replacer.

## Features and Debugging
One of the first thing you may notice when you open up the developer console is that the answer is printed to the console. As this is more of a demo, I wanted to make sure that anyone checking the features would be able to get a given score, regardless of if they actually know the answer.
The game uses flexboxes in the page to keep the buttons mostly on-screen so long as the page isn't extremely small. There is a point at which the question text will be too large to also show the buttons.

### Things to know when playing
You need to attempt to answer the question in order to get to the next question.

Don't look at the developer console when attempting a legitimate score.

All questions will be multiple choice. (4 possible answers shown)

Points will only be added to your score if you answer correctly and haven't already tried to answer the question.

There are 10 questions per game and you need a score of 6 or greater in order to win.

## TODO
- [ ] Add landing page.
- [ ] Allow for category selection.
- [ ] Show result of final question.
- [ ] Add more to TODO.



## Attribution
The only thing, as far as I'm aware, that I did not make was the confetti gif that would play if you were to win. This can be found here:
[https://acegif.com/](https://acegif.com/)

[Gif used](https://acegif.com/wp-content/gif/confetti-40.gif)

I used the API provided by [OpenTDB](https://opentdb.com/)<br>
[API page](https://opentdb.com/api_config.php)

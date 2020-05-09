const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
    questionCounterText.innerText = currentQuestionIndex + "/" + shuffledQuestions.length;
})


function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() =>(Math.random() - .5))
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}


function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {

    questionElement.innerText = question.question
    question.answers.forEach(answer =>  {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
} 

/*function finishstate() {
    clearInterval(document.body)
    finishButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)

        if(element.classList == 'correct'){
            incrementScore('CORRECT_BONUS')
        }
    }
}*/

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }else {
        startButton.innerText = 'restart'
        startButton.classList.remove('hide')
    }


}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
    if(element.classList == 'correct'){
        incrementScore('CORRECT_BONUS')
        score++;
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}




const questions = [
    {
         question: 'what is the minimum number of blades a fan can have',
        answers:[
            {text: '2', correct: true},
            {text: '3', correct: false},
            {text: '4', correct: false}
        ]
    },
    
    {
        question: 'on a TV remote, which is used to increase the volume',
        answers:[
            {text: '-', correct: false},
            {text: '>', correct: false},
            {text: '+', correct: true},
        ]
       
    },

    {
        question: 'who is the Father of Coding',
        answers:[
            {text: 'Mark Zuckerberg', correct: false},
            {text: 'Charles Babbage', correct: true},
            {text: 'Bill Gate', correct: false},
        ]
    },

    {
        question: 'what is the full meaning of css',
        answers:[
            {text: 'Cascad Style Sheet', correct: false},
            {text: 'Cascading Style Sheets', correct: true},
            {text: 'Cascading Style Shows', correct: false},
        ]
    },
    
    {
        question: 'what is the full meaning of HTML',
        answers:[
            {text: 'Hyper text markup lanugage', correct: false},
            {text: 'Hypertext Markup Language', correct: true},
            {text: 'Hyper Text Markup Lanugage', correct: false},
        ]
    }
    
    
]

incrementScore = num =>{
    score ++;
    scoreText.innerText = score
}
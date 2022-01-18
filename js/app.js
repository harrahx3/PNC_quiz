let quiz = [{
  question: "question 1 ?",
  possibleAnswers: ["a1", "a2", "a3", "a4"],
  correct: 2
}, {
  question: "question 2 ?",
  possibleAnswers: ["b1", "b2", "b3", "b4"],
  correct: 0
}];

function showQuiz() {
  quizElement.textContent = "";
  for (let index = 0; index < quiz.length; index++) {
    const question = quiz[index];
    let element = document.createElement('li');
    element.id = index;
    element.className = 'answersElement';
    let questionElement = document.createElement('span');
    questionElement.textContent = question.question;
    let answersElement = document.createElement('div');
    for (let indexAnswer = 0; indexAnswer < question.possibleAnswers.length; indexAnswer++) {
      let answerElement = document.createElement('input');
      answerElement.className = "possibleAnswer";
      answerElement.type = "radio";
      answerElement.name = index;
      answerElement.value = indexAnswer;
      answerElement.id = index.toString() +';' + indexAnswer.toString();
      let labelElement = document.createElement('label');
      labelElement.setAttribute('for', index.toString() +';' + indexAnswer.toString());
      labelElement.textContent = question.possibleAnswers[indexAnswer];
      answersElement.appendChild(answerElement);
      answersElement.appendChild(labelElement);
      answersElement.appendChild(document.createElement('br'))
    }
    element.appendChild(questionElement);
    element.appendChild(answersElement);
    quizElement.appendChild(element);
  }
}

function submitAnswers(event) {
  event.preventDefault();
  
  userScore = 0;
  let answersElements = document.getElementsByClassName('answersElement');
  for (let index = 0; index < answersElements.length; index++) {
    const questionID = answersElements[index].id;
    const correct = quiz[questionID].correct;
    let userAnswer = -1;
    for (const answer of answersElements[index].getElementsByClassName('possibleAnswer')) {
      answer.nextElementSibling.style.background = '';
      if (answer.checked) {
        userAnswer = answer.value;
        answer.nextElementSibling.style.background = 'red';
      }
      if (answer.value == correct) {
        answer.nextElementSibling.style.background = 'green';
      }
    }
    if (userAnswer == correct) {
      userScore++;
    }
    document.getElementById('showScore').textContent = "Your score is " + userScore + '/' + answersElements.length;
    console.log(questionID);
    console.log(correct);
    console.log(userAnswer);
    console.log(userScore);
  }
}

function addQuestion(event) {
  event.preventDefault();

  let newQuestion = document.getElementById('addQuestion').value;
  let newPossibleAnswers = [];
  for (const possibleAnswer of document.getElementsByClassName('addPossibleAnswer')) {
    newPossibleAnswers.push(possibleAnswer.value);
  }
  let correct = -1;
  for (const answer of document.getElementsByClassName('addCorrectAnswer')) {
    if (answer.checked) {
      correct = parseInt(answer.value);
    }
  }
  quiz.push({question: newQuestion, possibleAnswers: newPossibleAnswers, correct: correct});
  showQuiz();
  console.log(quiz);
}

let quizElement = document.getElementById('quiz');
let submitAnsmwersButton = document.getElementById('submitAnswers');
submitAnsmwersButton.addEventListener('click', submitAnswers);
showQuiz();

let addQuestionButton = document.getElementById('addQuestionButton');
addQuestionButton.addEventListener('click', addQuestion);
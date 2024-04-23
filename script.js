
function submitForm() {
  var username = document.getElementById('username').value;
  var rollNumber = document.getElementById('rollNumber').value;
  var batch = document.getElementById('batch').value;
  var section = document.getElementById('section').value;

  localStorage.setItem('username', username);
  localStorage.setItem('rollNumber', rollNumber);
  localStorage.setItem('batch', batch);
  localStorage.setItem('section', section);

  window.location.href = 'dashboard.html';
}

function displayUserInfo() {
  var username = localStorage.getItem('username');
  var rollNumber = localStorage.getItem('rollNumber');
  var batch = localStorage.getItem('batch');
  var section = localStorage.getItem('section');

  document.getElementById('usernameDisplay').textContent = username;
  document.getElementById('rollNumberDisplay').textContent = rollNumber;
  document.getElementById('batchDisplay').textContent = batch;
  document.getElementById('sectionDisplay').textContent = section;
}
const quizData = [
  {
    question: 'A set of intructions that tells the computer how to behave, what to do and derive at a solution to a particular problem is:',
    options: ['Algorithm', 'Pseudocode', 'Programming', 'Program'],
    answer: 'Program',
  },
  {
    question: 'A set of logically sequenced instructions that allows to find the solution to a problem is:',
    options: ['Algorithm', 'Pseudocode', 'Programming', 'Program'],
    answer: 'Algorithm',
  },
  {
    question: 'The six stages of program development in logical order are:',
    options: ['Define, Analyze, Write, Test, Document, Debug', 'Define, Analyze, Develop, Write, Test and Debug, Document', 'Define, Write, Develop, Analyze, Test, Document', 'Define, Develop, Write, Test, Document, Debug'],
    answer: 'Define, Analyze, Develop, Write, Test and Debug, Document',
  },
  {
    question: 'The CSS property used to control the elements font-size is :',
    options: ['text-style', 'text-size', 'font-size', 'None of the above'],
    answer: 'font-size',
  },
  {
    question: 'What does HTML stand for:',
    options: [
      'Hyperlinks and Text Markup Language',
      'Hyper Text Markup Language',
      'Hoom Tool Markup Language',
      'Hyper Text Markdown Language',
    ],
    answer: 'Hyper Text Markup Language',
  },
  {
    question: 'Which of the following generations of programming language executed code faster:',
    options: ['4GLs', '3rd', '2nd', '1st'],
    answer: '1st',
  },
  {
    question: 'How many sizes of headers are available in HTML by default:',
    options: [
      '4',
      '7',
      '6',
      '5',
    ],
    answer: '6',
  },
  {
    question: 'How to create an ordered list in HTML:',
    options: ['<ul>', '<ol>', '<href>', '<b>'],
    answer: '<ol>',
  },
  {
    question: 'CSS stands for:',
    options: [
      'Cascade style sheets',
      'Color and style sheets',
      'Cascading style sheets',
      'None of the above',
    ],
    answer: 'Cascading style sheets',
  },
  {
    question: 'The property in CSS used to change the background color of an element is:',
    options: ['bgcolor', 'color', 'background-color', 'All of the above'],
    answer: 'background-color',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
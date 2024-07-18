const quizData = [
  {
    question: 'What is the capital of India?',
    options: ['New Delhi', 'London', 'Berlin', 'Madrid'],
    answer: 'New Delhi',
  },
  {
    question: 'Which is a / are type of fruit? {MCQ}',
    options: ['Apple', 'Beans', 'Jackfruit', 'Pea'],
    answer: ['Apple', 'Jackfruit']
  },
  {
    question: 'Which country won the FIFA World Cup in 2018?',
    options: ['Brazil', 'Germany', 'France', 'Argentina'],
    answer: 'France',
  },
  {
    question: 'What is the tallest mountain in the world?',
    options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
    answer: 'Mount Everest',
  },
  {
    question: 'Which is the largest ocean on Earth?',
    options: [
      'Pacific Ocean',
      'Indian Ocean',
      'Atlantic Ocean',
      'Arctic Ocean',
    ],
    answer: 'Pacific Ocean',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Cu', 'Fe'],
    answer: 'Au',
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: [
      'Pablo Picasso',
      'Vincent van Gogh',
      'Leonardo da Vinci',
      'Michelangelo',
    ],
    answer: 'Leonardo da Vinci',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
    answer: 'Mars',
  },
  {
    question: 'What is the largest species of shark?',
    options: [
      'Great White Shark',
      'Whale Shark',
      'Tiger Shark',
      'Hammerhead Shark',
    ],
    answer: 'Whale Shark',
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
    answer: 'Lion',
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
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'quiz';
      checkbox.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(checkbox);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOptions = document.querySelectorAll('input[name="quiz"]:checked');
    const selectedAnswers = [];
    for (const option of selectedOptions) {
      selectedAnswers.push(option.value);
    }
  
    if (Array.isArray(quizData[currentQuestion].answer)) {
      
      if (selectedAnswers.every(answer => quizData[currentQuestion].answer.includes(answer)) &&
          selectedAnswers.length === quizData[currentQuestion].answer.length) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: selectedAnswers.join(', '),
          correctAnswer: quizData[currentQuestion].answer.join(', '),
        });
      }
    } else {
      if (selectedAnswers.includes(quizData[currentQuestion].answer)) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: selectedAnswers.join(', '),
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
    }
  
    currentQuestion++;
    for (const option of selectedOptions) {
      option.checked = false;
    }
  
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }



function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    
    if (score === 10) {
      
      resultContainer.innerHTML = `
        <h2>Congratulations! You scored 10/10!</h2>
        <p>You're a genius!  </p>
      `;
      resultContainer.style.backgroundImage = 'linear-gradient(to bottom, #FF69B4, #33CC33)';
      resultContainer.style.animation = 'disco 2s infinite';
    } else if (score === 0) {
     
      resultContainer.innerHTML = `
        <h2>Don't worry, you can do better!</h2>
        <p>Cheer up and try again!  </p>
      `;
      resultContainer.style.backgroundImage = 'linear-gradient(to bottom, #FFC107, #FF9800)';
      resultContainer.style.animation = 'otivate 2s infinite';
    } else {
      resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    }
  }
  
  
  resultContainer.style.animationDuration = '2s';
  resultContainer.style.animationIterationCount = 'infinite';
  
 
  


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
'use strict'

// Todo:
// 1. Move submit button to right corner of nav bar.
// 2. Remove restart
// 3. Fix spacing on result section.

const incorrectColor = '#EA4335';
const correctColor = '#34A853';
const notSelectedColor = '#9AA0A6';

const STORE = {
  currentQuestion: 0,
  state: 'start',
  correct: 0,
};

function checkAnswer() {
  const selected = $('input[name=q1]:checked').val();
  const correct = QUESTIONS[STORE.currentQuestion].correctAnswer;
  const result = (selected === correct);
  STORE.correct += result;
  return result;
}

function showCorrect(selectedCorrectly) {
  if (selectedCorrectly === true) {
    $('input[name=q1]').parent().css('background-color', notSelectedColor);
    $('input[name=q1]:checked').parent().css('background-color', correctColor);

  } else {
    $('input[name=q1]').parent().css('background-color', notSelectedColor);
    $('input[name=q1]:checked').parent().css('background-color', incorrectColor);
    $('input[name=q1][correct=true]').parent().css('background-color', correctColor);
  }
}

function generateQuestionTemplate(question) {
  const shuffledAnswers =  _.shuffle(question.answers);
  const correctList = shuffledAnswers.map(a => a === question.correctAnswer);
  return `
        <h2 class="question">${question.text}</h2>
        <form>
          <label for="option-1">
          <input type="radio" name="q1" id="option-1" value="${shuffledAnswers[0]}" correct="${correctList[0]}">
          <span>${shuffledAnswers[0]}</span></label>
          <label for="option-2">
          <input type="radio" name="q1" id="option-2" value="${shuffledAnswers[1]}" correct="${correctList[1]}">
          <span>${shuffledAnswers[1]}</span></label>
          <label for="option-3">
          <input type="radio" name="q1" id="option-3" value="${shuffledAnswers[2]}" correct="${correctList[2]}">
          <span>${shuffledAnswers[2]}</span></label>
          <label for="option-4">
          <input type="radio" name="q1" id="option-4" value="${shuffledAnswers[3]}" correct="${correctList[3]}">
          <span>${shuffledAnswers[3]}</span></label>
        </form>
      </div>
  `;
}

function getNavButton() {
  if (STORE.state === 'submitted') {
    return '<button class="js-next-question" type="button">Next Question</button>';
  } else if (STORE.state === 'question') {
    return '<button class="js-submit-answer" type="button">Submit Answer</button>';
  } else if (STORE.state === 'results') {
    return '<button class="js-view-results" type="button">View Results</button>';
  } else {
    return null;
  }

}

function generateHeaderResultsTemplate() {
  const qText = `${STORE.currentQuestion + 1} / ${QUESTIONS.length}`;
  const correctText = `Score: ${STORE.correct}`;
  let resultsHtml = `
      <h1>History Quiz</h1>
      <ul class="quiz-results">
        <li>Question ${qText}</li>
        <li>${correctText}</li>
      </ul>
  `;
  return resultsHtml;
}


function generateQuizNavTemplate() {
  const qText = `${STORE.currentQuestion + 1} / ${QUESTIONS.length}`;
  const correctText = `Score: ${STORE.correct}`;
  let navHtml = `
        <div class="col-12 quiz-nav-item">${getNavButton()}</div>
    </div>
  `;
  return navHtml;
}

function generateResultsTemplate() {
  return `<p>Thanks for playing, you got ${STORE.correct} questions right.</p>`;
}

function renderFinalResults() {
  STORE.state = 'results';
  const resultsHtml = generateResultsTemplate();
  $('.quiz-nav').toggleClass('hidden');
  $('.question-container').html(resultsHtml);
}

function renderQuestion() {
  STORE.state = 'question';
  const question = QUESTIONS[STORE.currentQuestion];
  const questionHtml = generateQuestionTemplate(question);
  const navHtml = generateQuizNavTemplate();
  const resultsHtml = generateHeaderResultsTemplate();
  $('.question-container').html(questionHtml);
  $('.quiz-nav').html(navHtml);
  $('.header-bar').html(resultsHtml);
}

function handleStartButtonClicked() {
  // Once the user begins the quiz, renders the question section.
  $('.js-start-quiz').click(event => {
    $('.quiz-nav').toggleClass('hidden');
    $('.starting-container').toggleClass('hidden');
    $('.question-container').toggleClass('hidden');
    renderQuestion();
  });
}

function handleResetButtonClicked() {
  $('.quiz-nav').on('click', '.js-reset-quiz', event => {
    location.reload();
  });
}

function handleQuestionSubmit() {
  $('.quiz-nav').on('click', '.js-submit-answer', event => {
    if ($('input').is(':checked') === false) {
      alert('Please select an answer.');
      return;
    } else if (STORE.currentQuestion + 1 < QUESTIONS.length) {
      STORE.state = 'submitted';
    } else {
      STORE.state = 'results';
    }
    const selectedCorrectly = checkAnswer();
    const resultsHtml = generateHeaderResultsTemplate();
    const nav = generateQuizNavTemplate();
    $('.quiz-nav').html(nav);
    $('.header-bar').html(resultsHtml);
    showCorrect(selectedCorrectly);
  });
}

function handleNextQuestionClicked() {
  $('.quiz-nav').on('click', '.js-next-question',  event => {
      STORE.currentQuestion++;
      renderQuestion();
    });
}

function handleViewResultsClicked() {
  $('.quiz-nav').on('click', '.js-view-results', renderFinalResults);
}

function renderQuiz() {
  handleStartButtonClicked();
  handleResetButtonClicked();
  handleQuestionSubmit();
  handleNextQuestionClicked();
  handleViewResultsClicked();
}

$(renderQuiz);

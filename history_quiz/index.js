'use strict'

function toggleStartPage() {
  //Shows a page asking user if they're ready to begin.
  $('.starting-container').toggleClass('hidden');
  $('.question-container').toggleClass('hidden');
  $('.quiz-nav').toggleClass('hidden');
}

function handleStartButtonClicked() {
  // Once the user begins the quiz, renders the question section.
  $('.js-start-quiz').click(event => toggleStartPage());
}

function handleResetButtonClicked() {
  // Resets the quiz and returns to the start screen.
  // TODO: Reset quiz state to beginning.
  $('.js-reset-quiz').click(event => toggleStartPage());
}

function handleQuestionSubmit() {
  // Checks submitted answer against correct answer and notifies user.
  // Updates correct count & question count.
  // Also changes submit button to "next question" button
  $('.js-submit-answer').click(event => {
    // Need to check for whether an answer is selected...
    console.log('Question submitted');
    $('.js-submit-answer').toggleClass('hidden');
    $('.js-next-question').toggleClass('hidden');
    alert('You submitted a question and got it.... (right/wrong)');
  });
}

function handleNextQuestionClicked() {
  // Gets next question from array, and renders next quiz quesion.
  // Changes "next question" button to submit button.
  $('.js-next-question').click(event => {
    // Need to check for whether an answer is selected.
    console.log('Moving to next question.');
    $('.js-submit-answer').toggleClass('hidden');
    $('.js-next-question').toggleClass('hidden');
  });
}

function renderQuiz() {
  handleStartButtonClicked();
  handleResetButtonClicked();
  handleQuestionSubmit();
  handleNextQuestionClicked();
}

$(renderQuiz);

'use strict'


function toggleStartPage() {
	//Shows a page asking user if they're ready to begin.
	$('.starting-container').toggleClass('hidden');
	$('.question-container').toggleClass('hidden');
	$('.quiz-nav').toggleClass('hidden');
}

function handleStartButtonClicked() {
	// Once the user begins the quiz, renders the question section. 
	$('.js-start-quiz').click(event => toggleStartPage())
}

function handleResetButtonClicked() {
	// Resets the quiz and returns to the start screen.
	$('.js-reset-quiz').click(event => toggleStartPage())
}

function handleAnswerSelected() {
	//
}
function handleQuestionSubmit() {
	//
}

function renderQuiz() {
	handleStartButtonClicked();
	handleResetButtonClicked();
	// handleAnswerSelected();
	// handleQuestionSubmit();
}


$(renderQuiz);
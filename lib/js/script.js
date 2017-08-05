$('#inputBox').keypress(function(event) { 
    if (event.keyCode == 13) {
    	welcomeUser();
    	playerTurn();
    }
})

$('#submitBtn').click(function() {
	welcomeUser();
	playerTurn();
})


$('#game').on('click', '#rock', function() {
	//alert("You chose rock!")
	playIt('Rock');
})

$('#game').on('click', '#paper', function() {
	//alert("You chose paper!")
	playIt('Paper');
})

$('#game').on('click', '#scissors', function() {
	//alert("You chose scissors!");
	playIt('Scissors');
})

function playIt(p1) {
	changePrompt();
	hideOtherBtns(p1);
	$('#game').off();
	let compChoice = computerTurn();
	let gameResult = determineWinner(p1,compChoice);
	showResults(gameResult);
}


function welcomeUser() {
	let username = $('#inputBox').val();
	//alert(username);
	$('#nameForm').remove();
	if (username === "") {
		$('#welcome').append(`<h3>Let's play!</h3>`)
	} else {
		$('#welcome').append(`<h3>Let's play, ${username}!</h3>`)
	}
}

function changePrompt() {
	$('#prompt').text('You chose');
}

function hideOtherBtns(wpn) {
	if (wpn === 'Rock') {
		$('#scissors').remove();
		$('#paper').remove();
	} else if (wpn === 'Paper') {
		$('#rock').remove();
		$('#scissors').remove();
	} else if (wpn === 'Scissors') {
		$('#rock').remove();
		$('#paper').remove();
	}
}

function playerTurn() {
	$('#game').append(
		`<div class='container'>
			<h3 id="prompt">Choose your weapon!</h3>
		</div>
		<div class='container'>
			<div class="btn-group" role="group" aria-label="Basic example">
				<button type="button" id="rock" class="btn btn-default wpn">Rock</button>
				<button type="button" id="paper" class="btn btn-default wpn">Paper</button>
				<button type="button" id="scissors" class="btn btn-default wpn">Scissors</button>
			</div>
		</div>`
		)
}


function computerTurn() {
	let choice = randomChoice();
	$('#game').append(
		`<div class='container'>
			<h3 id="prompt">I chose</h3>
			<button type="button" id="choice" class="btn btn-default wpn">${choice}</button>
		</div>
		<div class='container'>
		</div>`
		)
	return choice;
}

function randomChoice() {
	let choices = ['Rock','Paper','Scissors'];
	let num = Math.floor( Math.random() * 3) 
	return choices[num];
}

function determineWinner(usr,cmp) {
	let beats = {
		'Rock': 'Paper',
		'Paper': 'Scissors',
		'Scissors': 'Rock'
	}
	if (usr == cmp) {
		return 'tie';
	} else if (usr === beats[cmp]) {
		// $('#game').append(`<div class='container'><h3>${usr} beats ${cmp}!</h3></div>`)
		return 'win';
	} else if (cmp === beats[usr]) {
		// $('#game').append(`<div class='container'><h3>${cmp} beats ${usr}!</h3></div>`)
		return 'lost';
	}
}

function showResults(result) {
	switch(result) {
		case 'tie': 
			$('#game').append(`<div class='container'><h2 class='result'>We tied!</h2></div>`);
			break;
		case 'win':
			$('#game').append(`<div class='container'><h2 class='result'>You win!</h2></div>`);
			break;
		case 'lost':
			$('#game').append(`<div class='container'><h2 class='result'>You lose!</h2></div>`);
			break;
	}
}

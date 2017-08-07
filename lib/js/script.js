let gamesWon = 0;
let username = "";

function getUserInfo() {
	console.log(username.ignoreCase);
	let userInfo = firebase.database().ref('users/' + username);

	userInfo.on('value', function(snapshot) {
		if (snapshot.val() === null) {
			userInfo.set({
			    "score": 0
			});
		} else {
			gamesWon = snapshot.val().score;
			displayScore();
			console.log(gamesWon);
		}
	});
}

function sendNewScore() {
	console.log(username.ignoreCase);
	let userInfo = firebase.database().ref('users/' + username);

	userInfo.set({
		"score": gamesWon
	});
}

// console.log(gamesWon);
// firebase.database().ref('users/' + 'sb').set({
//     "score": 0
// });
// firebase.database().ref('users/' + 'rv').set({
//     "score": 5
// });


$(function () {
    $('input').blur();
});

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

// $('#game').on('click', '#playAgain', function() {
// 	//alert("You chose scissors!");
// 	setNextRound();
// })

function playIt(p1) {
	changePrompt();
	hideOtherBtns(p1);
	$('#game').off();
	let compChoice = computerTurn();
	let gameResult = determineWinner(p1,compChoice);
	showResults(gameResult);
	$
}


function activateButtons() {
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
}

function welcomeUser() {
	username = $('#inputBox').val();
	getUserInfo(username);
	//alert(username);
	$('#nameForm').remove();
	if (username === "") {
		$('#welcome').append(`<h3>Let's play!</h3>`)
	} else {
		$('#welcome').append(`<h3>Let's play, ${username}!</h3>`)
	}
	$('#scoreboard').removeClass('hide')
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
		`
		<div class='playerBoard'>
			<div class='container'>
				<h3 id="prompt">Choose your weapon!</h3>
			</div>
			<div class='container'>
				<div class="btn-group" role="group" aria-label="Basic example">
					<button type="button" id="rock" class="btn btn-default wpn">Rock</button>
					<button type="button" id="paper" class="btn btn-default wpn">Paper</button>
					<button type="button" id="scissors" class="btn btn-default wpn">Scissors</button>
				</div>
			</div>
		</div>`
		)
}


function computerTurn() {
	let choice = randomChoice();
	$('#game').append(
		`<div id='compChoice' class='container'>
			<h3 id="prompt">I chose</h3>
			<button type="button" id="choice" class="btn btn-default wpn">${choice}</button>
		</div>
		`
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
		displayScore();
		return 'tie';
	} else if (usr === beats[cmp]) {
		// $('#game').append(`<div class='container'><h3>${usr} beats ${cmp}!</h3></div>`)
		gamesWon += 1;
		displayScore();
		sendNewScore(username);
		return 'win';
	} else if (cmp === beats[usr]) {
		// $('#game').append(`<div class='container'><h3>${cmp} beats ${usr}!</h3></div>`)
		displayScore();
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
	promptPlayAgain();
}

function displayScore() {
	$('#score').text(`${gamesWon}`);
}

function promptPlayAgain() {
	$('.result').after(`
		<button type="button" id="playAgain" class="btn btn-default">Play Again</button>
		`)
	$('#playAgain').on('click', function() {
		//alert("You chose scissors!");
		setNextRound();
	})
}

function setNextRound() {
	$('#game').empty();
	activateButtons();
	playerTurn();

}


// //button executes this function
// function updateDB(){
// 	let username = $('#inputBox').val();
//     // console.log(name + " : " + message);

//     //Update database here
//     var value = {
//     	NAME : name,
//     	MESSAGE : message
//     }
//     database.push(value);

// }

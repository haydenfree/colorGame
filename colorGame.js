var numberofSquares = 6;
var colors = [];
var pickedColor = "";
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

resetButton.addEventListener("click", function(){
	reset();
});

function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selectedButton");
			modeButtons[1].classList.remove("selectedButton");
			this.classList.add("selectedButton");
			this.textContent === "Easy" ? numberofSquares = 3: numberofSquares = 6;
			reset();
		});
	}
}


function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		//Add the intial colors to squares
		squares[i].style.background = colors[i];
		//Add the click listenered to squares
		squares[i].addEventListener("click", function(){
			//Grab the color of the clicked square and then compare
			//it to the pickedColor
			var clickedColor = this.style.background;
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
				resetButton.textContent = "Play again!";
			}else{
				this.style.background = "#232323";
				messageDisplay.textContent = "Try again!";
			}
		});
	}
}

function reset(){
	//generate all new colors, pick a new random color array
	//then change color of squares;
	colors = generateRandomColors(numberofSquares);
	pickedColor = pickColor();
	//change color display
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = colors[i];
	}
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//Change the colors of the squares, accounting for easy mode
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

function changeColors(colorString){
	//Loop through all squares and change to
	//match the given color
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = colorString;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(size){
	//Create an array and then add 'size' number of colors.
	//Then return array
	var arr = [];
	for (var i = 0; i < size; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	//Pick a red, green and blue from 0-255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
var formElement = document.getElementById('myForm');
var inputElement = document.getElementById('myInput');
var	jsonFile;

var buttons = [];
buttons.push(document.getElementById("button0"));
buttons.push(document.getElementById("button1"));
buttons.push(document.getElementById("button2"));
buttons.push(document.getElementById("button3"));
buttons.push(document.getElementById("button4"));
buttons.push(document.getElementById("button5"));
buttons.push(document.getElementById("button6"));
buttons.push(document.getElementById("button7"));
buttons.push(document.getElementById("button8"));

var buttonTextLong = [
	["Intro"],
	["Verse 1"],
	["Verse 2"],
	["Chorus 1"],
	["Verse 3"],
	["Chorus 2"],
	["Bridge"],
	["Instrumental"],
	["Outro"]
];

var buttonTextShort = [
	["I"],
	["V1"],
	["V2"],
	["C1"],
	["V3"],
	["C2"],
	["B"],
	["Instr."],
	["O"]
];

//initializing the screen and showing correct content
function showContent() {
	var loadingScreen = document.getElementById("loading-screen");
	var content = document.getElementById("content");
	var overlay = document.getElementById("overlay");
	// Hide the loading screen
	loadingScreen.style.display = "none";
	// Show the content
	overlay.style.display = "block";
	content.style.display = "block";
	resizeContent();
	resetGIFs();
}

//create overlay with "click to play"
var normal = document.getElementById("normalText");
var tutorialText = document.getElementById("tutorialText");


normal.addEventListener("click", function() {
  // Hide the overlay when clicked
  overlay.style.display = "none";
  toneStart(0, 0);
});

tutorialText.addEventListener("click", function() {
	// Hide the overlay when clicked
	overlay.style.display = "none";
	startTutorial();
  });
  

//makes selected button light up
function activateButton(index) {
	for (var i = 0; i < buttons.length; i++)
	  buttons[i].classList.remove("active");
	//clear counter if it is running
	if (intervalID)
		clearInterval(intervalID);
	buttons[index].classList.add("active");  
	// Start seconds counter at the corresponding start_time
	counter = 0;
	startCounter(index, 0);
}

//Event listener for input form
inputElement.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default newline behavior
    var inputValue = inputElement.value;
    inputElement.value = ''; // Clear the input field
	loadData(inputValue);
  }
});

function changeButtons(which) {
	// Get the button container element
	var buttonContainer = document.getElementById("bContainer");
	var coolButton = document.getElementsByClassName("cool-button");

	if (which == 1)
	{
		for (let i = 0; i < buttons.length; i++)
		{	
			if (i != currentSongPart || i == 7)
			{
				buttons[i].textContent = buttonTextShort[i];
			}
			buttons[i].addEventListener("mouseover", function() {
				buttons[i].textContent = buttonTextLong[i];				
				buttons[i].style.whiteSpace = "nowrap";
				buttons[i].style.textAlign = "center";
			});
			buttons[i].addEventListener("mouseout", function() {
				if (i != currentSongPart || i == 7)
					buttons[i].textContent = buttonTextShort[i];
			});
		}
		buttonContainer.style.paddingTop = "5";

	}
	else
	{
		for (let i = 0; i < buttons.length; i++)
		{	
			buttons[i].textContent = buttonTextLong[i];
		}
		buttonContainer.style.textAlign = "left";
		buttonContainer.style.position = "relative";
		buttonContainer.style.paddingTop = "40px";
		// buttonContainer.style.right = "0";
		buttonContainer.style.flexDirection = "row";
	}
}

var isWideScreen = 1;

function resizeContent() {
    var container = document.getElementById('content');
    var gifCont = document.getElementsByClassName('gif-container');
	var vidCont = document.getElementById('vidCont');

	if (container.offsetHeight > container.offsetWidth) {
		changeButtons(1);
		// Change parameters for height > width
		for (let i = 0; i < gifCont.length; i++)
		{
	  		gifCont[i].style.width = '48%';
      		gifCont[i].style.height = '28vh';
		}
		isWideScreen = 0;
		vidCont.style.width = '48%';
      	vidCont.style.height = '28vh';
    } else {
		changeButtons(2);
		for (let i = 0; i < gifCont.length; i++)
		{
	  		gifCont[i].style.width = '32%';
      		gifCont[i].style.height = '40vh';
		}
		isWideScreen = 1;
		vidCont.style.width = '32%';
      	vidCont.style.height = '40vh';
    }
	changeTutorialScreen();
  }

var midTutorial = 0;
function changeTutorialScreen() {
	if (midTutorial == 0)
		return;
	console.log("iswidescreen: ", isWideScreen);
	var tContainer = document.getElementById("tutorialContainer");
    var tText = document.getElementById("tText");    // Update container styles
	
	tContainer.style.position = "fixed";
	tContainer.style.transform = "translate(-50%, -50%)";
	if (isWideScreen == 1)
	{
		tContainer.style.left = "48%";
		tContainer.style.top = "20%"; // Adjust the top position for centering
		tContainer.style.width = "30%";
	}
	if (isWideScreen == 0)
	{
		tContainer.style.left = "75%";
		tContainer.style.top = "13%";
		tText.style.fontSize = "25px";
	}
}

// Call the function initially
resizeContent();

// Add event listener for window resize
window.addEventListener('resize', resizeContent);
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
var tutorial = document.getElementById("tutorialText");


normal.addEventListener("click", function() {
  // Hide the overlay when clicked
  overlay.style.display = "none";
  toneStart(0, 0);
});

tutorial.addEventListener("click", function() {
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
    console.log('Input Value:', inputValue);
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
		// Set the CSS properties
		// for (i = 0; i < coolButton.length; i++)
		// {
		// 	coolButton[i].style.backgroundColor = "transparent";
		// 	coolButton[i].style.pointer = "hover";
		// }
		buttonContainer.style.paddingTop = "10";
	}
	else
	{
		// // Set the CSS properties
		// for (i = 0; i < coolButton.length; i++)
		// {	
		// 	coolButton[i].style.backgroundColor = "rgb(78, 114, 123)";
		// 	coolButton[i].style.pointer = "hover";
		// }
		buttonContainer.style.textAlign = "left";
		buttonContainer.style.position = "relative";
		buttonContainer.style.paddingTop = "40px";
		// buttonContainer.style.right = "0";
		buttonContainer.style.flexDirection = "row";
	}
}

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
		vidCont.style.width = '48%';
      	vidCont.style.height = '28vh';
    } else {
		changeButtons(2);
		for (let i = 0; i < gifCont.length; i++)
		{
	  		gifCont[i].style.width = '32%';
      		gifCont[i].style.height = '40vh';
		}
		vidCont.style.width = '32%';
      	vidCont.style.height = '40vh';
    }
  }

// Call the function initially
resizeContent();

// Add event listener for window resize
window.addEventListener('resize', resizeContent);
var audioFiles = ['content/Bass_V1.mp3',
'content/Bass_V2.mp3',
'content/Drums_V1.mp3',	
'content/Drums_V2.mp3',	
'content/Git_V1.mp3',	
'content/Git_V2.mp3',	
'content/Horns_V1.mp3',	
'content/Horns_V2.mp3',	
'content/Rhodes_V1.mp3',
'content/Rhodes_V2.mp3',
'content/Vox.mp3'];

var instrumentArrays = [
	["Bass_V1_01.gif", "Bass_V1_02.gif", "Bass_V1_03.gif", "Bass_V1_04.gif", "Bass_V1_05.gif", "Bass_V1_06.gif", "Bass_V1_07.gif", "Bass_V1_08.gif", "Bass_V1_09.gif"],
	["Bass_V2_01.gif", "Bass_V2_02.gif", "Bass_V2_03.gif", "Bass_V2_04.gif", "Bass_V2_05.gif", "Bass_V2_06.gif", "Bass_V2_07.gif", "Bass_V2_08.gif", "Bass_V2_09.gif"],
	["Drums_V1_01.gif", "Drums_V1_02.gif", "Drums_V1_03.gif", "Drums_V1_04.gif", "Drums_V1_05.gif", "Drums_V1_06.gif", "Drums_V1_07.gif", "Drums_V1_08.gif", "Drums_V1_01.gif"],
	["Drums_V2_01.gif", "Drums_V2_02.gif", "Drums_V2_03.gif", "Drums_V2_04.gif", "Drums_V2_05.gif", "Drums_V2_06.gif", "Drums_V2_07.gif", "Drums_V2_08.gif", "Drums_V2_09.gif"],
	["Git_V1_01.gif", "Git_V1_02.gif", "Git_V1_03.gif", "Git_V1_04.gif", "Git_V1_05.gif", "Git_V1_06.gif", "Git_V1_07.gif", "Git_V1_08.gif", "Git_V1_09.gif", "Git_V1_10.gif"],
	["Git_V2_01.gif", "Git_V2_02.gif", "Git_V2_03.gif", "Git_V2_04.gif", "Git_V2_05.gif", "Git_V2_06.gif", "Git_V2_07.gif", "Git_V2_08.gif", "Git_V2_09.gif", "Git_V2_10.gif"],
	["Horns_V1_01.gif", "Horns_V1_02.gif", "Horns_V1_03.gif", "Horns_V1_04.gif", "Horns_V1_05.gif", "Horns_V1_06.gif", "Horns_V1_07.gif", "Horns_V1_08.gif", "black.jpeg"],
	["black.jpeg", "Horns_V2_02.gif", "Horns_V2_03.gif", "Horns_V2_04.gif", "Horns_V2_05.gif", "Horns_V2_06.gif", "Horns_V2_07.gif", "Horns_V2_08.gif", "black.jpeg"],
	["Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif"],
	["Rhodes_V2_01.gif", "Rhodes_V2_02.gif", "Rhodes_V2_03.gif", "Rhodes_V2_04.gif", "Rhodes_V2_05.gif", "Rhodes_V2_06.gif", "Rhodes_V2_07.gif", "Rhodes_V2_08.gif", "Rhodes_V2_09.gif"],
];

var instrumentNames = [
	"bass",
	"bass2",
	"drums",
	"drums2",
	"git",
	"git2",
	"horns",
	"horns2",
	"rhodes",
	"rhodes2"
];

var currentGIFs = [];

var saveStates = Array.from({ length: 9 }, () => Array(10).fill(0));


var startTimes = [1.75, 26, 58, 79.5, 101, 138, 159, 202, 226];

var players = [];
var volumes = [];
var initialized = 0;
var intervalID;
var counter = 0;
var currentSongPart = 0;

// Load audio files
var audioPromise = Promise.all(audioFiles.map(file => Tone.loaded(file)));

// Load video file
var videoPromise = new Promise((resolve, reject) => {
	var voxVid = document.getElementById("voxVid");
	voxVid.onloadeddata = resolve;
	voxVid.onerror = reject;
  });
  
  Promise.all([audioPromise, videoPromise])
	.then(() => {
	  // Create Tone.Player instances for each audio file
	  for (let i = 0; i < audioFiles.length; i++) {
		const player = new Tone.Player(audioFiles[i]);
		players.push(player);
  
		const volume = new Tone.Gain();
		volumes.push(volume);
  
		player.connect(volume);
		volume.connect(Tone.Destination);
	  }
  
	  // All audio files and the video file are loaded, hide the loading screen and show the content
	  setTimeout(showContent, 2000);
	})
	.catch(error => {
	  // Handle error if any of the files fail to load
	  console.error("Error loading files:", error);
	});

function putGIFs()
{
	var newGIF;
	for (i = 0; i < instrumentNames.length; i++)
	{
		newGIF = document.getElementById(instrumentNames[i]);
		newGIF.src = "/content/gifs/" + instrumentArrays[i][currentSongPart];
		currentGIFs.push(newGIF);
	}
}

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

function activateButton(index) {
	// Remove "active" class from all buttons
	for (var i = 0; i < buttons.length; i++) {
	  buttons[i].classList.remove("active");
	}
	if (intervalID)
	{
		clearInterval(intervalID);
	}
  
	// Add "active" class to the clicked button
	buttons[index].classList.add("active");
  
	// Start seconds counter at the corresponding start_time
	counter = 0;
	startCounter(index, 0);
  }

function goToSavedState(index){
	console.log("Here");
	for (i = 0; i < saveStates[index].length; i++)
	{
		if (saveStates[index][i] == 0) {
			console.log('muting track', i);
			muteTrack(i);
			currentGIFs[i].style.display = "none";
		}
		else {
			unmuteTrack(i);
			currentGIFs[i].style.display = "block";
		}
	}
}

function startCounter(index) {
	intervalID = setInterval(function() {
	  counter += 0.1;
	//   console.log(counter);
  
	  // Check if the counter reached the desired duration
	  if (counter >= startTimes[index + 1] - startTimes[index]) {
		clearInterval(intervalID);
		// Perform any action you want when the counter reaches the start_time
		console.log("Counter reached next state");
		activateButton(index + 1);
		currentSongPart = index + 1;
		putGIFs();
		goToSavedState(index + 1);
	  }
	}, 100);
}

// Function to schedule audio playback
function scheduleAudio(startTime, startPoint) {
	console.log("AUDIO SCHEDULED");
  
	for (let i = 0; i < players.length; i++) {
	  var elapsed = Tone.now() - startTime;
	  const playerStartTime = startTime + elapsed;
	  players[i].start(playerStartTime, startPoint);
	  
	  if (i === players.length - 1) {
		playVideo('voxVid', startPoint + 0.15);
	  }
	}
}

//start tone on user action
function toneStart(songPart) {
	currentSongPart = songPart;
	Tone.start();
	if (initialized == 1)
	{
		goToSavedState(songPart);
	}
	setUpSongPart(songPart);
  }

// Function to mute a specific track
function muteTrack(trackIndex) {
	console.log("track muted: ", trackIndex);
	saveStates[currentSongPart][trackIndex] = 0;
	volumes[trackIndex].gain.value = 0; // Set the gain value to 0 to mute the track
 }
  
  // Function to unmute a specific track
function unmuteTrack(trackIndex) {
	console.log("track unmuted: ", trackIndex);
	saveStates[currentSongPart][trackIndex] = 1;
	volumes[trackIndex].gain.value = 1; // Set the gain value to 1 to unmute the track
}

function muteSwitch(trackIndex)
{
	if (volumes[trackIndex].gain.value == 1)
	{
		muteTrack(trackIndex);
		unmuteTrack(trackIndex + 1);
	}
	else if (volumes[trackIndex + 1].gain.value == 1)
	{
		muteTrack(trackIndex + 1);
	}
	else
	{
		unmuteTrack(trackIndex);
	}
}

//Receives the songpart and does the rest of the work
function setUpSongPart(songPart)
{
	putGIFs();
	if (initialized == 0) {
		for (let i = 0; i < players.length; i++) {
			if (i % 2 == 1)
			{
				muteTrack(i);
			}
			else {
				unmuteTrack(i);
			}
		}
		//initializing saved states to correct values
		for (let i = 0; i < saveStates.length; i++) {
			const subArray = saveStates[i];
			for (let j = 0; j < subArray.length; j++) {
			  if (j % 2 == 0) {
				subArray[j] = 1;
			  }
			}
		  }
		initialized = 1;
	}
	//activate the corresponding song part button
	activateButton(songPart);
	// Start the Tone.Transport
	Tone.Transport.start();
	var startTime = Tone.now() + 0.1;
	//schedule audio for playback
	scheduleAudio(startTime, startTimes[songPart], songPart);
}

function toggleGIFs(id1, id2) {
	var gif1 = document.getElementById(id1);
	var gif2 = document.getElementById(id2);

	if (gif1.style.display === 'block') {
	  gif1.style.display = 'none';
	  gif2.style.display = 'block';
	} else if (gif2.style.display === 'block'){
	  gif1.style.display = 'none';
	  gif2.style.display = 'none';
	}
	else {
	  gif1.style.display = 'block';
	}
}

var gifOff = ['drums2', 'bass2', 'horns2', 'rhodes2', 'git2'];
var gifOn = ['drums', 'bass', 'horns', 'rhodes', 'git'];
function resetGIFs() {
	var	gifID;
	for (i = 0; i < gifOff.length; i++)
	{
		gifID = document.getElementById(gifOff[i]);
		gifID.style.display = 'none';
		gifID = document.getElementById(gifOn[i]);
		gifID.style.display = 'block';
	}
}

var pauseTime;
var isPaused = false;

// Pause or resume all audio files
function pauseTracks() {
	if (intervalID)
	{
		clearInterval(intervalID);
	}
	if (isPaused == false) {
    	pauseTime = startTimes[currentSongPart] + counter;
		players.forEach(function(player) {
			player.stop();
    	});
    	pauseVideo('voxVid');
    	isPaused = true;
  	}
 	else {
		startCounter(0, pauseTime);
		console.log("pause time is ", pauseTime);
		scheduleAudio(Tone.now(), pauseTime)
		playVideo('voxVid', pauseTime);
    	isPaused = false;
  	}
}

function playVideo(videoId, startTime) {
	var video = document.getElementById(videoId);
	video.currentTime = startTime + 0.15;
	video.play();
  }

function pauseVideo(videoId) {
	var video = document.getElementById(videoId);
	video.pause();
  }

function showContent() {
	var loadingScreen = document.getElementById("loading-screen");
	var content = document.getElementById("content");
	var overlay = document.getElementById("overlay");
	// Hide the loading screen
	loadingScreen.style.display = "none";
	// Show the content
	overlay.style.display = "block";
	content.style.display = "block";
	resetGIFs();
  }

var overlay = document.getElementById("overlay");

overlay.addEventListener("click", function() {
  // Hide the overlay when clicked
  overlay.style.display = "none";
  toneStart(0);
});
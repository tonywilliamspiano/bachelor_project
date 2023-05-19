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
  overlay.style.opacity = '0';
  toneStart(0);
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

function activateButton(index) {
	// Remove "active" class from all buttons
	for (var i = 0; i < buttons.length; i++)
	  buttons[i].classList.remove("active");
	if (intervalID)
		clearInterval(intervalID);
	// Add "active" class to the clicked button
	buttons[index].classList.add("active");  
	// Start seconds counter at the corresponding start_time
	counter = 0;
	startCounter(index, 0);
}

//Counts in 0.1 second increments to enable smooth changing of song parts
function startCounter(index) {
	intervalID = setInterval(function() 
	{
		counter += 0.1;  
		if (counter >= startTimes[index + 1] - startTimes[index]) 
		{
			clearInterval(intervalID);
			console.log("Counter reached next state");
			activateButton(index + 1);
			currentSongPart = index + 1;
			putGIFs();
			goToSavedState(index + 1);
		  }
	}, 100);
}
// Function to schedule audio playback
function scheduleAudio(startTime, startPoint) 
{
	var error = 0;
  
	var video = document.getElementById('voxVid');
	playVideo(video, startPoint - 0.35);
	for (let i = 0; i < players.length; i++) {
	  var elapsed = Tone.now() - startTime;
	  const playerStartTime = startTime + elapsed;
	  try {
		players[i].start(playerStartTime, startPoint);
	  } catch (error) {
		  error = 1;
		console.error('Error starting player:', i);
	  }
	video.currentTime = startPoint + elapsed - 0.35;
	}
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

// Function to mute a specific track
function muteTrack(trackIndex) {
	saveStates[currentSongPart][trackIndex] = 0;
	volumes[trackIndex].gain.value = 0; // Set the gain value to 0 to mute the track
 }
  
  // Function to unmute a specific track
function unmuteTrack(trackIndex) {
	saveStates[currentSongPart][trackIndex] = 1;
	volumes[trackIndex].gain.value = 1; // Set the gain value to 1 to unmute the track
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
		scheduleAudio(Tone.now(), pauseTime)
		playVideo('voxVid', pauseTime);
    	isPaused = false;
  	}
}

function playVideo(video, startTime) {
	console.log("startTime is", startTime);
	video.currentTime = startTime;
	video.play();
}

function pauseVideo(videoId) {
	var video = document.getElementById(videoId);
	video.pause();
}
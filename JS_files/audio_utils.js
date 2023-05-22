// Function to schedule audio playback
function scheduleAudio(startTime, startPoint) 
{
	console.log("AUDIO SCHEDULED");
  
	playVideo('voxVid', startPoint + 0.15);
	for (let i = 0; i < players.length; i++) {
	  var elapsed = Tone.now() - startTime;
	  const playerStartTime = startTime + elapsed;
	  players[i].start(playerStartTime, startPoint);
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
	video.currentTime = startTime - 0.5;
	video.play();
}

function pauseVideo(videoId) {
	var video = document.getElementById(videoId);
	video.pause();
}
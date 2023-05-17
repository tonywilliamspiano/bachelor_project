var audioFiles = ['content/music/Bass_V1_03.mp3',
	'content/music/Drums_V1_03.mp3',
	'content/music/Horns_V1_03.mp3',
	'content/music/Git_V1_03.mp3',
	'content/music/Rhodes_V1_03.mp3',
	'content/music/Vox_V1_03.mp3',
	'content/music/Bass_V2_03.mp3',
	'content/music/Drums_V2_03.mp3',
	'content/music/Horns_V2_03.mp3',
	'content/music/Git_V2_03.mp3',
	'content/music/Rhodes_V2_03.mp3'];


var videoFiles = [
	'content/gifs/Vox_V1_02.mp4',
	'content/gifs/Vox_V1_03.mp4',
	'content/gifs/Vox_V1_04.mp4',
	'content/gifs/Vox_V1_05.mp4',
	'content/gifs/Vox_V1_06.mp4',
	'content/gifs/Vox_V1_07.mp4',	
	'content/gifs/Vox_V1_08.mp4'	
]

var timeArray = [3, 4, 5, 6];

var players = [];
var volumes = [];
const startTime = Tone.now() + 1;

// Create Tone.Player instances for each audio file
for (let i = 0; i < audioFiles.length; i++) {
	const player = new Tone.Player(audioFiles[i]);
	players.push(player);

	const volume = new Tone.Gain();
	volumes.push(volume);
  
	player.connect(volume);
	volume.connect(Tone.Destination);
}

// Function to schedule audio playback
function scheduleAudio(startTime, startPoint) {
	Tone.Transport.scheduleOnce(() => {
		for (let i = 0; i < players.length; i++) {
			players[i].start(startTime, startPoint);
		}
	}, startTime);
}


// Stop all audio files
function stopAudio() {
	for (let i = 0; i < players.length; i++) {
		players[i].stop();
	}
}

// Stop all audio files
function toneStart() {
	
}

// Function to mute a specific track
function muteTrack(trackIndex) {
	console.log("track muted: ", trackIndex);
	volumes[trackIndex].gain.value = 0; // Set the gain value to 0 to mute the track
 }
  
  // Function to unmute a specific track
function unmuteTrack(trackIndex) {
	console.log("track unmuted: ", trackIndex);
	volumes[trackIndex].gain.value = 1; // Set the gain value to 1 to unmute the track
}

function muteSwitch(trackIndex)
{
	if (volumes[trackIndex].gain.value == 1)
	{
		muteTrack(trackIndex);
		unmuteTrack(trackIndex + 6);
	}
	else if (volumes[trackIndex + 6].gain.value == 1)
	{
		muteTrack(trackIndex + 6);
	}
	else
	{
		unmuteTrack(trackIndex);
	}
}

//Receives the songpart and does the rest of the work
function setUpSongPart(songPart)
{
	for (let i = 0; i < players.length; i++) {
		if (i > 5)
		{
		muteTrack(i);
		}
	}

	// Start the Tone.Transport
	Tone.Transport.start();

	//schedule audio for playback
	scheduleAudio(startTime, 3);

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

function playVideo(videoId, i) {
  var video = document.getElementById(videoId);
  video.src = videoFiles[i];
  video.currentTime = 0;
  video.play();
}

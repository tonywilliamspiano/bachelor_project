var audioFiles = [
	['content/music/Bass_V1_04.mp3',
	'content/music/Drums_V1_04.mp3',
	'content/music/Horns_V1_04.mp3',
	'content/music/Git_V1_04.mp3',
	'content/music/Rhodes_V1_04.mp3',
	'content/music/Vox_V1_04.mp3',
	'content/music/Bass_V2_04.mp3',
	'content/music/Drums_V2_04.mp3',
	'content/music/Horns_V2_04.mp3',
	'content/music/Git_V2_04.mp3',
	'content/music/Rhodes_V2_04.mp3'],
	['content/music/Bass_V1_05.mp3',
	'content/music/Drums_V1_05.mp3',
	'content/music/Horns_V1_05.mp3',
	'content/music/Git_V1_05.mp3',
	'content/music/Rhodes_V1_05.mp3',
	'content/music/Vox_V1_05.mp3',
	'content/music/Bass_V2_05.mp3',
	'content/music/Drums_V2_05.mp3',
	'content/music/Horns_V2_05.mp3',
	'content/music/Git_V2_05.mp3',
	'content/music/Rhodes_V2_05.mp3']];

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audioElements = [];
var gainNodes = [];
var initialized = 0;
var manualStopFlag = false;
var playing = 0;
var counter = 0;

//Receives the songpart and does the rest of the work
function setUpSongPart(songPart, reset)
{
	if (reset == 1 && playing == 1){
		console.log("audio stopped!");
		stopAudio();
		playing = 0;
	}
	else {
		manualStopFlag = false;
	}
	setAudio(1, -1, songPart);
	playAudio();
	
	if (manualStopFlag === false && counter >= 10)
	{
		setUpSongPart(songPart + 1, 1);
	}
}

function playAudio(){
	console.log("made to here");
	for (var i = 0; i < audioElements.length; i++) {
		console.log("adding event listener ", i);
		audioElements[i].addEventListener('ended', function () {
		  endedTracks++;
		  console.log('Audio playback ended');
		  
		  if (endedTracks === audioElements.length) {
			// All tracks have ended
			console.log('All tracks have ended');
			// Perform any actions you need to after all tracks have finished
		  }
		});
	  }
	//add Event Listener here to check for ended audio
}

function stopAudio(){
	manualStopFlag = true;
	for (i = 0; i < audioElements.length; i++)
	{
		audioElements[i].stop();
	}
	audioElements = [];
	gainNodes = [];
	initialized = 0;
}

function setAudio(init, trackNum, songPart) {
	if (init == 1) {
	  // Load audio files
	  var audioPromises = audioFiles[songPart].map(function (file) {
		return fetch(file)
		  .then(function (response) {
			return response.arrayBuffer();
		  })
		  .then(function (buffer) {
			return audioContext.decodeAudioData(buffer);
		  });
	  });
	Promise.all(audioPromises)
	  .then(function (buffers) {
		for (var i = 0; i < audioFiles[songPart].length; i++) {
			  var source = audioContext.createBufferSource();
			  source.buffer = buffers[i];

			  var gainNode = audioContext.createGain();
			  source.connect(gainNode);
			  gainNode.connect(audioContext.destination);
			  audioElements.push(source);
			  gainNodes.push(gainNode);
			  
			  if (i > 5){
				gainNodes[i].gain.setValueAtTime(0, audioContext.currentTime);	
			  }
			  playing = 1;
			  source.start(0);
			  //add listeners to tell when the audio playback is finished
			  console.log("adding event listener ", i);
			  source.addEventListener('ended', function () {
		  		counter++;
				  console.log('Audio playback ended');
		  
				  if (counter >= 10) {
					// All tracks have ended
					console.log('All tracks have ended');
					// Perform any actions you need to after all tracks have finished
		  }
		});
			}
		})
		initialized = 1;
	}
	else {
		if (gainNodes[trackNum].gain.value == 1)
		{
			gainNodes[trackNum].gain.setValueAtTime(0, audioContext.currentTime);
			gainNodes[trackNum + 6].gain.setValueAtTime(1, audioContext.currentTime);	
		}
		else if (gainNodes[trackNum + 6].gain.value == 1)
		{
			gainNodes[trackNum].gain.setValueAtTime(0, audioContext.currentTime);
			gainNodes[trackNum + 6].gain.setValueAtTime(0, audioContext.currentTime);	
		}
		else
		{
			gainNodes[trackNum].gain.setValueAtTime(1, audioContext.currentTime);
			gainNodes[trackNum + 6].gain.setValueAtTime(0, audioContext.currentTime);	
		}
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

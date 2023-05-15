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

function playAudio(init, trackNum, songPart) {
	console.log("Init is: ", init);
	console.log("trackNum is: ", trackNum);
	if (songPart > 2)
		return;
	if (initialized == 1 && init == 1) {
		// Stop all current audio processes
		manualStopFlag = true;
		audioElements.forEach(function (source) {
		  source.stop();
		});
		audioElements = [];
		gainNodes = [];
		initialized = 0;
	}
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
	
	var counter = 0;
	manualStopFlag = false;
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
			  source.start(0);
			 // Add event listener for 'ended' event
			 source.addEventListener('ended', function() {
				if (manualStopFlag === true){	
					counter++;
				}
				console.log("Counter incremented");
				if (counter === audioFiles[songPart].length && songPart < 2 && manualStopFlag === false) {
				  playAudio(1, -1, songPart + 1);
				}
			  });

			  if (i > 5){
				gainNodes[i].gain.setValueAtTime(0, audioContext.currentTime);	
			  }
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

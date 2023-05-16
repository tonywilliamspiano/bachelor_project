var audioFiles = [
	['content/music/Bass_V1_02.mp3',
	'content/music/Drums_V1_02.mp3',
	'content/music/Horns_V1_02.mp3',
	'content/music/Git_V1_02.mp3',
	'content/music/Rhodes_V1_02.mp3',
	'content/music/Vox_V1_02.mp3',
	'content/music/Bass_V2_02.mp3',
	'content/music/Drums_V2_02.mp3',
	'content/music/Horns_V2_02.mp3',
	'content/music/Git_V2_02.mp3',
	'content/music/Rhodes_V2_02.mp3'],
	['content/music/Bass_V1_03.mp3',
	'content/music/Drums_V1_03.mp3',
	'content/music/Horns_V1_03.mp3',
	'content/music/Git_V1_03.mp3',
	'content/music/Rhodes_V1_03.mp3',
	'content/music/Vox_V1_03.mp3',
	'content/music/Bass_V2_03.mp3',
	'content/music/Drums_V2_03.mp3',
	'content/music/Horns_V2_03.mp3',
	'content/music/Git_V2_03.mp3',
	'content/music/Rhodes_V2_03.mp3'],
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
	'content/music/Rhodes_V2_05.mp3'],
	['content/music/Bass_V1_06.mp3',
	'content/music/Drums_V1_06.mp3',
	'content/music/Horns_V1_06.mp3',
	'content/music/Git_V1_06.mp3',
	'content/music/Rhodes_V1_06.mp3',
	'content/music/Vox_V1_06.mp3',
	'content/music/Bass_V2_06.mp3',
	'content/music/Drums_V2_06.mp3',
	'content/music/Horns_V2_06.mp3',
	'content/music/Git_V2_06.mp3',
	'content/music/Rhodes_V2_06.mp3'],
	['content/music/Bass_V1_07.mp3',
	'content/music/Drums_V1_07.mp3',
	'content/music/Horns_V1_07.mp3',
	'content/music/Git_V1_07.mp3',
	'content/music/Rhodes_V1_07.mp3',
	'content/music/Vox_V1_07.mp3',
	'content/music/Bass_V2_07.mp3',
	'content/music/Drums_V2_07.mp3',
	'content/music/Horns_V2_07.mp3',
	'content/music/Git_V2_07.mp3',
	'content/music/Rhodes_V2_07.mp3'],
	['content/music/Bass_V1_08.mp3',
	'content/music/Drums_V1_08.mp3',
	'content/music/Horns_V1_08.mp3',
	'content/music/Git_V1_08.mp3',
	'content/music/Rhodes_V1_08.mp3',
	'content/music/Vox_V1_08.mp3',
	'content/music/Bass_V2_08.mp3',
	'content/music/Drums_V2_08.mp3',
	'content/music/Horns_V2_08.mp3',
	'content/music/Git_V2_08.mp3',
	'content/music/Rhodes_V2_08.mp3']];


var videoFiles = [
	'content/gifs/Vox_V1_02.mp4',
	'content/gifs/Vox_V1_03.mp4',
	'content/gifs/Vox_V1_04.mp4',
	'content/gifs/Vox_V1_05.mp4',
	'content/gifs/Vox_V1_06.mp4',
	'content/gifs/Vox_V1_07.mp4',	
	'content/gifs/Vox_V1_08.mp4'	
]
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

//pushing one array for each song part
var audioElements = [];
audioElements.push([]);
audioElements.push([]);
audioElements.push([]);
audioElements.push([]);
audioElements.push([]);
audioElements.push([]);
audioElements.push([]);

//pushing one array for each song part
var gainNodes = [];
gainNodes.push([]);
gainNodes.push([]);
gainNodes.push([]);
gainNodes.push([]);
gainNodes.push([]);
gainNodes.push([]);
gainNodes.push([]);

var initialized = 0;
var manualStopFlag = false;
var part_playing = -1;
var ended = 0;

//Receives the songpart and does the rest of the work
async function setUpSongPart(songPart)
{
	ended = 0;
	if (initialized == 0)
	{
		//wait for setAudio to complete its promises
		await setAudio(1, -1, 0);
  		await setAudio(1, -1, 1);
		await setAudio(1, -1, 2);
		await setAudio(1, -1, 3);
		await setAudio(1, -1, 4);
		await setAudio(1, -1, 5);
		await setAudio(1, -1, 6);
	}
	if (part_playing != -1){
		await stopAudio(part_playing);
		await setAudio(1, -1, part_playing);
	}
	else {
		manualStopFlag = false;
	}
	console.log("ready to play songpart ", songPart);
	playAudio(songPart);
	playVideo('voxVid', songPart)
	await waitForEnd();
	console.log("Manual stop flag is ", manualStopFlag);
	if (manualStopFlag == false)
	{
		songPart = songPart + 1;
		console.log("NEW SONGPART is ", songPart);
		setUpSongPart(songPart);
	}
	manualStopFlag = false;
}

function waitForEnd() {
	return new Promise(function(resolve) {
		function checkEnded() {
			if (ended === 1) {
			  resolve();
			} else {
			  setTimeout(checkEnded, 500);
			}
		  }
		  checkEnded();
	});
  }

function playAudio(songPart){
	part_playing = songPart;
	var counter = 0;
	for (var i = 0; i < audioElements[songPart].length; i++)
	{
		audioElements[songPart][i].start(0);
	}
	for (var i = 0; i < audioElements[songPart].length; i++) {
		// console.log("adding event listener ", i);
		audioElements[songPart][i].addEventListener('ended', function () {
		  counter++;		  
		  if (counter === audioElements[songPart].length) {
			ended = 1;
			console.log('All tracks have ended');
		  }
		});
	}
	//add Event Listener here to check for ended audio
}

function stopAudio(part_playing){
	return new Promise(function (resolve, reject){
	manualStopFlag = true;
		for (i = 0; i < audioElements[part_playing].length; i++)
		{
			audioElements[part_playing][i].stop();
		}
		console.log("audio stopped!");
		audioElements[part_playing] = [];
		gainNodes[part_playing] = [];
		console.log("Audios were stopped and reset!")
		resolve();
	});
}

function setAudio(init, trackNum, songPart) {
		return new Promise(function (resolve, reject) {
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
				gainNode.connect(audioContext.destination);
				source.connect(gainNode);

				audioElements[songPart].push(source);
				gainNodes[songPart].push(gainNode);
	
				if (i > 5) {
				  gainNodes[songPart][i].gain.setValueAtTime(0, audioContext.currentTime);
				//   console.log("setting gain for track: ", i);
				}
			  }
			  initialized = 1;
			  resolve(); // Resolve the promise when audio loading is complete
			})
			.catch(reject); // Reject the promise if there's an error
		});
}

function setGainNodes(songPart, trackNum)
{
	if (gainNodes[part_playing][trackNum].gain.value == 1)
	{
		gainNodes[part_playing][trackNum].gain.setValueAtTime(0, audioContext.currentTime);
		gainNodes[part_playing][trackNum + 6].gain.setValueAtTime(1, audioContext.currentTime);	
	}
	else if (gainNodes[part_playing][trackNum + 6].gain.value == 1)
	{
		gainNodes[part_playing][trackNum].gain.setValueAtTime(0, audioContext.currentTime);
		gainNodes[part_playing][trackNum + 6].gain.setValueAtTime(0, audioContext.currentTime);	
	}
	else
	{
		gainNodes[part_playing][trackNum].gain.setValueAtTime(1, audioContext.currentTime);
		gainNodes[part_playing][trackNum + 6].gain.setValueAtTime(0, audioContext.currentTime);	
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

function playVideo(videoId, i) {
	var video = document.getElementById(videoId);
	video.src = videoFiles[i];
	video.currentTime = 0;
	video.play();
}

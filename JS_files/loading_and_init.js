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
	  console.log("player loaded: ", i);
	}

	// All audio files and the video file are loaded, hide the loading screen and show the content
	setTimeout(showContent, 1000);
	})
	.catch(error => {
	// Handle error if any of the files fail to load
	console.error("Error loading files:", error);
});
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

var players = [];
var volumes = [];

function loadAudios() {
	Tone.start();
	var loadingScreen = document.getElementById("loading-message");
	loadingScreen.textContent = "Loading audios...";
	loadingScreen.onclick = null;
	waitForPromises()
		.then(() => {
		// Code to be executed after waitForPromises has finished
		setTimeout(showContent, 0);
	})
	.catch(error => {
		// Handle any errors that occurred during waitForPromises
		console.log("Error:");
	});
}

async function waitForPromises() {
	try {
	  await getPromises();
	} catch (error) {
	  console.error("Error:", error);
	  throw error; // Re-throw the error to reject the promise
	}
}


function getPromises() {
	var audioPromise = Promise.all(audioFiles.map(file => Tone.loaded(file)));
  
	var videoPromise = new Promise((resolve, reject) => {
	  var voxVid = document.getElementById("voxVid");
  
	  if (voxVid.readyState >= 4) {
		// Video is already loaded
		resolve();
	  } else {
		// Wait for the video to be loaded
		voxVid.onloadeddata = resolve;
		voxVid.onerror = reject;
	  }
	});
  
	return Promise.all([audioPromise, videoPromise])
	  .then(() => {
		for (let i = 0; i < audioFiles.length; i++) {
		  const player = new Tone.Player(audioFiles[i]);
		  players.push(player);
  
		  const volume = new Tone.Gain();
		  volumes.push(volume);
  
		  player.connect(volume);
		  volume.connect(Tone.Destination);
		}
		return waitForPlayersLoaded();
	  })
	  .catch(error => {
		console.error("Error loading files:", error);
	  });
  }

function waitForPlayersLoaded() {
  return new Promise((resolve) => {
    checkPlayersLoaded(resolve);
  });
}

function checkPlayersLoaded(resolve) {
  const allPlayersLoaded = players.every(player => player.loaded);
  if (allPlayersLoaded) {
    resolve();
  } else {
    setTimeout(() => {
      checkPlayersLoaded(resolve);
    }, 100);
  }
}
  
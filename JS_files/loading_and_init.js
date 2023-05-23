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
	console.log("about to wait");
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
	  console.log("getPromises completed");
	} catch (error) {
	  console.error("Error:", error);
	  throw error; // Re-throw the error to reject the promise
	}
}


function getPromises() {
	var audioPromise = new Promise((resolve, reject) => {
	  var buffersLoaded = 0;
  
	  function onBufferLoaded() {
		console.log("Buffer loaded", buffersLoaded);
		buffersLoaded++;
		if (buffersLoaded === audioFiles.length) {
		  console.log('All buffers have been loaded.');
		  resolve();
		}
	  }
  
	  var bufferPromises = audioFiles.map(file => {
		return new Promise((resolve, reject) => {
		  var buffer = new Tone.Buffer(file, () => {
			onBufferLoaded();
			resolve();
		  }, reject);
		});
	  });
  
	  Promise.all(bufferPromises)
		.then(() => {
		  console.log('All buffer promises resolved.');
		})
		.catch(error => {
		  console.error('Error loading buffers:', error);
		  reject(error);
		});
	});
  
	var videoPromise = new Promise((resolve, reject) => {
	  console.log("in video promise");
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
		console.log("in promise chain");
		for (let i = 0; i < audioFiles.length; i++) {
		  const player = new Tone.Player(audioFiles[i]);
		  players.push(player);
  
		  const volume = new Tone.Gain();
		  volumes.push(volume);
  
		  player.connect(volume);
		  volume.connect(Tone.Destination);
		  console.log("player loaded: ", i);
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
  
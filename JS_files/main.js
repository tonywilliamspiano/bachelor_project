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

var songPartNames = ['Intro',
'Verse 1',
'Verse 2',	
'Chorus 1',	
'Verse 3',	
'Chorus 2',	
'Bridge',	
'Instrumental',	
'Outro'];

var instrumentNames = [
	"bass",
	"bass2",
	"drums",
	"drums2",
	"git",
	"git2",
	"horns",
	"horns2",
	"rhodes",
	"rhodes2"
];
var startTimes = [1.75, 26, 58, 79.5, 101.3, 138.6, 160, 202, 226];
var players = [];
var volumes = [];
var initialized = 0;
var intervalID;
var counter = 0;
var currentSongPart = 0;

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

//start tone on user action
function toneStart(songPart, tutorial) 
{
	currentSongPart = songPart;
	putGIFs();
	Tone.start();
	if (initialized == 1)
	{
		goToSavedState(songPart);
	}
	setUpSongPart(songPart, tutorial);
}

//Receives the songpart and does the rest of the work
function setUpSongPart(songPart, tutorial)
{
	if (initialized == 0 && tutorial == 0) {
		for (let i = 0; i < players.length; i++) {
			if (i % 2 == 1)
			{
				muteTrack(i);
			}
			else {
				unmuteTrack(i);
			}
		}
		//initializing saved states to correct values
		for (let i = 0; i < saveStates.length; i++) {
			const subArray = saveStates[i];
			for (let j = 0; j < subArray.length; j++) {
				if (j % 2 == 0) {
				subArray[j] = 1;
				}
			}
		}
	initialized = 1;
	}
	putGIFs();
	goToSavedState(songPart);
	for (i = 0; i < saveStates.length; i++)
    {
        console.log(saveStates[i]);
    }
	//activate the corresponding song part button
	activateButton(songPart);
	// Start the Tone.Transport
	Tone.Transport.start();
	var startTime = Tone.now() + 0.1;
	//schedule audio for playback
	scheduleAudio(startTime, startTimes[songPart], songPart);
}

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

var instrumentArrays = [
	["Bass_V1_01.gif", "Bass_V1_02.gif", "Bass_V1_03.gif", "Bass_V1_04.gif", "Bass_V1_05.gif", "Bass_V1_06.gif", "Bass_V1_07.gif", "Bass_V1_08.gif", "Bass_V1_09.gif"],
	["Bass_V2_01.gif", "Bass_V2_02.gif", "Bass_V2_03.gif", "Bass_V2_04.gif", "Bass_V2_05.gif", "Bass_V2_06.gif", "Bass_V2_07.gif", "Bass_V2_08.gif", "Bass_V2_09.gif"],
	["Drums_V1_01.gif", "Drums_V1_02.gif", "Drums_V1_03.gif", "Drums_V1_04.gif", "Drums_V1_05.gif", "Drums_V1_06.gif", "Drums_V1_07.gif", "Drums_V1_08.gif", "Drums_V1_01.gif"],
	["Drums_V2_01.gif", "Drums_V2_02.gif", "Drums_V2_03.gif", "Drums_V2_04.gif", "Drums_V2_05.gif", "Drums_V2_06.gif", "Drums_V2_07.gif", "Drums_V2_08.gif", "Drums_V2_09.gif"],
	["Git_V1_01.gif", "Git_V1_02.gif", "Git_V1_03.gif", "Git_V1_04.gif", "Git_V1_05.gif", "Git_V1_06.gif", "Git_V1_07.gif", "Git_V1_08.gif", "Git_V1_09.gif", "Git_V1_10.gif"],
	["Git_V2_01.gif", "Git_V2_02.gif", "Git_V2_03.gif", "Git_V2_04.gif", "Git_V2_05.gif", "Git_V2_06.gif", "Git_V2_07.gif", "Git_V2_08.gif", "Git_V2_09.gif", "Git_V2_10.gif"],
	["Horns_V1_01.gif", "Horns_V1_02.gif", "Horns_V1_03.gif", "Horns_V1_04.gif", "Horns_V1_05.gif", "Horns_V1_06.gif", "Horns_V1_07.gif", "Horns_V1_08.gif", "black.jpeg"],
	["black.jpeg", "Horns_V2_02.gif", "Horns_V2_03.gif", "Horns_V2_04.gif", "Horns_V2_05.gif", "Horns_V2_06.gif", "Horns_V2_07.gif", "Horns_V2_08.gif", "black.jpeg"],
	["Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif", "Rhodes_V1_01.gif"],
	["Rhodes_V2_01.gif", "Rhodes_V2_02.gif", "Rhodes_V2_03.gif", "Rhodes_V2_04.gif", "Rhodes_V2_05.gif", "Rhodes_V2_06.gif", "Rhodes_V2_07.gif", "Rhodes_V2_08.gif", "Rhodes_V2_09.gif"],
];
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
var currentGIFs = [];
var saveStates = Array.from({ length: 9 }, () => Array(10).fill(0));
var startTimes = [1.75, 26, 58, 79.5, 101, 138, 159, 202, 226];
var players = [];
var volumes = [];
var initialized = 0;
var intervalID;
var counter = 0;
var currentSongPart = 0;
// Load audio files
var audioPromise = Promise.all(audioFiles.map(file => Tone.loaded(file)));

// Load video file
var videoPromise = new Promise((resolve, reject) => {
	var voxVid = document.getElementById("voxVid");
	voxVid.onloadeddata = resolve;
	voxVid.onerror = reject;
  });

var buttons = [];
buttons.push(document.getElementById("button0"));
buttons.push(document.getElementById("button1"));
buttons.push(document.getElementById("button2"));
buttons.push(document.getElementById("button3"));
buttons.push(document.getElementById("button4"));
buttons.push(document.getElementById("button5"));
buttons.push(document.getElementById("button6"));
buttons.push(document.getElementById("button7"));
buttons.push(document.getElementById("button8"));
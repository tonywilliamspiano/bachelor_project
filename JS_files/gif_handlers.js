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

var currentGIFs = [];


function putGIFs()
{
	var newGIF;
	for (i = 0; i < instrumentNames.length; i++)
	{
		newGIF = document.getElementById(instrumentNames[i]);
		newGIF.src = "content/gifs/" + instrumentArrays[i][currentSongPart];
		currentGIFs.push(newGIF);
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

var gifOff = ['drums2', 'bass2', 'horns2', 'rhodes2', 'git2'];
var gifOn = ['drums', 'bass', 'horns', 'rhodes', 'git'];
function resetGIFs() {
	var	gifID;
	for (i = 0; i < gifOff.length; i++)
	{
		gifID = document.getElementById(gifOff[i]);
		gifID.style.display = 'none';
		gifID = document.getElementById(gifOn[i]);
		gifID.style.display = 'block';
	}
}

function hideGIFs() {
	var	gifID;
	for (i = 0; i < gifOff.length; i++)
	{
		gifID = document.getElementById(gifOff[i]);
		gifID.style.display = 'none';
		gifID = document.getElementById(gifOn[i]);
		gifID.style.display = 'none';
	}
}
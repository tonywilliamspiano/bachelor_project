var saveStates = Array.from({ length: 9 }, () => Array(11).fill(0));

//get data from JSON file from user
function loadData(inputValue) {
	var fileName = "saved_versions/" + inputValue + '.json';  
	// Load the JSON file
	fetch(fileName)
	  .then(function(response) {
		if (!response.ok) {
		  throw new Error('Failed to load JSON file');
		}
		return response.json();
	  })
	  .then(function(data) {
		saveStates = data.array;
		initialized = 1;
		var oText = document.getElementById("overlayText");
		oText.textContent = "Saved State Loaded, Click to Play";
		showContent();
		putGIFs();
		pauseTracks();
	  })
	  .catch(function(error) {
		console.log(error);
	  });
}

//Return to the user's saved state at the songpart 'index'
function goToSavedState(index)
{
	for (i = 0; i < saveStates[index].length; i++)
	{
		if (saveStates[index][i] == 0) 
		{
			muteTrack(i);
			if (i < saveStates[index].length - 1)
				currentGIFs[i].style.display = "none";
		}
		else
		{
			unmuteTrack(i);
			if (i < saveStates[index].length - 1)
				currentGIFs[i].style.display = "block";
		}
	}
}

function exportArray() {
	// Generate a unique code
	var uniqueCode = generateUniqueCode();
  
	// Get the array of 0's and 1's
	var array = saveStates;
  
	// Create a data object to save
	var data = {
	  uniqueCode: uniqueCode,
	  array: array
	};
  
	// Convert the data object to JSON
	var jsonData = JSON.stringify(data);
  
	// Create a download link for the JSON file
	var link = document.createElement('a');
	link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
	link.download = uniqueCode + '.json';
	link.click();
}

function generateUniqueCode() {
	// Generate a unique code using a suitable algorithm or library
	// For simplicity, let's generate a random code of 8 characters
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var code = '';
	for (var i = 0; i < 8; i++) {
	  code += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return code;
}

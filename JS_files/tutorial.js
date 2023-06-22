var tutorialStates = [
    [0, 0, 0, 1, 0]
];

var tutorialArray = [[0,1,0,1,0,1,1,0,0,1,0],[1,0,0,1,0,1,1,0,1,0,0],[1,0,1,0,0,1,1,0,1,0,0],[0,1,0,1,0,1,0,0,0,1,0],[0,1,0,1,0,0,1,1,0,1,0],[1,0,0,0,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1,0,0],[1,0,1,0,1,0,1,0,1,0,0],[1,0,1,0,1,0,1,0,1,0,0]];

var nextButton = document.getElementById("nextButton");

var tutorialMessages = [
    ["Ever wondered what it's like to be a music producer and arranger?"], 
    ["More than anything else, it comes down to good music taste and decision making."],
    ["Producers have to choose between countless song versions and pick just the right one."],
    ["Ready to try it yourself?"]
];

var currentMessage = 0;

function startTutorial()
{
    var tText = document.getElementById("tText");

    tText.textContent = tutorialMessages[currentMessage];
    showText();
    hideButtons();
    disableGifs(0);
    is_tutorial = 1;
    hideGIFs();
    nextButton.addEventListener("click", clickHandler0);
}

function clickHandler0() {
    if (currentMessage == tutorialMessages.length - 1)    
        startTutorial1();
    else
    {
        currentMessage++;
        var tText = document.getElementById("tText");
        tText.textContent = tutorialMessages[currentMessage];
    }

}

function startTutorial1()
{
    var container = document.getElementById("tutorialContainer");
    var tText = document.getElementById("tText");

    midTutorial = 1;
    resizeContent();
    tText.textContent = "Click the gif to change instrument part";
    hideButtons();
    gifs[3].addEventListener("click", function() {
        toggleGIFs('rhodes', 'rhodes2');
        muteSwitch(8);
    });
    video = document.getElementById("voxVid");
    voxVid.style.display = "none";
    saveStates[2][8] = 1;
    toneStart(2, 1);
    disableGifs(0);
    showText();
    nextButton.addEventListener("click", clickHandler1);
    nextButton.removeEventListener("click", clickHandler0);
}

var gifs = document.getElementsByClassName("gif-container");

function startTutorial2()
{
    console.log("Tutorial 2 start");
    var tText = document.getElementById("tText");

    tText.textContent = "Change multiple instruments to build your favorite groove";
    saveStates[2][2] = 1;
    saveStates[2][0] = 1;
    saveStates[2][8] = 1;
    gifs[0].addEventListener("click", function() {
        toggleGIFs('drums', 'drums2');
        muteSwitch(2);
    });
    gifs[1].addEventListener("click", function() {
        toggleGIFs('bass', 'bass2');
        muteSwitch(0);
    });
    // turnOffButtons(1);
    toneStart(2, 1);
    nextButton.addEventListener("click", clickHandler2);
    nextButton.removeEventListener("click", clickHandler1);
}

function clickHandler1()
{
      startTutorial2();
}
function clickHandler2()
{
       startTutorial3();
}
function clickHandler3()
{
       endTutorial();
}

function startTutorial3() {
    var container = document.getElementById("tutorialContainer");
    var tText = document.getElementById("tText");

    tText.textContent = "Click on the song parts below to double check your work";
    gifs[4].addEventListener("click", function() {
        toggleGIFs('horns', 'horns2');
        muteSwitch(6);
    });
    gifs[2].addEventListener("click", function() {
        toggleGIFs('git', 'git2');
        muteSwitch(4);
    });

    saveStates = tutorialArray;
    showButtons();
    toneStart(2, 1);
    nextButton.addEventListener("click", clickHandler3);
    nextButton.removeEventListener("click", clickHandler2);
}

function endTutorial()
{
    var container = document.getElementById("tutorialContainer");
    var tText = document.getElementById("tText");
    var video = document.getElementById("voxVid");
    var load = document.getElementById("loading-screen");
	var loadingScreen = document.getElementById("loading-message");

    midTutorial = 0; 
    container.style.display = "none";

    showAll();
    video.style.display = "inline-block";
    video.src = "content/Vox_small.mp4";
    tText.style.display = "none";
    is_tutorial = 0;
    nextButton.removeEventListener("click", clickHandler3);
    pauseTracks();
	loadingScreen.textContent = "Looks like you're ready! Click to play";
    loadingScreen.style.fontSize = "40px";
    loadingScreen.style.marginTop = "10%";
    loadingScreen.onclick = null;
    load.addEventListener("click", function () {
        toneStart(0, 0);
        loadingScreen.style.display = "none";
        load.style.display = "none";
    });
    load.style.display = "block";

    // showContent();
}

function disableGifs(state) {
    var gifs = document.getElementsByClassName("gif-container");
    for (i = 0; i < gifs.length; i++)
    {
            gifs[i].onclick = null;
    }
}

function hideButtons()
{
    for (i = 0; i < buttons.length; i++)
    {
        buttons[i].style.display = "none";
    }
    var pauseButton = document.getElementById("pauseButton");
    pauseButton.style.display = "none";
    var input = document.getElementById("myInput");
    input.style.display = "none";
    var save = document.getElementById("saveButton");
    save.style.display = "none";
}

function showButtons()
{
    var video = document.getElementById("voxVid");
    var bContainer = document.getElementById("bContainer");

    video.style.display = "none";
    for (i = 0; i < buttons.length - 5; i++)
    {
        buttons[i].style.display = "inline-block";
        buttons[i].style.zIndex = "100";
    }
    var pauseButton = document.getElementById("pauseButton");
    pauseButton.style.display = "block";
    nextButton.style.zIndex = "9999";
    bContainer.style.width = "80%";
    bContainer.style.zIndex = "100";
}

function showAll()
{
    for (i = 0; i < buttons.length; i++)
    {
        buttons[i].style.display = "inline-block";
    }
    var bContainer = document.getElementById("bContainer");
    
    bContainer.style.width = "100%";
    var pauseButton = document.getElementById("pauseButton");
    pauseButton.style.display = "block";
    var input = document.getElementById("myInput");
    input.style.display = "block";
    var save = document.getElementById("saveButton");
    save.style.display = "block";
}

function showText() {
    var container = document.getElementById("tutorialContainer");

    container.style.display = "flex";
}
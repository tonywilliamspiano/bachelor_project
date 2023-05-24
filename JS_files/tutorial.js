var tutorialStates = [
    [0, 0, 0, 1, 0]
];

var tutorialArray = [[0,1,0,1,0,1,1,0,0,1,0],[1,0,0,1,0,1,1,0,1,0,0],[1,0,1,0,0,1,1,0,1,0,0],[0,1,0,1,0,1,0,0,0,1,0],[0,1,0,1,0,0,1,1,0,1,0],[1,0,0,0,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1,0,0],[1,0,1,0,1,0,1,0,1,0,0],[1,0,1,0,1,0,1,0,1,0,0]];

var nextButton = document.getElementById("nextButton");

function startTutorial()
{
    var container = document.getElementById("tutorialContainer");
    var tText = document.getElementById("tText");

    container.style.marginLeft = "33%";
    container.style.marginTop = "0%";
    container.style.width = "30%";
    
    hideButtons();
    is_tutorial = 1;

    video = document.getElementById("voxVid");
    voxVid.style.display = "none";
    saveStates[2][8] = 1;
    toneStart(2, 1);
    disableGifs(0);
    showText();
    nextButton.addEventListener("click", clickHandler1);
}

var gifs = document.getElementsByClassName("gif-container");

function startTutorial2()
{
    console.log("Tutorial 2 start");
    var tText = document.getElementById("tText");

    tText.textContent = "Change multiple instruments to build your favorite groove";
    tText.style.fontSize = "30px";
    saveStates[2][2] = 1;
    saveStates[2][0] = 1;
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

    container.style.marginLeft = "33%";
    container.style.marginTop = "0%";
    container.style.width = "30%";
    tText.textContent = "Click the buttons below to move between different song parts and double check your work";
    tText.style.fontSize = "30px";

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
    var tText = document.getElementById("tText");
    var video = document.getElementById("voxVid");

    video.style.display = "inline-block";
    video.src = "content/Vox_small.mp4";
    tText.style.display = "none";
    is_tutorial = 0;
    nextButton.removeEventListener("click", clickHandler3);
    pauseTracks();
    // console.log("ENDING TUTORIAL");
    load = document.getElementById("loading-screen");
    text = document.getElementById("loading-message");

    text.onclick = null;
    load.addEventListener("click", function () {
        toneStart(0, 0);
        text.style.display = "none";
        load.style.display = "none";
    });
    load.style.display = "block";

    // showContent();
}

function disableGifs(state) {
    var gifs = document.getElementsByClassName("gif-container");
    for (i = 0; i < gifs.length; i++)
    {
        if (tutorialStates[state][i] == 0)
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
        buttons[i].style.display = "block";
    }
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
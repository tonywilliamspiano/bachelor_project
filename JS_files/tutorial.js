var tutorialStates = [
    [0, 0, 0, 1, 0]
];

var tutorialArray = [[0,1,0,1,0,1,1,0,0,1,0],[1,0,0,1,0,1,1,0,1,0,0],[1,0,1,0,0,1,1,0,1,0,0],[0,1,0,1,0,1,0,0,0,1,0],[0,1,0,1,0,0,1,1,0,1,0],[1,0,0,0,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1,0,0],[1,0,1,0,1,0,1,0,1,0,0],[1,0,1,0,1,0,1,0,1,0,0]];

var nextButton = document.getElementById("nextButton");

function startTutorial()
{
    hideButtons();
    tutorial = 1;

    video = document.getElementById("voxVid");
    voxVid.style.display = "none";
    saveStates[2][8] = 1;
    toneStart(2, 1);
    disableGifs(0);
    showText();
    nextButton.addEventListener("click", function() {
        startTutorial2();
    });}

function startTutorial2()
{
    var gifs = document.getElementsByClassName("gif-container");
    var container = document.getElementById("tutorialContainer");
    var tText = document.getElementById("tText");

    container.style.marginLeft = "33%";
    container.style.marginTop = "0%";
    container.style.width = "30%";
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
    nextButton.addEventListener("click", function() {
        startTutorial3(gifs);
    });
}

function startTutorial3(gifs) {
    var container = document.getElementById("tutorialContainer");
    var tText = document.getElementById("tText");

    container.style.marginLeft = "33%";
    container.style.marginTop = "0%";
    container.style.width = "30%";
    tText.textContent = "Click the buttons below to move between different song parts and double check your work";
    tText.style.fontSize = "30px";

    gifs[4].addEventListener("click", function() {
        toggleGIFs('horns', 'horns2');
        muteSwitch(0);
    });
    gifs[2].addEventListener("click", function() {
        toggleGIFs('git', 'git2');
        muteSwitch(0);
    });
    // for (i = 0; i < tArray.length; i++)
    // {
    //     console.log(tArray[i]);
    // }
    saveStates = tutorialArray;
    showButtons();
    toneStart(2, 1);
    nextButton.addEventListener("click", function() {
        
    });
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

    video.style.display = "none";
    for (i = 0; i < buttons.length; i++)
    {
        buttons[i].style.display = "inline-block";
    }
    var pauseButton = document.getElementById("pauseButton");
    pauseButton.style.display = "block";
    var input = document.getElementById("myInput");
    input.style.display = "none";
    var save = document.getElementById("saveButton");
    save.style.display = "none";
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
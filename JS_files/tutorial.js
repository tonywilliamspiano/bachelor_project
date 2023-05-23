var tutorialStates = [
    [0, 0, 0, 1, 0]
];

var nextButton = document.getElementById("nextButton");

function startTutorial()
{
    hideButtons();

    video = document.getElementById("voxVid");
    voxVid.style.display = "none";
    saveStates[2][8] = 1;
    // turnOffButtons(1);
    toneStart(2, 1);
    disableGifs(0);
    showText();
    nextButton.addEventListener("click", function() {
        startTutorial2();
    });}

function startTutorial2()
{
    var gifs = document.getElementsByClassName("gif-container");

    saveStates[2][0] = 1;
    saveStates[2][2] = 1;
    for (i = 0; i < gifs.length; i++)
        console.log(gifs[i]);
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
    putGIFs();

    showText();
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

function showText() {
    var container = document.getElementById("tutorialContainer");
    var text = document.getElementById("tutorialText");

    container.style.display = "flex";
}
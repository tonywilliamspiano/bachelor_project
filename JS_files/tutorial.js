function startTutorial()
{
    hideButtons();


    video = document.getElementById("voxVid");
    voxVid.style.display = "none";
    saveStates[2][8] = 1;
    toneStart(2, 1);
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
# Bachelor Project - Arrange Your Own Pop Song

## Overview

This is my bachelor's project for my jazz piano studies at the HMTM Hannover. The idea of the project is to to enable the user to experience the thrill of arranging and producing a song without having to go through years of formal training. 

While there are many apps that let the user build beats and repetitive loops, nobody (to my knowledge) has created an interface like this, where the user can actively arrange a full, complex song. The reason for this is clear: it is a difficult task to arrange multiple versions of a song that all sound coherent and work together well and requires deep knowledge of music theory and a much more time-intensive recording process than building beats. 

Despite these challenges, I see great potential for an interface like this one, particularly in music education. The brain learns best when learning is gamified - I'm your 10-year-old cousin can tell you in detail about all the levels and characters of Mario Kart. Now imagine that, in their music lessons in school, kids got to use an interface like this one to arrange their own version of a song by The Beatles or Stevie Wonder. They automatically and interactively learn important music appreciation skills. When you click on the guitarist, it changes what he is playing, and the student has to recognize several things at once: What does the guitar sound like? What was the guitarist playing before? What is he playing now? Which version did I like better? Not only do they learn to appreciate the music and the various instruments in a gamified way, they are also challenged to make personal, aesthetic choices and to view music as a flexible, creative art form. 

Perhaps this all sounds a bit grand coming from somebody who has just recorded some stuff with his friends and programmed a simple website. But I am a true believer in the power of music, and I believe that we need more highly trained, creative musicians working where technology meets music. And with the rise of AI (I never coded in HTML or JavaScript before and got a lot of help from ChatGPT on this project), musicians will feel more empowered and capable to code these types of projects themselves and create amazing work. 

Here is the current version of the interface online, in case you don't want to clone it and run it on your own machine: 
https://hagelslag.band/siehst_du/index.html

## Reflection - What I Would Do Differently

While I am very pleased with the final output, I would make a few changes if I were starting from scratch (or if I make another one). 

- Make the videos of the musicians so that they actually play what you hear. This would make the video files significantly bigger, but makes the product much more interesting from a music education perspective
- Make the song about half as long, but with the same amount of parts. Since the song parts sometimes take 20-30 seconds to play, the feedback loop between changing instruments and deciding which version you like is a bit too long for an immersive experience. If the parts were closer to 10 seconds each, I think playability would be greatly improved. 
- Take a pre-existing song, ideally an important one in pop music history. The idea of using this as an educational tool came to be midway through the project, and I would love to push in this direction and see what I could create for a classroom setting, possibly working together with music teachers.

## Implementation

This project is coded in HTML, CSS and JavaScript, with JavaScript doing the heavy lifting, of course. 

Audio syncronization is handled by the tone.js library. The program ensures that all audio files and the video files are loaded and ready to play, then gives the user the starting message. 

The files are organized as follows: 
- 11 audio tracks (2x each of drums, bass, guitar, rhodes, and horns, and 1x vocals)
- 1 MP4 video of the vocals
- 10 GIFs for the other instruments

The states of all instruments and songparts are organized in an array (9 songparts times 11 tracks), which stores whether each instrument is currently on or off in terms of 0s and 1s. All audio files and the video files are then played simultaneously, using the tone.js library to syncronise them. When the user clicks on an instrument, it sends a signal to a function which mutes or unmutes the corresponding tracks and updates the array. 

The timestamps for each song part are stored in an array. When the user clicks on a song part, the program pauses all tracks and the video, then plays them starting at the desired timestamp, updating the muted tracks and GIFs based on the array of 0s and 1s. This enables the user to 'save' their state for each song part. 

I also added an 'export audio' functionality which downloads the current state of the array as a JSON file. I can then add this JSON file to the git repository and enter the file name as a code to return to the user's saved state. This is a very clunky solution, and I'll implement a better one soon.

This was just a broad overview, feel free to reach out if you have any questions on the code. 

## Planned features to add

- Add loading screen with percentage so that users know that something is happening at the beginning. 
- Make the buttons bigger on portrait mode and add previous/next buttons (buttons are too small on phone)
- Saving user arrangements to database and allowing user to access later
- Allow user to download their finished version as MP3 / video
- Possibly make an app version for Android/iOS? 

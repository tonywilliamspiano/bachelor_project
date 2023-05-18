// Create an array to store the audio file URLs
var audioFiles =
	['content/music/Bass_V1_03.mp3',
	'content/music/Drums_V1_03.mp3',
	'content/music/Horns_V1_03.mp3',
	'content/music/Git_V1_03.mp3',
	'content/music/Rhodes_V1_03.mp3',
	'content/music/Vox_V1_03.mp3'];
  
  // Create an array to store the Tone.Player instances
  var players = [];
  
  // Create a Tone.Part to schedule the playback of the audio files
  var part = new Tone.Part(function (time, value) {
	// 'value' is an object containing the event data
	var player = value.player;
	player.start(time);
  }, []);
  
  // Load the audio files and create Tone.Player instances
  Tone.Buffer.on('load', function () {
	for (var i = 0; i < audioFiles.length; i++) {
	  var player = new Tone.Player(audioFiles[i]);
	  players.push(player);
	  part.add(i, { player: player });
	}
  });
  
  function toneStart(){
  // Start the transport and schedule the part to play
  Tone.Transport.start();
  part.start(0);

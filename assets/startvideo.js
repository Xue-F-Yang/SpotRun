//const selectedGenres = JSON.parse(localStorage.getItem("selectedGenres")) || [];
const songs = JSON.parse(localStorage.getItem("video"));
console.log(songs);
const max_current = songs.length; //We can't go higher than this
var current = 0;

var currsong = songs[current].song;
var artist = songs[current].artist;
  
$("#song_title").html(currsong);
$("#artist").html(artist);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: songs[current].id,
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  };

  
  // 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
};
  
// 5. The API calls this function when the player's state changes.

function onPlayerStateChange(event){
};

// Timer display
const timerValue = localStorage.getItem("timerValue");
let timeLeft = timerValue * 60; // Converts to seconds
const countdown = document.getElementById("countdown");
const timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdown.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        countdown.innerHTML = "Time's up!";
    }
    timeLeft--;
}, 1000);

// Whenever you want to animate something, it begins like this

anime({

}); 
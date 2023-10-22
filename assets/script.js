const selectedGenres = JSON.parse(localStorage.getItem("selectedGenres")) || [];

const songs = [JSON.parse(localStorage.getItem("video"))];
console.log(songs);
const currsong = songs[0][2];
const artist = songs[0][1];

$("#song_title").html(currsong);
$("#artist").html(artist);
console.log(songs[0][3].id.videoId);

function onYouTubeIframeAPIReady() {

  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: songs[0][3].id.videoId,
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
 }

// 5. The API calls this function when the player's state changes.

 function onPlayerStateChange(event){
 };



// Timer display
const timerValue = JSON.parse(localStorage.getItem("timerValue"));
let timeLeft = timerValue.minutes * 60 + timerValue.seconds;
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
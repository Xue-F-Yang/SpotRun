//const selectedGenres = JSON.parse(localStorage.getItem("selectedGenres")) || [];
var current = 0;
const songs = JSON.parse(localStorage.getItem("video"));

setTimeout(() => {  // We need time for the youtube.api to load
console.log(songs);
var currsong = songs[current].song;
var artist = songs[current].artist;
  
$("#song_title").html(currsong);
$("#artist").html(artist);

function onYouTubeIframeAPIReady(current) {
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
  if (event.data == YT.PlayerState.done){ // only register this if the video is done, we can then move forward.
    current++;
    console.log("changing");
    resetvid(current);
  }
};

onYouTubeIframeAPIReady(current);
},1000);
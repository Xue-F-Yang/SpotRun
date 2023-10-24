//const selectedGenres = JSON.parse(localStorage.getItem("selectedGenres")) || [];
var current = 0;
const songs = JSON.parse(localStorage.getItem("video"));
const max_song = 2;
console.log(songs);


var currsong = songs[current].song;
var artist = songs[current].artist;
$("#song_title").html(currsong);
$("#artist").html(artist);

async function makeyoutube() {
  
    function onYouTubeIframeAPIReady(current) {
      console.log("Making Player");
      console.log(songs[current].id);
      window.YT.ready(function() {
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
        console.log("Making Player");
      });

    function onPlayerReady(event) {
      event.target.playVideo();
      console.log("player start");
    };
    // The API calls this function when the player's state changes.

    function onPlayerStateChange(event){
      if (event.data === 0){ // only register this if the video is done, we can then move forward.
        current++;
        console.log("changing");
        resetvid(current);
      }
    };
  };

  // The API will call this function when the video player is ready.
  onYouTubeIframeAPIReady(current);
};


/*const playlist = [
    {
      title: "Song 1",
      artist: "Artist 1",
      genre: "pop",
      url: "song1.mp3"
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      genre: "rock",
      url: "song2.mp3"
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      genre: "hip-hop",
      url: "song3.mp3"
    },
    {
      title: "Song 4",
      artist: "Artist 4",
      genre: "country",
      url: "song4.mp3"
    }
  ];*/

  const selectedGenres = JSON.parse(localStorage.getItem("selectedGenres")) || [];

  if (selectedGenres.length > 0) {
    
    const songs = [localStorage.getItem("video")];
    displayPlaylist(songs);
    //const filteredPlaylist = playlist.filter(song => selectedGenres.includes(song.genre));
    //displayPlaylist(filteredPlaylist);
  }

  function displayPlaylist(playlist) {
    const playlistDiv = document.getElementById("playlist");
    playlistDiv.innerHTML = "";

    playlist.forEach(song => {
      const songDiv = document.createElement("div");
      songDiv.innerHTML = `
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <audio class = "controls">
          <source src="${song}" type="audio/mpeg">
        </audio>
      `;
      playlistDiv.appendChild(songDiv);
    });
    /*var play_song =$("<iframe>");
    play_song.attr({
      width:"560",
      height:"315",
      src:"https://www.youtube.com/embed/AEYN5w4T_aM",
      title:"YouTube video player",
      frameborder:"0",
      allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    }) //allowfullscreen */
   //playlist.appendChild(play_song);

  }

// Timer disolay
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
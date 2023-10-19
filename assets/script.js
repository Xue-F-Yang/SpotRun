let timer;

const playlist = [
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
  ];

  const selectedGenres = JSON.parse(localStorage.getItem("selectedGenres")) || [];

  if (selectedGenres.length > 0) {
      const filteredPlaylist = playlist.filter(song => selectedGenres.includes(song.genre));
      displayPlaylist(filteredPlaylist);
  }

  function displayPlaylist(playlist) {
    const playlistDiv = document.getElementById("playlist");
    playlistDiv.innerHTML = "";
    playlist.forEach(song => {
      const songDiv = document.createElement("div");
      songDiv.innerHTML = `
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <audio controls>
          <source src="${song.url}" type="audio/mpeg">
        </audio>
      `;
      playlistDiv.appendChild(songDiv);
    });
  }

function startTimer() {
  // Get the minutes and seconds values
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);

  // Validate the minutes and seconds values
  if (isNaN(minutes) || isNaN(seconds)) {
    alert("Please enter valid minutes and seconds values.");
    return;
  }

  // Set the initial time in seconds
  let time = minutes * 60 + seconds;

  // Display the initial time
  document.getElementById("timer").innerHTML = formatTime(time);

  // Start the countdown timer
  timer = setInterval(function() {
    time--;
    document.getElementById("timer").innerHTML = formatTime(time);
    document.getElementById("countdown").innerHTML = formatCountdown(time);
    if (time === 0) {
      clearInterval(timer);
      generatePlaylist();
    }
  }, 1000);
}

function stopTimer() {
  // Stop the countdown timer
  clearInterval(timer);
}

function resetTimer() {
  // Stop the countdown timer
  clearInterval(timer);

  // Reset the countdown display
  document.getElementById("countdown").innerHTML = "";

  // Restart the timer display and input fields
  document.getElementById("timer").innerHTML = `
    <label for="minutes">Minutes:</label>
    <input type="number" id="minutes" name="minutes" min="0" step="1" value="0">
    <label for="seconds">Seconds:</label>
    <input type="number" id="seconds" name="seconds" min="0" max="59" step="1" value="0">
    <button type="button" onclick="startTimer()">Start Timer</button>
    <button type="button" onclick="stopTimer()">Stop Timer</button>
    <button type="button" onclick="resetTimer()">Reset Timer</button>
    <div id="countdown"></div>
  `;
  document.getElementById("minutes").value = 0;
  document.getElementById("seconds").value = 0;

  // Clear the playlist display
  document.getElementById("playlist").innerText = "";
}

function generatePlaylist() {
  // Get the distance value
  const distance = parseFloat(document.getElementById("distance").value);

  // Calculate the total time in minutes
  const totalTime = distance * parseFloat(document.getElementById("pace").value);

  // Generate the playlist based on the total time
  let playlist = "";
  if (totalTime < 30) {
    playlist = "Short run playlist";
  } else if (totalTime < 60) {
    playlist = "Medium run playlist";
  } else {
    playlist = "Long run playlist";
  }

  // Display the playlist
  document.getElementById("playlist").innerText = playlist;
}

function formatTime(time) {
  // Format the time as HTML code for the timer display
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `
    <label for="minutes">Minutes:</label>
    <input type="number" id="minutes" name="minutes" min="0" step="1" value="${minutes}">
    <label for="seconds">Seconds:</label>
    <input type="number" id="seconds" name="seconds" min="0" max="59" step="1" value="${seconds}">
    <button type="button" onclick="startTimer()">Start Timer</button>
    <button type="button" onclick="stopTimer()">Stop Timer</button>
    <button type="button" onclick="resetTimer()">Reset Timer</button>
    <div id="countdown"></div>
  `;
}

function formatCountdown(time) {
  // Format the time as HTML code for the countdown display
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `
    <h2>Time Remaining:</h2>
    <h1>${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}</h1>
  `;
}

// Whenever you want to animate something, it begins like this

anime({

}); 
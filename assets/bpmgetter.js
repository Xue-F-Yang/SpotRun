
 localStorage.clear();
 sessionStorage.clear();   

var YOUR_API_KEY = "AIzaSyC-UVwBspPl6ktlIdWNEEk7M6GIXlBzK5s";
var YOUR_CLIENT_ID ="646370971911-o9h6v4v1lq3427cetii08pbbfa4fpvqc.apps.googleusercontent.com";

function getbpm(){
    var bpm_api = "bd8180fdeba0c244a6eef30279f7f512";
    var bpm_url = "https://api.getsongbpm.com";
    var bpm_endpoint = "/tempo/";
    var limit ="limit=250";
    var bpm = '';
    var comp_url = [];
    var dist = 1;
    var dist_in = '';
    var time = 10;
    var height_ft = 5;
    var height_in = 10;
    var stride_length = '';
    var artist ='';
    var song = '';
    
    
    stride_length = 0.414 * height_ft*12+height_in;
    dist_in = dist*63360; //converts miles into inches
    bpm = (Math.round((dist_in/stride_length/time/2)/10))*10; // Round the BPM to the tens spot
    
    
    comp_url = bpm_url+bpm_endpoint+"?"+"api_key="+bpm_api+"&bpm="+bpm+"&"+limit;
    console.log(comp_url);
    
    fetch(comp_url)
      .then(function (response) {
          return response.json();
        }).then(function (data) {
          console.log(data);
          localStorage.setItem("songs",JSON.stringify(data));      
      });
    
    var songlist = JSON.parse(localStorage.getItem("songs"));
    var artist = songlist.tempo[0].artist.name;
    var song = songlist.tempo[0].song_title;
    
    console.log(songlist);
    console.log(artist,song);
    
    return [song,artist];
    };
    



function execute() {
console.log("executing");
var songartist = getbpm();
const song = songartist[0]
const artist = songartist[1];
return gapi.client.youtube.search.list({
    "type":["video"],
    "part": ["snippet"],
    "maxResults": 25,
    "q": artist+" "+song,
    "videoEmbeddable": ["true"],

})
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
            console.log(response.result.items[0].id.videoId);
            var youtubeid = response.result.items[0].id.videoId;
            console.log("https://www.youtube.com/watch?v="+youtubeid);
            var video = "https://www.youtube.com/watch?v="+youtubeid;
            var runtime = response.result.items[0];
            localStorage.setItem("video",JSON.stringify([video,artist,song,runtime]));

            function startTimer() {
                const minutes = document.getElementById("minutes").value;
                const seconds = document.getElementById("seconds").value;
                const timerValue = { minutes, seconds };
                localStorage.setItem("timerValue", JSON.stringify(timerValue));
                window.location.href = "index02.html";
            };

			startTimer();
			const selectedGenres = Array.from(document.getElementById("genre").selectedOptions, option => option.value);
			localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
			window.location.href = "index02.html";

            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
gapi.auth2.init({client_id: YOUR_CLIENT_ID});
});
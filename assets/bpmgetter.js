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
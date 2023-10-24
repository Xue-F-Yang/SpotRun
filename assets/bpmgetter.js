
localStorage.clear();
sessionStorage.clear();   

const max_song =2;
const video_list = [];

async function getbpm(){
    var bpm_api = "bd8180fdeba0c244a6eef30279f7f512";
    var bpm_url = "https://api.getsongbpm.com";
    var bpm_endpoint = "/tempo/";
    var limit ="limit=250";
    var bpm = '';
    var comp_url = [];
    var dist = $("#distance").val();
    var dist_in = '';
    var time = $("#minutes").val();
    var height_ft = $("#height_ft").val();
    var height_in = $("#height_in").val();
    var stride_length = '';
    const genre = $("#genre").val();
    console.log(genre);
    console.log(genre[0]); // for some reason genre is an array. I think its because of the drop down?
    console.log(time);
    const genre_songs = [];
    stride_length = 0.414 * height_ft*12+height_in;
    dist_in = dist*63360; //converts miles into inches
    bpm = (Math.round((dist_in/stride_length/time/2)/10))*10; // Round the BPM to the tens spot
    
    
    comp_url = bpm_url+bpm_endpoint+"?"+"api_key="+bpm_api+"&bpm="+bpm+"&"+limit;
    console.log(comp_url);
    
    return fetch(comp_url)
      .then(function (response) {
          return response.json();
        }).then(function (data) {
        console.log(data);
        console.log(data.tempo.length)
        if (genre[0] === "hip-hop"){
            genre[0] = "hip hop" //Look the .val function wont pick up "hip hop" so we have to convert it.
        };
        for (var i =0; i<data.tempo.length;i++){
            if (data.tempo[i].artist.genres !== null){ //apparently some music has no genre, gotta skip those
                for (var j = 0; j<data.tempo[i].artist.genres.length;j++){
                    if (data.tempo[i].artist.genres[j] === genre[0]){
                        genre_songs.push(data.tempo[i]) //This scans through all the songs we selected, and it picks out those of the desired genre
                        console.log("generating");
                    };
                }; 
            };
        };

        localStorage.setItem("songs",JSON.stringify(genre_songs));  
    });
};

async function getsongs(song_list){

    for ( var i = 0; i < max_song; i++){
        var rand_song = Math.floor(Math.random()*song_list.length); //pulls out a random song from the big list!
        const artist = song_list[rand_song].artist.name;
        const song = song_list[rand_song].song_title;
        
        console.log(artist,song);
        
        async function youtubing (){
            return gapi.client.youtube.search.list({
                "type":["video"],
                "part": ["snippet"],
                "maxResults": 25,
                "q": "'"+song+"'"+" "+"'"+artist+"'",//I'm trying to have EXACT searches. You can get funny results otherwise
                "videoEmbeddable": ["true"],
            
            })
                .then(function(response) {
                        // Handle the results here (response.result has the parsed body).
                        console.log("Response", response);
                        console.log(response.result.items[0].id.videoId);
                        var youtubeid = response.result.items[0].id.videoId;
                        console.log("https://www.youtube.com/watch?v="+youtubeid);
                        const video = "https://www.youtube.com/watch?v="+youtubeid;
                        let video_combo = {
                            "video":video,
                            "artist":artist,
                            "song":song,
                            "id":youtubeid,}
                        video_list.push(video_combo);
                        console.log("youtubing");
                        localStorage.setItem("video",JSON.stringify(video_list));
            });
        };

        await youtubing();
    };
};

async function execute() {
    
    await getbpm();
    const song_list = JSON.parse(localStorage.getItem("songs"));
    console.log(song_list);
    await getsongs(song_list);

    function startTimer() {
        const minutes = document.getElementById("minutes").value;
        const timerValue = minutes;
        localStorage.setItem("timerValue", timerValue);
        window.location.href = "index02.html";
    };

    startTimer();
    const selectedGenres = Array.from(document.getElementById("genre").selectedOptions, option => option.value);
    localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
    window.location.href = "index02.html";
        
};

gapi.load("client:auth2", function() {
    var YOUR_CLIENT_ID ="646370971911-b0mr1hoj1dc4jhc22jnjehp0v8b23h33.apps.googleusercontent.com";
    gapi.auth2.init({client_id: YOUR_CLIENT_ID});
});
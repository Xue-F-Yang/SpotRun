function resetvid(current){
    var currsong = songs[current].song;
    var artist = songs[current].artist;
    $("#song_title").html(currsong);
    $("#artist").html(artist);
    player.loadVideoById(songs[current].id);
};

function rewind (){

    if (current > 0){
        current--;
        resetvid(current);
        console.log("rewinding");
    };
};

function skip(){
    if (current < max_current){
        current++;
        resetvid(current);
        console.log("skipping");
    };
};
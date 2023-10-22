const max_song = 2;

    async function resetvid(current){
        var currsong = songs[current].song;
        var artist = songs[current].artist;
        $("#song_title").html(currsong);
        $("#artist").html(artist);
        player.loadVideoById(songs[current].id);
    };

    async function rewind (){
        if (current > 0){
            current--;
            await resetvid(current);
            console.log("rewinding");
        };
    };

    async function skip(){
        if (current < max_song){
            current++;
            await resetvid(current);
            console.log("skipping");
        };
    };

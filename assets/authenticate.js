var YOUR_CLIENT_ID ="646370971911-o9h6v4v1lq3427cetii08pbbfa4fpvqc.apps.googleusercontent.com";
var YOUR_API_KEY = "AIzaSyC-UVwBspPl6ktlIdWNEEk7M6GIXlBzK5s";

async function authenticate() {
    $("#preloader_wrapper").css({
        "display":"flex",
    });
    console.log("autneticating")
    return gapi.auth2.getAuthInstance()
        //.signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})//
        .then(function() { console.log("Sign-in successful"); },
                function(err) { console.error("Error signing in", err); });
    };
    
async function loadClient() {
    console.log("loading")
    gapi.client.setApiKey(YOUR_API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
    };

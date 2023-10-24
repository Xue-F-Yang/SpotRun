let root = document.getElementById('root')
    function clearCache() {
        if (!location.hash) {
            location.hash = "#reloading";
            location.reload(true);
            console.log("reloading");
            } else {
            location.hash = "#reloaded";
            console.log("reloaded");
        };

    };
clearCache()
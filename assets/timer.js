// Timer display

async function createtimer(){
    const timerValue = localStorage.getItem("timerValue");
    let timeLeft = timerValue * 60; // Converts to seconds
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
    

};


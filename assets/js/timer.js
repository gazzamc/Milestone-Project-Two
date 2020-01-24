function timer() {
    let curTime = $(".timer h2").text();
    let splitTime = curTime.split(":");
    let mins = splitTime[0];
    let seconds = splitTime[1];

    if (seconds == 0) {
        seconds = 59;
        if (mins > 0) {
            mins--;
        }
    } else {
        seconds--;

        if (seconds < 10) {

            seconds = "0" + seconds;
        }
    }
    /* Spawn enemies based on spawn rate */
    if (seconds % spawnRate == 0) {
        spawnEnemies();
    }
    /* Game over if time runs out */
    if (mins == 0 && seconds == 00) {
        waves++;
        /* Check waves complete and change diff depending on which one */
        if (waves == 3) {
            gameOver();
            showDialog();
        } else {
            $(".timer h2").text("1:00");
            spawnRate -= 3;
            showWave("Wave " + (waves + 1), true);
        }
    } else {
        $(".timer h2").text(mins + ":" + seconds);
    }
}
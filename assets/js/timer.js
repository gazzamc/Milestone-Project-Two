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
    if (mins == 0 && seconds == 0) {
        waves++;
        /* Check waves complete and change diff depending on which one */
        if (waves == 3) {
            gameOver();
            showDialog();
        } else {

            if(timerSec < 10){
                $(".timer h2").text(timerMin + ":" + timerSec + "0"); 
            }else{
                $(".timer h2").text(timerMin + ":" + timerSec);
            }

            /* check if spawn decrease is higher than spawn rate, if so cap it */
            if(spawnRateDec > spawnRate){
                spawnRateDec = 1; //minimum
            }

            if(spawnRate > 1){
                spawnRate -= spawnRateDec;
            }

            showWave("Wave " + (waves + 1), true);
        }
    } else {
        $(".timer h2").text(mins + ":" + seconds);
    }
}
function startGame(type) {

    if (type == "restart") {
        /* Reset global variables */
        enemies = 0;
        bullets = 30;
        score = 0;
        combo = 0;
        highestCombo = 0;
        waves = 0;
        spawnRate = 10;

        /* Call gameOver function to remove intervals/spawned enemies */
        gameOver();

        /* Reset UI */
        $(".timer h2").text("1:00");
        $(".score").text("Score: 0");
        $(".combo").text("Combo: x0");
        $(".bulletCount").text("30");
        $("." + character + " .health .num").text("100");
        $("." + character + " .health").css("width", "100px");

        /* if character deleted add */
        if ($("." + character).length == 0) {
            changeCharacter(character);
        }

        /* reset player/horizon position */
        $("." + character).css("left", "");
        $(".horizon").css("left", "");
    }

    /* if no map selected add default- tatooine */
    if ($(".background").length == 0 && $("." + character).length == 0) {
        changeBackground("tatooine");
        changeCharacter("chewie");
    }

    /* Start/Restart intervals */
    time = setInterval(timer, 1000);
    checkFriendlyFire = setInterval(friendlyFire, 1);
    healthSpawn = setInterval(spawnHealth, healthSpawnRate);

}

function pauseGame() {
    isGamePaused = !isGamePaused;
    if (isGamePaused) {

        /* Stop timer */
        clearInterval(time);

        /* Stop taking damage */
        clearInterval(checkFriendlyFire);

        /* Stop health spawn */
        clearInterval(healthSpawn);

        /* https://www.quackit.com/css/css3/properties/css_animation-play-state.cfm */
        /* Stop Enemies moving */
        $(".stormtrooper").each(function () {
            $(this).css("animation-play-state", "paused");
        });

        /* https://stackoverflow.com/questions/36454853/start-stop-keypress-event-jquery */
        /* Pause user inputs other than pause button */
        isKeyHandlerActive = false;

        /* Stop enemies shooting by clearing all intervals */
        enemyFireArr.forEach(function (interval) {
            clearInterval(interval);
            enemyFireArr[enemyFireArr.indexOf(interval)] = "cleared";
        });


        /* Display pause menu */
        /*         $("#pauseMenu").dialog();
                $(document).on('click','.ui-dialog-titlebar-close',function(){
                    pauseGame();
                });
        
                $("#mapChange").click(function(){
                    changeBackground("tatooine");
                });
        
                $("#charChange").click(function(){
                    changeCharacter("chewie");
                });
        
                $("html").css("cursor", "pointer");
                $(".hidden").css("display", "block"); */

        showDialog("pause");

    } else {

        time = setInterval(timer, 1000);
        checkFriendlyFire = setInterval(friendlyFire, 1);
        healthSpawn = setInterval(spawnHealth, healthSpawnRate);

        $(".stormtrooper").each(function () {
            $(this).css("animation-play-state", "running");
        });

        isKeyHandlerActive = true;

        $(".stormtrooper").each(function () {
            let troopId = $(this).attr("id");
            enemyFireArr[troopId - 1] = setInterval(enemyFire, 4000, $(this));
        });

        /* hide pause menu */
        $("#pauseMenu").dialog("close");
        isDialogOpen = false;
        $("html").css("cursor", "none");
    }
}

function gameOver() {
    /* clear enemy intervals */
    clearBulletArray("enemy");

    /* Delete all troopers */
    $(".stormtrooper").each(function () {
        $(this).remove();
    });

    $(".healthTopUp").remove();

    updateScore("clear");

    /* Stop time interval */
    clearInterval(time);

    /* Stop friendly fire interval */
    clearInterval(checkFriendlyFire);

    /* Stop health spawn */
    clearInterval(healthSpawn);
}

function updateScore(behaviour = "update") {

    if (behaviour == "clear") {

        /* Remove Combo and add to score */
        score += combo;

        if (combo > highestCombo) { highestCombo = combo };
        combo = 0;
        $(".combo").text("Combo: x" + combo);
        $(".score").text("Score: " + score);
    } else {

        /* Increase combo first */
        combo += 1;
        $(".combo").text("Combo: x" + combo);

        /* Update Score */
        $(".score").text("Score: " + score);
    }
}

function clearBulletArray(type, enemyId) {

    if (type == "enemy") {
        if (enemyId == null) {
            /* Clear all trooper intervals */
            enemyFireArr.forEach(function (interval) {
                clearInterval(interval);
            });
            enemyFireArr = [];
        } else {

            /* Clear individual trooper interval */
            enemyFireArr.forEach(function (item) {
                if ((parseInt(enemyId) - 1) == enemyFireArr.indexOf(item)) {

                    /* https://stackoverflow.com/questions/32891807/jquery-wildcard-selector-starts-w-string-and-ends-w-variable */
                    $(["id^=enemy" + parseInt(enemyId) + "bullet"]).remove();

                    clearInterval(item);
                    /* replace interval id with cleared to maintain array size */
                    enemyFireArr[enemyFireArr.indexOf(item)] = "cleared";
                }
            });
        }

    } else {
        isReadyToFire = true;

        /* Clear bullet array */
        checkCol.forEach(function (item) {
            clearInterval(item);
            checkCol[checkCol.indexOf(item)] = "cleared";
        });
        $(".bullet").remove();
    }
}

/* Call all functions to start game and set character/map */
function initGame(setPlayerChoice = true){
    let startType;

    if(setPlayerChoice){

        /* set character/map */
        if(character == "han"){
            changeCharacter("han");
        }else{
            character = "chewie";
            changeCharacter("chewie");
        }

        if(map == "tattoine"){
            changeBackground("tatooine");
        }else{
            /* placeholder - set default map if none selected */
            map = "tattoine";
            changeBackground("tatooine");
        }
    }else{
        startType = "restart";
    }

    showWave("Wave " + (waves + 1), true);
    startGame(startType);
    spawnEnemies();
    
    $(".playerUi").css("display", "block");
    $("html").css("cursor", "none");
}
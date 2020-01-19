/* Global Variables */
var bullets = 30;
var isReadyToFire = true;
var time = setInterval(timer, 1000);
var checkFriendlyFire = setInterval(friendlyFire, 1);
var enemies = 0;
var spawnRate = 6;
var score = 0;
var combo = 0;
var checkCol = [];
var enemyFireArr = [];
var gamePaused = false;
var keyHandlerActive = true;

/* Functions */

$(document).ready(function(){
    spawnEnemies();
});

function changeCharacter(char){
    let clone;

    /* Remove character */
    if($("."+ char).length != 0){
        $(".chewie").remove();

    };

    if(char == "chewie"){
        let template = $("#chewieTemp").html();
        clone = template;
    }

    $(".timer").after(clone);
    $("head").append('<link rel="stylesheet" href="assets/css/'+ char + '.css">');
}

function changeBackground(map){
    let clone;

    if(map == "tatooine"){
        let template = $("#tatooineTemp").html();
        clone = template;
    }

    $(".timer").before(clone);
    $("head").append('<link rel="stylesheet" href="assets/css/'+ map + '.css">');
}

function pauseGame() {
    gamePaused = !gamePaused;
    if (gamePaused){
        /* Stop timer */
        clearInterval(time);  

        /* Stop taking damage */
        clearInterval(checkFriendlyFire);  

        /* https://www.quackit.com/css/css3/properties/css_animation-play-state.cfm */
        /* Stop Enemies moving */
        $(".stormtrooper").each(function(){
            $(this).css("animation-play-state", "paused");
        });

        /* https://stackoverflow.com/questions/36454853/start-stop-keypress-event-jquery */
        /* Pause user inputs other than pause button */
        keyHandlerActive = false;

        /* Stop enemies shooting by clearing all intervals */
        enemyFireArr.forEach(function(interval){
            clearInterval(interval);
        });


        /* Display pause menu */
        $("#pauseMenu").dialog();
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
        $(".hidden").css("display", "block");

    }else{
        time = setInterval(timer, 1000);
        checkFriendlyFire = setInterval(friendlyFire, 1);

        $(".stormtrooper").each(function(){
            $(this).css("animation-play-state", "running");
        });

        keyHandlerActive = true;

        $(".stormtrooper").each(function(){
            let troopId = $(this).attr("id");
            enemyFireArr[troopId] = setInterval(enemyFire, 4000, $(this));
        });

        /* hide pause menu */
        $("#pauseMenu").dialog("close");
        $("html").css("cursor", "none");
    }
}

function updateScore(behaviour = "update") {

    if (behaviour == "clear") {

        /* Remove Combo and add to score */
        score += combo;
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

function reload() {
    $(".cleftArm").addClass("reloadAnimation");

    /*     https://stackoverflow.com/questions/49580666/check-if-an-css-animation-is-completed-with-jquery-or-js */
    $('.cleftArm').on('animationend webkitAnimationEnd', function () {
        for (var i = 0; i <= 30; i++) {
            $(".bullet#" + i).remove();
        }

        bullets = 30;
        $(".bulletCount").text(bullets);
        $(".cleftArm").removeClass("reloadAnimation");
        isReadyToFire = true;
    });
}

function currEnemies() {
    let enemiesAlive = 0;
    $(".stormtrooper").each(function () {
        enemiesAlive++;
    });

    return enemiesAlive;
}

function findBlasterLoc(char) {
    let blaster;
    
        if(findEnemyType(char) == "chewie"){
            blaster = $(".cblasterBarrel").offset();
        }
        else if(findEnemyType(char) == "stormtrooper"){
            blaster = $("." + findEnemyType(char) + "#" + char.attr("id") +" .body .blaster").offset();
        }

    return [blaster.top, blaster.left]
}

function setBulletTrajectory(source, char) {

    let getAngle = source.attr("style");

    if(getAngle == null){
        getAngle = "transform: rotate(0deg)";
    }

    /* https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript */
    getDig = getAngle.split("(").join(",").split(")").join(",").split(",");

    let degree = parseFloat(getDig[1]);

    /* Find blaster */
    let blasterPos = findBlasterLoc(char);
    let top = blasterPos[0];
    let left = blasterPos[1];


    if(findEnemyType(char) == "chewie"){

        /* Fix location of spawned bullet depending on arm angle */
        if (degree <= -30 && degree >= -35) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top + 28) + 'px; left:' + left + 'px;"></div>');
        }
        else if (degree <= -25 && degree >= -30) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top + 35) + 'px; left:' + left + 'px;"></div>');
        }
        else if (degree <= -16 && degree >= -25) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top + 30) + 'px; left:' + left + 'px;"></div>');
        }
        else if (degree <= -10 && degree >= -16) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top + 22) + 'px; left:' + left + 'px;"></div>');
        }
        else if (degree <= -6 && degree >= -10) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top + 10) + 'px; left:' + left + 'px;"></div>');
        }
        else if (degree <= 0 && degree >= -6) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top + 5) + 'px; left:' + left + 'px;"></div>');
        };

        $(".bullet").css("transform", "rotate(" + degree + ")");

        $(".bullet").animate({ left: '120vw', top: '-=' + (Math.abs(parseFloat(degree)) * 3) + 'vh' }, 3000, "linear", function () {
            if (isReadyToFire) {
                clearBulletArray();
            }
        });

    } else if(findEnemyType(char) == "stormtrooper"){

        let bulletId = "enemy" + char.attr("id") + "bullet" + left;

        /* Fix location of spawned bullet depending on arm angle */
        if (degree <= -20 && degree >= -25) {
            $("body").append('<div class="enBullet" id="' + bulletId + '" style="top:' + (top + 20) + 'px; left:' + left + 'px;"></div>');
        }
        else if (degree <= -15 && degree >= -20) {
            $("body").append('<div class="enBullet" id="' + bulletId + '" style="top:' + (top + 38) + 'px; left:' + left + 'px;"></div>');
        }
        else if (degree <= -10 && degree >= -15) {
            $("body").append('<div class="enBullet" id="' + bulletId + '" style="top:' + (top + 37) + 'px; left:' + left + 'px;"></div>');
        }
        else if (degree < -6 && degree >= -10) {
            $("body").append('<div class="enBullet" id="' + bulletId + '" style="top:' + (top + 35) + 'px; left:' + left + 'px;"></div>');
        }
        else {
            $("body").append('<div class="enBullet" id="' + bulletId + '" style="top:' + (top + 7) + 'px; left:' + left + 'px;"></div>');
        };

        if(degree > 0){
            $("#" + bulletId).css("transform", "rotate(-"+ Math.abs(degree) + "deg");
        } else{
            $("#" + bulletId).css("transform", "rotate(" + Math.abs(degree) + "deg)");
        }

        /* Adjust animation angle based on the enemies placement on screen */
        if(left  <= (window.innerWidth * 0.9)){
            $(".enBullet").animate({left: '-40vw', top: '+=' + ((degree * 5.2) - (degree * 5.2) * 0.1)  + 'vh' }, 3000, "linear");
        } else if(left  <= (window.innerWidth * 0.8)){
           $(".enBullet").animate({left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.2)  + 'vh' }, 3000, "linear"); 
        } else if(left  <= (window.innerWidth * 0.7)){
           $(".enBullet").animate({left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.3)  + 'vh' }, 3000, "linear"); 
        } else if(left  <= (window.innerWidth * 0.6)){
           $(".enBullet").animate({left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.4)  + 'vh' }, 3000, "linear"); 
        } else if(left  <= (window.innerWidth * 0.5)){
           $(".enBullet").animate({left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.5)  + 'vh' }, 3000, "linear"); 
        } else if(left  <= (window.innerWidth * 0.4)){
           $(".enBullet").animate({left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.6)  + 'vh' }, 3000, "linear"); 
        } else if(left  <= (window.innerWidth * 0.3)){
           $(".enBullet").animate({left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.7)  + 'vh' }, 3000, "linear"); 
        } else{
           $(".enBullet").animate({left: '-40vw', top: '+=' + (degree * 5.2)  + 'vh' }, 3000, "linear");      
        }

    }
}

function friendlyFire() {
    let friendly = $(".chewie");

    /* Check if stormtrooper hits player */
    $(".stormtrooper").each(function () {
        if (isHit($(this), friendly)) {
            $(this).remove();

            let getArr = enemyFireArr[($(this).attr("id") - 1)];
            clearInterval(getArr);

            enemyFireArr[($(this).attr("id") - 1)] = "cleared";
            updateScore("clear");
            damage(10, friendly);
        }
    });

    /* Check if stormtroopers bullets hits player */
    $('[id^=enemy]').each(function () {

        let enBulletPos = $(this).offset();

        /* Remove enemy bullet if out of bounds */
        let isOut = outOfBounds(enBulletPos);
        if(isOut){
            $(this).remove();
        }

        if (isHit($(this), $(".chewie .cbody"))) {
            $(this).remove();
                
            updateScore("clear");
            damage(10, friendly);
        } else if(isHit($(this), $(".chewie .chead"))){
            $(this).remove();

            updateScore("clear");
            damage(20, friendly);
        }
    });
};

function damage(damageAmount, target) {
    let currHealth = $(target).find(".health span.num").text();
    let currWidth = parseInt($(target).find(".health").css("width"));

    /* https://stackoverflow.com/questions/25740616/unrecognized-expression-object-object-when-using */
    $(target).find(".health").css("width", (currWidth - damageAmount) + "px");
    $(target).find(".health span.num").text(currHealth - damageAmount);

    if ((currHealth - damageAmount) <= 0) {
        clearBulletArray("enemy", target.attr("id"));
        target.remove();

        if (findEnemyType(target) == "chewie") {
            gameOver();
        } else {
            score += 50;
        }
    }
};

function gameOver() {
    $(".timer h2").text("Game Over!");

    /* clear enemy intervals */
    clearBulletArray("enemy");

    /* Delete all troopers */
    $(".stormtrooper").each(function(){
        $(this).remove();
    });

    updateScore("clear");

    /* Stop time interval */
    clearInterval(time);

    /* Stop friendly fire interval */
    clearInterval(checkFriendlyFire);
}

function spawnEnemies() {
    let stormtrooper = $("template#trooperTemp #document-fragment");
    let curTime = $(".timer h2").text();

    /* https://stackoverflow.com/questions/15930706/html-template-tag-and-jquery */
    /* Grabbing template of trooper from document fragment and cloning/copying 
        it to a seperate variable in order to put it into the DOM */
    let template = $("#trooperTemp").html();
    let clone = template;

    $("body").append(clone);

    /* Giving trooper a unique ID based on enemies spawned count */
    $(".stormtrooper").each(function () {
        if ($(this).attr("id") == null) {
            $(this).attr("id", enemies + 1);
            enemies++;
            enemyFireArr.push(setInterval(enemyFire, 4000, $(this)));
        }
    });
}

function setEnemyAim(enemy) {
    let enemyId = enemy.attr("id");

    /* Get random number between -25 and 25 */
    /* https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value?lq=1 */
    let randomNum = Math.random() * 25;
    randomNum *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    /* Prevent any number above 10 */
    if(randomNum > 10){
        randomNum = Math.random() * 10;
        randomNum *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    }

    $("#" + enemyId + ".stormtrooper .blaster").css("transform", "rotate(" + randomNum + "deg)");
    $("#" + enemyId + ".stormtrooper .arms.leftArm").css("transform", "rotate(" + randomNum + "deg)");
}

function enemyFire(enemy) {
    setEnemyAim(enemy);
    setBulletTrajectory($(".stormtrooper#"+ enemy.attr("id") +" .body .blaster"), enemy);
}

function timer() {
    let curTime = $(".timer h2").text();
    let splitTime = curTime.split(":");
    let mins = splitTime[0];
    let seconds = splitTime[1];

    if (seconds == 00) {

        seconds = 59;

        if (mins > 0) {
            mins--;
        }

    } else {
        seconds--;

        if (seconds < 10) {

            seconds = "0" + seconds
        }
    }

    /* Spawn enemies based on spawn rate */
    if (seconds % spawnRate == 0) {

        spawnEnemies();
    }

    /* Game over if time runs out */
    if (mins == 0 && seconds == 0) {

        gameOver();
    } else {
        $(".timer h2").text(mins + ":" + seconds);
    }
}

/* https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection */
function isHit(target, target2) {

    let targetPos = target.offset();
    let target2Top = $(target2).offset().top;
    let target2Bottom = $(target2).offset().top + $(target2).outerHeight();
    let target2Left = $(target2).offset().left;
    let target2Right = $(target2).offset().left + $(target2).outerWidth();

    if (targetPos.left > target2Left &&
        targetPos.top > target2Top &&
        targetPos.left < target2Right &&
        targetPos.top < target2Bottom) {
        return true;
    } else {
        return false;
    }
};

function findEnemyType(enemy) {
    let getClasses = enemy.attr("class");
    let splitClasses = getClasses.split(" ");

    return splitClasses[0];
};

function outOfBounds(bulletPos) {
    let istrue = false;

    /* This removes the bullet if it missed and goes out of view */
    if (bulletPos.left > innerWidth || bulletPos.top > innerHeight
        || bulletPos.left < 0 || bulletPos.left < 0) {
        istrue = true;     
    };

    return istrue;
}

function findCol(bullet, enemy) {
    let bulletPos = bullet.offset();
    let isOut = outOfBounds(bulletPos);

    if(isOut){
        clearBulletArray();
    };

    /* Check if we hit enemy */
    if (isHit(bullet, enemy)) {
        let enemyType = findEnemyType(enemy);

        /* Check for headshot */
        if (isHit(bullet, $("." + enemyType + "#" + enemy.attr("id") + " .head"))) {
            damage(50, enemy);
            score += 20;

        } else {
            damage(10, enemy);
            score += 10;
        }

        /* Update score total and remove bullet/stop collision check */
        clearBulletArray();
        updateScore();
    }
};

function clearBulletArray(type, enemyId) {

    if(type == "enemy"){
        if(enemyId == null){
                /* Clear all trooper intervals */
                enemyFireArr.forEach(function(interval){
                    clearInterval(interval);
                });
        }else{

            /* Clear individual trooper interval */
            enemyFireArr.forEach(function (item) {
                if((parseInt(enemyId) - 1) == enemyFireArr.indexOf(item)){

                    /* https://stackoverflow.com/questions/32891807/jquery-wildcard-selector-starts-w-string-and-ends-w-variable */
                    $(["id^=enemy" + parseInt(enemyId) + "bullet"]).remove();

                    clearInterval(item);
                    /* replace interval id with cleared to maintain array size */
                    enemyFireArr[enemyFireArr.indexOf(item)] = "cleared";                
                }
            });
        }

    }else{
        isReadyToFire = true;

        /* Clear bullet array */
        checkCol.forEach(function (item) {
            clearInterval(item);
            checkCol[checkCol.indexOf(item)] = "cleared";  
        });
        $(".bullet").remove();
    }
}

/* Key Presses */
$(document).keypress(function (event) {

    /* pause game */
    if (event.which == 112) {
        pauseGame();
    }

    /* Check that game isnt paused */
    if (!keyHandlerActive){ 
        return; 
    }

    /* Move left or right with A/D keys  */
    if (event.which == 100) {
        let curPos = $("div.chewie").css("left");
        let newPos = parseInt(curPos) + 5;
        $("div.chewie").css("left", newPos);

        let curBgPos = $("div.horizon").css("left");
        let newBgPos = parseInt(curBgPos) - 5;
        $("div.horizon").css("left", newBgPos);
    }
    else if (event.which == 97) {
        let curPos = $("div.chewie").css("left");
        let newPos = parseInt(curPos) - 5;

        let curBgPos = $("div.horizon").css("left");
        let newBgPos = parseInt(curBgPos) + 5;
         $("div.horizon").css("left", newBgPos);

        /* Prevent player from leaving screen view */
        if (parseInt(curPos) > 0) {
            $("div.chewie").css("left", newPos);
        }
    }

    /* Fire, Reload and Crouch with space, R and C keys */
    else if (event.which == 32) {
        /* Check if ready to fire and that there are enemies on screen */
        if (isReadyToFire && (currEnemies() > 0)) {
            if (bullets > 0) {
                isReadyToFire = false;

                setBulletTrajectory($(".crightArm"), $(".chewie"));

                /* Deplete ammo count */
                bullets -= 1;
                $(".bulletCount").text(bullets);

                /* Check for collision */
                $(".stormtrooper").each(function () {
                    checkCol.push(setInterval(findCol, 100, $("#" + (bullets + 1) + ".bullet"), $(this)));
                });
            }
        }
    }

    else if (event.which == 114) {
        if (bullets < 30) {
            isReadyToFire = false;
            reload();
        }
    }

    else if (event.which == 99) {
        $("div.chewie").addClass("crouch");

        $(document).keyup(function (event) {
            $("div.chewie").removeClass("crouch");

        });
    }
    else if (event.which == 122) {
        $("div.chewie").addClass("jump");

        $(document).keyup(function (event) {
            $("div.chewie").removeClass("jump");

        });
    };
});

/* Move players arm when mouse is moved */
/* https://stackoverflow.com/questions/22977862/calculating-angle-in-degrees-of-mouse-movement */
$(document).mousemove(function (event) {
    var radian = Math.atan2(180, event.pageY);
    var grade = radian / (Math.PI / 90);

    $('.cbody.carms.crightArm').css("transform", "rotate(-" + (grade - 10) + "deg)");
});
/* Global Variables */
var bullets = 30;
var isReadyToFire = true;
var time = setInterval(timer, 1000);
var checkFriendlyFire = setInterval(friendlyFire, 1);
var enemies = 0;
var spawnRate = 10;
var score = 0;
var combo = 0;
var checkCol = [];
var enemyFireArr = [];

/* Functions */

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

    try{
        if(findEnemyType(char) == "chewie"){
            blaster = $(".cblasterBarrel").offset();
        }
        else if(findEnemyType(char) == "stormtrooper"){
            blaster = $("." + findEnemyType(char) + "#" + char.attr("id") +" .body .blaster").offset();
        }
    } catch (error){
        console.log(error);
    }

    return [blaster.top, blaster.left]
}

function setBulletTrajectory(source, char) {

    let getAngle = source.attr("style");
    let getDig = 0;

    try {
        /* https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript */
        getDig = getAngle.split("(").join(",").split(")").join(",").split(",");
        /* console.log(parseFloat(getDig[1])); */
    } catch (error) {
        /* console.log(error); */
    }

    let degree = getDig[1];

    /* Find blaster */
    let blasterPos = findBlasterLoc(char);
    let top = blasterPos[0];
    let left = blasterPos[1];

    if(findEnemyType(char) == "chewie"){

        /* Fix location of spawned bullet depending on arm angle */
        if (parseFloat(degree) <= -30 && parseFloat(degree) >= -35) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top - 36) + 'px; left:' + left + 'px;"></div>');
        }
        else if (parseFloat(degree) <= -25 && parseFloat(degree) >= -29) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top - 50) + 'px; left:' + left + 'px;"></div>');
        }
        else if (parseFloat(degree) <= -10 && parseFloat(degree) >= -25) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top - 50) + 'px; left:' + left + 'px;"></div>');
        }
        else if (parseFloat(degree) < -6 && parseFloat(degree) >= -9) {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top - 63) + 'px; left:' + left + 'px;"></div>');
        }
        else {
            $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + (top - 68) + 'px; left:' + left + 'px;"></div>');
        };

        $(".bullet").css("transform", "rotate(" + degree + ")");

        $(".bullet").animate({ left: '120vw', top: '-=' + (Math.abs(parseFloat(degree)) * 3) + 'vh' }, 5000, "linear", function () {
            if (isReadyToFire) {
                clearBulletArray();
            }
        });
    } else if(findEnemyType(char) == "stormtrooper"){

        /* Fix location of spawned bullet depending on arm angle */
        if (parseFloat(degree) <= -30 && parseFloat(degree) >= -35) {
            $("body").append('<div class="enBullet" id="enemy' + char.attr("id") + 'bullet' + left +'" style="top:' + (top - 36) + 'px; left:' + left + 'px;"></div>');
        }
        else if (parseFloat(degree) <= -25 && parseFloat(degree) >= -29) {
            $("body").append('<div class="enBullet" id="enemy' + char.attr("id") + 'bullet' + left +'" style="top:' + (top - 50) + 'px; left:' + left + 'px;"></div>');
        }
        else if (parseFloat(degree) <= -10 && parseFloat(degree) >= -25) {
            $("body").append('<div class="enBullet" id="enemy' + char.attr("id") + 'bullet' + left +'" style="top:' + (top - 50) + 'px; left:' + left + 'px;"></div>');
        }
        else if (parseFloat(degree) < -6 && parseFloat(degree) >= -9) {
            $("body").append('<div class="enBullet" id="enemy' + char.attr("id") + 'bullet' + left +'" style="top:' + (top - 63) + 'px; left:' + left + 'px;"></div>');
        }
        else {
            $("body").append('<div class="enBullet" id="enemy' + char.attr("id") + 'bullet' + left +'" style="top:' + (top - 68) + 'px; left:' + left + 'px;"></div>');
        };

        if(parseFloat(degree) > 0){
            $(".enBullet").css("transform", "rotate(-" + degree + ")");

            $(".enBullet").animate({left: '-40vw', top: '+=' + (parseFloat(degree) * 6) + 'vh' }, 5000, "linear");
        } else{
            $(".enBullet").css("transform", "rotate(" + (degree + 4) + ")");
            $(".enBullet").animate({left: '-40vw', top: '+=' + (parseFloat(degree) * 6) + 'vh' }, 5000, "linear");
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
            console.log(enemyFireArr);
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

    $(".stormtrooper").each(function () {
        $(this).remove();
    })

    updateScore("clear");

    clearInterval(time);
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

    /* Get random number between -20 and 20 */
    /* https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value?lq=1 */
    let randomNum = Math.random() * 20;
    randomNum *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    $("#" + enemyId + ".stormtrooper .blaster").css("transform", "rotate(" + randomNum + "deg)");

    /* $("#" + enemyId + ".stormtrooper .blaster").animate(
        {transform: 'rotate(' + randomNum + 'deg)'}, 1000, "linear"); */
}

function enemyFire(enemy) {
    setEnemyAim(enemy);
    setBulletTrajectory($(".stormtrooper#1 .body .blaster"), enemy);
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
        try {
            console.log("Out of bounds");
            clearBulletArray();
        } catch (error) {
            console.log(error);
        }
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
        /* Clear bullet array */
        enemyFireArr.forEach(function (item) {
            if((parseInt(enemyId) - 1) == enemyFireArr.indexOf(item)){

                /* https://stackoverflow.com/questions/32891807/jquery-wildcard-selector-starts-w-string-and-ends-w-variable */
                $(["id^=enemy" + parseInt(enemyId) + "bullet"]).remove();

                clearInterval(item);
                /* replace interval id with cleared to maintain array size */
                enemyFireArr[enemyFireArr.indexOf(item)] = "cleared";
                
            }
        });

    }else{
        isReadyToFire = true;

        /* Clear bullet array */
        checkCol.forEach(function (item) {
            clearInterval(item);
            checkCol.splice(checkCol.indexOf(item));
        });
        $(".bullet").remove();
    }
}

/* Key Presses */
$(document).keypress(function (event) {
    /* Move left or right with A/D keys  */
    if (event.which == 100) {
        let curPos = $("div.chewie").css("left");
        let newPos = parseInt(curPos) + 5;
        $("div.chewie").css("left", newPos);
    }
    else if (event.which == 97) {
        let curPos = $("div.chewie").css("left");
        let newPos = parseInt(curPos) - 5;

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

                /* Find blaster */
                /*                     let top = findBlasterLoc()[0];
                                    let left = findBlasterLoc()[1];
                
                                    let b = getBulletTrajectory($(".crightArm")); */

                /* Fix location of spawned bullet depending on arm angle */
                /*                     if(parseFloat(b) <= -30 && parseFloat(b) >= -35){
                                        $("body").append('<div class="bullet" id="' + bullets + '" style="top:'+ (top - 36) +'px; left:'+ left +'px;"></div>');
                                    }
                                    else if(parseFloat(b) <= -25 && parseFloat(b) >= -29){
                                        $("body").append('<div class="bullet" id="' + bullets + '" style="top:'+ (top - 50) +'px; left:'+ left +'px;"></div>');
                                    }
                                    else if(parseFloat(b) <= -10 && parseFloat(b) >= -20){
                                        $("body").append('<div class="bullet" id="' + bullets + '" style="top:'+ (top - 50) +'px; left:'+ left +'px;"></div>');
                                    }
                                    else if(parseFloat(b) < -6 && parseFloat(b) >= -9){
                                        $("body").append('<div class="bullet" id="' + bullets + '" style="top:'+ (top - 63) +'px; left:'+ left +'px;"></div>');
                                    }
                                    else{
                                        $("body").append('<div class="bullet" id="' + bullets + '" style="top:'+ (top - 68) +'px; left:'+ left +'px;"></div>');
                                    };
                
                                    $(".bullet").css("transform", "rotate("+ b +")");
                
                                    $(".bullet").animate({left: '120vw', top: '-='+ (Math.abs(parseFloat(b)) * 3) +'vh'}, 2000, "linear", function() {
                                        if(isReadyToFire)
                                        {
                                            clearBulletArray(); 
                                    }}); */

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
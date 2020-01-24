function setBulletTrajectory(source, char) {

    let getAngle = source.attr("style");

    if (getAngle == null) {
        getAngle = "transform: rotate(0deg)";
    }

    /* https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript */
    getDig = getAngle.split("(").join(",").split(")").join(",").split(",");

    let degree = parseFloat(getDig[1]);

    /* Find blaster */
    let blasterPos = findBlasterLoc(char);
    let top = blasterPos[0];
    let left = blasterPos[1];


    if (findEnemyType(char) == character) {

        /* Fix location of spawned bullet depending on arm angle */
        if (degree <= -30 && degree >= -35) {
            top += 28;
        }
        else if (degree <= -25 && degree >= -30) {
            top += 35;
        }
        else if (degree <= -16 && degree >= -25) {
            top += 30;
        }
        else if (degree <= -10 && degree >= -16) {
            top += 22;
        }
        else if (degree <= -6 && degree >= -10) {
            top += 10;
        }
        else if (degree <= 0 && degree >= -6) {
            top += 5;
        }

        $("body").append('<div class="bullet" id="' + bullets + '" style="top:' + top + 'px; left:' + left + 'px;"></div>');
        $(".bullet").css("transform", "rotate(" + degree + ")");

        $(".bullet").animate({ left: '120vw', top: '-=' + (Math.abs(degree) * 3) + 'vh' }, 2000, "linear", function () {
            if (isReadyToFire) {
                clearBulletArray();
            }
        });

    } else if (findEnemyType(char) == "stormtrooper") {

        let bulletId = "enemy" + char.attr("id") + "bullet" + left;

        /* Fix location of spawned bullet depending on arm angle */
        if (degree <= -20 && degree >= -25) {
            top += 20;
        }
        else if (degree <= -15 && degree >= -20) {
            top += 38;
        }
        else if (degree <= -10 && degree >= -15) {
            top += 37;
        }
        else if (degree <= -6 && degree >= -10) {
            top += 35;
        }
        else {
            top += 7;
        }

        $("body").append('<div class="enBullet" id="' + bulletId + '" style="top:' + top + 'px; left:' + left + 'px;"></div>');

        if (degree > 0) {
            $("#" + bulletId).css("transform", "rotate(-" + Math.abs(degree) + "deg");
        } else {
            $("#" + bulletId).css("transform", "rotate(" + Math.abs(degree) + "deg)");
        }

        /* Adjust animation angle based on the enemies placement on screen */
        if (left <= (window.innerWidth * 0.9)) {
            $(".enBullet").animate({ left: '-40vw', top: '+=' + ((degree * 5.2) - (degree * 5.2) * 0.1) + 'vh' }, 3000, "linear");
        } else if (left <= (window.innerWidth * 0.8)) {
            $(".enBullet").animate({ left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.2) + 'vh' }, 3000, "linear");
        } else if (left <= (window.innerWidth * 0.7)) {
            $(".enBullet").animate({ left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.3) + 'vh' }, 3000, "linear");
        } else if (left <= (window.innerWidth * 0.6)) {
            $(".enBullet").animate({ left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.4) + 'vh' }, 3000, "linear");
        } else if (left <= (window.innerWidth * 0.5)) {
            $(".enBullet").animate({ left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.5) + 'vh' }, 3000, "linear");
        } else if (left <= (window.innerWidth * 0.4)) {
            $(".enBullet").animate({ left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.6) + 'vh' }, 3000, "linear");
        } else if (left <= (window.innerWidth * 0.3)) {
            $(".enBullet").animate({ left: '-40vw', top: '+=' + ((degree * 5.2) * 5.2) - ((degree * 5.2) * 0.7) + 'vh' }, 3000, "linear");
        } else {
            $(".enBullet").animate({ left: '-40vw', top: '+=' + (degree * 5.2) + 'vh' }, 2000, "linear");
        }

    }
}

function findBlasterLoc(char) {
    let blaster;

    if (findEnemyType(char) == character) {
        blaster = $(".cblasterBarrel").offset();
    }
    else if (findEnemyType(char) == "stormtrooper") {
        blaster = $("." + findEnemyType(char) + "#" + char.attr("id") + " .body .blaster").offset();
    }

    return [blaster.top, blaster.left];
}
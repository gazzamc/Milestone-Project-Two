/**
 * collision.js
 * This contains all functions corresponding to collision checks
 */

/**
 * This is called when a bullet is fired by
 * the player and is attached to the individual
 * bullet until it's deleted.
 * @function findCol
 * @param {jQuery Object} bullet  eg. $(#1.bullet)
 * @param {jQuery Object} enemy  eg. $(#1.stormtrooper)
 */

function findCol(bullet, enemy) {
    let bulletPos = bullet.offset();
    let isOut = outOfBounds(bulletPos);

    if (isOut) {
        clearBulletArray();
    }

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
}

/**
 * Check to see if bullet is out of bounds.
 * @function outOfBounds
 * @param {jQuery Object} bulletPos 
 */
function outOfBounds(bulletPos) {
    let istrue = false;

    /* This removes the bullet if it missed and goes out of view */
    if (bulletPos.left > innerWidth || bulletPos.top > innerHeight || bulletPos.left < 0 || bulletPos.left < 0) {
        istrue = true;
    }

    return istrue;
}
/* https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection */
/**
 * Checks to see if one object had hit another
 * @function isHit
 * @param {jQuery Object} target 
 * @param {jQuery Object} target2 
 */
function isHit(target, target2) {

    /* check if targets still exist */
    if (target.length != 0 && target2.length != 0) {

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
    }
}
/**
 * When the game is in play this is 
 * set to an interval which calls every 1ms. This checks
 * to see if the player had been hit by an enemy bullet,
 * stormtrooper or health pickup.
 * @function friendlyFire
 */
function friendlyFire() {
    let friendly = $("." + character);
    let currHealth = parseInt($("." + character + " .health .num").text());

    /* Return if player no longer exists */
    if (friendly != null) {

        /* Check if stormtrooper hits player */
        $(".stormtrooper").each(function () {
            if (isHit($(this), friendly)) {

                let getArr = enemyFireArr[($(this).attr("id") - 1)];
                clearInterval(getArr);

                enemyFireArr[($(this).attr("id") - 1)] = "cleared";

                $(this).remove();
                updateScore("clear");
                damage(10, friendly);
            }
        });

        /* Check if stormtroopers bullets hits player */
        $('[id^=enemy]').each(function () {

            let enBulletPos = $(this).offset();

            /* Remove enemy bullet if out of bounds */
            let isOut = outOfBounds(enBulletPos);
            if (isOut) {
                $(this).remove();
            }

            if (isHit($(this), $("."+ character + " .cbody"))) {
                $(this).remove();

                updateScore("clear");
                damage(10, friendly);
            } else if (isHit($(this), $("."+ character + " .chead"))) {
                $(this).remove();

                updateScore("clear");
                damage(20, friendly);
            }
        });

        /* check if health top up exists then check if player hit health spawn */
        if ($(".healthTopUp").length != 0 && currHealth < 100 && $("." + character).length != 0) {

            if (isHit($(".healthTopUp"), $("."+ character + " .cbody")) || isHit($(".healthTopUp"), $("."+ character + " .chead"))) {
                $(".healthTopUp").remove();

                /* get random health number */
                let randNum = Math.floor(Math.random() * 100);

                if ((currHealth + randNum) > 100) {
                    $("."+ character).find(".health").css("width", 100 + "px");
                    $("."+ character + " .health .num").text(100);
                } else {
                    let currWidth = parseInt($("."+ character).find(".health").css("width"));

                    $("."+ character).find(".health").css("width", (currWidth + randNum) + "px");
                    $("."+ character + " .health .num").text(currHealth + randNum);
                }
            }
        }
    }
}
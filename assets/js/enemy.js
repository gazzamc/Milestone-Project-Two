/**
 * enemy.js
 * Contains all functions related to the enemy
 */

/**
 * Spawns enemy and sets interval to call enemyfire every 4s
 * @function spawnEnemies
 */
function spawnEnemies() {

    $("body").append(cloneTemplate($("#trooperTemp")));

    /* Giving trooper a unique ID based on enemies spawned count */
    $(".stormtrooper").each(function () {
        if ($(this).attr("id") == null) {
            $(this).attr("id", enemies + 1);
            enemies++;
            enemyFireArr.push(setInterval(enemyFire, 4000, $(this)));
        }
    });
}

/**
 * Returns current enemies alive
 * @function currEnemies
 */
function currEnemies() {
    let enemiesAlive = 0;
    $(".stormtrooper").each(function () {
        enemiesAlive++;
    });

    return enemiesAlive;
}

/**
 * Checks if enemy exists before calling
 * setEnemyAim and setBulletTrajectory
 * @function enemyFire
 * @param {jQuery Object} enemy 
 */
function enemyFire(enemy) {

    /* Check if enemy still exists */
    if (enemy != null) {
        setEnemyAim(enemy);
        setBulletTrajectory($(".stormtrooper#" + enemy.attr("id") + " .body .blaster"), enemy);
    }
}

/**
 * Randomly sets the enemies.
 * @function setEnemyAim
 * @param {jQuery Object} enemy 
 */
function setEnemyAim(enemy) {
    let enemyId = enemy.attr("id");

    /* Get random number between -25 and 25 */
    /* https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value?lq=1 */
    let randomNum = Math.random() * 25;
    randomNum *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    /* Prevent any number above 10 */
    if (randomNum > 10) {
        randomNum = Math.random() * 10;
        randomNum *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    }

    $("#" + enemyId + ".stormtrooper .blaster").css("transform", "rotate(" + randomNum + "deg)");
    $("#" + enemyId + ".stormtrooper .arms.leftArm").css("transform", "rotate(" + randomNum + "deg)");
}

/**
 * Returns the css class of enemies(or any object).
 * @function findEnemyType
 * @param {jQuery Object} enemy 
 */
function findEnemyType(enemy) {
    let getClasses = enemy.attr("class");
    let splitClasses = getClasses.split(" ");

    return splitClasses[0];
}
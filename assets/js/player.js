/**
 * player.js
 * Contains all the player specific functions
 */

 /**
  * Plays the reload animation and resets bullet count
  * @function reload
  */
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

/**
 * Spawns health drops based on players position
 * @function spawnHealth
 */
function spawnHealth() {
    /* prevent multiple spawns */
    if ($(".healthTopUp").length == 0) {

        /* find player position */
        let playerPos = $("." + character).offset();

        $("#tatooineTemp").after('<div class="healthTopUp"><div class="horizontal"></div><div class="vertical"></div></div>');
        if ((playerPos.left + 600) < innerWidth) {
            $(".healthTopUp").css("left", playerPos.left + 600);
        } else {
            $(".healthTopUp").css("left", playerPos.left - 600);
        }

        /* adjust health position if almost off screen */
        if ($(".healthTopUp").offset().left + $(".healthTopUp").outerWidth() > innerWidth) {
            $(".healthTopUp").css(($(".healthTopUp").offset().left) - 100);
        }
    }
}
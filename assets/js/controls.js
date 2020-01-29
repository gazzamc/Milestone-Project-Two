/* Key Presses */
$(document).keypress(function (event) {
    /* pause game */
    if (event.which == 112) {

        /* Check if we are not on start/end screens */
        if($("#start").length == 0 && $("#try").length == 0){
            pauseGame();
        } else{
            $("#pauseMenu").dialog( "open" );
        }
    }

    /* Check that game isnt paused */
    if (!isKeyHandlerActive) {
        return;
    }

    /* Move left or right with A/D keys  */
    if (event.which == 100) {
        let curPos = $("div." + character).css("left");
        let newPos = parseInt(curPos) + 5;
        $("div." + character).css("left", newPos);

        let curBgPos = $("div.horizon").css("left");
        let newBgPos = parseInt(curBgPos) - 5;
        $("div.horizon").css("left", newBgPos);
    }
    else if (event.which == 97) {
        let curPos = $("div." + character).css("left");
        let newPos = parseInt(curPos) - 5;

        let curBgPos = $("div.horizon").css("left");
        let newBgPos = parseInt(curBgPos) + 5;
        $("div.horizon").css("left", newBgPos);

        /* Prevent player from leaving screen view */
        if (parseInt(curPos) > 0) {
            $("div." + character).css("left", newPos);
        }
    }

    /* Fire, Reload and Crouch with space, R and C keys */
    else if (event.which == 32) {
        /* Check if ready to fire and that there are enemies on screen */
        if (isReadyToFire && (currEnemies() > 0)) {
            if (bullets > 0) {
                isReadyToFire = false;

                setBulletTrajectory($(".crightArm"), $("." + character));

                /* Deplete ammo count */
                bullets -= 1;
                $(".bulletCount").text(bullets);

                /* Check for collision */
                $(".stormtrooper").each(function () {
                    checkCol.push(setInterval(findCol, 100, $("#" + (bullets + 1) + ".bullet"), $(this)));
                });
            }
            else {
                showWave("No Ammo!");
            }
        }
    }

    else if (event.which == 114) {
        if (bullets < 30) {
            isReadyToFire = false;
            reload();
        }
    }

    else if (event.which == 113) {
        $("div." + character).addClass("crouch");

        $(document).keyup(function (event) {
            $("div." + character).removeClass("crouch");

        });
    }
    else if (event.which == 101) {
        $("div." + character).addClass("jump");

        $(document).keyup(function (event) {
            $("div." + character).removeClass("jump");

        });
    }
});

/* Move players arm when mouse is moved */
/* https://stackoverflow.com/questions/22977862/calculating-angle-in-degrees-of-mouse-movement */
$(document).mousemove(function (event) {
    var radian = Math.atan2(180, event.pageY);
    var grade = radian / (Math.PI / 90);

    $('.' + character + ' .cbody.carms.crightArm').css("transform", "rotate(-" + (grade - 10) + "deg)");
});
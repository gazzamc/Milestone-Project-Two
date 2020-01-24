function showDialog(type) {
    /* check if another dialog is open */
    if (!isDialogOpen) {

        if (type == "start") {
            isDialogOpen = true;

            $("#pauseMenu .hidden").children().remove();
            $("#pauseMenu .hidden").append('<h3 class="char">Pick Character:</h3>');
            $("#pauseMenu .hidden").append('<button id="charChewie">Chewie</button>');
            $("#pauseMenu .hidden").append('<button id="charHan">Han</button>');
            $("#pauseMenu .hidden").append('<div id="charDiv"></div>');
            $("#pauseMenu .hidden").append('<h3 class="map">Pick Map:</h3>');
            $("#pauseMenu .hidden").append('<button id="mapTatooine">Tatooine</button>');
            $("#pauseMenu .hidden").append('<div id="bgDiv"></div>');
            $("#pauseMenu .hidden").append('<button id="start">Start</button>');
            $("#pauseMenu .hidden").append('<button id="controls">Controls</button>');
            $("#pauseMenu .hidden").append('<div class="introCheck"><label><input type="checkbox" id="introPlay"> Skip Intro</label></div>');

            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

            $("#charChewie").click(function () {
                changeCharacter("chewie", true);
            });

            $("#charHan").click(function () {
                changeCharacter("han", true);
            });

            $("#mapTatooine").click(function () {
                changeBackground("tatooine", true);
            });

            $("#controls").click(function () {
                controlDialog();
            });

            $("#pauseMenu").dialog({
                title: "Start Game - Star Wars",
                resizable: false,
                minWidth: 600,
                minHeight: 700
            })

            $("#start").click(function () {
                /* Roll credits */

                if(!$("input:checked").length){
                    introCredits();
                    $('.crawl').on('animationend webkitAnimationEnd', function () {

                        if ($(".chewieStart").length != 0) {
                            /* set character variable */
                            character = "chewie";
                            changeCharacter("chewie");
                        } else {
                            character = "han";
                            changeCharacter("han");
                        }

                        if ($(".tatooineStart").length != 0) {
                            changeBackground("tatooine");
                        } else {
                            /* Change to different map */
                        }

                        showWave("Wave " + (waves + 1), true);
                        startGame();
                        spawnEnemies();
                        $(".playerUi").css("display", "block");
                        $("html").css("cursor", "none");
                        $("#introCrawl").remove();
                        $("#introCSS").remove();
                    });
                }else{

                    if ($(".chewieStart").length != 0) {
                        /* set character variable */
                        character = "chewie";
                        changeCharacter("chewie");
                    } else {
                        character = "han";
                        changeCharacter("han");
                    }

                    if ($(".tatooineStart").length != 0) {
                        changeBackground("tatooine");
                    } else {
                        /* Change to different map */
                    }

                    showWave("Wave " + (waves + 1), true);
                    startGame();
                    spawnEnemies();
                    $(".playerUi").css("display", "block");
                    $("html").css("cursor", "none");
                }
                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").css("display", "none");
                isDialogOpen = false;
            });

        } else if (type == "pause") {
            isDialogOpen = true;
            $("#pauseMenu .hidden").children().remove();
            $("#pauseMenu").dialog();
            $("#pauseMenu .hidden").append('<button id="continue">Continue</button>');
            $("#pauseMenu .hidden").append('<button id="restart">Restart</button>');
            $("#pauseMenu .hidden").append('<button id="controlsPause">Controls</button>');

            $("#pauseMenu").dialog({
                title: "Game Paused",
                resizable: false,
                minWidth: 100,
                minHeight: 200
            })

            $("#continue").click(function () {
                pauseGame();
                isDialogOpen = false;
            });

            $("#controls").click(function () {
                controlDialog();
            });

            $("#restart").click(function () {
                /* Reset boolean variables */
                isGamePaused = false;
                isKeyHandlerActive = true;

                startGame("restart");
                spawnEnemies();
                showWave("Wave " + (waves + 1), true);

                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").css("display", "none");
                isDialogOpen = false;
            });

            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

        } else {
            isKeyHandlerActive = false;
            isDialogOpen = true;

            $("#pauseMenu .hidden").children().remove();

            $("#pauseMenu .hidden").append('<h3 class="char">Stats:</h3>');
            $("#pauseMenu .hidden").append('<p>Score: ' + score + '</p>');
            $("#pauseMenu .hidden").append('<p>Enemies: ' + enemies + '</p>');
            $("#pauseMenu .hidden").append('<p>Highest Combo: ' + highestCombo + '</p>');
            $("#pauseMenu .hidden").append('<p>Waves Completed: ' + waves + '</p>');
            $("#pauseMenu .hidden").append('<button id="try">Try Again</button>');
            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

            $("#pauseMenu").dialog({
                title: "Game Over",
                resizable: false,
                minWidth: 400,
                minHeight: 400
            });

            $("#try").click(function () {
                /* Reset boolean variables */
                isGamePaused = false;
                isKeyHandlerActive = true;

                startGame("restart");
                spawnEnemies();
                showWave("Wave " + (waves + 1), true);

                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").css("display", "none");
                isDialogOpen = false;
            });
        }
    }
}

function controlDialog(){
    $("#pauseMenu").after('<div id="controlDialog"><div class="hidden"></div></div>');
    $("#controlDialog .hidden").append('<button id="closeControls">Close</button>');
    $("#controlDialog .hidden").append('<p><span class="title">Move:</span> <span class="key">A</span> / <span class="key">D</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Shoot:</span> <span class="key">Space</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Jump:</span> <span class="key">E</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Crouch:</span> <span class="key">Q</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Reload:</span> <span class="key">R</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Pause:</span> <span class="key">P</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Aim:</span>Mouse / TrackPad</p>');

    $("html").css("cursor", "pointer");
    $("#controlDialog .hidden").css("display", "block");

    $("#controlDialog").dialog({
        title: "Controls",
        resizable: false,
        minWidth: 400,
        minHeight: 360
    });

    $("#closeControls").click(function () {
        $("#controlDialog .hidden").children().remove();
        $("#controlDialog").remove();
        $("#controlDialog").dialog("destroy");
    });
}

function showWave(message, isWave) {
    let animationType;

    if (isWave) {
        animationType = "announceMove";
    } else {
        animationType = "announceText";
    }

    /* Announce Wave */
    $(".announce").text(message);
    $(".announce").addClass(animationType);

    /* Remove once finished */
    $('.announce').on('animationend webkitAnimationEnd', function () {
        $(".announce").removeClass(animationType);
    });
}
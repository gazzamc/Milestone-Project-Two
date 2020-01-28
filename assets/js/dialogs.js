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
            $("#pauseMenu .hidden").append('<button id="mapEndor">Endor</button>');
            $("#pauseMenu .hidden").append('<div id="mapDiv"></div>');
            $("#pauseMenu .hidden").append('<button id="start">Start</button>');
            $("#pauseMenu .hidden").append('<button id="controls">Controls</button>');
            $("#pauseMenu .hidden").append('<button id="options">Options</button>');
            $("#pauseMenu .hidden").append('<div class="introCheck"><label><input type="checkbox" id="introPlay"> Skip Intro</label></div>');

            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

            $("#charChewie").click(function () {
                character = "chewie";
                $("#charHan").removeClass("buttonActive");
                $(this).addClass("buttonActive");
                changeCharacter("chewie", true);
            });

            $("#charHan").click(function () {
                character = "han";
                $("#charChewie").removeClass("buttonActive");
                $(this).addClass("buttonActive");
                changeCharacter("han", true);
            });

            $("#mapTatooine").click(function () {
                map = "tatooine";
                $("#mapEndor").removeClass("buttonActive");
                $(this).addClass("buttonActive");
                changeBackground("tatooine", true);
            });

            $("#mapEndor").click(function () {
                map = "endor";
                $("#mapTatooine").removeClass("buttonActive");
                $(this).addClass("buttonActive");
                changeBackground("endor", true);
            });

            $("#controls").click(function () {
                controlDialog();
            });

            $("#options").click(function () {
                optionsDialog();
            });

            $("#pauseMenu").dialog({
                title: "Star Wars",
                resizable: false,
                minWidth: 600,
                minHeight: 750
            })

            $("#start").click(function () {
                /* Select Map/Char if none selected */
                if(character == null){
                    character = "chewie";
                    changeCharacter("chewie", true);
                }
                if(map == null){
                    map = "tatooine";
                    changeBackground("tatooine", true);
                }

                /* Roll credits */
                if(!$("input:checked").length){
                    introCredits();

                    $('.crawl').on('animationend webkitAnimationEnd', function () {
                        initGame();
                        $("#introCrawl").remove();
                        $("#introCSS").remove();
                    });
                }else{
                    initGame();
                }
                
                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").children().remove();
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
            $("#pauseMenu .hidden").append('<button id="startMenu">Start Menu</button>');

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

            $("#controlsPause").click(function () {
                controlDialog();
            });

            $("#startMenu").click(function () {
                backToMenu();
            });

            $("#restart").click(function () {
                /* Reset boolean variables */
                isGamePaused = false;
                isKeyHandlerActive = true;

                initGame(false);

                $("#pauseMenu .hidden").children().remove();
                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").css("display", "none");
                isDialogOpen = false;
            });

            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

        } else {
            let endScreenTitle;
            isKeyHandlerActive = false;
            isDialogOpen = true;

            $("#pauseMenu .hidden").children().remove();

            $("#pauseMenu .hidden").append('<h3>Statistics:</h3>');
            $("#pauseMenu .hidden").append('<p>Score: ' + score + '</p>');
            $("#pauseMenu .hidden").append('<p>Enemies: ' + enemies + '</p>');
            $("#pauseMenu .hidden").append('<p>Highest Combo: ' + highestCombo + '</p>');
            $("#pauseMenu .hidden").append('<p>Waves Completed: ' + waves + '</p>');
            $("#pauseMenu .hidden").append('<button id="try">Try Again</button>');
            $("#pauseMenu .hidden").append('<button id="startMenuEnd">Start Menu</button>');
            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

            if(waves == 3){
                endScreenTitle = "You Survived!"
            } else{
                endScreenTitle = "Game Over!"
            }

            $("#pauseMenu").dialog({
                title: endScreenTitle,
                resizable: false,
                minWidth: 400,
                minHeight: 400
            });

            $("#try").click(function () {
                /* Reset boolean variables */
                isGamePaused = false;
                isKeyHandlerActive = true;

                initGame(false);

                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").children().remove();
                $("#pauseMenu .hidden").css("display", "none");
                isDialogOpen = false;
            });

            $("#startMenuEnd").click(function () {
                backToMenu();
            });
        }
    }
}

function controlDialog(){

    /* Check if controls is open already */
    if($("#controlDialog").length == 0){

        $("#pauseMenu").after('<div id="controlDialog"><div class="hidden"></div></div>');
        $("#controlDialog .hidden").append('<p><span class="title">Move:</span> <span class="key">A</span> / <span class="key">D</span></p>');
        $("#controlDialog .hidden").append('<p><span class="title">Shoot:</span> <span class="key">Space</span></p>');
        $("#controlDialog .hidden").append('<p><span class="title">Jump:</span> <span class="key">E</span></p>');
        $("#controlDialog .hidden").append('<p><span class="title">Crouch:</span> <span class="key">Q</span></p>');
        $("#controlDialog .hidden").append('<p><span class="title">Reload:</span> <span class="key">R</span></p>');
        $("#controlDialog .hidden").append('<p><span class="title">Pause:</span> <span class="key">P</span></p>');
        $("#controlDialog .hidden").append('<p><span class="title">Aim:</span>Mouse / TrackPad</p>');
        $("#controlDialog .hidden").append('<button id="closeControls">Close</button>');

        $("html").css("cursor", "pointer");
        $("#controlDialog .hidden").css("display", "block");

        $("#controlDialog").dialog({
            title: "Controls",
            resizable: false,
            minWidth: 400,
            minHeight: 400
        });

        $("#closeControls").click(function () {
            $("#controlDialog .hidden").children().remove();
            $("#controlDialog").remove();
            $("#controlDialog").dialog("destroy");
        });
    }else{
        $("#controlDialog").dialog( "moveToTop" );
    }
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

function optionsDialog(){

    /* Check if options is open already */
    if($("#optionsDialog").length == 0){

        $("#pauseMenu").after('<div id="optionsDialog"><div class="hidden"></div></div>');
        $("#optionsDialog .hidden").append('<h4>Wave Time:</h4>');
        $("#optionsDialog .hidden").append('<form>Min: <input type="text" id="waveMin" placeholder="'+ $(".timer h2").text().split(":")[0] +'">');
        $("#optionsDialog .hidden").append('Sec: <input type="text" id="waveSec" placeholder="'+ $(".timer h2").text().split(":")[1] +'">');
        $("#optionsDialog .hidden").append('<h4>Enemy Spawn Rate:</h4>');
        $("#optionsDialog .hidden").append('Stormtrooper every: <input type="text" id="enSpawn" placeholder="'+ spawnRate + '"></form> second(s)<br>');
        $("#optionsDialog .hidden").append('Decrease by: <input type="text" id="enSpawnDec" placeholder="'+ spawnRateDec +'"></form> second(s) per wave.</form><br>');
        $("#optionsDialog .hidden").append('<h4>Health Spawn Rate:</h4>');
        $("#optionsDialog .hidden").append('Health Spawn: <input type="text" id="healthSpawn" placeholder="'+ healthSpawnRate +'"></form> ms.</form><br>');
        $("#optionsDialog .hidden").append('<button id="saveOptions">Save</button>');
        $("#optionsDialog .hidden").append('<button id="closeOptions">Close</button>');

        $("html").css("cursor", "pointer");
        $("#optionsDialog .hidden").css("display", "block");

        $("#optionsDialog").dialog({
            title: "Options",
            resizable: false,
            minWidth: 500,
            minHeight: 450
        });

        $("#saveOptions").click(function () {

            let  min = parseInt($("#waveMin").val());
            let  secs =  parseInt($("#waveSec").val());
            let  rate =  parseInt($("#enSpawn").val());
            let  rateDec =  parseInt($("#enSpawnDec").val());
            let  hSpawnRate =  parseInt($("#healthSpawn").val());


            if(!isNaN(min) && !isNaN(secs) && !isNaN(rate) && !isNaN(rateDec) && !isNaN(hSpawnRate)){

                /* Clear last warning */
                $("#warning").remove();
                
                if(secs < 0 || secs > 59 || min < 0 || min > 59){
                    $("#optionsDialog .hidden").append('<p id="warning">Seconds/Mins must be between 0 and 59.</p>');
                } else if(hSpawnRate < 1000){
                    $("#optionsDialog .hidden").append('<p id="warning">Health spawn must be greater than 1 second (1000ms)</p>');
                } else if(rate <= 0){
                    $("#optionsDialog .hidden").append('<p id="warning">Enemies spawn must be at least 1 second</p>');
                } else if(rateDec >= rate){
                    $("#optionsDialog .hidden").append('<p id="warning">Enemies spawn decrease must be less than spawn rate</p>');
                }else{

                    /* Set variables */
                    timerMin = min;
                    timerSec = secs;
                    spawnRate =  rate;
                    spawnRateDec =  rateDec;
                    healthSpawnRate =  hSpawnRate;
                    $(".timer h2").text(timerMin + ":" + timerSec);

                    $("#optionsDialog .hidden").children().remove();
                    $("#optionsDialog").remove();
                    $("#optionsDialog").dialog("destroy");
                }
            }else{

                if($('#warning').length == 0){
                    $("#optionsDialog .hidden").append('<p id="warning">Please fill all fields with only numbers.</p>');
                }
            }
            
        });

        $("#closeOptions").click(function () {
            $("#optionsDialog .hidden").children().remove();
            $("#optionsDialog").remove();
            $("#optionsDialog").dialog("destroy");
        });

    } else{
        $("#optionsDialog").dialog( "moveToTop" );
    }
}
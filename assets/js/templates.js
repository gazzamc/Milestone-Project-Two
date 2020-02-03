function cloneTemplate(templateName) {

    /* https://stackoverflow.com/questions/15930706/html-template-tag-and-jquery */
    /* Grabbing template of trooper/character from document fragment and cloning/copying 
        it to a seperate variable in order to put it into the DOM */

    let clone;
    let template = templateName.html();
    clone = template;

    return clone;
}

function changeCharacter(char, startMenu) {
    let clone;
    let template;

    if (startMenu) {
        if (char == "chewie" && $("#pauseMenu .hidden .chewieStart").length == 0) {

            /* check for han, then remove */
            if($("#pauseMenu .hidden .hanStart").length != 0){
                $(".hanStart").remove();
            }

            /* Remove CSS from head and replace it */
            $("#selectedChar").remove();
            $("head").append('<link id="selectedChar" rel="stylesheet" href="assets/css/characters/' + char + '.css">');

            /* Add preview of character to start menu */
            $("#pauseMenu .hidden #charDiv").append(cloneTemplate($("#chewieTemp")));
            $(".health").remove();
            $("#pauseMenu .hidden .chewie").addClass("chewieStart");
            $("#pauseMenu .hidden .chewie").removeClass("chewie");
        } else if (char == "han" && $("#pauseMenu .hidden .hanStart").length == 0){

            /* check for chewie, then remove */
            if($("#pauseMenu .hidden .chewieStart").length != 0){
                $(".chewieStart").remove();
            }

            /* Remove CSS from head and replace it */
            $("#selectedChar").remove();
            $("head").append('<link id="selectedChar" rel="stylesheet" href="assets/css/characters/' + char + '.css">');

            /* Add preview of character to start menu */
            $("#pauseMenu .hidden #charDiv").append(cloneTemplate($("#hanTemp")));
            $(".health").remove();
            $("#pauseMenu .hidden .han").addClass("hanStart");
            $("#pauseMenu .hidden .han").removeClass("han"); 
        }
    } else {
        if (char == "chewie") {
            template = $("#chewieTemp").html();
            clone = template;
        }else{
            template = $("#hanTemp").html();
            clone = template; 
        }

        $("#trooperTemp").before(clone);
    }
}

function changeBackground(map, startMenu) {
    let clone;
    let template;

    if (startMenu) {
        if (map == "tatooine") {
            if ($(".endorStart").length != 0) {
                $("#pauseMenu .hidden .endorStart").remove();
            }

            /* Remove CSS from head and replace it */
            $("#selectedMap").remove();
            $("head").append('<link id="selectedMap" rel="stylesheet" href="assets/css/maps/' + map + '.css">');

            $("#pauseMenu .hidden #mapDiv").append(cloneTemplate($("#tatooineTemp")));
            $("#pauseMenu .hidden .background").addClass("tatooineStart");
            $("#pauseMenu .hidden .background").removeClass("background");
        } else{

            if ($(".tatooineStart").length != 0) {
                $("#pauseMenu .hidden .tatooineStart").remove();
            }

            /* Remove CSS from head and replace it */
            $("#selectedMap").remove();
            $("head").append('<link id="selectedMap" rel="stylesheet" href="assets/css/maps/' + map + '.css">');

            $("#pauseMenu .hidden #mapDiv").append(cloneTemplate($("#endorTemp")));
            $("#pauseMenu .hidden .background").addClass("endorStart");
            $("#pauseMenu .hidden .background").removeClass("background");
        }
    } else{

        if (map == "tatooine") {          
            template = $("#tatooineTemp").html();           
            clone = template;
        } else{     
            template = $("#endorTemp").html();    
            clone = template;
        }

        $("#trooperTemp").before(clone);
    }
}

function introCredits(){
    let clone = cloneTemplate($("#introText"));
    $("body").append(clone);

    /* Replace placeholder text */
    replaceCrawlText()

    /* Add CSS */
    $("head").append('<link id="introCSS" rel="stylesheet" href="assets/css/crawl.css">');
}

function replaceCrawlText(){
    if(character == "chewie"){
        $("#char").text("Chewie");
        $("#charQuip").text("Show them why we let the wookie win!");
    } else{
        $("#char").text("Han");
        $("#charQuip").text("Everyone says you shot first, lets see.");
    }

     $("#baseLoc").text(map);
}
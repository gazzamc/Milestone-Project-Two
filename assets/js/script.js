$(document).keypress(function(event){
        /* Move left or right with A/D keys  */
        if(event.which == 100){
            var curPos = $("div.chewie").css("left");
            var newPos = parseInt(curPos) + 5;
            $("div.chewie").css("left", newPos);

        }
        else if(event.which == 97){
            var curPos = $("div.chewie").css("left");
            var newPos = parseInt(curPos) - 5;
            $("div.chewie").css("left", newPos);

        }

        /* Fire, Reload and Crouch with space, R and C keys */
        else if(event.which == 32){
            /* Fire Weapon */
        }
        else if(event.which == 114){
            /* Reload */
        }
        else if(event.which == 99){
            /* Crouch */
        };   
    });
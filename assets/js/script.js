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
            $("div.chewie").addClass("crouch");

            $(document).keyup(function(event){
                $("div.chewie").removeClass("crouch");

            });
        };   
    });

/* Move players arm when mouse is moved */
/* https://stackoverflow.com/questions/22977862/calculating-angle-in-degrees-of-mouse-movement */
$(document).mousemove(function(event){
    var radian = Math.atan2(180, event.pageY);       
    var grade = radian/(Math.PI/90);    

    $('.cbody.carms.crightArm').css("transform", "rotate(-" + (grade - 10) + "deg)"); 
});
/* Global Variables */
var bullets = 30;

/* Functions */
function findCol(bullet, enemy){
    let bulletPos = bullet.offset();

    /* Get enemy position */
    enemyTop = $(enemy).offset().top;
    enemyBottom = $(enemy).offset().top + $(enemy).outerHeight();
    enemyLeft = $(enemy).offset().left;
    enemyRight = $(enemy).offset().left + $(enemy).outerWidth();


    /* This removes the bullet if it missed and goes out of view */
    if(bulletPos.left > innerWidth || bulletPos.top > innerHeight){
        console.log("Out of bounds");
        bullet.remove();
        clearInterval(checkCol);
    };

/*     https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection */
    /* Check if we hit enemy */
    if(bulletPos.left > enemyLeft && 
    bulletPos.top > enemyTop &&
    bulletPos.left < enemyRight &&
    bulletPos.top < enemyBottom ){
        console.log("hit");
        $(".bullet").remove();
    }
};

/* Key Presses */
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
            $("div.cblasterBarrel").append('<div class="bullet" id="' + bullets + '"></div>');
            $(".bullet").addClass("moveBullet");

            /* Deplete ammo count */
            bullets -= 1;
            $(".bulletCount").text(bullets);

            /* Check for collision */
            $(".stormtrooper").each(function(){
                var checkCol = setInterval(findCol, 10, $("#" + (bullets+1)), $(this));
            });
        }
        else if(event.which == 114){
            if(bullets < 30){
                bullets = 30;
                $(".bulletCount").text(bullets);
                $(".bullet").remove();
            }
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
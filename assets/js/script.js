/* Global Variables */
var bullets = 30;

/* Functions */

/* https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection */
function isHit(target, target2){
    let targetPos = target.offset();
    let target2Top;
    let target2Bottom;
    let target2Left;
    let target2Right;

    target2Top = $(target2).offset().top;
    target2Bottom = $(target2).offset().top + $(target2).outerHeight();
    target2Left = $(target2).offset().left;
    target2Right = $(target2).offset().left + $(target2).outerWidth();

    if(targetPos.left > target2Left && 
    targetPos.top > target2Top &&
    targetPos.left < target2Right &&
    targetPos.top < target2Bottom ){
        return true;
    }else{
        return false;
    }
}

function findCol(bullet, enemy){
    let bulletPos = bullet.offset();

    /* This removes the bullet if it missed and goes out of view */
    if(bulletPos.left > innerWidth || bulletPos.top > innerHeight){
        console.log("Out of bounds");
        bullet.remove();
        clearInterval(checkCol);
    };

    /* Check if we hit enemy */
    if(isHit(bullet, enemy)){
        let health = $(".stormtrooper#" + enemy.attr("id") + " .health .num").text(); 
        $(".bullet").remove();

        /* Check for headshot */
        if(isHit(bullet, $(".stormtrooper#" + enemy.attr("id") + " .head"))){
            $(".stormtrooper#" + enemy.attr("id") + " .health .num").text(health - 50);
            $(".stormtrooper#" + enemy.attr("id") + " .health").css("width", (health / 4) + "%");
            health -= 50;
        }else{

            $(".stormtrooper#" + enemy.attr("id") + " .health .num").text(health - 10);
            $(".stormtrooper#" + enemy.attr("id") + " .health").css("width", (health / 2) + "%");
            health -= 10;
        }
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
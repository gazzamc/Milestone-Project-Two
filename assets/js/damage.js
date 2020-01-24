function damage(damageAmount, target) {
    let currHealth = $(target).find(".health span.num").text();
    let currWidth = parseInt($(target).find(".health").css("width"));

    /* https://stackoverflow.com/questions/25740616/unrecognized-expression-object-object-when-using */
    $(target).find(".health").css("width", (currWidth - damageAmount) + "px");
    $(target).find(".health span.num").text(currHealth - damageAmount);

    if ((currHealth - damageAmount) <= 0) {
        clearBulletArray("enemy", target.attr("id"));
        target.remove();

        if (findEnemyType(target) == character) {
            gameOver();
            showDialog();
        } else {
            score += 50;
        }
    }
}
# Star Wars: Side-Scrolling Shooter
Interactive Frontend Development Project - Code Institute

This is a simple browser game where you play as either Han or Chewie. You must survive 3 waves of enemies. 
The enemies spawn more frequently as you complete waves. Health drops every 30 seconds but is RNG based so it
could be 0 or 100%.

### Controls ###
- Move: A / D
- Shoot: Space
- Jump: E
- Crouch: Q
- Pause: P
- Reload: R
- Aim: Mouse/Trackpad

## Demo
You can try the live version of the game [Here](https://gazzamc.github.io/Milestone-Project-Two/)

## UX

#### User Stories

#### Strategy

#### Scope

#### Structure

#### Skeleton

#### Surface

## Features

- The player can choose betweem two characters, Han or Chewie.
- The enemies spawn based on the time, the difficulty increases the longer you survive.
- Players can choose which map/background they want from the start menu.
- Players can pause and reset the game using the pause menu as well return to the start menu.
- You can view the controls via the pause menu or start screen.
- You can skip the intro credits using the checkbox in the start screen.
- Players can move, shoot and dodge when controlling the character.
- Every 30 seconds health spawns based on the users position.
- The enemies aim randomly (within a range), which makes it more challenging when trying to figure out where to move.
- The UI keeps track of your Bullets/Score and Combos.
- The "Game Over" dialog gives the player their stats for that session. Enemies spawned, waves completed, highests combo and final score.
- If the player is out of ammo and tries to shoot, a message will pop up to say they're out of ammo.
- The player has the option to adjust some of the variables in the start menu, such as spawn rate of health/enemies.

### Features left to Implement

- I wanted to add different types of enemies that would deal different amounts of damage and make the player use the animations a bit more.
- I wanted to add a boss fight between rounds.
- I was thinking of adding a life system, the player would have 3 lives which would be represented in the UI. The game would reset if you died until the lives were gone.
- It would have been nice to have different perks for the two different characters.
- I wanted to implement a leaderboard that would show up on the "Game Over" screen [If completed all waves]. 
This would show the top 20 scores with a username.

## Technologies Used

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
    - I used **HTML5** to layout the basic structure of the game.

- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
    - I used **CSS3** to add custom styles, positioning of the HTML elements and animations.

- [JQuery](https://jquery.com)
    - I used **JQuery** to manipulate the DOM and dynamically add/remove elements.

- [JQueryUI](https://jqueryui.com/)
    - I used **JQueryUI** for the dialogs.

- [Javascript](https://www.javascript.com/)
    - I used **Javascript** for functions, loops, intervals and many other things.


## Testing

## Deployment
The website was deployed/hosted on GitHub pages, the following is the process in which i took to deploy it.

#### GitHub Pages

1. On the repo page of the project go to "Settings" tab.
2. Scroll down to GitHub pages.
3. Select "Master Branch" under the source dropdown.
4. A link to the deployed site should show up under the GitHub Pages section.

The master branch should be the root folder with the index.html present for the deployment to work correctly. 
Any changes pushed to GitHub will be updated on the deployed site.

#### Locally
To run the website from your local machine you can clone the project using the below command.

```
    git clone https://github.com/gazzamc/Milestone-Project-Two.git
```
Then open index.html in your browser of choice.


## Credits

### Content
- The stormtrooper was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/wvBprvQ)
- Chewie was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/gObMePp)
- Han was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/zYxbqaB)
- The tatooine background was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/JjoLyag)

### Media
- No images were used in this project, everything was created using HTML/CSS3.

### Acknowledgements

- In order to keep both Javascript/jQuery tidy and not overuse HTML. I used the template element. 
This allowed me to clone different characters, maps with ease and made the game a bit more dynamic. 
I found this in Mozilla Documents [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

- In order to clone the templates which were in the document fragments I used this example [here](https://stackoverflow.com/questions/15930706/html-template-tag-and-jquery).

- I found a basic example of collision detection in Mozilla Documents which really helped, [here](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection).

- In order to get the arm movement to follow the mouse I followed this example on [Stack Overflow](https://stackoverflow.com/questions/22977862/calculating-angle-in-degrees-of-mouse-movement).

- In order to change the health value/width I needed to use the find() method on the jQuery object that was passed into my function. 
I found the example on Stack Overflow [here](https://stackoverflow.com/questions/25740616/unrecognized-expression-object-object-when-using).

- To add a bit of randomness to the enemies attacks/ health drops I generated a random number using the Math.Random() method. 
I found the example on Stack Overflow [here](https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value?lq=1)

- Due to the way I was retrieving the angle of the arm (grabbing the inline style) I needed to parse the digit of the degree from the style format. 
In order to do this I used a series of split(),join() methods following the example on Stack Overflow [here](https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript).

- When pausing the game I needed a way to stop the CSS3 animations, I was able to do so with this example [here](https://www.quackit.com/css/css3/properties/css_animation-play-state.cfm).

- When pausing I wanted to prevent the user from moving/shooting so I used this example on Stack Overflow [here](https://stackoverflow.com/questions/36454853/start-stop-keypress-event-jquery).

- Due to the way I had the enemies spawn and fire bullets using an interval. I needed to use a unique identifier for the id (I used the angle of the arm).
Since i couldnt reference this later I needed a way to find the enemy bullets in order to remove them. 
I used this example to find a partial match for an id using jQuery [here](https://stackoverflow.com/questions/32891807/jquery-wildcard-selector-starts-w-string-and-ends-w-variable).

- In order to do several things I needed to know when a CSS3 animation finished. I was able to do so using this example [here](https://stackoverflow.com/questions/49580666/check-if-an-css-animation-is-completed-with-jquery-or-js)
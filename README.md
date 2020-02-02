# Star Wars: Side-Scrolling Shooter
Interactive Frontend Development Project - Code Institute

## Table Of Contents:
- [Demo](#demo)<br>
    * [Controls](#controls)<br>
- [UX](#ux)<br>
    * [User Stories](#user-stories)<br>
    * [Strategy](#strategy)<br>
    * [Scope](#scope)<br>
    * [Structure](#structure)<br>
    * [Skeleton](#skeleton)<br>
    * [Surface](#surface)<br>
- [Features](#features)<br>
- [Features left to Implement](#features-left-to-implement)<br>
- [Technologies Used](#technologies-used)<br>
- [Testing](#testing)<br>
    * [Manual Testing](#manual-testing)<br>
    * [Automated Testing](#automated-testing)<br>
    * [Known Bugs](#known-bugs)<br>
- [Deployment](#deployment)<br>
- [Credits](#credits)<br>
    * [Content](#content)<br>
    * [Media](#media)<br>
    * [Acknowledgements](#acknowledgements)<br>

## Demo
You can try the live version of the game [Here](https://gazzamc.github.io/Milestone-Project-Two/)<br><br>
<p align="center">
<img src="https://github.com/gazzamc/Milestone-Project-Two/raw/master/assets/images/gameplayCap.gif" alt="Gameplay Preview">
</p>

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

## UX

#### User Stories
- As a player, I expect to be able to choose my character.
<br/>As a player, I expect to be able to choose my map.<br><br>
<p align="center">
<img src="https://github.com/gazzamc/Milestone-Project-Two/raw/master/assets/images/charSelCap.gif" alt="Char/Map Select Preview" width="30%">
</p>

- As a player, I expect to be able to pause the game.
<br/>As a player, I expect to be able to return to the start screen.
<br/>As a player, I expect to be able to restart the game without leaving it.<br><br>
<p align="center">
<img src="https://github.com/gazzamc/Milestone-Project-Two/raw/master/assets/images/pauseMenuCap.gif" alt="Pause Preview" width="70%">
</p>

- As a player, I expect to be able to change the difficulty.<br><br>
<p align="center">
<img src="https://github.com/gazzamc/Milestone-Project-Two/raw/master/assets/images/diffChangeCap.gif" alt="Difficulty Preview" width="50%">
</p>

- As a player, I expect access to the layout of the controls.<br><br>
<p align="center">
<img src="https://github.com/gazzamc/Milestone-Project-Two/raw/master/assets/images/controlCap.gif" alt="Controls Preview" width="50%">
</p>

- As a player, I expect to be able to skip the intro credits.<br><br>
<p align="center">
    <img src="https://github.com/gazzamc/Milestone-Project-Two/raw/master/assets/images/skipIntroCap.gif" alt="Skip Intro Preview" width="70%">
</p>

#### Strategy
I wanted to create a simple game that was both fun and challenging. 
I also wanted it to be random enough so that every session wasn't exactly the same.

#### Scope
I wanted the user to have the choice in which character to play as well as the map/background. 
While the maps don't provide anything new other than change of scenery, I still feel it's a nice option to have. 
As I was developing the game I found that there was no right default for some of variables that set the difficulty. 
One setting could be too challenging for some people and not for others. 
So to counteract this, I created the options dialog in the start screen. This allows the player to tailor the difficulty to their liking. 

The enemies are pretty basic, they move towards the player until they either die or hit said player. 
The only redeeming feature is that their aim is randomized within a certain range, 
so they can be pretty accurate occasionally. This adds some versatility to the gameplay.

I wanted the navigation to be as simple as possible. Three clicks and your into the game (Or one if you don't mind the default options).
In the game the pause menu is straight forward, It allows the user to restart, check controls and return to the start screen.

#### Structure
As it's a game, I went with a start menu when first visiting the website. 
This menu/Dialog along with the other dialogs (Pause, Game Over Screen) are created using jQuery and is dynamically added to the index.html, 
as you select the character/map these also get added to the index.html (both css/html). 
I wanted to keep the index.html as minimal as possible, It only holds the players UI, 
default CSS files, scripts and templates for the different game elements. 

Once in the game the enemies are spawned with jQuery using the template, 
the horizon moves when the player moves, using jQuery to adjust the inline position. 
Bullets are also spawned using this method and are removed if it comes into contact with the enemy/player or goes out of bounds. 
Once the player dies/beats all waves the "Game Over" dialog is shown with statistics of that session and buttons to either retry, return to start screen.

#### Skeleton

#### Surface
I wanted to keep the colours close to the Star Wars theme, so I went with a combination of gold/yellow, white/cream and black. 
Using rgba() (opacity) in the CSS I experimented with the different shades of these colours. I think the end result is consistent
and gives the Star Wars feel.

## Features

- The player can choose between two characters, Han or Chewie.
- The enemies spawn based on the time, the difficulty increases the longer you survive.
- Players can choose which map/background they want from the start menu.
- Players can pause and reset the game using the pause menu as well return to the start menu.
- You can view the controls via the pause menu or start screen.
- You can skip the intro credits using the checkbox in the start screen.
- Players can move, shoot and dodge when controlling the character.
- Every 30 seconds health spawns based on the players position.
- The enemies aim randomly (within a range), which makes it more challenging when trying to figure out where to move.
- The UI keeps track of your Bullets/Score and Combos.
- The "Game Over" dialog gives the player their stats for that session. Enemies spawned, waves completed, highest combo and final score.
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
This game isn't intended for mobiles devices, or devices without a mouse/keyboard. 
So these were not considered when actively testing.

I tested the game in Chrome, Firefox and Edge. As I was developing the game I would use console.log() 
throughout the code to verify the code was running as intended. I would write a piece of code then debug, 
once it was running as intended I would move forward. Once I had a piece of code completed and tested,
I would then try and refactor it so it was easier to read/understand and more efficient.

In my first attempt of spawning the bullets I would append the bullet div within the blaster. 
This allowed the player to move the arm up and down and the bullet would fire at the pointed angle. 
Unfortunately, when the player moved so did the bullet. 
To fix this I needed to spawn the bullet outside of the player div and move it to the position of the barrel using jQuery. 
The next issue I ran into was the animation, 
since I used CSS3 to animate the bullet I could not change the angle (top parameter within the CSS class) of the bullet when moving the arm, 
it just went horizontally off the screen.

In order to fix this I needed to change the animation to a jQuery animation. 
This allowed me to dynamically change the angle(climb) of the bullet. 
I then added some if statements to determine the trajectory based on the players arm and adjusted the bullet angle. 
It's not a perfect solution, but it no longer moves with the player and I was able to re-use this method for the enemy troopers.

### Manual Testing
As well as testing the game while developing it, I did a series of manual testing to be sure that all 
elements worked as intended and source bugs in order to fix them.

#### Start Screen

##### Character Selection
- Clicking the corresponding button for each character displays a preview of said character in the preview box. 
The button stays highlighted on your character selection.

##### Map Selection
- Clicking the corresponding button for each map displays a preview of said map in the preview box. 
The button stays highlighted on your map selection.

##### Controls
- Clicking the controls button brings up a separate dialog and displays the controls for the game, 
clicking the close button closes the dialog.

##### Options
- Clicking the options button opens another dialog with the default settings already in the input boxes. 
- If you enter anything other than a number a message will display at the bottom of the dialog telling you to enter a valid number. 
- If you enter anything greater than 59 or less than 0 in the timer input boxes you will also get an error message. 
- Entering a higher number in the "decreasing by" section than the Stormtrooper spawnrate will also give you a message stating that.
- Entering anything less than 1000 in the health spawn input box will give you a message stating this.
- Clicking the close button closes the dialog and does not save any changes.
- Clicking the save button saves your current changes and closes the dialog. 
However if you leave a input box empty a message will show and not save/close the dialog.
- Clicking the default button resets all values to default. You will need to click save to apply them.

##### Skip Intro
- Checking the skip intro checkbox will skip the opening crawl and go right into the gameplay.

##### Start
- Clicking the start button will start the game.
- If you click the start button without selecting a map or character a default one will be selected for you.

#### Gameplay
The player can only shoot one bullet at a time, this is intended. 
The bullet gets deleted when in contact with the troopers or when it leaves the window view. This allows the player to shoot again.

Enemies spawn based on the time (default 10 seconds), 
when completed waves this time decreases (default by 3 every wave). This increases the difficulty as you progress.

The enemies change their aim and fire every 4 seconds (this cannot be changed in the options).
##### Controls
- Pressing 'A' or 'D' will move you back and forth, it will also move the horizon behind the player.<br>When you reach the edge of the left side of the screen the character will no longer move. This is intended.
- Pressing 'P' brings up the pause screen and pauses the gameplay.
- Pressing 'Q' or 'E' allows the character to crouch or jump respectively. These cannot be pressed at the same time and the player cannot shoot while doing so. This is intended.
- Pressing 'R' plays the reload animation. This prevents the player from shooting. But not moving.
- Pressing 'Space' allows the player to shoot the blaster.
- Moving the mouse/trackpad moves the players arm and allows the player to aim the blaster.

##### Collision
- If the player walks into a stormtrooper, the trooper will die and the player will take 10 damage.
- If the player gets hit in the head they will take 20 damage, and 10 damage when hit in the body.
- If the player shoots the bullet out of view it will be deleted.
- If the player hits the enemy in the head they will do 50 damage, and 10 damage if they hit them in the body.
- If the player walks over the health spawn it will disappear and a random amount of health will be added.<br> 
If the players health is already 100% the health spawn will stay until it can be consumed.

##### Timer
- When the timer resets, a wave announcement animation is played.
- When the timer runs out after 3 waves the end screen dialog is shown.

#### Pause Screen
##### Continue
- Clicking the continue button in the pause menu will close the pause dialog and continue the gameplay.

##### Restart
- Clicking the restart button will restart the game to Wave 1 and reset timer/variables.

##### Controls
- Clicking the controls button acts the same as in the start menu, 
a dialog will open and show the games controls. Clicking close will close this dialog.

##### Start Menu
- Clicking the start menu button will return you to the start screen.

#### End/Game Over Screen
- If you survive the 3 waves the title of this screen changes to "You Survived" and shows your session statistics.
Otherwise the dialog title is "Game Over".

##### Try Again
- Clicking this button will restart the game to Wave 1 and reset timer/variables.

##### Start Menu
- Clicking the start menu button will return you to the start screen.

### Automated Testing
I tried using Selenium IDE but it only worked in my dialogs. 
The game would not pick up on any of the sent keys so testing gameplay with this tool was not possible.

I was going to use Jasmine for testing the functions but I don't have many 
functions that return values that aren't dynamically added (jQuery objects and their positions). 
I opted not to use this as I could not come up with a viable way to test the jQuery code.

### Known Bugs
- Text-shadow doesn't show on announce/wave text on Edge Browser.

- Shooting enemies as soon as they spawn doesn't deal damage. 
I'm sure its due to the outOfBounds function clearing the bullet before the hit is detected. 
This seems to be an occasional bug as it can deal damage the odd time. 
I can probably fix this by extending the innerWidth in the if statement, 
but I think it prevents people from spawn killing enemies before they appear on screen.

- Sometimes the hit detection can lag behind. Since the interval time is the lowest in can be at 1ms I can probably rule that out, 
I think it may be a limitation of the collision detection(if statement) or even just the way I use the divs as hit boxes. 
For now it's acceptable and adds a bit of a timing challenge. It isn't perfect but close enough.

- The bullet angle isn't correct on some shots for both the enemy and player. 
I'm using an if statement to determine the angle of the bullet based on the angle of the player/enemies arm. 
It can be improved but since I spent a good few days on it at this point I think it's acceptable at the moment and certainly 
isn't as off as it was before I implemented this check.

## Deployment
The website was deployed/hosted on GitHub pages, the following is the process in which I took to deploy it.

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
- The Stormtrooper was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/wvBprvQ)
- Chewie was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/gObMePp)
- Han was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/zYxbqaB)
- The Tatooine background was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/JjoLyag)
- The Endor background was created using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/qBEwQvo)

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
Since I couldnt reference this later I needed a way to find the enemy bullets in order to remove them. 
I used this example to find a partial match for an id using jQuery [here](https://stackoverflow.com/questions/32891807/jquery-wildcard-selector-starts-w-string-and-ends-w-variable).

- In order to do several things I needed to know when a CSS3 animation finished. I was able to do so using this example [here](https://stackoverflow.com/questions/49580666/check-if-an-css-animation-is-completed-with-jquery-or-js)
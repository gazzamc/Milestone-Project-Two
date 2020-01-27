# Star Wars Side-Scrolling Shooter
Interactive Frontend Development Project - Code Institute


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

### Features left to Implement

## Technologies Used

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
    - I used **HTML5** to layout the basic structure of the site.

- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
    - I used **CSS3** to add custom styles and positioning to the HTML elements.

- [JQuery](https://jquery.com)
    - I used **JQuery** to manipulate the DOM as well dynamically add/remove elements.

- [JQueryUI](https://jqueryui.com/)
    - I used **JQueryUI** for the dialogs.

- [Javascript](https://www.javascript.com/)
    - I used a **Javascript** for functions, loops, intervals and many other things.


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
- The stormtrooper was created by me using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/wvBprvQ)
- Chewie was created by me using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/gObMePp)
- Han was created by me using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/zYxbqaB)
- The tatooine background was created by me using codepen. The source can be found [here](https://codepen.io/gazzamc/pen/JjoLyag)

### Media
- No images were used in this project, everything was created using HTML/CSS3.

### Acknowledgements

- In order to keep both my Javascript/jQuery tidy and not overuse HTML in them. I used the template element. 
This allowed me to clone the different characters, maps with ease and made the game a bit more dynamic. 
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

- When pausing I wanted to prevent the user from moving/shooting so i used this example on Stack Overflow [here](https://stackoverflow.com/questions/36454853/start-stop-keypress-event-jquery).

- Due to the way I had the enemies spawn and fire bullets using an interval i needed to use a unique identify for the id (I used the angle of the arm).
Since i couldnt reference this later i needed a way to find the enemy bullets in order to remove them. 
I used this example to find a partial match for an id using jQuery [here](https://stackoverflow.com/questions/32891807/jquery-wildcard-selector-starts-w-string-and-ends-w-variable).

- In order to do several things i needed to know when a CSS3 animation finished. I was able to do so using this example [here](https://stackoverflow.com/questions/49580666/check-if-an-css-animation-is-completed-with-jquery-or-js)
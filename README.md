## Start project ##

npm install
npm start

## Front-End Development Assessment for Show-Score ##

This assessment is designed to help us better understand your skills.  There is no right or wrong answer, as there are
many ways to complete this task.  Please carefully read this document, and email us with any questions.

---

**!!! Please DO NOT fork this repository or open Pull Requests to it !!!**

---

### Objective ###

* Build a mini-game using Javascript, React, HTML and CSS.
* To style the game, you must use the design expressed in the PSD file (`assets/design.psd`).

![Game screenshot](assets/screenshot.png)

### Game Rules ###

The game operates according to the following rules:

* It has a 12x6 field.
* It starts with all white tiles.
* When you click on a white tile it turns black. Black tiles represent an elevation.
* When you click on a black tile, it becomes white.
* You cannot create a black tile that floats.  A tile must be placed on the first row or top of another black tile.
* You cannot remove a black tile that has another black tile on top of it.
* When you click the "Reset" button, all tiles become white.
* When you click the "Run" button, white tiles between black tiles should become blue tiles (representing water dropped
  from above).  The left and right sides of the field are not borders, so "water" can't be trapped between left/right
  side and a black tile.
* When you click on any white or black tiles after the "Run" button was clicked, all blue tiles are removed so that you
  can re-run the game.

### Required Technologies ###

* Javascript (ES6+)
* [React](https://reactjs.org)
* [Jest](https://facebook.github.io/jest/) or similar test library
* CSS or [SCSS](https://sass-lang.com), HTML5
* [Git](https://git-scm.com) (for a meaningful commit history)

### Optional Technologies ###

* [MobX](https://mobx.js.org) or similar state management library
* [Lodash](https://lodash.com) or similar general purpose utility library
* Any **development** libraries or tools that might help you ([Webpack](https://webpack.js.org), [Prettier](https://github.com/prettier/prettier), etc.)

### Delivery ###

Put all your files along with the `.git` folder in a single ZIP file. The ZIP file must also contain:

* An `index.html` file; the tester must be able to run the game just by opening the `index.html` file in a browser.
* A `TESTS.txt` file with all required instructions on how to run tests for the game (you can safely assume that person
  who will run the tests has latest Node.js, NPM and Yarn installed, but nothing else).

Email the ZIP file to us.

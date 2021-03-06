Battlescruiser

This is a simplified version of the board game Battleship: https://en.wikipedia.org/wiki/Battleship_(game)

The API contains endpoints that:
- Create a game
- Destroy a game
- Accepts coordinates for the player’s next move.
- Returns the coordinates for the CPU’s next move.

I built this with AngularJS, Express, and Node.js, using the lightweight Meaniscule MEAN stack app generator: https://github.com/meaniscule/meaniscule. 

My personal code mostly lives in pre-build/board, pre-build/home, server/api, and server/game. The front end features a responsive design, while the back end makes much use of the lodash utility library.

A deployed version can be found here: https://fast-anchorage-2084.herokuapp.com/
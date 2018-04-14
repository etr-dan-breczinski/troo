Server build:
* `npm install`
* `nodemon index.js`

Framework build:
* `cd troo`
* `npm install`
* `webpack --watch`

TODO:
* set up component server side rendering
	* Pass route singleton into app
	* definte routes
	* parse routes, setup express routes
	* handle route and output something to the browser
	* set up client side routing

* hook up router to render something
* pass root component to client app
  * get ref to Wrapper from Root
  * have Wrapper return null if store is not initialized or (if on client, document hasn't loaded)
* pass data init function to client app and tie into root init
* render to string on server and output template use `react-dom/server` and react-server-boilerplate
* see TODOs in index.js
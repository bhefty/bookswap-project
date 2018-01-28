# React Redux Boilerplate
<div align='center'>
  <img src='https://raw.githubusercontent.com/bhefty/brand/master/assets/react_boilerplate_logo.png' alt='React Redux Boilerplate logo' />
</div>

<br />

<div align='center'>
<!-- Build status -->
<a href='https://circleci.com/gh/bhefty/react-redux-boilerplate' target='_blank'>
  <img src='https://circleci.com/gh/bhefty/react-redux-boilerplate.svg?style=shield' alt='Dependency Status' />
</a>
<!-- Test coverage -->
<a href='https://coveralls.io/github/bhefty/react-redux-boilerplate?branch=master' target='_blank'>
  <img src='https://coveralls.io/repos/github/bhefty/react-redux-boilerplate/badge.svg?branch=master' alt='Dependency Status' />
</a>
<!-- depedency status -->
<a href='https://david-dm.org/bhefty/react-redux-boilerplate' target='_blank'>
  <img src='https://david-dm.org/bhefty/react-redux-boilerplate/status.svg' alt='Dependency Status' />
</a>
<!-- devDepedency status -->
<a href='https://david-dm.org/bhefty/react-redux-boilerplate?type=dev' target='_blank'>
  <img src='https://david-dm.org/bhefty/react-redux-boilerplate/dev-status.svg' alt='Dependency Status' />
</a>
<!-- Heroku Deployment status -->
<a href='http://bhefty-boilerplate.herokuapp.com' target='_blank'>
  <img src='http://heroku-badge.herokuapp.com/?app=bhefty-boilerplate&style=flat&svg=1' alt='Heroku Deployment Status' />
</a>
</div>

<div align='center'>
  <sub>This boilerplate was created as a means to both better learn the React/Redux methodology as well as to provide
  quick and easy setup for future projects.</sub>
</div>

## Features


<dl>
  <dt>Quick scaffolding</dt>
  <dd>Create components, containers, routes, selectors and sagas - and their tests - right from the CLI!</dd>

  <dt>Hot reloading</dt>
  <dd>Saved changes to styling and JS code will instantly reload in the browser without needing a page refresh.</dd>

  <dt>Predictable state management</dt>
  <dd>Unidirectional data flow (Redux) allows for change logging and time travel debugging.</dd>

  <dt>Next-gen JavaScript</dt>
  <dd>Use template strings, object destructuring, arrow functions, JSX syntax and more, right out of the box!</dd>

  <dt>Next-gen CSS</dt>
  <dd>Write composable CSS that's co-located with components for complete modularity.</dd>

  <dt>Industry-standard routing</dt>
  <dd>Routing makes it easy to add additional pages to the application (`/about`).</dd>

  <dt>Offline-first</dt>
  <dd>Make your web pages available without a network connection the instant a user loads the page.</dd>

  <dt>SEO</dt>
  <dd>Support for SEO (document head tags management) for search engines that support indexing JavaScript content (Google).</dd>
</dl>

Additional features:
  - *The best test setup:* Guarantee code quality and non-breaking changes.
  - *Native web app:* Add the web app to the user's phone home screen!
  - *Fast fonts:* Quick loading for text!
  - *Stay fast:* Profile app's performance from the command line.
  - *Catch problems:* CircleCI ensures builds are passing!

## Quick start

1. Clone repo using `git clone --depth=1 https://github.com/bhefty/react-redux-boilerplate.git [your app name]`
2. Move into the directory: `cd [your app name]`
3. Run `npm run setup` to install dependencies and clean the repo.
4. Run `npm start` or `yarn start` to launch the app at `http://localhost:3000`

> Please note that this boilerplate was built by going through every file, line by line, of <a href='https://github.com/react-boilerplate/react-boilerplate'>react-boilerplate</a>
and adapting it to suit my needs. The concepts of this boilerplate are advanced and not easily approached by beginners.


## Deployment

### Heroku

1. Run `heroku create [your app name]` to initialize the Heroku app.
2. *Optional:* A `Procfile` with the following line: `web: npm run start:prod` has already been created. Change this if needed.
3. Install the Node.js buildpack for the Heroku app by running `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v106 -a [your app name]`.
Make sure to replace `#106` with the latest buildpack, found <a href='https://github.com/heroku/heroku-buildpack-nodejs/releases'>here</a>.
4. *Optional:* A `"heroku-postbuild": "npm run build"` and `"prebuild": "npm run build:clean"` scripts have already been added to `package.json`. This will avoide having Heroku attempt
to run Jest tests (which are unsupported with this buildpack). Change this if needed.
5. Run `heroku config:set NPM_CONFIG_PRODUCTION=false` so that Heroku can comile the npm modules included in `devDependencies` (since some are required for build process).
6. Follow the standard Heroku deploy process:
  1. `git add .`
  2. `git commit -m 'Made some epic changes as per usual`
  3. `git push heroku master`

<hr />

## More Help

As mentioned before, this project was heavily influenced by the geniuses behind <a href='https://github.com/react-boilerplate/react-boilerplate'>react-boilerplate</a>.
As such, much of my code is the same, with slight alterations to suit my needs. Additional documentation and help may be available <a href='https://github.com/react-boilerplate/react-boilerplate/tree/master/docs'>here</a>.

### Credit where credit is due:
Heavily inspired by <a href='https://github.com/react-boilerplate/react-boilerplate'>React Boilerplate</a>
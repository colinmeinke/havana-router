# Havana router

[![Build Status](https://travis-ci.org/colinmeinke/havana-router.svg?branch=master)](https://travis-ci.org/colinmeinke/havana-router)

A simple router for routed response handlers.

Havana router subscribes to the `route.find` event published
by a routed response hanlder. When it receives a `route.find`
event it will iterate through the array of routes it was
instantiated with, attempting to match on the `url` and
`method`. If it matches a route Havana router will publish a
`route.found` event for the routed response handler to
consume. If it fails to match a route Havana router will
publish a `route.error` event.

## How to install

```
npm install havana-router
```

## How to use

```javascript
import Event from 'havana-event';
import Router from 'havana-router';
import Server from 'havana-server';

const event = new Event();

const reporting = {
  'level': 2, 
  'reporter': console.log,
};

const server = new Server({
  'event': event,
  'reporting': reporting,
});

new Router({
  'event': event,
  'reporting': reporting,
  'routes': [
    { 
      'url': '/',
      'method': 'GET',
      'content': 'Home page',
    },
    { 
      'url': '/about',
      'method': 'GET',
      'content': 'About page',
    },
  ],
});

// Add a routed response handler here

server.listen( 3000 );
```

## Event list

Events take the form of
[Havana event](https://github.com/colinmeinke/havana-event)
or a library with an interchangeable API.

### Publish

- `route.found`: Signifies that Havana router has matched a
  route, publishing the route data for consumption by a
  routed response handler.
- `route.error`: Signifies that Havana router was unable to
  match a route.

### Subscribe

- `route.find`: Allows a routed response handler to notify
  Havana router that it wishes to receive route data that
  matches the published `url` and `method`.

## ES2015+

Havana router is written using ES2015+ syntax.

However, by default this module will use an ES5
compatible file that has been compiled using
[Babel](https://babeljs.io).

Havana router currently requires the 
[Babel polyfill](https://babeljs.io/docs/usage/polyfill).
In the `dist` directory there are two files, the default
`router.js` and `router.with-polyfill.js`
that includes the Babel browser polyfill.

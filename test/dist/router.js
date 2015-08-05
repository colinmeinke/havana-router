/* global describe it */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _distRouterWithPolyfill = require('../../dist/router.with-polyfill');

var _distRouterWithPolyfill2 = _interopRequireDefault(_distRouterWithPolyfill);

var _havanaEvent = require('havana-event');

var _havanaEvent2 = _interopRequireDefault(_havanaEvent);

var expect = _chai2['default'].expect;

var event = new _havanaEvent2['default']();

var router = new _distRouterWithPolyfill2['default']({
  'event': event,
  'reporting': {
    'level': 0,
    'reporter': console.log
  },
  'routes': [{
    'url': '/',
    'method': 'GET',
    'content': 'Home page'
  }, {
    'url': '/about',
    'method': 'GET',
    'content': 'About page'
  }]
});

describe('Error', function () {
  describe('_', function () {
    it('should be private', function () {
      expect(router).to.not.have.property('_');
    });
  });

  describe('event', function () {
    it('should be private', function () {
      expect(router).to.not.have.property('event');
    });
  });

  describe('reporting', function () {
    it('should be private', function () {
      expect(router).to.not.have.property('reporting');
    });
  });

  describe('routes', function () {
    it('should be private', function () {
      expect(router).to.not.have.property('routes');
    });
  });

  describe('route.found', function () {
    it('should be published when a route is matched', function (done) {
      var token = event.subscribe('route.found', function () {
        event.unsubscribe(token);
        done();
      });

      event.publish('route.find', {
        'url': '/',
        'method': 'GET'
      });
    });

    it('should publish route data as route property', function (done) {
      var token = event.subscribe('route.found', function (data) {
        event.unsubscribe(token);
        expect(data.route.content).to.equal('Home page');
        done();
      });

      event.publish('route.find', {
        'url': '/',
        'method': 'GET'
      });
    });
  });

  describe('route.error', function () {
    it('should be published when a route is not matched', function (done) {
      var token = event.subscribe('route.error', function () {
        event.unsubscribe(token);
        done();
      });

      event.publish('route.find', {
        'url': '/not-found',
        'method': 'GET'
      });
    });
  });
});
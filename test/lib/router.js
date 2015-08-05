/* global describe it */

import chai from 'chai';
import Router from '../../dist/router.with-polyfill';
import Event from 'havana-event';

const expect = chai.expect;

const event = new Event();

const router = new Router({
  'event': event,
  'reporting': {
    'level': 0,
    'reporter': console.log,
  },
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

describe( 'Error', () => {
  describe( '_', () => {
    it( 'should be private', () => {
      expect( router ).to.not.have.property( '_' );
    });
  });

  describe( 'event', () => {
    it( 'should be private', () => {
      expect( router ).to.not.have.property( 'event' );
    });
  });

  describe( 'reporting', () => {
    it( 'should be private', () => {
      expect( router ).to.not.have.property( 'reporting' );
    });
  });

  describe( 'routes', () => {
    it( 'should be private', () => {
      expect( router ).to.not.have.property( 'routes' );
    });
  });

  describe( 'route.found', () => {
    it( 'should be published when a route is matched', done => {
      const token = event.subscribe( 'route.found', () => {
        event.unsubscribe( token );
        done();
      });

      event.publish( 'route.find', {
        'url': '/',
        'method': 'GET',
      });
    });

    it( 'should publish route data as route property', done => {
      const token = event.subscribe( 'route.found', data => {
        event.unsubscribe( token );
        expect( data.route.content ).to.equal( 'Home page' );
        done();
      });

      event.publish( 'route.find', {
        'url': '/',
        'method': 'GET',
      });
    });
  });

  describe( 'route.error', () => {
    it( 'should be published when a route is not matched', done => {
      const token = event.subscribe( 'route.error', () => {
        event.unsubscribe( token );
        done();
      });

      event.publish( 'route.find', {
        'url': '/not-found',
        'method': 'GET',
      });
    });
  });
});

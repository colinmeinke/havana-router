const _ = new WeakMap();

class Router {
  constructor ( config ) {
    const props = {
      'event': config.event,
      'reporting': config.reporting,
      'routes': config.routes,
    };

    _.set( this, props );

    this.init();
  }

  init () {
    const event = _.get( this ).event;
    const reporting = _.get( this ).reporting;
    const routes = _.get( this ).routes;

    event.subscribe( 'route.find', data => {
      for ( let i = 0, l = routes.length; i < l; i++ ) {
        if ( routes[ i ].url === data.url &&
          routes[ i ].method === data.method ) {

          if ( reporting.level > 1 ) {
            reporting.reporter( '-- Route found' );
          }

          data.route = routes[ i ];

          event.publish( 'route.found', data );

          return;
        }
      }

      if ( reporting.level > 1 ) {
        reporting.reporter( '-- Route not found' );
      }

      event.publish( 'route.error', data );
    });
  }
}

export default Router;

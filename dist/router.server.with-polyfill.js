require('../node_modules/gulp-babel/node_modules/babel-core/polyfill.js');

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = new WeakMap();

var Router = (function () {
  function Router(config) {
    _classCallCheck(this, Router);

    var props = {
      'event': config.event,
      'reporting': config.reporting,
      'routes': config.routes
    };

    _.set(this, props);

    this.init();
  }

  _createClass(Router, [{
    key: 'init',
    value: function init() {
      var _$get = _.get(this);

      var event = _$get.event;
      var reporting = _$get.reporting;
      var routes = _$get.routes;

      event.subscribe('route.find', function (data) {
        for (var i = 0, l = routes.length; i < l; i++) {
          if (routes[i].url === data.url && routes[i].method === data.method) {

            if (reporting.level > 1) {
              reporting.reporter('-- Route found');
            }

            data.route = routes[i];

            event.publish('route.found', data);

            return;
          }
        }

        if (reporting.level > 1) {
          reporting.reporter('-- Route not found');
        }

        event.publish('route.error', data);
      });
    }
  }]);

  return Router;
})();

exports['default'] = Router;
module.exports = exports['default'];
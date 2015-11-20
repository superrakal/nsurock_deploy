/* jshint ignore:start */

/* jshint ignore:end */

define('frontend/adapters/application', ['exports', 'active-model-adapter'], function (exports, ActiveModelAdapter) {

  'use strict';

  exports['default'] = ActiveModelAdapter['default'].extend({
    namespace: 'api/v1'
  });

});
define('frontend/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'frontend/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default'],
    rootElement: '#ember'
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  $(function () {
    var token;
    token = $('meta[name="csrf-token"]').attr('content');
    return $.ajaxPrefilter(function (options, originalOptions, xhr) {
      return xhr.setRequestHeader('X-CSRF-Token', token);
    });
  });

  exports['default'] = App;

});
define('frontend/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('frontend/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('frontend/initializers/active-model-adapter', ['exports', 'active-model-adapter', 'active-model-adapter/active-model-serializer'], function (exports, ActiveModelAdapter, ActiveModelSerializer) {

  'use strict';

  exports['default'] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', ActiveModelAdapter['default']);
      application.register('serializer:-active-model', ActiveModelSerializer['default']);
    }
  };

});
define('frontend/initializers/app-version', ['exports', 'frontend/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('frontend/initializers/cookie', ['exports', 'frontend/lib/cookie'], function (exports, Cookie) {

  'use strict';

  exports['default'] = {
    name: 'cookie',
    initialize: function initialize(container, app) {
      app.register('cookie:main', Cookie['default']);
    }
  };

});
define('frontend/initializers/export-application-global', ['exports', 'ember', 'frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('frontend/instance-initializers/active-model-adapter', ['exports', 'active-model-adapter', 'active-model-adapter/active-model-serializer'], function (exports, ActiveModelAdapter, ActiveModelSerializer) {

  'use strict';

  exports['default'] = {
    name: 'active-model-adapter',
    initialize: function initialize(applicationOrRegistry) {
      var registry;
      if (applicationOrRegistry.registry) {
        // initializeStoreService was registered with an
        // instanceInitializer. The first argument is the application
        // instance.
        registry = applicationOrRegistry.registry;
      } else {
        // initializeStoreService was called by an initializer instead of
        // an instanceInitializer. The first argument is a registy. This
        // case allows ED to support Ember pre 1.12
        registry = applicationOrRegistry;
      }

      registry.register('adapter:-active-model', ActiveModelAdapter['default']);
      registry.register('serializer:-active-model', ActiveModelSerializer['default']);
    }
  };

});
define('frontend/instance-initializers/app-version', ['exports', 'frontend/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('frontend/lib/cookie', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  exports['default'] = Em['default'].Object.extend({
    setCookie: function setCookie(key, value, options) {
      return new Em['default'].RSVP.Promise(function (resolve, reject) {
        try {
          Em['default'].$.cookie(key, value, options);
          Em['default'].run(null, resolve);
        } catch (e) {
          Em['default'].run(null, reject, e);
        }
      });
    },

    getCookie: function getCookie(key) {
      return Em['default'].$.cookie(key);
    },

    removeCookie: function removeCookie(key, options) {
      return Em['default'].$.removeCookie(key, options);
    }
  });

});
define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router;

  Router = Ember['default'].Router.extend();

  Router.map(function () {
    return this.route('root', {
      path: '/'
    });
  });

  exports['default'] = Router;

});
define('frontend/services/socket-io', ['exports', 'ember', 'ember-websockets/helpers/socketio-proxy'], function (exports, Ember, SocketIOProxy) {

  'use strict';

  var filter = Array.prototype.filter;
  var forEach = Array.prototype.forEach;

  exports['default'] = Ember['default'].Service.extend({
    /*
    * Each element in the array is of the form:
    *
    * {
    *    url: 'string'
    *    socket: SocketIO Proxy object
    * }
    */
    sockets: null,

    init: function init() {
      this._super.apply(this, arguments);
      this.sockets = Ember['default'].A();
    },

    /*
    * socketFor returns a socketio proxy object. On this object there is a property `socket`
    * which contains the actual socketio object. This socketio object is cached based off of the
    * url meaning multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var proxy = this.findSocketInCache(this.get('sockets'), url);

      if (proxy && this.socketIsNotClosed(proxy.socket)) {
        return proxy.socket;
      }

      proxy = SocketIOProxy['default'].create({
        content: this,
        socket: io(this.normalizeURL(url), options)
      });

      this.get('sockets').pushObject({
        url: this.normalizeURL(url),
        socket: proxy
      });

      return proxy;
    },

    /*
    * The native websocket object will transform urls without a pathname to have just a /.
    * As an example: ws://nsumint.ru:8080 would actually be ws://nsumint.ru:8080/ but ws://example.com/foo would not
    * change. This function does this transformation to stay inline with the native websocket implementation.
    *
    */
    normalizeURL: function normalizeURL(url) {
      var parsedUrl = new URI(url);

      if (parsedUrl.path() === '/' && url.slice(-1) !== '/') {
        return url + '/';
      }

      return url;
    },

    socketIsNotClosed: function socketIsNotClosed(socket) {
      return socket.socket.io.readyState !== 'closed';
    },

    /*
    * closeSocketFor closes the socket for a given url.
    */
    closeSocketFor: function closeSocketFor(url) {
      var _this = this;

      var filteredSockets = [];

      forEach.call(this.get('sockets'), function (item) {
        if (item.url === _this.normalizeURL(url)) {
          item.socket.close();
        } else {
          filteredSockets.push(item);
        }
      });

      this.set('sockets', filteredSockets);
    },

    /*
    * Returns the socket object from the cache if one matches the url else undefined
    */
    findSocketInCache: function findSocketInCache(socketsCache, url) {
      var _this2 = this;

      var cachedResults = filter.call(socketsCache, function (websocket) {
        return websocket['url'] === _this2.normalizeURL(url);
      });

      if (cachedResults.length > 0) {
        return cachedResults[0];
      }
    }
  });

});
define('frontend/services/websockets', ['exports', 'ember', 'ember-websockets/helpers/websocket-proxy'], function (exports, Ember, WebsocketProxy) {

  'use strict';

  var forEach = Array.prototype.forEach;
  var filter = Array.prototype.filter;
  var isArray = Ember['default'].isArray;

  exports['default'] = Ember['default'].Service.extend({
    /*
    * Each element in the array is of the form:
    *
    * {
    *    url: 'string'
    *    socket: WebSocket Proxy object
    * }
    */
    sockets: null,

    init: function init() {
      this._super.apply(this, arguments);
      this.sockets = Ember['default'].A();
    },

    /*
    * socketFor returns a websocket proxy object. On this object there is a property `socket`
    * which contains the actual websocket object. This websocket object is cached based off of the url meaning
    * multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var protocols = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      var proxy = this.findSocketInCache(this.get('sockets'), url);

      if (proxy && this.websocketIsNotClosed(proxy.socket)) {
        return proxy.socket;
      }

      // Websockets allows either a string or array of strings to be passed as the second argument.
      // This normalizes both cases into one where they are all arrays of strings and if you just pass
      // a single string it becomes an array of one.
      if (!isArray(protocols)) {
        protocols = [protocols];
      }

      proxy = WebsocketProxy['default'].create({
        content: this,
        protocols: protocols,
        socket: new WebSocket(this.normalizeURL(url), protocols)
      });

      // If there is an existing socket in place we simply update the websocket object and not
      // the whole proxy as we dont want to destroy the previous listeners.
      var existingSocket = this.findSocketInCache(this.get('sockets'), url);
      if (existingSocket) {
        existingSocket.socket.socket = proxy.socket;
        return existingSocket.socket;
      } else {
        this.get('sockets').pushObject({
          url: proxy.socket.url,
          socket: proxy
        });
      }

      return proxy;
    },

    /*
    * closeSocketFor closes the socket for a given url.
    */
    closeSocketFor: function closeSocketFor(url) {
      var _this = this;

      var filteredSockets = [];

      forEach.call(this.get('sockets'), function (item) {
        if (item.url === _this.normalizeURL(url)) {
          item.socket.close();
        } else {
          filteredSockets.push(item);
        }
      });

      this.set('sockets', filteredSockets);
    },

    /*
    * The native websocket object will transform urls without a pathname to have just a /.
    * As an example: ws://nsumint.ru:8080 would actually be ws://nsumint.ru:8080/ but ws://example.com/foo would not
    * change. This function does this transformation to stay inline with the native websocket implementation.
    */
    normalizeURL: function normalizeURL(url) {
      var parsedUrl = new URI(url);

      if (parsedUrl.path() === '/' && url.slice(-1) !== '/') {
        return url + '/';
      }

      return url;
    },

    websocketIsNotClosed: function websocketIsNotClosed(websocket) {
      return websocket.socket.readyState !== window.WebSocket.CLOSED;
    },

    /*
    * Returns the socket object from the cache if one matches the url else undefined
    */
    findSocketInCache: function findSocketInCache(socketsCache, url) {
      var _this2 = this;

      var cachedResults = filter.call(socketsCache, function (websocket) {
        return websocket['url'] === _this2.normalizeURL(url);
      });

      if (cachedResults.length > 0) {
        return cachedResults[0];
      }
    }
  });

});
define('frontend/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 87
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container-fluid");
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2,"class","text-center");
        var el3 = dom.createTextNode("Hi, Ember.js!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,71],[1,81]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('frontend/tests/helpers/resolver', ['exports', 'ember/resolver', 'frontend/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('frontend/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('frontend/tests/helpers/start-app', ['exports', 'ember', 'frontend/app', 'frontend/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('frontend/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('frontend/tests/integration/components/chatbox-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('chatbox-component', 'Integration | Component | chatbox component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{chatbox-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#chatbox-component}}\n  template block text\n{{/chatbox-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/file-upload-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('file-upload', 'Integration | Component | file upload', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{file-upload}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#file-upload}}\n  template block text\n{{/file-upload}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/message-input-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('message-input', 'Integration | Component | message input', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{message-input}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#message-input}}\n  template block text\n{{/message-input}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/myfaculty-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('myfaculty-component', 'Integration | Component | myfaculty component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{myfaculty-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#myfaculty-component}}\n  template block text\n{{/myfaculty-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/mysex-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('mysex-component', 'Integration | Component | mysex component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{mysex-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#mysex-component}}\n  template block text\n{{/mysex-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/nickname-input-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('nickname-input', 'Integration | Component | nickname input', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{nickname-input}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#nickname-input}}\n  template block text\n{{/nickname-input}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/select-all-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('select-all', 'Integration | Component | select all', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{select-all}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#select-all}}\n  template block text\n{{/select-all}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/smiles-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('smiles-component', 'Integration | Component | smiles component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{smiles-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#smiles-component}}\n  template block text\n{{/smiles-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/sticker-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('sticker-component', 'Integration | Component | sticker component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{sticker-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#sticker-component}}\n  template block text\n{{/sticker-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/userfaculty-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('userfaculty-component', 'Integration | Component | userfaculty component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{userfaculty-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#userfaculty-component}}\n  template block text\n{{/userfaculty-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/test-helper', ['frontend/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('frontend/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('frontend/tests/unit/components/file-upload-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('file-upload', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('frontend/tests/unit/components/nickname-input-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('nickname-input', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('frontend/tests/unit/components/smiles-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('smiles-component', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('frontend/tests/unit/components/sticker-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('sticker-component', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('frontend/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/chat-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:chat', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/my-settings-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:my-settings', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/searching-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:searching', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/user-settings-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:user-settings', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/initializers/register-socket-io-test', ['ember', 'frontend/initializers/register-socket-io', 'qunit'], function (Ember, register_socket_io, qunit) {

  'use strict';

  var application, registry;

  application = null;

  registry = null;

  qunit.module('Unit | Initializer | register socket io', {
    beforeEach: function beforeEach() {
      return Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        return application.deferReadiness();
      });
    }
  });

  qunit.test('it works', function (assert) {
    register_socket_io.initialize(registry, application);
    return assert.ok(true);
  });

});
define('frontend/tests/unit/models/faculty-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('faculty', 'Unit | Model | faculty', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/models/image-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('image', 'Unit | Model | image', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/models/sticker-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('sticker', 'Unit | Model | sticker', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/models/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('user', 'Unit | Model | user', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/chat-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:chat', 'Unit | Route | chat', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/my-settings-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:my-settings', 'Unit | Route | my settings', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/root-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:root', 'Unit | Route | root', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/searching-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:searching', 'Unit | Route | searching', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/user-settings-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:user-settings', 'Unit | Route | user settings', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/serializers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('application', 'Unit | Serializer | application', {
    needs: ['serializer:application']
  });

  ember_qunit.test('it serializes records', function (assert) {
    var record, serializedRecord;
    record = this.subject();
    serializedRecord = record.serialize();
    return assert.ok(serializedRecord);
  });

});
define('frontend/tests/unit/serializers/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('user', 'Unit | Serializer | user', {
    needs: ['serializer:user']
  });

  ember_qunit.test('it serializes records', function (assert) {
    var record, serializedRecord;
    record = this.subject();
    serializedRecord = record.serialize();
    return assert.ok(serializedRecord);
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"frontend","environment":"development","baseURL":"/","rootElement":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"frontend","version":"0.0.0+dcc2d194"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"exportApplicationGlobal":true}};
});

if (runningTests) {
  require("frontend/tests/test-helper");
} else {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+dcc2d194"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map
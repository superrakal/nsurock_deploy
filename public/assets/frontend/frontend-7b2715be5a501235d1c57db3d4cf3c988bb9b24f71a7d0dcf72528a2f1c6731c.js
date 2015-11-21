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
define('frontend/components/bread-type-component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var BreadTypeComponentComponent;

  BreadTypeComponentComponent = Ember['default'].Component.extend({
    isSelected: (function () {
      return this.get('food.bread_type') === this.get('type');
    }).property('food.bread_type'),
    actions: {
      toggleType: function toggleType() {
        return this.set('food.bread_type', this.get('type'));
      }
    }
  });

  exports['default'] = BreadTypeComponentComponent;

});
define('frontend/components/cart-component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var CartComponentComponent;

  CartComponentComponent = Ember['default'].Component.extend({
    size: (function () {
      return this.get('preorder.drink_preorders.content').length + this.get('preorder.food_preorders.content').length;
    }).property('preorder.drink_preorders.content.length', 'preorder.food_preorders.content.length'),
    actions: {
      showCart: function showCart() {
        return $('#cart').modal('show');
      }
    }
  });

  exports['default'] = CartComponentComponent;

});
define('frontend/components/cart-modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var CartModalComponent;

  CartModalComponent = Ember['default'].Component.extend({
    isConfirmed: false,
    drinkPreorderCount: (function () {
      return this.get('preorder.drink_preorders.content').length;
    }).property('preorder.drink_preorders.content.length'),
    foodPreorderCount: (function () {
      return this.get('preorder.food_preorders.content').length;
    }).property('preorder.food_preorders.content.length'),
    size: (function () {
      return this.get('preorder.drink_preorders.content').length + this.get('preorder.food_preorders.content').length;
    }).property('preorder.drink_preorders.content.length', 'preorder.food_preorders.content.length'),
    actions: {
      confirm: function confirm() {
        $('#cart').modal('hide');
        return this.sendAction('confirm');
      },
      destroyDrink: function destroyDrink(drink) {
        this.get('preorder.drink_preorders').removeObject(drink);
        drink.destroyRecord();
        return this.get('preorder').save();
      },
      destroyFood: function destroyFood(food) {
        this.get('preorder.food_preorders').removeObject(food);
        food.destroyRecord();
        return this.get('preorder').save();
      }
    }
  });

  exports['default'] = CartModalComponent;

});
define('frontend/components/drink-item', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var DrinkItemComponent;

  DrinkItemComponent = Ember['default'].Component.extend({
    isMoreThanOneSyurup: (function () {
      return this.get('drink_preorder.syurups.length') > 1;
    }).property('drink_preorder.syurups.length'),
    actions: {
      add_to_cart: function add_to_cart() {
        var preorder;
        preorder = this.get('preorder');
        return this.get('drink_preorder').save().then((function (_this) {
          return function () {
            _this.get('preorder.drink_preorders').pushObject(_this.get('drink_preorder'));
            return _this.get('preorder').save().then(function () {
              return _this.$('#adds').modal('hide');
            });
          };
        })(this));
      },
      choose_drink: function choose_drink() {
        var drink_preorder;
        drink_preorder = this.get('store').createRecord('drink_preorder');
        drink_preorder.set('drink', this.get('drink'));
        this.set('drink_preorder', drink_preorder);
        return this.$('#adds').modal('show');
      },
      dismiss: function dismiss() {
        this.get('drink_preorder').destroyRecord();
        return this.$('#adds').modal('hide');
      }
    }
  });

  exports['default'] = DrinkItemComponent;

});
define('frontend/components/food-item', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var FoodItemComponent;

  FoodItemComponent = Ember['default'].Component.extend({
    actions: {
      add_to_cart: function add_to_cart() {
        var preorder;
        preorder = this.get('preorder');
        return this.get('food_preorder').save().then((function (_this) {
          return function () {
            _this.get('preorder.food_preorders').pushObject(_this.get('food_preorder'));
            return _this.get('preorder').save().then(function () {
              return _this.$('#adds').modal('hide');
            });
          };
        })(this));
      },
      choose_food: function choose_food() {
        var food_preorder;
        food_preorder = this.get('store').createRecord('food_preorder');
        food_preorder.set('food', this.get('food'));
        this.set('food_preorder', food_preorder);
        return this.$('#adds').modal('show');
      },
      dismiss: function dismiss() {
        this.get('drink_preorder').destroyRecord();
        return this.$('#adds').modal('hide');
      }
    }
  });

  exports['default'] = FoodItemComponent;

});
define('frontend/components/profile-modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ProfileModalComponent;

  ProfileModalComponent = Ember['default'].Component.extend({
    actions: {
      sign_out: function sign_out() {
        return Ember['default'].$.ajax({
          type: 'DELETE',
          url: "/users/sign_out",
          async: false,
          success: (function (_this) {
            return function () {
              return location.replace('/');
            };
          })(this)
        });
      }
    }
  });

  exports['default'] = ProfileModalComponent;

});
define('frontend/components/sauce-component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var SauceComponentComponent;

  SauceComponentComponent = Ember['default'].Component.extend({
    isSelected: (function () {
      return this.get('food.sauce.id') === this.get('sauce.id');
    }).property('food.sauce'),
    actions: {
      toggleSauce: function toggleSauce() {
        if (this.get('food.sauce.id') === this.get('sauce.id')) {
          return this.set('food.sauce', null);
        } else {
          return this.set('food.sauce', this.get('sauce'));
        }
      }
    }
  });

  exports['default'] = SauceComponentComponent;

});
define('frontend/components/syurup-component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var SyurupComponentComponent;

  SyurupComponentComponent = Ember['default'].Component.extend({
    isIn: (function () {
      var i, isIn, j, ref;
      isIn = false;
      if (this.get('drink_preorder.syurups.currentState.length')) {
        for (i = j = 0, ref = this.get('drink_preorder.syurups.currentState.length') - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          if (this.get('syurup.id') === this.get('drink_preorder.syurups.currentState')[i].id) {
            isIn = true;
          }
        }
      }
      return isIn;
    }).property('drink_preorder.syurups.length'),
    isFull: (function () {
      return this.get('drink_preorder.syurups.length') === 3 && !this.get('isIn');
    }).property('drink_preorder.syurups.length'),
    actions: {
      toggleSyurup: function toggleSyurup() {
        var i, isIn, j, ref;
        isIn = false;
        if (this.get('drink_preorder.syurups.currentState.length')) {
          for (i = j = 0, ref = this.get('drink_preorder.syurups.currentState.length') - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
            if (this.get('syurup.id') === this.get('drink_preorder.syurups.currentState')[i].id) {
              isIn = true;
            }
          }
        }
        if (isIn) {
          return this.get('drink_preorder.syurups').removeObject(this.get('syurup'));
        } else {
          return this.get('drink_preorder.syurups').pushObject(this.get('syurup'));
        }
      }
    }
  });

  exports['default'] = SyurupComponentComponent;

});
define('frontend/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationController;

  ApplicationController = Ember['default'].Controller.extend({
    actions: {
      confirm: function confirm() {
        return this.transitionToRoute('confirm');
      },
      openProfileModal: function openProfileModal() {
        return $('#profileModal').modal('show');
      }
    }
  });

  exports['default'] = ApplicationController;

});
define('frontend/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('frontend/controllers/confirm', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ConfirmController;

  ConfirmController = Ember['default'].Controller.extend({
    isConfirming: false,
    actions: {
      confirm: function confirm() {
        $('#confirmed').on('hidden.bs.modal', function (e) {
          return location.replace('/');
        });
        this.set('isConfirming', true);
        return this.model.save().then((function (_this) {
          return function () {
            return Ember['default'].$.ajax({
              type: 'GET',
              url: "/api/v1/preorders/new?id=" + _this.model.id,
              async: false,
              success: function success() {
                cookie.remove('preorder_id');
                return $('#confirmed').modal('show');
              }
            });
          };
        })(this));
      }
    }
  });

  exports['default'] = ConfirmController;

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
define('frontend/initializers/session', ['exports', 'simple-auth/session'], function (exports, Session) {

  'use strict';

  var CurrentUserInitializer, initialize;

  initialize = function (container) {
    return Session['default'].reopen({
      currentUser: (function () {
        var id;
        id = null;
        Ember.$.ajax({
          type: 'GET',
          url: "/welcome/current_user_id",
          async: false,
          success: (function (_this) {
            return function (data) {
              return id = data.current_user_id;
            };
          })(this)
        });
        return container.lookup('store:main').find('user', id);
      }).property()
    });
  };

  CurrentUserInitializer = {
    name: 'currentUser',
    before: 'simple-auth',
    initialize: initialize
  };

  exports['default'] = CurrentUserInitializer;

  exports.initialize = initialize;

});
define('frontend/initializers/simple-auth', ['exports', 'simple-auth/configuration', 'simple-auth/setup', 'frontend/config/environment'], function (exports, Configuration, setup, ENV) {

  'use strict';

  exports['default'] = {
    name: 'simple-auth',
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']['simple-auth'] || {});
      setup['default'](container, application);
    }
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
define('frontend/models/drink-preorder', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var DrinkPreorder;

  DrinkPreorder = DS['default'].Model.extend({
    drink: DS['default'].belongsTo('drink'),
    syurups: DS['default'].hasMany('syurup'),
    sumPrice: (function () {
      var sum;
      sum = this.get('drink.price');
      if (this.get('syurups').length > 1) {
        sum = sum + 20;
      }
      return sum;
    }).property('syurups.content.length', 'drink')
  });

  exports['default'] = DrinkPreorder;

});
define('frontend/models/drink', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Drink;

  Drink = DS['default'].Model.extend({
    price: DS['default'].attr('number'),
    volume: DS['default'].attr('number'),
    name: DS['default'].attr('string'),
    image: DS['default'].attr('string')
  });

  exports['default'] = Drink;

});
define('frontend/models/food-preorder', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var FoodPreorder;

  FoodPreorder = DS['default'].Model.extend({
    food: DS['default'].belongsTo('food'),
    sauce: DS['default'].belongsTo('sauce'),
    bread_type: DS['default'].attr('string', {
      defaultValue: 'Белый'
    })
  });

  exports['default'] = FoodPreorder;

});
define('frontend/models/food', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Food;

  Food = DS['default'].Model.extend({
    price: DS['default'].attr('number'),
    name: DS['default'].attr('string'),
    image: DS['default'].attr('string')
  });

  exports['default'] = Food;

});
define('frontend/models/preorder', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Preorder;

  Preorder = DS['default'].Model.extend({
    status: DS['default'].attr('string', {
      defaultValue: 'Создан'
    }),
    number: DS['default'].attr('number'),
    total_price: DS['default'].attr('number'),
    comments: DS['default'].attr('string'),
    drink_preorders: DS['default'].hasMany('drink-preorder', {
      async: true
    }),
    food_preorders: DS['default'].hasMany('food-preorder', {
      async: true
    })
  });

  exports['default'] = Preorder;

});
define('frontend/models/sauce', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Sauce;

  Sauce = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    image: DS['default'].attr('string'),
    is_available: DS['default'].attr('boolean')
  });

  exports['default'] = Sauce;

});
define('frontend/models/syurup', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Syurup;

  Syurup = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    image: DS['default'].attr('string'),
    is_available: DS['default'].attr('boolean')
  });

  exports['default'] = Syurup;

});
define('frontend/models/user', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var User;

  User = DS['default'].Model.extend({
    first_name: DS['default'].attr('string'),
    last_name: DS['default'].attr('string'),
    vk_photo: DS['default'].attr('string'),
    vk_screen_name: DS['default'].attr('string'),
    is_admin: DS['default'].attr('boolean')
  });

  exports['default'] = User;

});
define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router;

  Router = Ember['default'].Router.extend();

  Router.map(function () {
    this.route('root', {
      path: '/'
    });
    return this.route('confirm');
  });

  exports['default'] = Router;

});
define('frontend/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationRoute;

  ApplicationRoute = Ember['default'].Route.extend({
    model: function model() {
      var id;
      id = cookie.get('preorder_id');
      if (id !== void 0) {
        return this.store.find('preorder', id);
      } else {
        return this.store.createRecord('preorder');
      }
    },
    afterModel: function afterModel(model) {
      return model.save().then(function () {
        cookie.remove('preorder_id');
        return cookie.set('preorder_id', model.get('id'));
      });
    },
    setupController: function setupController(controller, model) {
      controller.set('currentUser', this.get('session.currentUser'));
      return controller.set('preorder', model);
    }
  });

  exports['default'] = ApplicationRoute;

});
define('frontend/routes/confirm', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ConfirmRoute;

  ConfirmRoute = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.store.findAll('drink');
      this.store.findAll('syurup');
      this.store.findAll('food');
      return this.store.findAll('sauce');
    },
    model: function model() {
      var id;
      id = cookie.get('preorder_id');
      return this.store.find('preorder', id);
    },
    afterModel: function afterModel(model) {
      return model.reload();
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = ConfirmRoute;

});
define('frontend/routes/root', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var RootRoute;

  RootRoute = Ember['default'].Route.extend({
    activate: function activate() {
      return Ember['default'].run.later(function () {
        var height;
        height = ($(window).height() - $('.navbar').height() - 1) / $('.panel:visible').length;
        $('.panel section').height(height);
        $('.logo').height(height);
        return $(window).resize(function () {
          height = ($(window).height() - $('.navbar').height() - 1) / $('.panel:visible').length;
          $('.panel section').height(height);
          return $('.logo').height(height);
        });
      }, 10);
    },
    beforeModel: function beforeModel() {
      this.store.findAll('drink');
      this.store.findAll('syurup');
      this.store.findAll('food');
      return this.store.findAll('sauce');
    },
    model: function model() {
      var id;
      id = cookie.get('preorder_id');
      if (id !== void 0) {
        return this.store.find('preorder', id);
      } else {
        return this.store.createRecord('preorder');
      }
    },
    setupController: function setupController(controller, model) {
      controller.set('drinks', this.store.peekAll('drink'));
      controller.set('syurups', this.store.peekAll('syurup'));
      controller.set('foods', this.store.peekAll('food'));
      controller.set('sauces', this.store.peekAll('sauce'));
      return controller.set('preorder', model);
    }
  });

  exports['default'] = RootRoute;

});
define('frontend/serializers/drink-preorder', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var DrinkPreorderSerializer;

  DrinkPreorderSerializer = DS['default'].ActiveModelSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    attrs: {
      syurups: {
        serialize: 'ids'
      }
    }
  });

  exports['default'] = DrinkPreorderSerializer;

});
define('frontend/serializers/preorder', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var PreorderSerializer;

  PreorderSerializer = DS['default'].ActiveModelSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    attrs: {
      drink_preorders: {
        serialize: 'ids'
      },
      food_preorders: {
        serialize: 'ids'
      }
    }
  });

  exports['default'] = PreorderSerializer;

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
            "column": 824
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","navbar navbar-default navbar-fixed-top");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container-fluid");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navbar-header");
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"aria-expanded","false");
        dom.setAttribute(el4,"data-target","#top-menu");
        dom.setAttribute(el4,"data-toggle","collapse");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","navbar-toggle collapsed");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5,"class","fa fa-user");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","navbar-toggle");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","/");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","sitelogo");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","clearfix");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"id","top-menu");
        dom.setAttribute(el3,"class","collapse navbar-collapse");
        var el4 = dom.createElement("p");
        dom.setAttribute(el4,"class","navbar-right profile");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5,"class","avatar");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4,"class","navbar-text navbar-right hidden-xs");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [0]);
        var element3 = dom.childAt(element2, [0]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [0, 1]),0,0);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createAttrMorph(element3, 'src');
        morphs[3] = dom.createMorphAt(element2,1,1);
        morphs[4] = dom.createMorphAt(element2,3,3);
        morphs[5] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[6] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[7] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[8] = dom.createMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","cart-component",[],["preorder",["subexpr","@mut",[["get","preorder",["loc",[null,[1,322],[1,330]]]]],[],[]]],["loc",[null,[1,296],[1,332]]]],
        ["element","action",["openProfileModal"],[],["loc",[null,[1,474],[1,503]]]],
        ["attribute","src",["get","currentUser.vk_photo",["loc",[null,[1,544],[1,564]]]]],
        ["content","currentUser.first_name",["loc",[null,[1,582],[1,608]]]],
        ["content","currentUser.last_name",["loc",[null,[1,614],[1,639]]]],
        ["inline","cart-component",[],["preorder",["subexpr","@mut",[["get","preorder",["loc",[null,[1,715],[1,723]]]]],[],[]]],["loc",[null,[1,689],[1,725]]]],
        ["content","outlet",["loc",[null,[1,747],[1,757]]]],
        ["content","profile-modal",["loc",[null,[1,757],[1,774]]]],
        ["inline","cart-modal",[],["preorder",["subexpr","@mut",[["get","preorder",["loc",[null,[1,796],[1,804]]]]],[],[]],"confirm","confirm"],["loc",[null,[1,774],[1,824]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/components/bread-type-component', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 62
              },
              "end": {
                "line": 1,
                "column": 107
              }
            },
            "moduleName": "frontend/templates/components/bread-type-component.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("i");
            dom.setAttribute(el1,"class","fa fa-check");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 107
              },
              "end": {
                "line": 1,
                "column": 156
              }
            },
            "moduleName": "frontend/templates/components/bread-type-component.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","white-bread pull-left");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
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
              "column": 243
            }
          },
          "moduleName": "frontend/templates/components/bread-type-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","pull-left");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","type-title pull-left");
          var el2 = dom.createTextNode("Белый хлеб");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [0]);
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element2);
          morphs[1] = dom.createMorphAt(element2,0,0);
          morphs[2] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [
          ["element","action",["toggleType"],[],["loc",[null,[1,20],[1,43]]]],
          ["block","if",[["get","isSelected",["loc",[null,[1,68],[1,78]]]]],[],0,1,["loc",[null,[1,62],[1,163]]]],
          ["element","action",["toggleType"],[],["loc",[null,[1,174],[1,197]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 299
              },
              "end": {
                "line": 1,
                "column": 344
              }
            },
            "moduleName": "frontend/templates/components/bread-type-component.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("i");
            dom.setAttribute(el1,"class","fa fa-check");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 344
              },
              "end": {
                "line": 1,
                "column": 394
              }
            },
            "moduleName": "frontend/templates/components/bread-type-component.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","black-bread pull-right");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 243
            },
            "end": {
              "line": 1,
              "column": 483
            }
          },
          "moduleName": "frontend/templates/components/bread-type-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","pull-right");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","type-title pull-right");
          var el2 = dom.createTextNode("Черный хлеб");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0,0,0);
          morphs[2] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [
          ["element","action",["toggleType"],[],["loc",[null,[1,256],[1,279]]]],
          ["block","if",[["get","isSelected",["loc",[null,[1,305],[1,315]]]]],[],0,1,["loc",[null,[1,299],[1,401]]]],
          ["element","action",["toggleType"],[],["loc",[null,[1,412],[1,435]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
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
            "column": 490
          }
        },
        "moduleName": "frontend/templates/components/bread-type-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","isWhite",["loc",[null,[1,6],[1,13]]]]],[],0,1,["loc",[null,[1,0],[1,490]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/components/cart-component', ['exports'], function (exports) {

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
            "column": 246
          }
        },
        "moduleName": "frontend/templates/components/cart-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","cart");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","visible-xs");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3,"class","fa fa-shopping-cart");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        var el4 = dom.createTextNode(" (");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(")");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","hidden-xs");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3,"class","fa fa-shopping-cart");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        var el4 = dom.createTextNode(" Корзина (");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(")");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [0, 1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [1, 1]),1,1);
        return morphs;
      },
      statements: [
        ["element","action",["showCart"],[],["loc",[null,[1,5],[1,26]]]],
        ["content","size",["loc",[null,[1,112],[1,120]]]],
        ["content","size",["loc",[null,[1,218],[1,226]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/components/cart-modal', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 1,
                  "column": 594
                },
                "end": {
                  "line": 1,
                  "column": 690
                }
              },
              "moduleName": "frontend/templates/components/cart-modal.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createElement("div");
              dom.setAttribute(el1,"class","syurup");
              var el2 = dom.createElement("img");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element5 = dom.childAt(fragment, [0, 0]);
              var morphs = new Array(1);
              morphs[0] = dom.createAttrMorph(element5, 'src');
              return morphs;
            },
            statements: [
              ["attribute","src",["get","syurup.image",["loc",[null,[1,669],[1,681]]]]]
            ],
            locals: ["syurup"],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 430
              },
              "end": {
                "line": 1,
                "column": 923
              }
            },
            "moduleName": "frontend/templates/components/cart-modal.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","drink");
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","pull-left");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","syurups hidden-xs");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","pull-right");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode(" руб. ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("i");
            dom.setAttribute(el3,"class","fa fa-times");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("span");
            dom.setAttribute(el3,"class","hidden-xs");
            var el4 = dom.createTextNode(" ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","clearfix");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element6 = dom.childAt(fragment, [0]);
            var element7 = dom.childAt(element6, [0]);
            var element8 = dom.childAt(element6, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createMorphAt(element7,0,0);
            morphs[1] = dom.createMorphAt(dom.childAt(element7, [1]),0,0);
            morphs[2] = dom.createElementMorph(element8);
            morphs[3] = dom.createMorphAt(element8,0,0);
            return morphs;
          },
          statements: [
            ["content","drink_preorder.drink.name",["loc",[null,[1,534],[1,563]]]],
            ["block","each",[["get","drink_preorder.syurups",["loc",[null,[1,602],[1,624]]]]],[],0,null,["loc",[null,[1,594],[1,699]]]],
            ["element","action",["destroyDrink",["get","drink_preorder",["loc",[null,[1,740],[1,754]]]]],[],["loc",[null,[1,716],[1,756]]]],
            ["content","drink_preorder.sumPrice",["loc",[null,[1,776],[1,803]]]]
          ],
          locals: ["drink_preorder"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 404
            },
            "end": {
              "line": 1,
              "column": 932
            }
          },
          "moduleName": "frontend/templates/components/cart-modal.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","each",[["get","preorder.drink_preorders.content",["loc",[null,[1,438],[1,470]]]]],[],0,null,["loc",[null,[1,430],[1,932]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 932
            },
            "end": {
              "line": 1,
              "column": 988
            }
          },
          "moduleName": "frontend/templates/components/cart-modal.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("p");
          dom.setAttribute(el1,"class","text-center");
          var el2 = dom.createTextNode("Вы не выбрали напитки");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 1,
                  "column": 1240
                },
                "end": {
                  "line": 1,
                  "column": 1336
                }
              },
              "moduleName": "frontend/templates/components/cart-modal.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createElement("div");
              dom.setAttribute(el1,"class","syurup");
              var el2 = dom.createElement("img");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element1 = dom.childAt(fragment, [0, 0]);
              var morphs = new Array(1);
              morphs[0] = dom.createAttrMorph(element1, 'src');
              return morphs;
            },
            statements: [
              ["attribute","src",["get","syurup.image",["loc",[null,[1,1315],[1,1327]]]]]
            ],
            locals: ["syurup"],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 1081
              },
              "end": {
                "line": 1,
                "column": 1568
              }
            },
            "moduleName": "frontend/templates/components/cart-modal.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","food");
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","pull-left");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","syurups hidden-xs");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","pull-right");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode(" руб. ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("i");
            dom.setAttribute(el3,"class","fa fa-times");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("span");
            dom.setAttribute(el3,"class","hidden-xs");
            var el4 = dom.createTextNode(" ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","clearfix");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [0]);
            var element3 = dom.childAt(element2, [0]);
            var element4 = dom.childAt(element2, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createMorphAt(element3,0,0);
            morphs[1] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
            morphs[2] = dom.createElementMorph(element4);
            morphs[3] = dom.createMorphAt(element4,0,0);
            return morphs;
          },
          statements: [
            ["content","food_preorder.food.name",["loc",[null,[1,1182],[1,1209]]]],
            ["block","each",[["get","drink_preorder.syurups",["loc",[null,[1,1248],[1,1270]]]]],[],0,null,["loc",[null,[1,1240],[1,1345]]]],
            ["element","action",["destroyFood",["get","food_preorder",["loc",[null,[1,1385],[1,1398]]]]],[],["loc",[null,[1,1362],[1,1400]]]],
            ["content","food_preorder.food.price",["loc",[null,[1,1420],[1,1448]]]]
          ],
          locals: ["food_preorder"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1056
            },
            "end": {
              "line": 1,
              "column": 1577
            }
          },
          "moduleName": "frontend/templates/components/cart-modal.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","each",[["get","preorder.food_preorders.content",["loc",[null,[1,1089],[1,1120]]]]],[],0,null,["loc",[null,[1,1081],[1,1577]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1577
            },
            "end": {
              "line": 1,
              "column": 1633
            }
          },
          "moduleName": "frontend/templates/components/cart-modal.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("p");
          dom.setAttribute(el1,"class","text-center");
          var el2 = dom.createTextNode("Вы не выбрали закуску");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1908
            },
            "end": {
              "line": 1,
              "column": 2004
            }
          },
          "moduleName": "frontend/templates/components/cart-modal.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"type","button");
          dom.setAttribute(el1,"class","btn btn-primary");
          var el2 = dom.createTextNode("Заказать");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["confirm"],[],["loc",[null,[1,1928],[1,1948]]]]
        ],
        locals: [],
        templates: []
      };
    }());
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
            "column": 2035
          }
        },
        "moduleName": "frontend/templates/components/cart-modal.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","cart");
        dom.setAttribute(el1,"role","dialog");
        dom.setAttribute(el1,"tabindex","-1");
        dom.setAttribute(el1,"class","modal fade");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"role","document");
        dom.setAttribute(el2,"class","modal-dialog");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","modal-content");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-header");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"aria-label","Close");
        dom.setAttribute(el5,"data-dismiss","modal");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","close");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"aria-hidden","true");
        var el7 = dom.createTextNode(" ×");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5,"class","modal-title");
        var el6 = dom.createTextNode("Корзина");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-body");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","drinks");
        var el6 = dom.createElement("h3");
        dom.setAttribute(el6,"class","text-center");
        var el7 = dom.createTextNode("Напитки");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","foods");
        var el6 = dom.createElement("h3");
        dom.setAttribute(el6,"class","text-center");
        var el7 = dom.createTextNode("Закуска");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-footer");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"data-dismiss","modal");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode(" Закрыть");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element9 = dom.childAt(fragment, [0, 0, 0]);
        var element10 = dom.childAt(element9, [1]);
        var element11 = dom.childAt(element10, [2]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element10, [0]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element10, [1]),1,1);
        morphs[2] = dom.createAttrMorph(element11, 'class');
        morphs[3] = dom.createMorphAt(element11,0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element9, [2]),1,1);
        return morphs;
      },
      statements: [
        ["block","if",[["get","drinkPreorderCount",["loc",[null,[1,410],[1,428]]]]],[],0,1,["loc",[null,[1,404],[1,995]]]],
        ["block","if",[["get","foodPreorderCount",["loc",[null,[1,1062],[1,1079]]]]],[],2,3,["loc",[null,[1,1056],[1,1640]]]],
        ["attribute","class",["concat",["comments ",["subexpr","if",[["get","isConfirmed",["loc",[null,[1,1672],[1,1683]]]],"super"],[],["loc",[null,[1,1667],[1,1693]]]]]]],
        ["inline","textarea",[],["placeholder","Коментарии к заказу","value",["subexpr","@mut",[["get","preorder.comments",["loc",[null,[1,1746],[1,1763]]]]],[],[]],"class","form-control"],["loc",[null,[1,1695],[1,1786]]]],
        ["block","if",[["get","size",["loc",[null,[1,1914],[1,1918]]]]],[],4,null,["loc",[null,[1,1908],[1,2011]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  }()));

});
define('frontend/templates/components/drink-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 910
            },
            "end": {
              "line": 1,
              "column": 1003
            }
          },
          "moduleName": "frontend/templates/components/drink-item.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","syurup-component",[],["syurup",["subexpr","@mut",[["get","syurup",["loc",[null,[1,965],[1,971]]]]],[],[]],"drink_preorder",["subexpr","@mut",[["get","drink_preorder",["loc",[null,[1,987],[1,1001]]]]],[],[]]],["loc",[null,[1,939],[1,1003]]]]
        ],
        locals: ["syurup"],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1018
            },
            "end": {
              "line": 1,
              "column": 1339
            }
          },
          "moduleName": "frontend/templates/components/drink-item.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"role","alert");
          dom.setAttribute(el1,"class","alert alert-warning alert-dismissible fade in");
          var el2 = dom.createElement("button");
          dom.setAttribute(el2,"aria-label","Close");
          dom.setAttribute(el2,"data-dismiss","alert");
          dom.setAttribute(el2,"type","button");
          dom.setAttribute(el2,"class","close");
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"aria-hidden","true");
          var el4 = dom.createTextNode(" ×");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("Внимание!");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("Вы выбрали больше одного сиропа - стоимость заказа увеличена на 20 руб.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
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
            "column": 1573
          }
        },
        "moduleName": "frontend/templates/components/drink-item.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","item-card col-lg-3 col-md-4 col-sm-6 col-xs-12");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","item-wrapper");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","image");
        var el4 = dom.createElement("img");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","info");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","item-title text-center");
        var el5 = dom.createElement("h3");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","additional");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","price pull-left");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" руб.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","volume pull-right");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" мл.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","action");
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","btn btn-block");
        var el5 = dom.createTextNode("В корзину");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","adds");
        dom.setAttribute(el1,"role","dialog");
        dom.setAttribute(el1,"tabindex","-1");
        dom.setAttribute(el1,"class","modal fade");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"role","document");
        dom.setAttribute(el2,"class","modal-dialog");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","modal-content");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-header");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"aria-label","Close");
        dom.setAttribute(el5,"data-dismiss","modal");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","close");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"aria-hidden","true");
        var el7 = dom.createTextNode(" ×");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5,"class","modal-title");
        var el6 = dom.createTextNode("Выберите добавки");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-body");
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5,"class","text-center");
        var el6 = dom.createTextNode("Сиропы");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","container-fluid");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-footer");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode(" Отмена");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","btn btn-primary");
        var el6 = dom.createTextNode(" Выбрать");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0]);
        var element1 = dom.childAt(element0, [0, 0]);
        var element2 = dom.childAt(element0, [1]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element0, [2, 0]);
        var element5 = dom.childAt(fragment, [1, 0, 0]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element5, [2]);
        var element8 = dom.childAt(element7, [0]);
        var element9 = dom.childAt(element7, [1]);
        var morphs = new Array(9);
        morphs[0] = dom.createAttrMorph(element1, 'src');
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [0, 0]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [0]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
        morphs[4] = dom.createElementMorph(element4);
        morphs[5] = dom.createMorphAt(dom.childAt(element6, [1]),0,0);
        morphs[6] = dom.createMorphAt(element6,2,2);
        morphs[7] = dom.createElementMorph(element8);
        morphs[8] = dom.createElementMorph(element9);
        return morphs;
      },
      statements: [
        ["attribute","src",["get","drink.image",["loc",[null,[1,116],[1,127]]]]],
        ["content","drink.name",["loc",[null,[1,194],[1,208]]]],
        ["content","drink.price",["loc",[null,[1,272],[1,287]]]],
        ["content","drink.volume",["loc",[null,[1,334],[1,350]]]],
        ["element","action",["choose_drink"],[],["loc",[null,[1,405],[1,430]]]],
        ["block","each",[["get","syurups",["loc",[null,[1,918],[1,925]]]]],[],0,null,["loc",[null,[1,910],[1,1012]]]],
        ["block","if",[["get","isMoreThanOneSyurup",["loc",[null,[1,1024],[1,1043]]]]],[],1,null,["loc",[null,[1,1018],[1,1346]]]],
        ["element","action",["dismiss"],[],["loc",[null,[1,1386],[1,1406]]]],
        ["element","action",["add_to_cart"],[],["loc",[null,[1,1469],[1,1493]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/components/food-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1128
            },
            "end": {
              "line": 1,
              "column": 1196
            }
          },
          "moduleName": "frontend/templates/components/food-item.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","sauce-component",[],["sauce",["subexpr","@mut",[["get","sauce",["loc",[null,[1,1179],[1,1184]]]]],[],[]],"food",["subexpr","@mut",[["get","food",["loc",[null,[1,1190],[1,1194]]]]],[],[]]],["loc",[null,[1,1155],[1,1196]]]]
        ],
        locals: ["sauce"],
        templates: []
      };
    }());
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
            "column": 1438
          }
        },
        "moduleName": "frontend/templates/components/food-item.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","item-card col-lg-3 col-md-4 col-sm-6 col-xs-12");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","item-wrapper");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","image");
        var el4 = dom.createElement("img");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","info");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","item-title text-center");
        var el5 = dom.createElement("h3");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","additional");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","price pull-left");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" руб.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","action");
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","btn btn-block");
        var el5 = dom.createTextNode("В корзину");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","adds");
        dom.setAttribute(el1,"role","dialog");
        dom.setAttribute(el1,"tabindex","-1");
        dom.setAttribute(el1,"class","modal fade");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"role","document");
        dom.setAttribute(el2,"class","modal-dialog");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","modal-content");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-header");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"aria-label","Close");
        dom.setAttribute(el5,"data-dismiss","modal");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","close");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"aria-hidden","true");
        var el7 = dom.createTextNode(" ×");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5,"class","modal-title");
        var el6 = dom.createTextNode("Выберите параметры");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-body");
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5,"class","text-center");
        var el6 = dom.createTextNode("Тип хлеба");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","container-fluid bread-types");
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","pull-left");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","pull-right");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5,"class","text-center");
        var el6 = dom.createTextNode("Соус");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","container-fluid");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-footer");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode(" Отмена");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","btn btn-primary");
        var el6 = dom.createTextNode(" Выбрать");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0]);
        var element1 = dom.childAt(element0, [0, 0]);
        var element2 = dom.childAt(element0, [1]);
        var element3 = dom.childAt(element0, [2, 0]);
        var element4 = dom.childAt(fragment, [1, 0, 0]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element4, [2]);
        var element8 = dom.childAt(element7, [0]);
        var element9 = dom.childAt(element7, [1]);
        var morphs = new Array(9);
        morphs[0] = dom.createAttrMorph(element1, 'src');
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [0, 0]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1, 0]),0,0);
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createMorphAt(dom.childAt(element6, [0]),0,0);
        morphs[5] = dom.createMorphAt(dom.childAt(element6, [1]),0,0);
        morphs[6] = dom.createMorphAt(dom.childAt(element5, [3]),0,0);
        morphs[7] = dom.createElementMorph(element8);
        morphs[8] = dom.createElementMorph(element9);
        return morphs;
      },
      statements: [
        ["attribute","src",["get","food.image",["loc",[null,[1,116],[1,126]]]]],
        ["content","food.name",["loc",[null,[1,193],[1,206]]]],
        ["content","food.price",["loc",[null,[1,270],[1,284]]]],
        ["element","action",["choose_food"],[],["loc",[null,[1,340],[1,364]]]],
        ["inline","bread-type-component",[],["food",["subexpr","@mut",[["get","food_preorder",["loc",[null,[1,912],[1,925]]]]],[],[]],"isWhite",true,"type","Белый"],["loc",[null,[1,884],[1,953]]]],
        ["inline","bread-type-component",[],["food",["subexpr","@mut",[["get","food_preorder",["loc",[null,[1,1011],[1,1024]]]]],[],[]],"isWhite",false,"type","Черный"],["loc",[null,[1,983],[1,1054]]]],
        ["block","each",[["get","sauces",["loc",[null,[1,1136],[1,1142]]]]],[],0,null,["loc",[null,[1,1128],[1,1205]]]],
        ["element","action",["dismiss"],[],["loc",[null,[1,1251],[1,1271]]]],
        ["element","action",["add_to_cart"],[],["loc",[null,[1,1334],[1,1358]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('frontend/templates/components/profile-modal', ['exports'], function (exports) {

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
            "column": 627
          }
        },
        "moduleName": "frontend/templates/components/profile-modal.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","profileModal");
        dom.setAttribute(el1,"role","dialog");
        dom.setAttribute(el1,"tabindex","-1");
        dom.setAttribute(el1,"class","modal fade");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"role","document");
        dom.setAttribute(el2,"class","modal-dialog");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","modal-content");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-header");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"aria-label","Close");
        dom.setAttribute(el5,"data-dismiss","modal");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","close");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"aria-hidden","true");
        var el7 = dom.createTextNode(" ×");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5,"class","modal-title");
        var el6 = dom.createTextNode("Мой профиль");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-body");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","container-fluid text-center");
        var el6 = dom.createElement("button");
        dom.setAttribute(el6,"class","btn btn-primary");
        var el7 = dom.createTextNode("Выйти из аккаунта");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-footer");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"data-dismiss","modal");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","btn btn-primary");
        var el6 = dom.createTextNode(" Закрыть");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0, 0, 1, 0, 0]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [
        ["element","action",["sign_out"],[],["loc",[null,[1,409],[1,430]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/components/sauce-component', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 143
            },
            "end": {
              "line": 1,
              "column": 188
            }
          },
          "moduleName": "frontend/templates/components/sauce-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","fa fa-check");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 188
            },
            "end": {
              "line": 1,
              "column": 235
            }
          },
          "moduleName": "frontend/templates/components/sauce-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("img");
          dom.setAttribute(el1,"class","sauce");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'src');
          return morphs;
        },
        statements: [
          ["attribute","src",["get","sauce.image",["loc",[null,[1,207],[1,218]]]]]
        ],
        locals: [],
        templates: []
      };
    }());
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
            "column": 326
          }
        },
        "moduleName": "frontend/templates/components/sauce-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-lg-4 col-sm-6 col-xs-12 sauce");
        var el2 = dom.createElement("div");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","icon");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","name");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","clearfix");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createAttrMorph(element2, 'class');
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [0]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        return morphs;
      },
      statements: [
        ["element","action",["toggleSauce"],[],["loc",[null,[1,5],[1,29]]]],
        ["attribute","class",["concat",["sauce-wrapper ",["subexpr","if",[["get","isSelected",["loc",[null,[1,103],[1,113]]]],"super"],[],["loc",[null,[1,98],[1,123]]]]]]],
        ["block","if",[["get","isSelected",["loc",[null,[1,149],[1,159]]]]],[],0,1,["loc",[null,[1,143],[1,242]]]],
        ["content","sauce.name",["loc",[null,[1,266],[1,280]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/components/syurup-component', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
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
              "column": 229
            }
          },
          "moduleName": "frontend/templates/components/syurup-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-4 col-sm-6 col-xs-12 syurup");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","syurup-wrapper disabled");
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","icon");
          var el4 = dom.createElement("i");
          dom.setAttribute(el4,"class","fa fa-minus");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","name");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","clearfix");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0, 1]),0,0);
          return morphs;
        },
        statements: [
          ["content","syurup.name",["loc",[null,[1,168],[1,183]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 377
              },
              "end": {
                "line": 1,
                "column": 416
              }
            },
            "moduleName": "frontend/templates/components/syurup-component.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("i");
            dom.setAttribute(el1,"class","fa fa-check");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 416
              },
              "end": {
                "line": 1,
                "column": 465
              }
            },
            "moduleName": "frontend/templates/components/syurup-component.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("img");
            dom.setAttribute(el1,"class","syurup");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [0]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'src');
            return morphs;
          },
          statements: [
            ["attribute","src",["get","syurup.image",["loc",[null,[1,435],[1,447]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 229
            },
            "end": {
              "line": 1,
              "column": 557
            }
          },
          "moduleName": "frontend/templates/components/syurup-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-4 col-sm-6 col-xs-12 syurup");
          var el2 = dom.createElement("div");
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","icon");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","name");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","clearfix");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [0]);
          var element2 = dom.childAt(element1, [0]);
          var morphs = new Array(4);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createAttrMorph(element2, 'class');
          morphs[2] = dom.createMorphAt(dom.childAt(element2, [0]),0,0);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          return morphs;
        },
        statements: [
          ["element","action",["toggleSyurup"],[],["loc",[null,[1,242],[1,267]]]],
          ["attribute","class",["concat",["syurup-wrapper ",["subexpr","if",[["get","isIn",["loc",[null,[1,343],[1,347]]]],"super"],[],["loc",[null,[1,338],[1,357]]]]]]],
          ["block","if",[["get","isIn",["loc",[null,[1,383],[1,387]]]]],[],0,1,["loc",[null,[1,377],[1,472]]]],
          ["content","syurup.name",["loc",[null,[1,496],[1,511]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
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
            "column": 564
          }
        },
        "moduleName": "frontend/templates/components/syurup-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","isFull",["loc",[null,[1,6],[1,12]]]]],[],0,1,["loc",[null,[1,0],[1,564]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/confirm', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 327
            },
            "end": {
              "line": 1,
              "column": 528
            }
          },
          "moduleName": "frontend/templates/confirm.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","field");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","pull-left");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","pull-right");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" руб.");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element1, [0]),0,0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","drink_preorder.drink.name",["loc",[null,[1,420],[1,449]]]],
          ["content","drink_preorder.sumPrice",["loc",[null,[1,479],[1,506]]]]
        ],
        locals: ["drink_preorder"],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 573
            },
            "end": {
              "line": 1,
              "column": 771
            }
          },
          "moduleName": "frontend/templates/confirm.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","field");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","pull-left");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","pull-right");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" руб.");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","food_preorder.food.name",["loc",[null,[1,664],[1,691]]]],
          ["content","food_preorder.food.price",["loc",[null,[1,721],[1,749]]]]
        ],
        locals: ["food_preorder"],
        templates: []
      };
    }());
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
            "column": 1702
          }
        },
        "moduleName": "frontend/templates/confirm.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","home");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container text-center");
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"class","text-center");
        var el4 = dom.createTextNode("Подтверждение заказа");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","confirm-form");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","field");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pull-left");
        var el6 = dom.createElement("h4");
        var el7 = dom.createTextNode("Номер Вашего заказа");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pull-right");
        var el6 = dom.createElement("h4");
        var el7 = dom.createTextNode("#");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","field");
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5,"class","text-center");
        var el6 = dom.createTextNode("Напитки");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        dom.setAttribute(el4,"class","text-center");
        var el5 = dom.createTextNode("Закуски");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","field");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","field");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pull-right");
        var el6 = dom.createElement("b");
        dom.setAttribute(el6,"style","font-size: 20px");
        var el7 = dom.createTextNode("К оплате: ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" руб.");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","field");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","btn btn-primary");
        var el6 = dom.createTextNode("Подтвердить");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","clearfix");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","confirmed");
        dom.setAttribute(el1,"role","dialog");
        dom.setAttribute(el1,"tabindex","-1");
        dom.setAttribute(el1,"class","modal fade");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"role","document");
        dom.setAttribute(el2,"class","modal-dialog");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","modal-content");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-header");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"aria-label","Close");
        dom.setAttribute(el5,"data-dismiss","modal");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","close");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"aria-hidden","true");
        var el7 = dom.createTextNode(" ×");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5,"class","modal-title");
        var el6 = dom.createTextNode("Ваш заказ подтвержден!");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-body");
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("Ваш заказ принят к исполнению! Ждем Вас :)");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","modal-footer text-center");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","/");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode("Спасибо");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0, 0, 1]);
        var element3 = dom.childAt(element2, [7, 0]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [0, 1, 0]),1,1);
        morphs[1] = dom.createMorphAt(element2,2,2);
        morphs[2] = dom.createMorphAt(element2,4,4);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [5]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [6, 0, 0]),1,1);
        morphs[5] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [
        ["content","model.number",["loc",[null,[1,233],[1,249]]]],
        ["block","each",[["get","model.drink_preorders",["loc",[null,[1,335],[1,356]]]]],[],0,null,["loc",[null,[1,327],[1,537]]]],
        ["block","each",[["get","model.food_preorders",["loc",[null,[1,581],[1,601]]]]],[],1,null,["loc",[null,[1,573],[1,780]]]],
        ["inline","textarea",[],["value",["subexpr","@mut",[["get","model.comments",["loc",[null,[1,816],[1,830]]]]],[],[]],"placeholder","Комментарии к заказу","class","form-control"],["loc",[null,[1,799],[1,888]]]],
        ["content","model.total_price",["loc",[null,[1,979],[1,1000]]]],
        ["element","action",["confirm"],[],["loc",[null,[1,1053],[1,1073]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/root', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 664
            },
            "end": {
              "line": 1,
              "column": 763
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","drink-item",[],["drink",["subexpr","@mut",[["get","drink",["loc",[null,[1,710],[1,715]]]]],[],[]],"syurups",["subexpr","@mut",[["get","syurups",["loc",[null,[1,724],[1,731]]]]],[],[]],"preorder",["subexpr","@mut",[["get","preorder",["loc",[null,[1,741],[1,749]]]]],[],[]],"store",["subexpr","@mut",[["get","store",["loc",[null,[1,756],[1,761]]]]],[],[]]],["loc",[null,[1,691],[1,763]]]]
        ],
        locals: ["drink"],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1074
            },
            "end": {
              "line": 1,
              "column": 1166
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","food-item",[],["food",["subexpr","@mut",[["get","food",["loc",[null,[1,1116],[1,1120]]]]],[],[]],"sauces",["subexpr","@mut",[["get","sauces",["loc",[null,[1,1128],[1,1134]]]]],[],[]],"preorder",["subexpr","@mut",[["get","preorder",["loc",[null,[1,1144],[1,1152]]]]],[],[]],"store",["subexpr","@mut",[["get","store",["loc",[null,[1,1159],[1,1164]]]]],[],[]]],["loc",[null,[1,1099],[1,1166]]]]
        ],
        locals: ["food"],
        templates: []
      };
    }());
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
            "column": 1205
          }
        },
        "moduleName": "frontend/templates/root.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","home");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","instruction");
        dom.setAttribute(el2,"class","panel hidden-xs");
        var el3 = dom.createElement("section");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-lg-3 col-md-4 col-sm-6");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","logo");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-lg-9 col-md-8 col-sm-6");
        var el5 = dom.createElement("h1");
        var el6 = dom.createTextNode("Сервис предзаказов");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        var el6 = dom.createElement("p");
        var el7 = dom.createTextNode("Закажи кофе и сэндвич не выходя из кабинета!");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createTextNode("Не стой в очереди, опаздывая на пару!");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","accordion");
        dom.setAttribute(el2,"class","panel-group");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"id","drinks");
        dom.setAttribute(el3,"class","panel");
        var el4 = dom.createElement("section");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","blue-mask");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","title text-center");
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"data-parent","#accordion");
        dom.setAttribute(el6,"data-toggle","collapse");
        dom.setAttribute(el6,"href","#collapseDrink");
        var el7 = dom.createTextNode(" Напитки");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"id","collapseDrink");
        dom.setAttribute(el4,"class","panel-collapse collapse");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","container items");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"id","food");
        dom.setAttribute(el3,"class","panel");
        var el4 = dom.createElement("section");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","blue-mask");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","title text-center");
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"data-parent","#accordion");
        dom.setAttribute(el6,"data-toggle","collapse");
        dom.setAttribute(el6,"href","#collapseFood");
        var el7 = dom.createTextNode(" Закуска");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"id","collapseFood");
        dom.setAttribute(el4,"class","panel-collapse collapse");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","container items");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [0, 1, 0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1, 0]),0,0);
        return morphs;
      },
      statements: [
        ["block","each",[["get","drinks",["loc",[null,[1,672],[1,678]]]]],[],0,null,["loc",[null,[1,664],[1,772]]]],
        ["block","each",[["get","foods",["loc",[null,[1,1082],[1,1087]]]]],[],1,null,["loc",[null,[1,1074],[1,1175]]]]
      ],
      locals: [],
      templates: [child0, child1]
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
define('frontend/tests/integration/components/bread-type-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('bread-type-component', 'Integration | Component | bread type component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{bread-type-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#bread-type-component}}\n  template block text\n{{/bread-type-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/cart-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('cart-component', 'Integration | Component | cart component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{cart-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#cart-component}}\n  template block text\n{{/cart-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/cart-modal-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('cart-modal', 'Integration | Component | cart modal', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{cart-modal}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#cart-modal}}\n  template block text\n{{/cart-modal}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
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
define('frontend/tests/integration/components/drink-item-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('drink-item', 'Integration | Component | drink item', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{drink-item}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#drink-item}}\n  template block text\n{{/drink-item}}"));
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
define('frontend/tests/integration/components/food-item-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('food-item', 'Integration | Component | food item', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{food-item}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#food-item}}\n  template block text\n{{/food-item}}"));
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
define('frontend/tests/integration/components/profile-modal-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('profile-modal', 'Integration | Component | profile modal', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{profile-modal}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#profile-modal}}\n  template block text\n{{/profile-modal}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/integration/components/sauce-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('sauce-component', 'Integration | Component | sauce component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{sauce-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#sauce-component}}\n  template block text\n{{/sauce-component}}"));
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
define('frontend/tests/integration/components/syurup-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('syurup-component', 'Integration | Component | syurup component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{syurup-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#syurup-component}}\n  template block text\n{{/syurup-component}}"));
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
define('frontend/tests/unit/components/bread-type-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('bread-type-component', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('frontend/tests/unit/components/cart-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('cart-component', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('frontend/tests/unit/components/cart-modal-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('cart-modal', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('frontend/tests/unit/components/drink-item-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('drink-item', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
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
define('frontend/tests/unit/components/food-item-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('food-item', {});

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
define('frontend/tests/unit/components/profile-modal-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('profile-modal', {});

  ember_qunit.test('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });

});
define('frontend/tests/unit/components/sauce-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('sauce-component', {});

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
define('frontend/tests/unit/components/syurup-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('syurup-component', {});

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
define('frontend/tests/unit/controllers/confirm-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:confirm', {});

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
define('frontend/tests/unit/initializers/session-test', ['ember', 'frontend/initializers/session', 'qunit'], function (Ember, session, qunit) {

  'use strict';

  var application, registry;

  application = null;

  registry = null;

  qunit.module('Unit | Initializer | session', {
    beforeEach: function beforeEach() {
      return Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        return application.deferReadiness();
      });
    }
  });

  qunit.test('it works', function (assert) {
    session.initialize(registry, application);
    return assert.ok(true);
  });

});
define('frontend/tests/unit/models/drink-preorder-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('drink-preorder', 'Unit | Model | drink preorder', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/models/drink-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('drink', 'Unit | Model | drink', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
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
define('frontend/tests/unit/models/food-preorder-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('food-preorder', 'Unit | Model | food preorder', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/models/food-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('food', 'Unit | Model | food', {
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
define('frontend/tests/unit/models/preorder-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('preorder', 'Unit | Model | preorder', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/models/sauce-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('sauce', 'Unit | Model | sauce', {
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
define('frontend/tests/unit/models/syurup-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('syurup', 'Unit | Model | syurup', {
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
define('frontend/tests/unit/routes/confirm-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:confirm', 'Unit | Route | confirm', {});

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
define('frontend/tests/unit/serializers/drink-preorder-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('drink-preorder', 'Unit | Serializer | drink preorder', {
    needs: ['serializer:drink-preorder']
  });

  ember_qunit.test('it serializes records', function (assert) {
    var record, serializedRecord;
    record = this.subject();
    serializedRecord = record.serialize();
    return assert.ok(serializedRecord);
  });

});
define('frontend/tests/unit/serializers/preorder-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('preorder', 'Unit | Serializer | preorder', {
    needs: ['serializer:preorder']
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
  return { 'default': {"modulePrefix":"frontend","environment":"development","baseURL":"/","rootElement":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"frontend","version":"0.0.0+2fbe98bb"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"exportApplicationGlobal":true}};
});

if (runningTests) {
  require("frontend/tests/test-helper");
} else {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+2fbe98bb"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map

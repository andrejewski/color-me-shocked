(function() {
  this.BaseModel = Backbone.Model.extend({
    _computed: {},
    compute: function(prop, deps, func) {
      var async, calc, dep, event, fung, _i, _len;
      if (_.isFunction(deps)) {
        func = deps;
        fung = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        deps = deps.toString().match(fung);
      } else if (_.isString(deps)) {
        deps = deps.split(' ');
      }
      async = _.contains(deps, 'next');
      calc = function(prop, deps, func, async) {
        var args, dep, vals, _i, _j, _len, _len1,
          _this = this;
        vals = _.pick(this.attributes, deps);
        args = [];
        if (async) {
          vals['next'] = function(value) {
            return _this.set(prop, value);
          };
          for (_i = 0, _len = deps.length; _i < _len; _i++) {
            dep = deps[_i];
            args.push(vals[dep]);
          }
          return func.apply(this, args);
        } else {
          for (_j = 0, _len1 = deps.length; _j < _len1; _j++) {
            dep = deps[_j];
            args.push(vals[dep]);
          }
          return this.set(prop, func.apply(this, args));
        }
      };
      this._computed[prop] = _.bind(calc, this, prop, deps, func, async);
      event = '';
      for (_i = 0, _len = deps.length; _i < _len; _i++) {
        dep = deps[_i];
        event += " change:" + dep;
      }
      this.on(event, this._computed[prop]);
      this._computed[prop]();
      return this;
    },
    parse: function(response, options) {
      var data, error;
      error = response.error, data = response.data;
      if (error === void 0) {
        return response;
      }
      console.log(error, data);
      if (error) {
        throw error;
      }
      return data;
    }
  });

  this.BaseCollection = Backbone.Collection.extend({
    parse: function(response, options) {
      var data, error;
      if (response.error === void 0) {
        return response;
      }
      error = response.error, data = response.data;
      if (error) {
        throw error;
      }
      return data;
    }
  });

  this.BaseView = Backbone.View.extend({
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    remove: function() {
      _.each(this._views || [], function(view) {
        return view.remove();
      });
      Backbone.View.prototype.remove.call(this);
      return this;
    },
    attach: function(property, view) {
      var properties,
        _this = this;
      this._views = this._views || {};
      if (_.isObject(property)) {
        properties = property;
      } else {
        properties = {};
        properties[property] = view;
      }
      _.each(properties, function(view, property) {
        return _this[property] = _this._views[property] = view;
      });
      return this;
    },
    assign: function(selector, view) {
      var selectors,
        _this = this;
      if (_.isObject(selector)) {
        selectors = selector;
      } else {
        selectors = {};
        selectors[selector] = view;
      }
      if (!selectors) {
        return;
      }
      _.each(selectors, function(view, selector) {
        if (_.isString(view)) {
          view = _this[view];
        }
        return view.setElement(_this.$(selector)).render();
      });
      return this;
    }
  });

}).call(this);

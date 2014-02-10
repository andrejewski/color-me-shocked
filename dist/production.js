(function() {
  var cmyk2rgb, hex2rgb, hsv2rgb, rgb2cmyk, rgb2hex, rgb2hsv, rgb2rgb;

  hex2rgb = function(hex, next) {
    var xeh;
    if ('#' === hex.charAt && hex.charAt(0)) {
      hex = hex.slice(1);
    }
    if (hex.length === 3) {
      hex = _.map(hex, function(x) {
        return x + x;
      }).join('');
    }
    if (hex.length !== 6) {
      return next("Not a valid hex color.");
    }
    xeh = function(x) {
      return parseInt(hex.substring(x, x + 2), 16);
    };
    return next(null, [xeh(0), xeh(2), xeh(4)]);
  };

  rgb2hex = function(rgb, next) {
    return next(null, _.map(rgb, function(c) {
      return c.toString(16);
    }).join(''));
  };

  hsv2rgb = function(hsv, next) {
    var b, c, g, h, m, r, s, v, x, _ref;
    h = hsv[0], s = hsv[1], v = hsv[2];
    c = v * s;
    x = c * (1 - (Math.abs((h / 60) % 2 - 1)));
    m = v - c;
    _ref = (function() {
      switch (false) {
        case !(h < 60):
          return [c, x, 0];
        case !(h < 120):
          return [x, c, 0];
        case !(h < 180):
          return [0, c, x];
        case !(h < 240):
          return [0, x, c];
        case !(h < 300):
          return [x, 0, c];
        case !(h < 360):
          return [c, 0, x];
      }
    })(), r = _ref[0], g = _ref[1], b = _ref[2];
    return next(null, [r + m, g + m, b + m]);
  };

  rgb2hsv = function(rgb, next) {
    var H, S, V, b, d, g, h, maxRGB, minRGB, r;
    rgb = _.map(rgb, function(c) {
      return c / 255;
    });
    minRGB = _.min(rgb);
    maxRGB = _.max(rgb);
    if (minRGB === maxRGB) {
      return next(null, [0, 0, minRGB]);
    }
    r = rgb[0], g = rgb[1], b = rgb[2];
    if (r === minRGB) {
      d = g - b;
      h = 3;
    }
    if (g === minRGB) {
      d = b - r;
      h = 1;
    }
    if (b === minRGB) {
      d = r - g;
      h = 5;
    }
    H = (60 * (h - d / (maxRGB - minRGB))).toFixed(1);
    S = ((maxRGB - minRGB) / maxRGB).toFixed(4);
    V = maxRGB.toFixed(4);
    return next(null, [H, S, V]);
  };

  cmyk2rgb = function(cmyk, next) {
    var k;
    k = cmyk.pop();
    return next(null, _.map(cmyk, function(c) {
      return Math.floor(255 * (1 - c) * (1 - k));
    }));
  };

  rgb2cmyk = function(rgb, next) {
    var C, K, M, Y, cmy, minCMY, _ref;
    if (0 === _.max(rgb)) {
      return next(null, [0, 0, 0, 1]);
    }
    cmy = _.map(rgb, function(c) {
      return 1 - (c / 255);
    });
    K = minCMY = _.min(cmy);
    _ref = _.map(cmy, function(c) {
      return ((c - minCMY) / (1 - minCMY)).toFixed(4);
    }), C = _ref[0], M = _ref[1], Y = _ref[2];
    return next(null, [C, M, Y, K]);
  };

  rgb2rgb = function(rgb, next) {
    return next(null, rgb);
  };

  this.Color = Backbone.Model.extend({
    initialize: function() {
      var derive,
        _this = this;
      derive = function(func) {
        func = _.bind(func, _this);
        _this.on('change:rgb', function(m, v) {
          return func(v);
        });
        return func(_this.get('rgb'));
      };
      derive(this.rgb2hex);
      derive(this.rgb2hsv);
      derive(this.rgb2cmyk);
      derive(this.sprintf);
      derive(function(rgb) {
        var b, g, r;
        r = rgb[0], g = rgb[1], b = rgb[2];
        return document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
      });
      return this.on('change:formula', this.sprintf);
    },
    rgb2rgb: function(rgb) {
      var _this = this;
      return rgb2rgb(rgb, function(error, rgb) {
        if (!error) {
          return _this.set('rgb', rgb);
        }
      });
    },
    hex2rgb: function(hex) {
      var _this = this;
      return hex2rgb(hex, function(error, rgb) {
        if (!error) {
          return _this.set('rgb', rgb);
        }
      });
    },
    hsv2rgb: function(hsv) {
      var _this = this;
      return hsv2rgb(hsv, function(error, rgb) {
        if (!error) {
          return _this.set('rgb', rgb);
        }
      });
    },
    cmyk2rgb: function(cmyk) {
      var _this = this;
      return cmyk2rgb(cmyk, function(error, rgb) {
        if (!error) {
          return _this.set('rgb', rgb);
        }
      });
    },
    rgb2hex: function(rgb) {
      var _this = this;
      return rgb2hex(rgb, function(error, hex) {
        if (!error) {
          return _this.set({
            hex: hex
          });
        }
      });
    },
    rgb2cmyk: function(rgb) {
      var _this = this;
      return rgb2cmyk(rgb, function(error, cmyk) {
        if (!error) {
          return _this.set({
            cmyk: cmyk
          });
        }
      });
    },
    rgb2hsv: function(rgb) {
      var _this = this;
      return rgb2hsv(rgb, function(error, hsv) {
        if (!error) {
          return _this.set({
            hsv: hsv
          });
        }
      });
    },
    sprintf: function() {
      var b, c, color, f, g, h, k, m, r, regex, s, string, v, vars, x, y, _ref, _ref1, _ref2;
      f = this.get('formula');
      regex = new RegExp("(%)(.?)", "g");
      color = this.attributes;
      x = color.hex;
      _ref = color.rgb, r = _ref[0], g = _ref[1], b = _ref[2];
      _ref1 = color.hsv, h = _ref1[0], s = _ref1[1], v = _ref1[2];
      _ref2 = color.cmyk, c = _ref2[0], m = _ref2[1], y = _ref2[2], k = _ref2[3];
      vars = {
        x: x,
        r: r,
        g: g,
        b: b,
        h: h,
        s: s,
        v: v,
        c: c,
        m: m,
        y: y,
        k: k
      };
      string = f.replace(regex, function($1) {
        return vars[$1.slice(1)];
      });
      return this.set('fstring', string);
    },
    userInput: function(conversion) {
      var _this = this;
      return function(inputs, straight) {
        var func;
        func = _.bind(_this[conversion], _this);
        if (!straight) {
          inputs = _.map(inputs, function(i) {
            var nums, text;
            text = i.trim();
            nums = parseInt(text, 10);
            return nums || text || 0;
          });
        }
        if (_.isArray(inputs) && inputs.length === 1) {
          inputs = inputs.pop();
        }
        console.log('color#userInput', conversion, inputs);
        return func(inputs);
      };
    },
    userFormula: function(formula) {
      return this.set({
        formula: formula
      });
    },
    userMethod: function(method) {
      return this.set({
        method: method
      });
    }
  });

}).call(this);

(function() {
  var main;

  main = function() {
    var model, view;
    model = this.color = new Color({
      rgb: [32, 160, 255],
      formula: 'rgb(%r, %g, %b)'
    });
    view = new ApplicationView({
      model: model
    });
    return view.setElement('#application').render();
  };

  _.defer(_.bind(main, this));

}).call(this);

(function() {
  var Cmyk, Hex, Hsv, Rgb, SprintF, SprintFString;

  this.ApplicationView = BaseView.extend({
    template: JST['application'],
    initialize: function() {
      return this.attach({
        hex: new Hex({
          model: this.model
        }),
        rgb: new Rgb({
          model: this.model
        }),
        cmyk: new Cmyk({
          model: this.model
        }),
        hsv: new Hsv({
          model: this.model
        }),
        sprintF: new SprintF({
          model: this.model
        })
      });
    },
    render: function() {
      BaseView.prototype.render.call(this);
      return this.assign({
        '.hex-outlet': this.hex,
        '.rgb-outlet': this.rgb,
        '.cmyk-outlet': this.cmyk,
        '.hsv-outlet': this.hsv,
        '.sprintf-outlet': this.sprintF
      });
    }
  });

  Hex = BaseView.extend({
    template: JST['hex'],
    initialize: function() {
      var _this = this;
      this.userInput = this.model.userInput('hex2rgb');
      return this.listenTo(this.model, 'change:hex', function() {
        if ('hex' === _this.model.get('method')) {
          return;
        }
        return _this.render();
      });
    },
    events: {
      'click .textbox-hex': 'handleClick',
      'keyup .textbox-hex': 'handleKeyUp'
    },
    handleClick: function() {
      return this.model.set('method', 'hex');
    },
    handleKeyUp: function() {
      var text, textbox;
      textbox = this.$('.textbox-hex');
      text = textbox.val();
      if (text) {
        return this.userInput(text, true);
      }
    }
  });

  Rgb = BaseView.extend({
    template: JST['rgb'],
    initialize: function() {
      var _this = this;
      this.userInput = this.model.userInput('rgb2rgb');
      return this.listenTo(this.model, 'change:rgb', function() {
        if ('rgb' === _this.model.get('method')) {
          return;
        }
        return _this.render();
      });
    },
    events: {
      'click .textbox-rgb': 'handleClick',
      'keyup .textbox-rgb': 'handleKeyUp'
    },
    handleClick: function() {
      return this.model.set('method', 'rgb');
    },
    handleKeyUp: function() {
      var rgb,
        _this = this;
      rgb = _.map('red green blue'.split(' '), function(color) {
        return _this.$(".textbox-rgb-" + color).val();
      });
      if (rgb) {
        return this.userInput(rgb);
      }
    }
  });

  Cmyk = BaseView.extend({
    template: JST['cmyk'],
    initialize: function() {
      var _this = this;
      this.userInput = this.model.userInput('cmyk2rgb');
      return this.listenTo(this.model, 'change:cmyk', function() {
        if ('cmyk' === _this.model.get('method')) {
          return;
        }
        return _this.render();
      });
    },
    events: {
      'click .textbox-cmyk': 'handleClick',
      'keyup .textbox-cmyk': 'handleKeyUp'
    },
    handleClick: function() {
      return this.model.set('method', 'cmyk');
    },
    handleKeyUp: function() {
      var cmyk,
        _this = this;
      cmyk = _.map('cyan magenta yellow black'.split(' '), function(color) {
        return _this.$(".textbox-cmyk-" + color).val();
      });
      if (cmyk) {
        return this.userInput(cmyk);
      }
    }
  });

  Hsv = BaseView.extend({
    template: JST['hsv'],
    initialize: function() {
      var _this = this;
      this.userInput = this.model.userInput('rgb2rgb');
      return this.listenTo(this.model, 'change:hsv', function() {
        if ('hsv' === _this.model.get('method')) {
          return;
        }
        return _this.render();
      });
    },
    events: {
      'click .textbox-hsv': 'handleClick',
      'keyup .textbox-hsv': 'handleKeyUp'
    },
    handleClick: function() {
      return this.model.set('method', 'hsv');
    },
    handleKeyUp: function() {
      var hsv,
        _this = this;
      hsv = _.map('hue saturation value'.split(' '), function(color) {
        return _this.$(".textbox-hsv-" + color).val();
      });
      if (hsv) {
        return this.userInput(hsv);
      }
    }
  });

  SprintF = BaseView.extend({
    template: JST['sprintf'],
    initialize: function() {
      return this.attach('fstring', new SprintFString({
        model: this.model
      }));
    },
    render: function() {
      BaseView.prototype.render.call(this);
      return this.assign('.fstring-outlet', this.fstring);
    },
    events: {
      'keyup .textbox-formula': 'handleKeyUp'
    },
    handleKeyUp: function() {
      var text, textbox;
      textbox = this.$('.textbox-formula');
      text = textbox.val();
      if (text) {
        return this.model.set('formula', text);
      }
    }
  });

  SprintFString = BaseView.extend({
    template: JST['fstring'],
    initialize: function() {
      return this.listenTo(this.model, 'change:fstring', this.render);
    }
  });

}).call(this);

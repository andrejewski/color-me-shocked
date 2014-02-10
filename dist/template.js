this["JST"] = this["JST"] || {};this["JST"]["application"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- application.hbs -->\n<div class='application'>\n	<div class='hex-outlet'></div>\n	<div class='rgb-outlet'></div>\n	<div class='cmyk-outlet'></div>\n	<div class='hsv-outlet'></div>\n	<div class='sprintf-outlet'></div>\n</div>";
  });
this["JST"] = this["JST"] || {};this["JST"]["cmyk"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n<div class='format format-cmyk'>\n	<div class='format-name'>\n		<p>CMYK</p>\n	</div><div class='format-form quarter-group'>\n		<div class='quarter'>\n			<input class='input-quarter textbox textbox-cmyk textbox-cmyk-cyan' type='text' placeholder='Cyan' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cmyk)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div><div class='quarter'>\n			<input class='input-quarter textbox textbox-cmyk textbox-cmyk-magenta' type='text' placeholder='Magenta' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cmyk)),stack1 == null || stack1 === false ? stack1 : stack1[1])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div><div class='quarter'>\n			<input class='input-quarter textbox textbox-cmyk textbox-cmyk-yellow' type='text' placeholder='Yellow' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cmyk)),stack1 == null || stack1 === false ? stack1 : stack1[2])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div><div class='quarter'>\n			<input class='input-quarter textbox textbox-cmyk textbox-cmyk-black' type='text' placeholder='Black (K)' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cmyk)),stack1 == null || stack1 === false ? stack1 : stack1[3])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div>\n	</div>\n</div>\n";
  return buffer;
  });
this["JST"] = this["JST"] || {};this["JST"]["fstring"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n<div>\n	<input class='input-whole textbox textbox-fstring' type='text' placeholder='Custom Formatted String' value='";
  if (stack1 = helpers.fstring) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.fstring); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "' readonly/>\n</div>";
  return buffer;
  });
this["JST"] = this["JST"] || {};this["JST"]["hex"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- hex.hbs -->\n<div class='format format-hex'>\n	<div class='format-name'>\n		<p>HEX</p>\n	</div><div class='format-form'>\n		<input class='input-whole textbox textbox-hex' type='text' placeholder='#Hexidecimal' value='";
  if (stack1 = helpers.hex) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.hex); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "'/>\n	</div>\n</div>";
  return buffer;
  });
this["JST"] = this["JST"] || {};this["JST"]["hsv"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n<div class='format format-hsv'>\n	<div class='format-name'>\n		<p>HSV</p>\n	</div><div class='format-form third-group'>\n		<div class='third'>\n			<input class='input-third textbox textbox-hsv textbox-hsv-hue' type='text' placeholder='Hue' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.hsv)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div><div class='third'>\n			<input class='input-third textbox textbox-hsv textbox-hsv-saturation' type='text' placeholder='Saturation' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.hsv)),stack1 == null || stack1 === false ? stack1 : stack1[1])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div><div class='third'>\n			<input class='input-third textbox textbox-hsv textbox-hsv-value' type='text' placeholder='Value' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.hsv)),stack1 == null || stack1 === false ? stack1 : stack1[2])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div>\n	</div>\n</div>";
  return buffer;
  });
this["JST"] = this["JST"] || {};this["JST"]["rgb"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- rgb.hbs -->\n<div class='format format-rgb'>\n	<div class='format-name'>\n		<p>RGB</p>\n	</div><div class='format-form third-group'>\n		<div class='third'>\n			<input class='input-third textbox textbox-rgb textbox-rgb-red' type='text' placeholder='Red' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rgb)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div><div class='third'>\n			<input class='input-third textbox textbox-rgb textbox-rgb-green' type='text' placeholder='Green' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rgb)),stack1 == null || stack1 === false ? stack1 : stack1[1])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div><div class='third'>\n			<input class='input-third textbox textbox-rgb textbox-rgb-blue' type='text' placeholder='Blue' value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rgb)),stack1 == null || stack1 === false ? stack1 : stack1[2])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		</div>\n	</div>\n</div>";
  return buffer;
  });
this["JST"] = this["JST"] || {};this["JST"]["sprintf"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n<div class='format format-sprintf'>\n	<div class='format-name'>\n		<p>Custom</p>\n	</div><div class='format-form'>\n		<div class='fstring-outlet'></div>\n		<input class='input-whole textbox textbox-formula' type='text' placeholder='Custom Format String' value='";
  if (stack1 = helpers.formula) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.formula); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "'/>\n	</div>\n</div>";
  return buffer;
  });
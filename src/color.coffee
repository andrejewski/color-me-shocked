# color.coffee

# hex2rgb
# > #fff || #ffffff || fff || ffffff
# < [r,g,b]
hex2rgb = (hex, next) ->
	hex = hex.slice 1 if '#' == hex.charAt && hex.charAt 0
	if hex.length == 3
		hex = _.map(hex, (x) -> x+x).join('')
	return next "Not a valid hex color." unless hex.length == 6
	xeh = (x) -> parseInt (hex.substring x, x+2), 16
	next null, [
		xeh 0
		xeh 2
		xeh 4
	]

# rgb2hex
# > [r,g,b]
# < ffffff
rgb2hex = (rgb, next) -> next null, _.map(rgb, (c) -> c.toString(16)).join('')

# hsv2rgb
# > [h,s,v]
# < [r,g,b]
hsv2rgb = (hsv, next) ->
	[h,s,v] = hsv
	c = v * s
	x = c * (1 - (Math.abs (h / 60) % 2 - 1))
	m = v - c
	[r,g,b] = switch
		when h < 60 	then [c,x,0]
		when h < 120 	then [x,c,0]
		when h < 180	then [0,c,x]
		when h < 240 	then [0,x,c]
		when h < 300 	then [x,0,c]
		when h < 360	then [c,0,x]
	next null, [r+m, g+m, b+m]

# rgb2hsv
# > [r,g,b]
# < [h,s,v]
rgb2hsv = (rgb, next) ->
	rgb = _.map rgb, (c) -> c/255
	minRGB = _.min rgb
	maxRGB = _.max rgb
	return next null, [0,0,minRGB] if minRGB == maxRGB
	[r,g,b] = rgb
	(d = g - b ; h = 3)	if r == minRGB
	(d = b - r ; h = 1) if g == minRGB
	(d = r - g ; h = 5)	if b == minRGB
	H = (60*(h - d/(maxRGB - minRGB))).toFixed 1
	S = ((maxRGB - minRGB)/maxRGB).toFixed 4
	V = maxRGB.toFixed 4
	next null, [H,S,V]


cmyk2rgb = (cmyk, next) ->
	k = do cmyk.pop
	next null, _.map cmyk, (c) -> Math.floor (255 * (1-c) * (1-k))

# rgb2cmyk
# > [r,g,b]
# < [c,m,y,k]
rgb2cmyk = (rgb, next) ->
	return next null, [0,0,0,1] if 0 == _.max rgb
	cmy = _.map rgb, (c) -> 1 - (c/255)
	K = minCMY = _.min cmy
	[C,M,Y] = _.map cmy, (c) -> ((c - minCMY)/(1 - minCMY)).toFixed 4
	next null, [C,M,Y,K]

rgb2rgb = (rgb, next) -> next null, rgb

@Color = Backbone.Model.extend
	initialize: ->
		derive = (func) =>
			func = _.bind func, @
			@on 'change:rgb', (m, v) -> func v
			func @get 'rgb'
		derive @rgb2hex
		derive @rgb2hsv
		derive @rgb2cmyk
		derive @sprintf
		derive (rgb) ->
			[r,g,b] = rgb
			document.body.style.backgroundColor = "rgb(#{r},#{g},#{b})"
		@on 'change:formula', @sprintf
	# mutators
	rgb2rgb: (rgb) -> rgb2rgb rgb, (error, rgb) =>
		@set 'rgb', rgb unless error
	hex2rgb: (hex) -> hex2rgb hex, (error, rgb) =>
			@set 'rgb', rgb unless error
	hsv2rgb: (hsv) -> hsv2rgb hsv, (error, rgb) =>
		@set 'rgb', rgb unless error
	cmyk2rgb: (cmyk) -> cmyk2rgb cmyk, (error, rgb) =>
		@set 'rgb', rgb unless error
	# formats
	rgb2hex: (rgb) -> rgb2hex rgb, (error, hex) =>
		@set {hex} unless error
	rgb2cmyk: (rgb) -> rgb2cmyk rgb, (error, cmyk) =>
		@set {cmyk} unless error
	rgb2hsv: (rgb) -> rgb2hsv rgb, (error, hsv) =>
		@set {hsv} unless error
	sprintf: ->
		f = @get 'formula'
		regex = new RegExp "(%)(.?)", "g"
		color = @attributes
		x = color.hex
		[r,g,b] = color.rgb
		[h,s,v] = color.hsv
		[c,m,y,k] = color.cmyk
		vars = {x, r,g,b, h,s,v, c,m,y,k}
		string = f.replace regex, ($1) -> vars[$1.slice 1]
		@set 'fstring', string

	# UI (helpers)
	userInput: (conversion) -> (inputs, straight) =>
		func = _.bind @[conversion], @
		if !straight
			inputs = _.map inputs, (i) ->
				text = i.trim()
				nums = parseInt text, 10
				nums || text || 0
		inputs = inputs.pop() if _.isArray(inputs) && inputs.length == 1
		console.log 'color#userInput', conversion, inputs
		func inputs
	userFormula: (formula) -> @set {formula}
	userMethod: (method) -> @set {method}


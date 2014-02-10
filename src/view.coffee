# view.coffee

@ApplicationView = BaseView.extend
	template: JST['application']
	initialize: ->
		@attach
			hex: 	new Hex {@model}
			rgb: 	new Rgb {@model}
			cmyk: 	new Cmyk {@model}
			hsv:	new Hsv {@model}
			sprintF:new SprintF {@model}
	render: ->
		BaseView::render.call @
		@assign
			'.hex-outlet': @hex
			'.rgb-outlet': @rgb
			'.cmyk-outlet': @cmyk
			'.hsv-outlet': @hsv
			'.sprintf-outlet': @sprintF

Hex = BaseView.extend
	template: JST['hex']
	initialize: ->
		@userInput = @model.userInput 'hex2rgb'
		@listenTo @model, 'change:hex', =>
			return if 'hex' == @model.get 'method'
			do @render
	events:
		'click .textbox-hex': 'handleClick'
		'keyup .textbox-hex': 'handleKeyUp'
	handleClick: -> @model.set 'method', 'hex'
	handleKeyUp: ->
		textbox = @$('.textbox-hex')
		text = textbox.val()
		@userInput text, true if text

Rgb = BaseView.extend
	template: JST['rgb']
	initialize: ->
		@userInput = @model.userInput 'rgb2rgb'
		@listenTo @model, 'change:rgb', =>
			return if 'rgb' == @model.get 'method'
			do @render
	events: 
		'click .textbox-rgb': 'handleClick'
		'keyup .textbox-rgb': 'handleKeyUp'
	handleClick: -> @model.set 'method', 'rgb'
	handleKeyUp: ->
		rgb = _.map ('red green blue'.split(' ')), (color) =>
			@$(".textbox-rgb-#{color}").val()
		@userInput rgb if rgb

Cmyk = BaseView.extend
	template: JST['cmyk']
	initialize: ->
		@userInput = @model.userInput 'cmyk2rgb'
		@listenTo @model, 'change:cmyk', =>
			return if 'cmyk' == @model.get 'method'
			do @render
	events: 
		'click .textbox-cmyk': 'handleClick'
		'keyup .textbox-cmyk': 'handleKeyUp'
	handleClick: -> @model.set 'method', 'cmyk'
	handleKeyUp: ->
		cmyk = _.map ('cyan magenta yellow black'.split(' ')), (color) =>
			@$(".textbox-cmyk-#{color}").val()
		@userInput cmyk if cmyk

Hsv = BaseView.extend
	template: JST['hsv']
	initialize: ->
		@userInput = @model.userInput 'rgb2rgb'
		@listenTo @model, 'change:hsv', =>
			return if 'hsv' == @model.get 'method'
			do @render
	events: 
		'click .textbox-hsv': 'handleClick'
		'keyup .textbox-hsv': 'handleKeyUp'
	handleClick: -> @model.set 'method', 'hsv'
	handleKeyUp: ->
		hsv = _.map ('hue saturation value'.split(' ')), (color) =>
			@$(".textbox-hsv-#{color}").val()
		@userInput hsv if hsv

SprintF = BaseView.extend
	template: JST['sprintf']
	initialize: ->
		@attach 'fstring', new SprintFString {@model}
	render: ->
		BaseView::render.call @
		@assign '.fstring-outlet', @fstring
	events:
		'keyup .textbox-formula': 'handleKeyUp'
	handleKeyUp: ->
		textbox = @$('.textbox-formula')
		text = textbox.val()
		@model.set 'formula', text if text

SprintFString = BaseView.extend
	template: JST['fstring']
	initialize: ->
		@listenTo @model, 'change:fstring', @render


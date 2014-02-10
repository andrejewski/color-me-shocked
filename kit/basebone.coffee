# basebone.coffee

@BaseModel = Backbone.Model.extend
	_computed: {}
	compute: (prop, deps, func) ->
		# computed properties power trip
		if _.isFunction deps
			func = deps
			fung = /^function\s*[^\(]*\(\s*([^\)]*)\)/m
			deps = deps.toString().match fung
		else if _.isString deps
			deps = deps.split ' ' 
		async = _.contains deps, 'next'
		calc = (prop, deps, func, async) ->
			vals = _.pick @attributes, deps
			args = []
			if async
				vals['next'] = (value) =>
					@set prop, value
				args.push vals[dep] for dep in deps
				func.apply @, args
			else
				args.push vals[dep] for dep in deps
				@set prop, func.apply @, args
		# persist
		@_computed[prop] = _.bind calc, @, prop, deps, func, async
		# listen
		event = ''
		event += " change:#{dep}" for dep in deps
		@on event, @_computed[prop]
		# compute
		@_computed[prop]()
		@
	parse: (response, options) ->
		{error, data} = response
		return response if error == undefined
		console.log error, data
		throw error if error
		data

@BaseCollection = Backbone.Collection.extend
	parse: (response, options) ->
		return response if response.error == undefined
		{error, data} = response
		throw error if error
		data
		
@BaseView = Backbone.View.extend
	render: ->
		@$el.html @template @model.attributes
		@
	remove: ->
		_.each @_views || [], (view) ->
			view.remove()
		Backbone.View::remove.call @
		@
	attach: (property, view) ->
		@_views = @_views || {}
		if _.isObject property
			properties = property
		else
			properties = {}
			properties[property] = view
		_.each properties, (view, property) =>
			@[property] = @_views[property] = view
		@
	assign: (selector, view) ->
		if _.isObject selector
			selectors = selector
		else
			selectors = {}
			selectors[selector] = view
		return if !selectors
		_.each selectors,  (view, selector) =>
			view = @[view] if _.isString view
			view.setElement(@$(selector)).render()
		@

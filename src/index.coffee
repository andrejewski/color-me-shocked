# index.coffee

main = ->
	# model
	model = @color = new Color
		rgb: [32,160,255]
		formula: 'rgb(%r, %g, %b)'

	# view
	view = new ApplicationView {model}
	view.setElement('#application').render()


_.defer _.bind(main, @)

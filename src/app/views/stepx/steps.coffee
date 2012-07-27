#<< app/views/stepx/step

class Steps
	# list of steps in the box
	steps : null

	# last selected object
	last     : null
	selected : 0

	constructor: ( @a, @length ) ->
		@steps = [];

		$( @a.clock ).bind 'clock.tick', @step

		@length--

		for x in [0..@length]
			do ( x ) =>

				step = new app.views.stepx.Step @a, x

				step.x x * 30

				@steps.push step

				@a.scene.add( step.mesh );

	step: =>

		if @last?
			@last.power off

		item = @steps[ @selected ]
		item.power on

		@selected++
		if @selected == @steps.length
			@selected = 0

		@last = item
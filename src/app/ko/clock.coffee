class Clock
	@SECOND: 60000
	power : off
	interval_id : 0

	constructor: ( bpm ) ->
		@bpm bpm

	bpm: ( _bpm ) =>
		if _bpm?
			@_bpm = _bpm
			if @is_on then @power on
		_bpm

	power: ( toggle ) =>
		if toggle
			@power off
			@interval_id = setInterval @tick, app.ko.Clock.SECOND / @_bpm
			# @tick()
		else
			if @interval_id? then clearInterval @interval_id
			@interval_id = null

		@is_on = toggle;

	tick: =>
		$( @ ).trigger 'clock.tick'
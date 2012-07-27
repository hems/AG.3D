class App
	constructor: () ->
		@build()

		@clock = new app.ko.Clock 60

		@steps = new app.views.stepx.Steps @, 16

		@clock.power on

		$( '#bpm' ).bind 'change', () =>
			@clock.bpm $( '#bpm' ).val()

		onDocumentMouseDown = ( event ) =>
			# event.preventDefault();

			vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 )

			@projector.unprojectVector( vector, @camera )

			ray = new THREE.Ray( @camera.position, vector.subSelf( @camera.position ).normalize() )

			$( @ ).trigger 'app.click', ray

		document.addEventListener( 'mousedown', onDocumentMouseDown , false );

	build: =>
		@display_ratio = window.innerWidth / window.innerHeight

		@scene = new THREE.Scene();
		@projector = new THREE.Projector();
		@renderer = new THREE.CanvasRenderer();

		@camera = new THREE.PerspectiveCamera 75, @display_ratio, 1, 10000
		@camera.position.z = 1000;

		@scene.add @camera

		@renderer.setSize window.innerWidth, window.innerHeight

		document.body.appendChild @renderer.domElement

	render: () ->
		@renderer.render @scene, @camera

$ ->
	animate = ->

		# note: three.js includes requestAnimationFrame shim
		requestAnimationFrame( animate );
		ag.render();

	window.ag = ag = new app.App

	animate()

delay = ( delay, funktion ) -> setTimeout funktion, delay
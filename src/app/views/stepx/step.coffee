class Step
	constructor: ( @a, @index ) ->

		$( @a ).bind 'app.click', @click

		@geometry = new THREE.CubeGeometry( 20, 100, 20 );

		@m_off = new THREE.MeshBasicMaterial
			color: 0x444444, 
			wireframe: false

		@m_on  = new THREE.MeshBasicMaterial
			color: 0x999999
			wireframe: false

		@mesh = new THREE.Mesh( @geometry, @m_off );

	click: ( event, ray ) =>
		intersects = ray.intersectObjects( [ @mesh ] )

		for intersect in intersects
			@scale 50

	scale: ( value ) =>
		console.log @mesh

		@mesh.scale.y = .5;
		# @mesh.height value

	x: ( xpos ) =>
		@mesh.position.x = xpos

	power: ( toggle ) =>
		if toggle
			@mesh.material = @m_on
		else
			@mesh.material = @m_off
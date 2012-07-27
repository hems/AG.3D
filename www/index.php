<html>
	<head>
		<title>AG.3D</title>

		<link rel="stylesheet" type="text/css" href="c.css" />
		
		<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
		
		<script type="text/javascript" src="js/Three.js"></script>
		<script type="text/javascript" src="a.js"></script>
		

		<script>
			BASE_PATH = "<?php echo $_GET['path'] ?>";
		</script>
	</head>


<body>

	<header>
		<input type="range" id="bpm" min="0.1" max="1000" step="0.001" value="120" style="width: 300px" >
		<br/>
		<!--
			<input type="range" id="intensity" min="0.1" max="20.0" step="0.001" value="3.0" style="width: 300px" >
		-->
	</header>

</body>
</html>
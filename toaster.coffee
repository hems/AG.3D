# VENDORS
# vendor 'vendor_id', 'vendors/id.js'
# vendor 'vendor_id_b', 'vendors/id_b.js'


# ROOT SRC FOLDER
src 'src'


# MODULES
module 'app' # module folder name (inside src)
	# vendors: ['id', 'id_b'] # (ordered vendor's array)
	bare: false # default = false (compile coffeescript with bare option)
	packaging: true # default = true
	expose: null # default = null (if informed, link all objects inside it)
	minify: false # default = false (minifies release file only)

# module 'another_module_folder'
# 	(...)


# BUILD ROUTINES
build "main"
	# vendors: ['vendor_id', 'vendor_id_b']
	modules: ['app']
	release: 'www/a.js'
	debug: 'www/a-debug.js'

# build 'another_build_routine'
# 	(...)
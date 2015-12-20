tmplt = handlebars
tmplt_flags = -m

min = uglifyjs
min_flags = --screw-ie8 -o

tmplt_dir = js/templates
bld_dir = build
src_dir = js
lib_dir = lib
asset_dir = assets

jquery = jquery/dist/jquery.min.js
bstrap = bootstrap/dist/js/bootstrap.min.js
hbars = handlebars/handlebars.runtime.min.js


.PHONY: all
all: $(bld_dir) $(bld_dir)/html/popup.html $(bld_dir)/js/popup.js $(bld_dir)/css/style.css $(bld_dir)/fonts/glyphicons-halflings-regular.* $(bld_dir)/assets/icon*.png $(bld_dir)/manifest.json

$(bld_dir):
	mkdir -p $(bld_dir)/html
	mkdir -p $(bld_dir)/css
	mkdir -p $(bld_dir)/js
	mkdir -p $(bld_dir)/assets
	mkdir -p $(bld_dir)/fonts

$(bld_dir)/html/popup.html: html/popup.html
	sed '/jquery\|bootstrap\|handlebars\|storage.js\|show.js/d' $^ > $@

$(bld_dir)/js/popup.js: $(lib_dir)/$(jquery) $(lib_dir)/$(bstrap) $(lib_dir)/$(hbars) $(src_dir)/storage.min.js $(src_dir)/popup.min.js $(tmplt_dir)/show.min.js
	cat $^ > $@

$(src_dir)/%.min.js: $(src_dir)/%.js
	$(min) $^ $(min_flags) $@

$(tmplt_dir)/%.min.js: $(tmplt_dir)/%.handlebars
	$(tmplt) $(tmplt_flags) $< > $@

$(bld_dir)/manifest.json: manifest.json
	cp manifest.json $(bld_dir)

$(bld_dir)/css/style.css: css/style.css $(lib_dir)/bootstrap/dist/css/bootstrap.min.css
	cat $^ > $@

$(bld_dir)/fonts/glyphicons-halflings-regular.%: lib/bootstrap/dist/fonts/glyphicons-halflings-regular.%
	cp $^ $(bld_dir)/fonts

$(bld_dir)/assets/icon%.png: assets/icon%.png
	cp $^ $(bld_dir)/assets 

.PHONY: templates
templates: $(tmplt_dir)/show.min.js

.PHONY: clean
clean:
	$(RM) -r $(bld_dir) $(tmplt_dir)/*.js

.PHONY: rebuild
rebuild: clean all

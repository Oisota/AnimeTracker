tmplt_dir = js/templates
bld_dir = build
src_dir = js
lib_dir = lib
asset_dir = assets


.PHONY: all
all: $(bld_dir)/html/popup.html $(bld_dir)/js/popup.js $(bld_dir)/js/lib.js $(bld_dir)/css/style.css $(bld_dir)/fonts/glyphicons-halflings-regular.* $(bld_dir)/assets/icon*.png $(bld_dir)/manifest.json

$(bld_dir)/html/popup.html: html/popup.html
	mkdir -p $(bld_dir) $(bld_dir)/html
	cp $^ $@

$(bld_dir)/js/popup.js: $(src_dir)/storage.js $(src_dir)/popup.js $(tmplt_dir)/show.js
	mkdir -p $(bld_dir) $(bld_dir)/js
	cat $^ > $@

$(bld_dir)/js/lib.js: $(lib_dir)/jquery/dist/jquery.min.js $(lib_dir)/bootstrap/dist/js/bootstrap.min.js $(lib_dir)/handlebars/handlebars.runtime.min.js
	mkdir -p $(bld_dir) $(bld_dir)/js
	cat $^ > $@ 

$(tmplt_dir)/show.js: $(tmplt_dir)/show.handlebars
	handlebars -m $< > $@

$(bld_dir)/manifest.json: manifest.json
	cp manifest.json $(bld_dir)

$(bld_dir)/css/style.css: css/style.css $(lib_dir)/bootstrap/dist/css/bootstrap.min.css
	mkdir -p $(bld_dir) $(bld_dir)/css
	cat $^ > $@

$(bld_dir)/fonts/glyphicons-halflings-regular.%: lib/bootstrap/dist/fonts/glyphicons-halflings-regular.%
	mkdir -p $(bld_dir) $(bld_dir)/fonts
	cp $^ $(bld_dir)/fonts

$(bld_dir)/assets/icon%.png: assets/icon%.png
	mkdir -p $(bld_dir) $(bld_dir)/assets
	cp $^ $(bld_dir)/assets 


.PHONY: templates
templates: $(tmplt_dir)/show.js

.PHONY: clean
clean:
	$(RM) -r $(bld_dir) $(tmplt_dir)/*.js

.PHONY: rebuild
rebuild: clean all

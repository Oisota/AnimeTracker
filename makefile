tmplt = handlebars
tmplt_flags = -m

min = uglifyjs
min_flags = --screw-ie8 -o

tmplt_dir = js/templates
bld_dir = build
ext_dir = $(bld_dir)/AnimeTracker
src_dir = js
lib_dir = lib
asset_dir = assets

jquery = jquery/dist/jquery.min.js
bstrap = bootstrap/dist/js/bootstrap.min.js
hbars = handlebars/handlebars.runtime.min.js


.PHONY: all
all: $(ext_dir) $(ext_dir)/html/popup.html $(ext_dir)/js/popup.js $(ext_dir)/css/style.css $(ext_dir)/fonts/glyphicons-halflings-regular.* $(ext_dir)/assets/icon*.png $(ext_dir)/manifest.json

$(ext_dir):
	mkdir -p $(ext_dir)/html
	mkdir -p $(ext_dir)/css
	mkdir -p $(ext_dir)/js
	mkdir -p $(ext_dir)/assets
	mkdir -p $(ext_dir)/fonts

$(ext_dir)/html/popup.html: html/popup.html
	sed '/jquery\|bootstrap\|handlebars\|storage.js\|show.js/d' $^ > $@

$(ext_dir)/js/popup.js: $(lib_dir)/$(jquery) $(lib_dir)/$(bstrap) $(lib_dir)/$(hbars) $(src_dir)/storage.min.js $(src_dir)/popup.min.js $(tmplt_dir)/show.min.js
	cat $^ > $@

$(src_dir)/%.min.js: $(src_dir)/%.js
	$(min) $^ $(min_flags) $@

$(tmplt_dir)/%.min.js: $(tmplt_dir)/%.handlebars
	$(tmplt) $(tmplt_flags) $< > $@

$(ext_dir)/manifest.json: manifest.json
	cp $< $@

$(ext_dir)/css/style.css: css/style.css $(lib_dir)/bootstrap/dist/css/bootstrap.min.css
	cat $^ > $@

$(ext_dir)/fonts/glyphicons-halflings-regular.%: lib/bootstrap/dist/fonts/glyphicons-halflings-regular.%
	cp $^ $(ext_dir)/fonts

$(ext_dir)/assets/icon%.png: assets/icon%.png
	cp $^ $(ext_dir)/assets 

.PHONY: templates
templates: $(tmplt_dir)/show.min.js

.PHONY: clean
clean:
	$(RM) -r $(bld_dir) $(src_dir)/*.min.js $(tmplt_dir)/*.js

.PHONY: rebuild
rebuild: clean all

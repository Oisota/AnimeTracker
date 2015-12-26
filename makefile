TMPLT = handlebars
TMPLT_FLAGS = -m
TEMPLATES = js/templates

MIN = uglifyjs
MIN_FLAGS = --screw-ie8 --preamble " " -o

SED = sed
SED_RM = '/script\|link/d'
SED_JS = '/<title>/a <script type="text/javascript" src="../js/popup.js"></script>'
SED_CSS = '/<title>/a <link type="text/css" rel="stylesheet" href="../css/style.css"/>'

BUILD = build
EXT = $(BUILD)/AnimeTracker
SRC = js
LIB = lib
ASSETS = assets

JQUERY = jquery/dist/jquery.min.js
BSTRAP = bootstrap/dist/js/bootstrap.min.js
HBARS = handlebars/handlebars.runtime.min.js
USCORE = underscore/underscore-min.js
BBONE = backbone/backbone-min.js


.PHONY: all
all: $(EXT) $(EXT)/html/popup.html $(EXT)/js/popup.js $(EXT)/css/style.css $(EXT)/fonts/glyphicons-halflings-regular.* $(EXT)/assets/icon*.png $(EXT)/manifest.json

# make directory structure
$(EXT):
	mkdir -p $(EXT)/html
	mkdir -p $(EXT)/css
	mkdir -p $(EXT)/js
	mkdir -p $(EXT)/assets
	mkdir -p $(EXT)/fonts

# remove script and link tags
$(EXT)/html/popup.html: html/popup.html
	cat $^ | $(SED) $(SED_RM) | $(SED) $(SED_JS) | $(SED) $(SED_CSS) > $@

# concatenate all js files
$(EXT)/js/popup.js: $(LIB)/$(JQUERY) $(LIB)/$(BSTRAP) $(LIB)/$(HBARS) $(LIB)/$(USCORE) $(LIB)/$(BBONE) $(SRC)/models.min.js $(SRC)/collections.min.js $(SRC)/views.min.js $(SRC)/util.min.js $(SRC)/popup.min.js $(TEMPLATES)/show.min.js
	cat $^ > $@

# minify js
$(SRC)/%.min.js: $(SRC)/%.js
	$(MIN) $^ $(MIN_FLAGS) $@

# compile templates
$(TEMPLATES)/%.min.js: $(TEMPLATES)/%.handlebars
	$(TMPLT) $(TMPLT_FLAGS) $< > $@

# copy manifest
$(EXT)/manifest.json: manifest.json
	cp $< $@

# concatenate all css files
$(EXT)/css/style.css: css/style.css $(LIB)/bootstrap/dist/css/bootstrap.min.css
	cat $^ > $@

# copy fonts
$(EXT)/fonts/glyphicons-halflings-regular.%: lib/bootstrap/dist/fonts/glyphicons-halflings-regular.%
	cp $^ $(EXT)/fonts

# copy icons
$(EXT)/assets/icon%.png: assets/icon%.png
	cp $^ $(EXT)/assets 

.PHONY: templates
templates: $(TEMPLATES)/show.min.js

.PHONY: clean
clean:
	$(RM) -r $(BUILD) $(SRC)/*.min.js $(TEMPLATES)/*.js

.PHONY: rebuild
rebuild: clean all

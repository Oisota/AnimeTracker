#need to space out libs in popup.js
TMPLT = handlebars
TMPLT_FLAGS = -m

MIN = uglifyjs
MIN_FLAGS = --screw-ie8 --preamble " " -o

SED = sed
SED_RM = '/script\|link/d'
SED_JS = '/<title>/a <script type="text/javascript" src="../js/popup.js"></script>'
SED_CSS = '/<title>/a <link type="text/css" rel="stylesheet" href="../css/style.css"/>'

ZIP = zip
ZIP_FLAGS = -r

BUILD = build
EXT = $(BUILD)/AnimeTracker
EXT_ZIP = $(BUILD)/AnimeTracker.zip
SRC = js
LIB = lib
ASSETS = assets
TEMPLATES = templates

JQUERY = jquery/dist/jquery.min.js
BSTRAP = bootstrap/dist/js/bootstrap.min.js
HBARS = handlebars/handlebars.runtime.min.js
USCORE = underscore/underscore-min.js
BBONE = backbone/backbone-min.js
LIBS = $(LIB)/$(JQUERY) $(LIB)/$(BSTRAP) $(LIB)/$(HBARS) \
	   $(LIB)/$(USCORE) $(LIB)/$(BBONE)

JS_SRCS = $(patsubst $(SRC)/%.js, $(EXT)/$(SRC)/%.min.js, $(wildcard $(SRC)/*.js)) \
		  $(patsubst $(TEMPLATES)/%.handlebars, $(EXT)/$(SRC)/%.min.js, $(wildcard $(TEMPLATES)/*.handlebars))

DEPS = $(EXT) $(EXT)/html/popup.html $(EXT)/js/popup.js $(EXT)/css/style.css \
	   $(EXT)/fonts/glyphicons-halflings-regular.* $(EXT)/assets/icon*.png \
	   $(EXT)/manifest.json $(EXT)/LICENSE.txt $(EXT)/README.markdown

.PHONY: all
all: $(EXT_ZIP)

#create zip file
$(EXT_ZIP): $(DEPS)
	cd $(EXT) && $(ZIP) $(ZIP_FLAGS) ../AnimeTracker.zip ./*

# make directory structure
$(EXT):
	mkdir -p $@/html
	mkdir -p $@/css
	mkdir -p $@/js
	mkdir -p $@/assets
	mkdir -p $@/fonts

# remove script and link tags
$(EXT)/html/popup.html: html/popup.html
	cat $^ | $(SED) $(SED_RM) | $(SED) $(SED_JS) | $(SED) $(SED_CSS) > $@

# concatenate all js files
$(EXT)/$(SRC)/popup.js: $(LIBS) $(JS_SRCS)
	cat $^ > $@
	$(RM) $(JS_SRCS)

# minify js
$(EXT)/$(SRC)/%.min.js: $(SRC)/%.js
	$(MIN) $^ $(MIN_FLAGS) $@

# compile templates
$(SRC)/%.js: $(TEMPLATES)/%.handlebars
	$(TMPLT) $< > $@

# copy files
$(EXT)/%: %
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
templates: $(SRC)/show.js

.PHONY: clean
clean:
	$(RM) -r $(BUILD)

.PHONY: rebuild
rebuild: clean all

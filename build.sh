#!/bin/bash
zip -r AnimeTracker.zip \
    assets/ \
    html/ \
    css/ \
    js/ \
    node_modules/bootstrap/dist/css/bootstrap.min.css \
    node_modules/bootstrap/dist/js/bootstrap.min.js \
    node_modules/jquery/dist/jquery.min.js \
    node_modules/underscore/underscore-min.js \
    node_modules/backbone/backbone-min.js \
    manifest.json \
    LICENSE.txt

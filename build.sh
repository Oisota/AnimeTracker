#!/bin/bash
set -x

ext="AnimeTracker"
dist="dist"
browserify="./node_modules/.bin/browserify"

clean() {
    rm -rf $dist
}

build() {
    mkdir -p $dist
    mkdir -p $dist/$ext
    mkdir -p $dist/$ext/html
    mkdir -p $dist/$ext/css
    mkdir -p $dist/$ext/js
    mkdir -p $dist/$ext/assets
    mkdir -p $dist/$ext/fonts

    $browserify js/*.js -o $dist/$ext/js/bundle.js

    cp html/* $dist/$ext/html/
    cp node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.* $dist/$ext/fonts/
    cp assets/icon*.png $dist/$ext/assets/
    cp manifest.json LICENSE.txt README.markdown $dist/$ext/

    cat node_modules/bootstrap/dist/css/bootstrap.min.css > $dist/$ext/css/bundle.css
    cat css/style.css >> $dist/$ext/css/bundle.css

    cd $dist/$ext
    zip -r ../$ext.zip ./*
}

if [ "$1" == "clean" ]
then
    clean
elif [ "$1" == "rebuild" ]
then
    clean
    rebuild
else
    build
fi

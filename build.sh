#!/bin/bash

mkdir -p build
mkdir -p build/AnimeTracker
mkdir -p build/AnimeTracker/html
mkdir -p build/AnimeTracker/css
mkdir -p build/AnimeTracker/js
mkdir -p build/AnimeTracker/assets
mkdir -p build/AnimeTracker/fonts

./node_modules/.bin/browserify js/*.js -o build/AnimeTracker/js/bundle.js

cp html/* build/AnimeTracker/html/
cp node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.* build/AnimeTracker/fonts/
cp assets/icon*.png build/AnimeTracker/assets/
cp manifest.json LICENSE.txt README.markdown build/AnimeTracker/

cat node_modules/bootstrap/dist/css/bootstrap.min.css > build/AnimeTracker/css/style.css
cat css/style.css >> build/AnimeTracker/css/style.css

cd build/AnimeTracker
zip -r ../AnimeTracker.zip ./*

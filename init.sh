#!/bin/sh

npm install
cd app.doc/
bower install
cd ../js.doc/
bower install
cd ../
./compile-templates.sh
./compile-lodash.sh
./trim-mj.sh

echo ./push-all will push to http://localhost:5984/abc


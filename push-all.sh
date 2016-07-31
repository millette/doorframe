#!/bin/sh

./node_modules/.bin/couchdb-push http://localhost:5984/abc app.doc
./node_modules/.bin/couchdb-push http://localhost:5984/abc cdb.doc
./node_modules/.bin/couchdb-push http://localhost:5984/abc js.doc

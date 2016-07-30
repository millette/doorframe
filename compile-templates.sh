#!/bin/sh

node_modules/.bin/lodash -d -o cdb.doc/views/lib/templates.js moduleId=none settings="{variable: 'data'}" template='templates/*.html' strict exports=node

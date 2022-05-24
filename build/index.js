'use strict';

const fs = require( 'fs' );

const code = fs.readFileSync( 'src/bookmarklet.min.js' ).toString().slice( 1, -1 );
const template = fs.readFileSync( 'src/index.html.template' ).toString();
const output = template.replace( '__BOOKMARKLET__', code );

// eslint-disable-next-line no-script-url
const length = 'javascript:void();'.length + code.length;

console.log( 'URL length: ' + length + ' bytes' );

fs.writeFileSync( 'index.html', output );

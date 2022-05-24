// Create local variables to help the minimiser
( function ( domain, loc, shortenurl ) {
	function shorturlredir() {
		loc.href = domain + 'wiki/Special:UrlShortener?url=' + encodeURIComponent( loc.href );
	}

	try {
		// Rather than check if mw/mw.loader exists, just use a try block (saves bytes)
		mw.loader.using( [ 'oojs-ui-windows', 'mediawiki.widgets', 'mediawiki.ForeignApi' ] ).then( function () {
			( new mw.ForeignApi( domain + 'w/api.php' ) ).post( {
				action: shortenurl,
				url: loc.href
			} ).then( function ( data ) {
				var copyLayout = new mw.widgets.CopyTextLayout( {
					copyText: data[ shortenurl ].shorturl
				} );
				OO.ui.alert( copyLayout.$element );
				// HACK: Wait for setup and ready processes to complete
				setTimeout( copyLayout.button.focus.bind( copyLayout.button ), 500 );
			}, shorturlredir );
		}, shorturlredir );
	} catch ( e ) {
		shorturlredir();
	}
}( 'https://meta.wikimedia.org/', location, 'shortenurl' ) );

( function () {
	// Create local variables to help the minimiser
	var domain = 'https://meta.wikimedia.org/',
		loc = location,
		href = loc.href,
		shortenurl = 'shortenurl';

	function shorturlredir() {
		loc.href = domain + 'wiki/Special:UrlShortener?url=' + encodeURIComponent( href );
	}

	try {
		// Rather than check if mw/mw.loader exists, just use a try block (saves bytes)
		mw.loader.using( [ 'oojs-ui-windows', 'mediawiki.widgets', 'mediawiki.ForeignApi' ] ).then( function () {
			( new mw.ForeignApi( domain + 'w/api.php' ) ).post( {
				action: shortenurl,
				url: href
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

}() );

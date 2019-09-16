( function () {
	function shorturlredir() {
		location.href = 'https://meta.wikimedia.org/wiki/Special:UrlShortener?url=' + encodeURIComponent( location.href );
	}
	if ( window.mw && mw.loader ) {
		mw.loader.using( [ 'oojs-ui-windows', 'mediawiki.widgets', 'mediawiki.ForeignApi' ] ).then( function () {
			( new mw.ForeignApi( 'https://meta.wikimedia.org/w/api.php' ) ).post( {
				action: 'shortenurl',
				url: location.href
			} ).then( function ( data ) {
				var copyLayout = new mw.widgets.CopyTextLayout( {
					copyText: data.shortenurl.shorturl
				} );
				OO.ui.alert( copyLayout.$element );
				// HACK: Wait for setup and ready processes to complete
				setTimeout( function () {
					copyLayout.button.focus();
				}, 500 );
			}, shorturlredir );
		}, shorturlredir );
	} else {
		shorturlredir();
	}
}() );

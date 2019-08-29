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
				OO.ui.alert(
					new mw.widgets.CopyTextLayout( { copyText: data.shortenurl.shorturl } ).$element
				);
			}, shorturlredir );
		}, shorturlredir );
	} else {
		shorturlredir();
	}
}() );

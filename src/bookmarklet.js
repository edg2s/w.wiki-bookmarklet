// Create local variables to help the minimiser
( function ( domain, loc, shortenurl ) {
	function shorturlredir() {
		// Setting a copy of location (`loc`) to the URL string would
		// work in Firefox, but not Chrome.
		loc.href = domain + 'wiki/Special:UrlShortener?url=' + encodeURIComponent( loc );
	}

	try {
		// Rather than check if mw/mw.loader exists, just use a try block (saves bytes)
		mw.loader.using( [ 'oojs-ui-windows', 'mediawiki.widgets', 'mediawiki.ForeignApi' ] ).then( () => {
			const api = new mw.ForeignApi( domain + 'w/api.php' );
			const params = {
				action: shortenurl,
				// eslint-disable-next-line no-implicit-coercion
				url: loc + ''
			};
			Promise.all( [
				api.post( params ),
				api.post( {
					...params,
					qrcode: 1
				} )
			] ).then( ( data ) => {
				const copyLayout = new mw.widgets.CopyTextLayout( {
					copyText: data[ 0 ][ shortenurl ].shorturl
				} );
				const encodedSvg = encodeURIComponent( data[ 1 ][ shortenurl ].qrcode ).replace( /'/g, '%27' ).replace( /"/g, '%22' );
				const dataUrl = `data:image/svg+xml;charset=utf-8,${ encodedSvg }`;
				copyLayout.$element.append(
					$( '<a>' ).css( { textAlign: 'center', display: 'block' } )
						.append(
							$( '<img>' ).attr( 'src', dataUrl )
						)
						.attr( {
							href: dataUrl,
							title: 'Download',
							download: 'QRCode.svg'
						} )
				);
				OO.ui.alert( copyLayout.$element, { size: 'medium' } );
				// HACK: Wait for setup and ready processes to complete
				setTimeout( copyLayout.button.focus.bind( copyLayout.button ), 500 );
			}, shorturlredir );
		}, shorturlredir );
	} catch ( e ) {
		shorturlredir();
	}
}( 'https://meta.wikimedia.org/', location, 'shortenurl' ) );

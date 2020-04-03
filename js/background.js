chrome.browserAction.onClicked.addListener (
	() => {
	    const code_ = 
	    `
	    if ( !document.getElementsByTagName ( "read-mode-btn" )[0] ) 
	    	{
			    if ( location.host.split ( "facebook" ).length > 1 ) 
			    	{
			    		add_reader_mode_btns ();

			    		main();
			    	}
	    	}
	    	else 
	    		{
	    			location.href = location.href;
	    		}
	    `;

	    chrome.tabs.executeScript ( {code: code_} );
	}
);
function add_reader_mode_btns () 
	{
		let post_container = document.querySelectorAll ( '[role="feed"]' )[0];

		let _posts;

		const is_group 	   = location.href.split ( "/groups/" ).length > 1
						   ? true
						   : false; 


		if ( is_group == false ) 
			{
				_posts = post_container 
					   ? post_container.getElementsByClassName ( "userContentWrapper" )
					   : document.getElementsByClassName ( "userContentWrapper" );
			}
			else 
				{
					_posts = document.querySelectorAll ('[role="article"]');
				}

		const available_posts = _posts.length > 0 
							  ? true
							  : false;

		if ( available_posts == true ) 
			{
				for ( let i = 0; i < _posts.length; i++ ) 
					{
						const got_reader_mode_btn = _posts[i] && _posts[i].getElementsByTagName ( "read-mode-btn" ).length > 0
												  ? true
												  : false;

						if ( got_reader_mode_btn == false ) 
							{
								const post_content = _posts[i];

								const post_author  = post_content.querySelectorAll ( "[title]" ).length > 0
												   ? post_content.querySelectorAll ( "[title]" )[0].title
												   : "not available.";

								const post_text    = post_content.querySelectorAll ( '[data-testid="post_message"]' ).length > 0
												   ? post_content.querySelectorAll ( '[data-testid="post_message"]' )[0]
												   : "not available.";

								if ( post_text != "not available." ) 
									{
										const html_component = 
										`
										<read-mode-btn>
											<style type="text/css">
												read-mode-btn {
												    display: flex;
												    top: 0.5%;
												    left: -5.6%;
												    background-image: url('data:image/png;base64,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');
												    background-size: 28px 28px;
												    width: 28px;
												    height: 28px;
												    background-color: #FF5722;
												    position: relative;
												    z-index: 99;
												    box-shadow: -1px 7px 7px 0px grey;
												}
												read-mode-btn:hover {
												    box-shadow: -1px 7px 7px 0px grey;
												}
											</style>
										</read-mode-btn>
										`;

										post_text.parentElement.insertAdjacentHTML ( "afterbegin", html_component );

										const read_mode_btn = post_text.parentElement.getElementsByTagName ( "read-mode-btn" )[0];

										read_mode_btn.addEventListener (
											"click",

											() => 
												{
													open_read_mode ( post_author, post_text );
												}
										);

										post_content.parentNode.setAttribute( "style", "background-color: orange;" ); 
										//console.log ( `\n POST AUTHOR: ${ post_author } \n\n POST TEXT: \n\n ${ post_text }.` );
									}
							}
					}
			}
			else 
				{
					console.log( "NOT AVAILABLE POSTS !" );
				}
	}

function open_read_mode ( author, text ) 
	{
		const injectDiv = document.createElement('div');
		injectDiv.setAttribute("id", "pfReadMode");
		const html_component = injectDiv.attachShadow({mode: 'open'});
		html_component.innerHTML = 
		`
		<read-mode-component>
			<!-- ------------------------------- -->
			<style type="text/css">
				read-mode-component {
				    display: flex;
				    flex-direction: column;
				    justify-content: center;
				    align-items: center;
				    position: fixed;
				    width: 100%;
				    height: 100%;
				    z-index: 9999999;
				}
				background {
				    display: flex;
				    position: absolute;
				    width: 100%;
				    height: 100%;
				    background-color: #000000a8;
				    backdrop-filter: blur(6px);
				}
				exit-read-mode {
				    display: flex;
				    position: absolute;
				    color: white;
				    top: 5%;
				    margin: -3px 0px 0px 2%;
				    font-size: 19px;
				    font-family: helvetica;
				    background-color: black;
				    padding: 5px 10px 5px 10px;
				    border-radius: 30px;
				}

				exit-read-mode:hover {
					filter: drop-shadow(2px 4px 6px black) sepia(1);
				}
				exit-read-mode:active {
					filter: invert(1);
				}

				read-content-container {
				    display: flex;
				    max-width: 87%;
				    flex-direction: column;
				    justify-content: center;
				    align-items: center;
				    position: absolute;
				    background-color: transparent;
				    border-radius: 22px;
				    filter: drop-shadow(5px 5px 5px gray);
				    animation: popup 0.9s ease-in-out 0.2s 1 backwards;
				    max-height: 92%;
				}
				read-context {
				    display: flex;
				    flex-direction: column;
				    overflow-y: scroll;
				    box-shadow: 0px 2px 20px 0px grey;
				    margin: 40px 40px 40px 40px;
				    background-color: rgb(74, 74, 77);
				}
				post-author {
				    display: flex;
				    color: White;
				    // font-family: arial;
				    font-weight: bold;
				    font-size: 3vw;
				    border-bottom: 1px solid white;
				    text-indent: 30px;
				    margin: 18px 0px 22px 0px;
				    line-height: 55px;
				}
				#read-mode post-content   {
				    color: rgba(255, 255, 255, 0.65);
				    display: flex;
				    // font-family: arial;
				    // font-size: 2.5vh;
				    margin: 4% 11% 6% 11%;
				    text-indent: 26px;
				    background-color: rgb(74, 74, 77);
				    padding: 2% 1% 2% 1%;
				    border-radius: 7px;
				    -webkit-font-smoothing: antialiased;
				    font-size: 17px;
				    line-height: 28px;
				    padding-bottom: 60px;
				    /*position: relative;*/
				    letter-spacing: normal;
				}
				br {
					display: block;
   				margin: 18px 0;
   				content: " ";
				}
				#read-mode p {
					font-family: Georgia, serif;
    			letter-spacing: normal;
					-webkit-font-smoothing: antialiased;
			    font-size: 18px;
			    line-height: 28px;
			    padding-bottom: 60px;
			    /*position: relative;*/
			    letter-spacing: normal;
			    color: rgba(255, 255, 255, 0.65);
				}

				._4yxo {
					font-weight: 800;
			    // padding: 10px 0px 15px 0px;
			    // display: block;
				}
				._4yxr {
				    text-decoration: underline;
				}
				._4yxp {
				    font-style: italic;
				}
				div._3dgx {
			    margin: 0;
			    padding: 10px 0px 15px 0px;
			}

			    @keyframes popup {
			        0% {
			            width: 0px;
			            height: 0px; 
			            opacity: 0.35; 
			            filter: blur(20px);         
			        }
			        65% {
			            width: 90%;
			            height: 100%;
			            opacity: 1;         
			        }
			        35% {
			            width: 85%;
			            height: 90%;      
			        }
			    }
			</style>
			<!-- ------------------------------- -->

			<background>
				<exit-read-mode> X </exit-read-mode>
			</background>
			<read-content-container id="read-mode">
				<read-context>
					<post-author>${ author }</post-author>
					<post-content></post-content>
				</read-context>
			</read-content-container>
		</read-mode-component>
		`;

		const shadowRoot = injectDiv.shadowRoot;
		const reader_container = shadowRoot.firstElementChild;
		console.log(shadowRoot);
		console.log(injectDiv);
		const target 			   = document.body;
		const previous_text_parent = text.parentElement; 
		const already_exists 	   = document.getElementById ( "pfReadMode" ) == null > 0
								   ? true
								   : false;
		console.log(already_exists);


		if ( already_exists == false ) 
			{
				target.insertAdjacentElement ( "afterbegin", injectDiv );

				reader_container.getElementsByTagName ( "post-content" )[0].append ( text );

				const exit_btn = reader_container.getElementsByTagName ( "exit-read-mode" )[0];


				exit_btn.parentElement.addEventListener (
					"click",

					() => 
						{
							// const read_mode_component = reader_container.getElementsByTagName ( "read-mode-component" )[0];

							previous_text_parent.append ( text );

							injectDiv.remove ();
						}
				);
			} 
	}

function main () 
	{
		document.addEventListener (
			"scroll",

			add_reader_mode_btns
		);
	}
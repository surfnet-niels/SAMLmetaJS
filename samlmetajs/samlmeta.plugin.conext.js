(function($) {
	var UI = {
		"clearConext": function() {
			$("div#conext > div.content").empty();
		},
		"addConext": function(conext) {
			//var randID = Math.floor(Math.random() * 10000 + 1000);
			/*var conextHTML = '<fieldset><legend>Licensing</legend>' +
					'<div>Please provide us with some information on the licence of the service you wish to connect.'+
					'<br>In The Netherlands, <a href="http://www.surfmarket.nl" target="top">SURFmarket</a> negotiates licences on behalf of all Reseach and Education institutions that are <a target="top" href="http://www.surf.nl/nl/oversurf/instellingen/Pages/Default.aspx">members of SURF</a>.</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket">' +
					'<input type="checkbox" id="SURFInstitution_CampusService" name="SURFInstitution_CampusService" /><label for="SURFInstitution_CampusService">I am a SURF member institution and want to add a service for my own (campus) users</label></div>' +
					'<input type="checkbox" id="SURFInstitution_CollaborationService" name="SURFInstitution_CollaborationService" /><label for="SURFInstitution_CollaborationService">I am a SURF member institution and want to add a service to share for my own and other users</label></div>' +
					'<input type="checkbox" id="CommertialSP" name="CommertialSP" /><label for="CommertialSP">Commertial Service Provider</label></div>' +
					'<input type="checkbox" id="Other" name="Other" /><label for="Other">Other, please describe what you want a part of the service description below.</label></div>' +
					'</fieldset>';
			conextHTML += '<fieldset><legend>Previous Install</legend>' +
					'<div>Is there any experience with setting up and maintaining a SAML2 based service provider?</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket"><input type="checkbox" id="previousInstall" name="previousInstall" />' +
					'<label for="previousInstall">Yes, I or my organisation has previously installed and/or maintains a SAML2 based Service Provider</label></div>' +					
					'</fieldset>';
			conextHTML += '<fieldset><legend>Purpose of the Service</legend>' +
					'<div>Please describe the purpose of the service</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket"><textarea name="purpose" id="purpose" style="width: 100%"></textarea>' +
					'</fieldset>';
			conextHTML += '<fieldset><legend>Current or Launching Customers</legend>' +
					'<div>Do you have any current or launching customers for your service? If so, please list these below</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket"><textarea name="customersList" id="customersList" style="width: 100%"></textarea>' +
					'</div>' +					
					'</fieldset>';
			*/

			$(conextHTML).appendTo("div#conext > div.content").find('button.remove').click( function(e) {
				e.preventDefault();
				$(e.target).closest('fieldset').remove();
			});
		}
	};

	SAMLmetaJS.plugins.conext = {
		tabClick: function (handler) {
			handler($("a[href='#conext']"));
		},

		addTab: function (pluginTabs) {
			pluginTabs.list.push('<li><a href="#conext">Conext</a></li>');
			pluginTabs.content.push(
				'<div id="conext">' +
					'<div class="content"></div>' +
				'</div>'
			);
		},

		setUp: function () {
			var conextHTML ="";
			
			// Contracts and Licesing
			conextHTML += '<fieldset><legend>Contract & Licensing</legend>' +
					'<div><p>Any connection to the SURFconext platform is subject to a <a href="http://www.surfconext.nl/contractexample.html">SURFconext contract</a>, stating security, data protection and privacy regulations.' +
					'<p>Institutions that are <a target="top" href="http://www.surf.nl/nl/oversurf/instellingen/Pages/Default.aspx">members of SURF</a> can connect (non-commercial) Services for their own users, as well as share services with other institutions. Connecting these services requires no additional contracts if your institution is already acting as an Identity Provider.</br>'+
					'<p>Commercial Service require a licence agreement in addition to the SURFconext contract. Service providers will have to contact <a href="mailto:services@surfconext.nl">the Services team of SURFmarket</a> first.' +
					'In The Netherlands, <a href="http://www.surfmarket.nl" target="top">SURFmarket</a> negotiates licences on behalf of all Reseach and Education institutions that are <a target="top" href="http://www.surf.nl/nl/oversurf/instellingen/Pages/Default.aspx">members of SURF</a>.</p></div>' +
					'<div>Please provide us with some information on the contract and licence regime you wish use:</div>'+					
					'<div style="float: left; width: 70%" title="SURFmarket">' +
					'<input type="checkbox" id="SURFInstitution_CampusService" name="SURFInstitution_CampusService" /><label for="SURFInstitution_CampusService">I am a SURF member institution and want to add a service for my own (campus) users</label></br>' +
					'<input type="checkbox" id="SURFInstitution_CollaborationService" name="SURFInstitution_CollaborationService" /><label for="SURFInstitution_CollaborationService">I am a SURF member institution and want to add a service to share for my own and other institutions users</label></br>' +
					'<input type="checkbox" id="CommertialSP" name="CommertialSP" /><label for="CommertialSP">Commertial Service Provider</label></br>' +
					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <label for="SURFmarketContact">My contact at SURFmarket: </label><input type="text" name="SURFmarketContact" id="SURFmarketContact" value="" /></br>' +
  					'<input type="checkbox" id="Other" name="Other" /><label for="Other">Other, please describe what you want a part of the service description below.</label></br>' +
					'</fieldset>';
			
			// Propose		
			conextHTML += '<fieldset><legend>Purpose of the Service</legend>' +
					'<div><p>Providing the propose of the service helps us determine the feasability of connecting your service to SURFconext. In addition we will use the description of the service to weigh the release of attributes (user characteristics) you may request.</p>'+
					'Please describe the purpose of the service</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket"><textarea name="purpose" id="purpose" style="width: 100%"></textarea>' +
					'</fieldset>';					
					
			// Prevoius Install
			conextHTML += '<fieldset><legend>Previous Install</legend>' +
					'<div><p>An indication of level of expertise you or your organization has with setting up an SAML based service provider helps us better estimate the amount of support you may require.</p>' + 
					'Is there any experience with setting up and maintaining a SAML2 based service provider?</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket">' +
					'<input type="checkbox" id="previousInstall" name="previousInstall" />' +
					'<label for="previousInstall">Yes, I or my organisation has previously installed and/or maintains a SAML2 based Service Provider</label>' +					
					'</br>' +					
					'<input type="checkbox" id="previousInstall" name="previousInstall" />' +
					'<label for="previousInstall">No, I/We are new to this whole SAML2 based Service Provider thing</label>' +					
					'</fieldset>';

			// Current or Launching Customers
			conextHTML += '<fieldset><legend>Current or Launching Customers</legend>' +
					'<div><p>Indicating current or launching customers among the SURF member institutions helps us determine which institutions we may need to contact to help you get set up..</p>'+					
					'Do you have any current or launching customers for your service? If so, please list these below</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket"><textarea name="customersList" id="customersList" style="width: 100%"></textarea>' +
					'</div>' +					
					'</fieldset>';
			
			// Test or Production		
			conextHTML += '<fieldset><legend>Test or Production</legend>' +
					'<div><p>A production connection to the platform can only be realised after a succesful test connection has been made. '+
					'For testing porposes, SURFnet offers a <a href="">Do-It-Yourself Platform</a> that allows you to test your technical setup in a fashion very similar to a production connection</br>' + 
					'Please note that a production connection cannot be established without a signed SURFconext contract and optionally a license agreement</p>' +
					'Are you requesting a Test or a Production connection?</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket">' +
					'<input type="checkbox" id="connection_is_test" name="connection_is_test" />' +
					'<label for="connection_is_test">I want to make a test connection</label>' +					
					'</br>' +					
					'<input type="checkbox" id="connection_is_prod" name="connection_is_prod" />' +
					'<label for="connection_is_prod">I want to make a prodcution connection</label>' +					
					'</fieldset>';	
					
			// Deadlines			
			conextHTML += '<fieldset><legend>Planning & Deadlines</legend>' +
					'<div><p>As soon as <a href="">technical</a> and <a href="">contractual</a> requiments are met, SURFnet will need between 3 to 5 days to operationalize the connection.</br>'+
					'For managing expectations and our planning, please provide us with information when you would like to have the connection you are currently requesting operational.</p>'+ 					
					'When do you want your service to be connected?</div>' +
					'<div style="float: left; width: 70%" title="Deadline"><textarea name="Deadline" id="Deadline" style="width: 100%"></textarea>' +
					'</div>' +					
					'</fieldset>';						

			$(conextHTML).appendTo("div#conext > div.content");
/*
			$("div#conext button.addConext").click(function(e) {
				e.preventDefault();

				UI.addConext({});
			});
*/
		},

		fromXML: function () {
			// Nothing to Do
		},

		toXML: function () {
			// Nothing to Do
		},
		
		validate: function () {
			return true;
		}
	};

}(jQuery));

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
		},
        "toTextarea": function(entitydescriptor) {
            console.log("toTextarea");

            $(entitydescriptor.conextData).each(function (index, element) {
                console.log($(element));

                /*cArr = new Array();
                cArr["contract"] = new Array();
                $(element).find('input:checked').each(function(index2, element2) {
                    cArr["contract"].push($(element2).attr('name'));
                });
                newConextData.push(cArr);*/
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
				'<div id="conext" class="tabContent">' +
					'<div class="content"></div>' +
				'</div>'
			);
		},

		setUp: function () {
			var conextHTML ="";
			
			// Contracts and Licencing
			conextHTML += '<fieldset id="contract"><legend>Contract & Licencing</legend>' +
					'<div><p>Any connection to the SURFconext platform is subject to a <a href="http://www.surfconext.nl/contractexample.html">SURFconext contract</a>, stating security, data protection and privacy regulations.' +
					'<p><ul><li>Institutions that are <a target="top" href="http://www.surf.nl/nl/oversurf/instellingen/Pages/Default.aspx">members of SURFnet</a> can connect (non-commercial) Services for their own users, and/or share services with other institutions. Connecting these services requires no additional contracts if your institution is already acting as an Identity Provider.</li>'+
					'<li>Commercial Services require a license agreement in addition to the SURFconext contract. Service providers will have to contact the Services team of SURFmarket first. '+
                    'In The Netherlands, <a href="http://www.surfmarket.nl" target="top">SURFmarket</a> negotiates licences on behalf of all Reseach and Education institutions that are <a target="top" href="http://www.surf.nl/nl/oversurf/instellingen/Pages/Default.aspx">members of SURF</a>.</li></ul></p></div>' +
					'<div>Please provide us with some information on the contract and licence regime you wish use:</div>'+					
					'<div style="float: left; width: 70%" title="SURFmarket">' +
					'<input type="checkbox" id="SURFInstitution_CampusService" name="SURFInstitution_CampusService" /><label for="SURFInstitution_CampusService">I am a SURFnet member institution and want to add a service for my own (campus) users</label></br>' +
					'<input type="checkbox" id="SURFInstitution_CollaborationService" name="SURFInstitution_CollaborationService" /><label for="SURFInstitution_CollaborationService">I am a SURFnet member institution and want to add a service to share for my own and other institutions users</label></br>' +
					'<input type="checkbox" id="CommercialSP" name="CommercialSP" /><label for="CommercialSP">Commercial Service Provider</label></br>' +
  					'<input type="checkbox" id="Other" name="Other" /><label for="Other">Other, please describe what you want a part of the service description below.</label></br>' +
					'</fieldset>';
			
			// Propose		
			conextHTML += '<fieldset id="purpose"><legend>Purpose of the Service</legend>' +
					'<div><p>Providing the propose of the service helps us determine the feasibility of connecting your service to SURFconext. In addition we will use the description of the service to weigh the release of attributes (user characteristics) you request.</p>'+
					'Please describe the purpose of the service</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket"><textarea name="purpose" id="purpose" style="width: 100%"></textarea>' +
					'</fieldset>';					
					
			// Previous Install
			conextHTML += '<fieldset id="experience"><legend>Previous Install</legend>' +
					'<div><p>An indication of level of expertise you have with setting up an SAML based service provider helps us to better estimate the amount of support you may require.</p>' +
					'Is there any experience with setting up and maintaining a SAML2 based service provider?</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket">' +
					'<input type="checkbox" id="yes" name="yes" />' +
					'<label for="yes_previous_install">Yes, I have previously installed or maintain a SAML2 based Service Provider</label>' +
					'</br>' +					
					'<input type="checkbox" id="no" name="no" />' +
					'<label for="no_previous_install">No experience with SAML2 SP software</label>' +
					'</fieldset>';

			// Current or Launching Customers
			conextHTML += '<fieldset id="customers"><legend>Current or Launching Customers</legend>' +
					'<div><p>Indicating current or launching customers among the SURF member institutions helps us determine which institutions we may need to contact to help you get set up..</p>'+					
					'Do you have any current or launching customers for your service? If so, please list these below</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket"><textarea name="customers" id="customers" style="width: 100%"></textarea>' +
					'</div>' +					
					'</fieldset>';
			
			// Test or Production		
			conextHTML += '<fieldset id="state"><legend>Test or Production</legend>' +
					'<div><p>A production connection to the platform can only be realized after a successful test connection has been made. '+
					'For testing proposes, SURFnet offers a <a href="">Do-It-Yourself Platform</a> that allows you to test your technical setup in a fashion very similar to a production connection</br>' +
					'Please note that a production connection cannot be established without a signed SURFconext contract and optionally a license agreement</p>' +
					'Are you requesting a Test or a Production connection?</div>' +
					'<div style="float: left; width: 70%" title="SURFmarket">' +
					'<input type="checkbox" id="test" name="test" />' +
					'<label for="connection_is_test">I want to make a test connection</label>' +					
					'</br>' +					
					'<input type="checkbox" id="prod" name="prod" />' +
					'<label for="connection_is_prod">I want to make a production connection</label>' +
					'</fieldset>';	
					
			// Deadlines			
			conextHTML += '<fieldset id="planning"><legend>Planning & Deadlines</legend>' +
					'<div><p>As soon as <a href="">technical</a> and <a href="">contractual</a> requirements are met, SURFnet will need between 3 to 5 days to operationalize the connection.</br>'+
					'For managing expectations and our planning, please provide us with information when you would like to have the connection you are currently requesting operational.</p>'+ 					
					'When do you want your service to be connected?</div>' +
					'<div style="float: left; width: 70%" title="Deadline"><textarea name="planning" id="planning" style="width: 100%"></textarea>' +
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

            console.log("Conext fromXML");
		},

		toXML: function () {
			// Nothing to Do

            console.log("Conext toXML");
            //console.log(entitydescriptor);

            var newConextData = new Array();
            if (!entitydescriptor.conextData) {
                entitydescriptor.conextData = new Array();
            }

            /* Available Fieldsets
             contract
             purpose
             experience
             customers
             state
             planning
             */

            // contract
            $('div#conext fieldset#contract').each(function (index, element) {
                cArr = new Array();
                $(element).find('input:checked').each(function(index2, element2) {
                	cArr.push($(element2).attr('name'));
                });
                newConextData["contract"] = cArr;
            });
        
            // purpose
            $('div#conext fieldset#purpose').each(function (index, element) {
                //pArr = new Array();
                //pArr["purpose"] = $(element).find('textarea#purpose').eq(0).attr('value');
                newConextData["purpose"] = $(element).find('textarea#purpose').eq(0).attr('value');
            });

            // experience
            $('div#conext fieldset#experience').each(function (index, element) {
                eArr = new Array();
                $(element).find('input:checked').each(function(index2, element2) {
                    eArr.push($(element2).attr('name'));
                });
                newConextData["experience"] = eArr;
            });

            // customers
            $('div#conext fieldset#customers').each(function (index, element) {
                newConextData["customers"] = $(element).find('textarea#customers').eq(0).attr('value');
            });

            // state
            $('div#conext fieldset#state').each(function (index, element) {
                sArr = new Array();
                $(element).find('input:checked').each(function(index2, element2) {
                    sArr.push($(element2).attr('name'));
                });
                newConextData["state"] = sArr;
            });

            // planning
            $('div#conext fieldset#planning').each(function (index, element) {
            	newConextData["planning"] = $(element).find('textarea#planning').eq(0).attr('value');
            });

            console.log(newConextData);
            
            //entitydescriptor.conextData.push(newConextData);

            //console.log($("#conextdata"));
 //           $("#conextdata")[0].attr('value')="test123";

           // var conexttextarea = document.getElementById("conextdata");
                        
            //textarea.value = newConextData.join("\n");

            //console.log($("#conextdata"));
		},
		
		validate: function () {

            console.log("Conext validate function");

			return true;
		}
	};

}(jQuery));

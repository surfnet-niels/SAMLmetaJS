// To add this plugin to your form, add it to the index.html js calls.

(function($) {
	var UI = {
		"clearMetadata": function() {
			$("div#metadata > div.content").empty();
		},
		"addMetadata": function(template) {
			// This function can be used to add content to the page if a button is pressed.
			var metadataHTML = '<form action="?" method="post"><textarea name="metadata" id="metadata" style="width: 100%"></textarea></form>' +
			'<div>' +
			'<button class="prettify">Pretty format</button>' +
			'<button class="wipe">Wipe</button>' +
			'</div>';

			// Add the templateHTML to the content div 
			$(metadataHTML).appendTo("div#metadata > div.content").find('button.remove').click( function(e) {
				e.preventDefault();
				$(e.target).closest('fieldset').remove();
			});
			
			// Adding handlers to the other buttons.
			$("div#metadata button.prettify").click(function(e) {
				e.preventDefault();
				$(node).val(SAMLmetaJS.XML.prettifyXML($(node).val()));
			});
			$("div#metadata button.wipe").click(function(e) {
				e.preventDefault();
				$(node).val('');
			});	
			
			
		}
	};

// Funtions in the metadata plugin
	SAMLmetaJS.plugins.metadata = {
		// What should happen if the tab is clicked? 	
		tabClick: function (handler) {
			//console.log("Calling tabClick function of metadata plugin");
			
			handler($("a[href='#metadata']"));
		},

		// This function is called when the tab is created
		addTab: function (pluginTabs) {
			//console.log("Calling addTab function of metadata plugin");
			
			pluginTabs.list.push('<li><a href="#metadata">Metadata</a></li>');

			pluginTabs.content.push(
				'<div id="metadata">' +
					'<div>' +
                    '<button class="prettify">Pretty format</button>' +
                    '<button class="wipe">Wipe</button>' +
                    '</div>' +
				'</div>'
			);

            // Adding handlers to the other buttons.
            $("div#metadata button.prettify").click(function(e) {
                e.preventDefault();
                $(node).val(SAMLmetaJS.XML.prettifyXML($(node).val()));
            });
            $("div#metadata button.wipe").click(function(e) {
                e.preventDefault();
                $(node).val('');
            });
        },

		// This funtion is called to create the initial content of a tab
		setUp: function () {
			//console.log("Calling Setup function of metadata plugin");
			
			var metadataHTML = "";
			
			metadataHTML += '<fieldset><legend>Metadata</legend>' +
					'<div><p>A template info text</p>' +
					'<form action="?" method="post"><textarea name="metadata" id="metadata" style="width: 100%"></textarea></form>' +
					'<div>' +
					'<button class="prettify">Pretty format</button>' +
					'<button class="wipe">Wipe</button></br>' +
					'</div></fieldset>';	
					

			$(metadataHTML).appendTo("div#metadata > div.content");

			$("div#conext button.addMetadata").click(function(e) {
				e.preventDefault();

				UI.addConext({});
			});


			//console.log("Calling Setup function of metadata plugin DONE");

		},

		fromXML: function () {
			// This function is called whenever a tab is being accessed. It should fill content element based on XML metadata
			//console.log("Calling fromXML function of metadata plugin");
		},

		toXML: function () {
			// This function is called whenever a tab is left accessed(if another tab is selected). 
			// It should use content elements to create XML metadata, likely after validation
			//console.log("Calling toXML function of metadata plugin");
		},
		
		validate: function () {
			// Validat the contents of this tab
			//console.log("Calling validate function of template plugin");
						
			return true;
		}
		
	
		
		
	};

}(jQuery));

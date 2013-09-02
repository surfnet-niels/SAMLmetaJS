<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>SAMLmetaJS Demo</title>
	<meta name="author" content="Niels van Dijk" >

	<!-- Include Google maps to use with SAMLmetaJS locaiton plugin -->
	<!--<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>-->

	<!-- JQuery + JQuery UI -->
	<script type="text/javascript" src="jquery/js/jquery-1.5.1.min.js"></script>
	<script type="text/javascript" src="jquery/js/jquery-ui-1.8.14.custom.min.js"></script>
	<link rel="stylesheet" media="screen" type="text/css" href="jquery/css/smoothness/jquery-ui-1.8.14.custom.css" />

	<!-- SAMLmetaJS -->
	<script type="text/javascript" src="samlmetajs/samlmeta.js"></script>

	<script type="text/javascript" src="samlmetajs/samlmeta.plugin.conext.js"></script>
	<script type="text/javascript" src="samlmetajs/samlmeta.plugin.org.js"></script>
	<script type="text/javascript" src="samlmetajs/samlmeta.plugin.contact.js"></script>
	<script type="text/javascript" src="samlmetajs/samlmeta.plugin.info.js"></script>
	<script type="text/javascript" src="samlmetajs/samlmeta.plugin.saml2sp.js"></script>
	<!-- <script type="text/javascript" src="samlmetajs/samlmeta.plugin.location.js"></script> -->
	<script type="text/javascript" src="samlmetajs/samlmeta.plugin.certs.js"></script>
	<script type="text/javascript" src="samlmetajs/samlmeta.plugin.attributes.js"></script>

    <script type="text/javascript" src="samlmetajs/samlmeta.plugin.metadata.js"></script>

	<!-- <script type="text/javascript" src="samlmetajs/samlmeta.plugin.fedlab.js"></script> -->
    <!-- <script type="text/javascript" src="samlmetajs/samlmeta.plugin.template.js"></script> -->

    <!-- XML processing helper classes-->
    <script type="text/javascript" src="samlmetajs/samlmeta.xml.js"></script>
    <script type="text/javascript" src="samlmetajs/mdreader.js"></script>




	<!-- 
		You are reccomended to select which plugins you would like to use, and then use the download package
		minifier at 
			
			http://samlmetajs.simplesamlphp.org/download
		
		You will then end up with a single file to include instead of the list of files shown above. This will be much more effective 
		for the user. You would need to include the file like this:
		
		<script type="text/javascript" src="SAMLmetaJS/samlmeta.info-organization-contact-certs-saml2sp-attributes.min.js"></script> 
	-->

	<link type="text/css" href="samlmetajs/css/samlmetajs.css" rel="Stylesheet" />
	
	<script type="text/javascript">
	    $(document).ready(function(){
			var options = {
				// 'ruleset': {
				// 	'noentityname': 2,
				// 	'noentitydescr': 2,
				// 	'noorganization': 2,
				// 	'nocontacts': 2
				//	},
				'showValidation': true,
				'showValidationLevel': {
					'info': false,
					'ok': true,
					'warning': true,
					'error': true
				}
			};
	        $("textarea#metadata").SAMLmetaJS(options);

            $( document ).tooltip();
	        
	
	    });
	</script>

</head>

<body>
	
	<p>
		For more information of how to use SAMLmetaJS properly, visit the <a href="http://samlmetajs.simplesamlphp.org/docs">SAMLmetaJS documentation</a>.
	</p>
	
	<h1>Demo of SAMLmetaJS</h1>
	<form action="https://support.surfconext.nl/spform/processSPform.php" method="post" name=samlmetajsform>
		<textarea name="metadata" id="metadata" style="width: 80%; height: 500px"></textarea>
		<textarea name="conextdata" id="conextdata" style="display: none;" ></textarea>
	</form>
</body>
</html>
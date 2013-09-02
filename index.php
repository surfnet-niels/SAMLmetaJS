<?php
require_once('../../simplesamlphp/lib/_autoload.php');

$as = new SimpleSAML_Auth_Simple('default-sp');
$as->requireAuth();

?>


<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>SURFconext Service Provider Registration</title>
	<meta name="author" content="Niels van Dijk" >

<?php

    $attributes = $as->getAttributes();
    //var_dump($attributes["urn:mace:dir:attribute-def:displayName"][0]);

    $displayName = $attributes["urn:mace:dir:attribute-def:displayName"][0];
    $mail = $attributes["urn:mace:dir:attribute-def:mail"][0];


?>


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

    <h1>SURFconext Service Provider Registration</h1>
    <p>
    Hello <?php echo $displayName; ?>, welcome to the SURFconext Service Provider Registration form.<br>
    For the purpose of this registration we will use the following email address: <b><?php echo  $mail; ?></b>
    <br>You may provide a 'formal' contact endpoint via this form.
    <p>

    <h2>Purpose</h2>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus non orci a convallis. Maecenas non tortor vitae odio volutpat blandit. Pellentesque volutpat cursus risus in sollicitudin. Praesent nec nisl eget enim tempus gravida. Phasellus in luctus libero, eget sollicitudin purus. Maecenas id velit dolor. Sed vel erat convallis, tempus urna sit amet, mattis velit.
    </p>

    <h2>Using this form</h2>
    <p>
        If you already have a SAML2 metadata file, you ban open the last tab of the below form ("metadata") and past it in, the form will automagically process your data and detect ny missing information after you refresh the page (press F5). For more information see the Service provider registration wiki page.
    </p>
	
	<form action="https://support.surfconext.nl/spform/processSPform.php" method="post" name=samlmetajsform>
		<textarea name="metadata" id="metadata" style="width: 80%; height: 500px"></textarea>
		<textarea name="conextdata" id="conextdata" style="display: none;" ></textarea>
	</form>
</body>
</html>
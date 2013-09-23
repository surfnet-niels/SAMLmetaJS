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

    <h2>SURFconext Service Provider Registration</h2>
    <p>
    Hello <?php echo $displayName; ?>, <br>
    Welcome to the SURFconext Service Provider Registration form.<br>
    For the purpose of this registration we will use the following email address: <b><?php echo  $mail; ?></b>
    <br>You may provide 'formal' contact endpoint(s) for you service via this form.
    <p>

    <h3>Purpose</h3>
    <p>
        When you want to use SURFconext for the SAML2 based authentication to your service, some organisational and technical information needs to be exchanged. The way this is done is through the exchange of a SAML2 metadata. This form helps you to provide SURFconext with correct and complete metadata. This will ensure the connection process is as efficient as it can be.
    </p>

    <h3>Using this form</h3>
    <p>
        Most SAML2 SP software will generate SAML2 metadata for you. Unfortunately, the SAML2 metadata standards allows many options and very few are mandatory. SURFconext expects some optional elements to be present (like organisational information) and doen't allow some others.
        <br>
        This form's primairy focus is on checking your generated SAML2 metadata for SURFconext compatibility. You can open the last tab of the below
        form ("metadata") and past the metadata XML into it. The form will automatically process your data and detect any missing information after you refresh the page. Update all the missing information and refresh again. If there are no more warnings then the metadata is ready to send to the SURFconext administrators. This can be done by going to the
        "metadata" tab, scrolling to the bottom and pressing the "send" button.
        <br>
        If you do not have a SAML2 metadata file, you can generate it manually here. You need go through all the tabs and enter the missing information
        and send it in. This method is not advisable as you need to have a good understanding of SAML2 to enter the technical information correctly.
        <br>
        Note that this form cannot be saved while working on it. If you leave the SP form page your work will be lost. This means that it is advisable
        to first collect all the necessary information before completing and sending it.
        <br>
        For more information see the <a href="https://wiki.surfnetlabs.nl/display/surfconextdev/Documentation+for+Service+Providers">SURFconext service provider wiki page</a>.
    </p>
	
	<form action="https://support.surfconext.nl/spform/processSPform.php" method="post" name=samlmetajsform>
		<textarea name="metadata" id="metadata" style="width: 80%; height: 500px"></textarea>
		<textarea name="conextdata" id="conextdata" style="display: none;" ></textarea>
	</form>
</body>
</html>
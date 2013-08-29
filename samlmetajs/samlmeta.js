/*jslint rhino: true, browser: true, onevar: false */
if (typeof console === "undefined" || typeof console.log === "undefined") {var console = { log: function() {} }}

// Hack to initiatlize a DOMParser in browser that do not support this natively.
// Hack found here:
//	https://sites.google.com/a/van-steenbeek.net/archive/explorer_domparser_parsefromstring
//
if(typeof(DOMParser) === 'undefined') {
	DOMParser = function() {};
	DOMParser.prototype.parseFromString = function(str, contentType) {
		var xmldata = null;

		if (typeof(ActiveXObject) !== 'undefined') {
			xmldata = new ActiveXObject('MSXML.DomDocument');

			xmldata.async = false;
			xmldata.loadXML(str);
			return xmldata;

		} else if(typeof(XMLHttpRequest) !== 'undefined') {
			xmldata = new XMLHttpRequest();
			if(!contentType) {
				contentType = 'application/xml';
			}

			xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);
			if(xmldata.overrideMimeType) {
				xmldata.overrideMimeType(contentType);
			}

			xmldata.send(null);
			return xmldata.responseXML;
		}
	};
}

var SAMLmetaJS = {};

(function($) {

	SAMLmetaJS.plugins = {};

	SAMLmetaJS.pluginEngine = {
		execute: function(hook, parameters) {
			var plugin;
			if (!SAMLmetaJS.plugins) {
				return;
			}
			for (plugin in SAMLmetaJS.plugins) {
				SAMLmetaJS.pluginEngine.executeOne(plugin, hook, parameters);
			}
		},
		executeOne: function (plugin, hook, parameters) {
			if (!SAMLmetaJS.plugins) { 
				return;
			}
			if (SAMLmetaJS.plugins[plugin] && SAMLmetaJS.plugins[plugin][hook]) {
				console.log('Executing hook [' + hook + '] in plugin [' + plugin + ']');
				return SAMLmetaJS.plugins[plugin][hook].apply(null, parameters);
			}
		}
	};


	SAMLmetaJS.Constants = {
		'ns' : {
			'md': "urn:oasis:names:tc:SAML:2.0:metadata",
			'mdui': "urn:oasis:names:tc:SAML:metadata:ui",
			'mdattr': "urn:oasis:names:tc:SAML:metadata:attribute",
			'saml': "urn:oasis:names:tc:SAML:2.0:assertion",
			'init': "urn:oasis:names:tc:SAML:profiles:SSO:request-init",
			'idpdisc': "urn:oasis:names:tc:SAML:profiles:SSO:idp-discovery-protocol",
			'xsd': "http://www.w3.org/2001/XMLSchema",
			'ds': "http://www.w3.org/2000/09/xmldsig#",
			'xenc': "http://www.w3.org/2001/04/xmlenc#"
		},
		'certusage': {
			'both': 'Both',
			'signing': 'Signing',
			'encryption': 'Encryption'
		},
		'algorithms': {
			'http://www.w3.org/2001/04/xmlenc#tripledes-cbc': 'TRIPLEDES',
			'http://www.w3.org/2001/04/xmlenc#aes128-cbc': 'AES-128',
			'http://www.w3.org/2001/04/xmlenc#aes256-cbc': 'AES-256',
			'http://www.w3.org/2001/04/xmlenc#aes192-cbc': 'AES-192',
			'http://www.w3.org/2001/04/xmlenc#rsa-1_5': 'RSA-v1.5',
			'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p': 'RSA-OAEP',
			'http://www.w3.org/2001/04/xmlenc#dh': 'Diffie-Hellman',
			'http://www.w3.org/2001/04/xmlenc#kw-tripledes': 'TRIPLEDES KeyWrap',
			'http://www.w3.org/2001/04/xmlenc#kw-aes128': 'AES-128 KeyWrap',
			'http://www.w3.org/2001/04/xmlenc#kw-aes256': 'AES-256 KeyWrap',
			'http://www.w3.org/2001/04/xmlenc#kw-aes192': 'AES-192 KeyWrap',
			'http://www.w3.org/2000/09/xmldsig#sha1': 'SHA1',
			'http://www.w3.org/2001/04/xmlenc#sha256': 'SHA256',
			'http://www.w3.org/2001/04/xmlenc#sha512': 'SHA512',
			'http://www.w3.org/2001/04/xmlenc#ripemd160': 'RIPEMD-160',
			'http://www.w3.org/2000/09/xmldsig#': 'XML Digital Signature',
			'http://www.w3.org/TR/2001/REC-xml-c14n-20010315': 'Canonical XML (omits comments)',
			'http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments': 'Canonical XML with Comments',
			'http://www.w3.org/2001/10/xml-exc-c14n#': 'Exclusive XML Canonicalization (omits comments)',
			'http://www.w3.org/2001/10/xml-exc-c14n#WithComments': 'Exclusive XML Canonicalization with Comments',
			'http://www.w3.org/2000/09/xmldsig#base64': 'base64'
		},
		'languages': {
			'en': 'English',
			/*'no': 'Norwegian (bokmål)',
			'nn': 'Norwegian (nynorsk)',
			'se': 'Sámegiella',
			'da': 'Danish',
			'de': 'German',
			'sv': 'Swedish',
			'fi': 'Finnish',
			'es': 'Español',
			'fr': 'Français',
			'it': 'Italian',*/
			'nl': 'Nederlands',
			/*'lb': 'Luxembourgish',
			'cs': 'Czech',
			'sl': 'Slovenščina',
			'lt': 'Lietuvių kalba',
			'hr': 'Hrvatski',
			'hu': 'Magyar',
			'pl': 'Język polski',
			'pt': 'Português',
			'pt-BR': 'Português brasileiro',
			'tr': 'Türkçe',
			'el': 'ελληνικά',
			'ja': 'Japanese (日本語)'*/
		},
		'contactTypes' : {
			'administrative' : 'Administrative',
			'technical': 'Technical',
			'support': 'Support',
			'billing': 'Billing',
			//'other': 'Other'
		},
		'endpointTypes' : {
			'sp': {
				'ArtifactResolutionService': 'ArtifactResolutionService',
				'AssertionConsumerService': 'AssertionConsumerService',
				'ManageNameIDService': 'ManageNameIDService',
				'SingleLogoutService': 'SingleLogoutService',
				// Extensions defined at Service Provider Request Initiation Protocol and Profile Version 1.0
				'RequestInitiator': 'RequestInitiator',
				'DiscoveryResponse': 'DiscoveryResponse'
			},
			'idp' : {
				'ArtifactResolutionService': 'ArtifactResolutionService',
				'AssertionIDRequestService': 'AssertionIDRequestService',
				'ManageNameIDService': 'ManageNameIDService',
				'NameIDMappingService': 'NameIDMappingService',
				'SingleLogoutService': 'SingleLogoutService',
				'SingleSignOnService': 'SingleSignOnService'
			}
		},
		'bindings': {
			'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect': 'HTTP Redirect',
			'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST': 'HTTP POST',
			'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact': 'HTTP Artifact',
			'urn:oasis:names:tc:SAML:2.0:bindings:SOAP': 'SOAP',
			'urn:oasis:names:tc:SAML:2.0:bindings:PAOS': 'Reverse SOAP (PAOS)',
			'urn:oasis:names:tc:SAML:profiles:SSO:request-init': 'Request Initiator',
			'urn:oasis:names:tc:SAML:profiles:SSO:idp-discovery-protocol': 'Discovery Response'
		},
		'attributes' : {
			'urn:oid:0.9.2342.19200300.100.1.1': '<b>UID</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:0.9.2342.19200300.100.1.1)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:uid)<br>&nbsp;',
			'urn:oid:0.9.2342.19200300.100.1.3': '<b>Mail</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:0.9.2342.19200300.100.1.3)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:mail)<br>&nbsp;',
			'urn:oid:2.16.840.1.113730.3.1.241': '<b>Display Name</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:2.16.840.1.113730.3.1.241)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:displayName)<br>&nbsp;',
			'urn:oid:2.5.4.3': '<b>Common Name</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:2.5.4.3)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:cn)<br>&nbsp;',
			'urn:oid:2.5.4.4': '<b>Surname</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:2.5.4.4)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:sn)<br>&nbsp;',
			'urn:oid:2.5.4.42': '<b>Given Name</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:2.5.4.42)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:givenName)<br>&nbsp;',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.1': '<b>eduPersonAffiliation</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:1.3.6.1.4.1.5923.1.1.1.1)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:eduPersonAffiliation)<br>&nbsp;',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.10': '<b>eduPersonTargetedID</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:1.3.6.1.4.1.5923.1.1.1.10)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:eduPersonTargetedID)<br>&nbsp;',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.6': '<b>eduPersonPrincipalName</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:1.3.6.1.4.1.5923.1.1.1.6)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:eduPersonPrincipalName)<br>&nbsp;',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.7': '<b>eduPersonEntitlement</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:1.3.6.1.4.1.5923.1.1.1.7)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:eduPersonEntitlement)<br>&nbsp;',
			'urn:oid:1.3.6.1.4.1.5923.1.5.1.1': '<b>isMemberOf</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:1.3.6.1.4.1.5923.1.5.1.1)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:dir:attribute-def:eduPersonEntitlement)<br>&nbsp;',
			'urn:oid:1.3.6.1.4.1.25178.1.2.9': '<b>Home Organisation</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:1.3.6.1.4.1.25178.1.2.9)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:terena.org:attribute-def:schacHomeOrganization)<br>&nbsp;',
			'urn:oid:1.3.6.1.4.1.25178.1.2.10': '<b>Home Organisation Type</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:1.3.6.1.4.1.25178.1.2.9)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:terena.org:attribute-def:schacHomeOrganizationType)<br>&nbsp;',
			'urn:oid:2.16.840.1.113730.3.1.39': '<b>Preferred Language</b><br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:oid:1.3.6.1.4.1.25178.1.2.9)<br>&nbsp;&nbsp;&nbsp;&nbsp;(urn:mace:terena.org:attribute-def:schacHomeOrganization)<br>&nbsp;',
			
			/*
            'urn:oid:0.9.2342.19200300.100.1.1': 'uid',
			'urn:oid:0.9.2342.19200300.100.1.10': 'manager',
			'urn:oid:0.9.2342.19200300.100.1.2': 'textEncodedORAddress',
			'urn:oid:0.9.2342.19200300.100.1.20': 'homePhone',
			'urn:oid:0.9.2342.19200300.100.1.22': 'otherMailbox',
			'urn:oid:0.9.2342.19200300.100.1.3': 'mail',
			'urn:oid:0.9.2342.19200300.100.1.39': 'homePostalAddress',
			'urn:oid:0.9.2342.19200300.100.1.40': 'personalTitle',
			'urn:oid:0.9.2342.19200300.100.1.41': 'mobile',
			'urn:oid:0.9.2342.19200300.100.1.42': 'pager',
			'urn:oid:0.9.2342.19200300.100.1.43': 'co',
			'urn:oid:0.9.2342.19200300.100.1.6': 'roomNumber',
			'urn:oid:0.9.2342.19200300.100.1.60': 'jpegPhoto',
			'urn:oid:0.9.2342.19200300.100.1.7': 'photo',
			'urn:oid:1.2.840.113549.1.9.1': 'email',
			'urn:oid:1.3.6.1.4.1.2428.90.1.1': 'norEduOrgUniqueNumber',
			'urn:oid:1.3.6.1.4.1.2428.90.1.11': 'norEduOrgSchemaVersion',
			'urn:oid:1.3.6.1.4.1.2428.90.1.12': 'norEduOrgNIN',
			'urn:oid:1.3.6.1.4.1.2428.90.1.2': 'norEduOrgUnitUniqueNumber',
			'urn:oid:1.3.6.1.4.1.2428.90.1.3': 'norEduPersonBirthDate',
			'urn:oid:1.3.6.1.4.1.2428.90.1.4': 'norEduPersonLIN',
			'urn:oid:1.3.6.1.4.1.2428.90.1.5': 'norEduPersonNIN',
			'urn:oid:1.3.6.1.4.1.2428.90.1.6': 'norEduOrgAcronym',
			'urn:oid:1.3.6.1.4.1.2428.90.1.7': 'norEduOrgUniqueIdentifier',
			'urn:oid:1.3.6.1.4.1.2428.90.1.8': 'norEduOrgUnitUniqueIdentifier',
			'urn:oid:1.3.6.1.4.1.2428.90.1.9': 'federationFeideSchemaVersion',
			'urn:oid:1.3.6.1.4.1.250.1.57': 'labeledURI',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.1': 'eduPersonAffiliation',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.10': 'eduPersonTargetedID',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.2': 'eduPersonNickname',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.3': 'eduPersonOrgDN',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.4': 'eduPersonOrgUnitDN',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.5': 'eduPersonPrimaryAffiliation',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.6': 'eduPersonPrincipalName',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.7': 'eduPersonEntitlement',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.8': 'eduPersonPrimaryOrgUnitDN',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.9': 'eduPersonScopedAffiliation',
			'urn:oid:1.3.6.1.4.1.5923.1.2.1.2': 'eduOrgHomePageURI',
			'urn:oid:1.3.6.1.4.1.5923.1.2.1.3': 'eduOrgIdentityAuthNPolicyURI',
			'urn:oid:1.3.6.1.4.1.5923.1.2.1.4': 'eduOrgLegalName',
			'urn:oid:1.3.6.1.4.1.5923.1.2.1.5': 'eduOrgSuperiorURI',
			'urn:oid:1.3.6.1.4.1.5923.1.2.1.6': 'eduOrgWhitePagesURI',
			'urn:oid:1.3.6.1.4.1.5923.1.5.1.1': 'isMemberOf',
			'urn:oid:2.16.840.1.113730.3.1.241': 'displayName',
			'urn:oid:2.16.840.1.113730.3.1.3': 'employeeNumber',
			'urn:oid:2.16.840.1.113730.3.1.39': 'preferredLanguage',
			'urn:oid:2.16.840.1.113730.3.1.4': 'employeeType',
			'urn:oid:2.16.840.1.113730.3.1.40': 'userSMIMECertificate',
			'urn:oid:2.5.4.10': 'o',
			'urn:oid:2.5.4.11': 'ou',
			'urn:oid:2.5.4.12': 'title',
			'urn:oid:2.5.4.13': 'description',
			'urn:oid:2.5.4.16': 'postalAddress',
			'urn:oid:2.5.4.17': 'postalCode',
			'urn:oid:2.5.4.18': 'postOfficeBox',
			'urn:oid:2.5.4.19': 'physicalDeliveryOfficeName',
			'urn:oid:2.5.4.20': 'telephoneNumber',
			'urn:oid:2.5.4.21': 'telexNumber',
			'urn:oid:2.5.4.3': 'cn',
			'urn:oid:2.5.4.36': 'userCertificate',
			'urn:oid:2.5.4.4': 'sn',
			'urn:oid:2.5.4.41': 'name',
			'urn:oid:2.5.4.42': 'givenName',
			'urn:oid:2.5.4.7': 'l',
			'urn:oid:2.5.4.9': 'street'*/
		},
		'attributeDescriptions' : {
			'urn:oid:0.9.2342.19200300.100.1.1': 'UID: The unique code for a person that is used as the login name within the institution.',
			'urn:oid:0.9.2342.19200300.100.1.3': 'Mail: The mail (rfc822mailbox) attribute type holds Internet mail addresses in Mailbox [RFC2821] form (e.g., user@example.com).',
			'urn:oid:2.16.840.1.113730.3.1.241': 'Display Name: Preferred name of a person to be used when displaying entries',
			'urn:oid:2.5.4.3': 'Common Name: Contains names of an object. Typically the person\'s full name.',
			'urn:oid:2.5.4.4': 'Surname: Surname or family name.',
			'urn:oid:2.5.4.42': 'Given Name: The part of a person\'s name that is not their surname.',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.1': 'eduPersonAffiliation: Specifies the person\'s relationship(s) to the institution in broad categories such as student, employee, staff, etc.',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.10': 'eduPersonTargetedID: A persistent, non-reassigned, opaque identifier for a principal.',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.6': 'eduPersonPrincipalName: A scoped identifier for a person. It should be represented in the form "user@scope" where "user" is a name-based identifier for the person and where "scope" defines a local security domain. NOT an email adress!',
			'urn:oid:1.3.6.1.4.1.5923.1.1.1.7': 'eduPersonEntitlement: URI (either URN or URL) that indicates a set of rights to specific resources.',
			'urn:oid:1.3.6.1.4.1.5923.1.5.1.1': 'isMemberOf: An "isMemberOf" attribute associated with an entity is a collection of values each of which identifies a group in which that entity is a member.',
			'urn:oid:1.3.6.1.4.1.25178.1.2.9': 'Home Organisation: Specifies a person\'s home organization using the domain name (RFC 1035) of the organization',
			'urn:oid:1.3.6.1.4.1.25178.1.2.10': 'Home Organisation Type: Type of a Home Organization',
			'urn:oid:2.16.840.1.113730.3.1.39': 'Preferred Language: Used to indicate an individual\'s preferred written or spoken language',
			
		},
	};

	SAMLmetaJS.TestEngine = function(ruleset) {
		if (
			(typeof ruleset === 'undefined') ||
			(ruleset === null)
			){

			this.ruleset = {}
		} else {
			this.ruleset = ruleset;
		}
		this.tests = [];
	}

	SAMLmetaJS.TestEngine.prototype.addTest = function(test) {
		if (this.ruleset.hasOwnProperty(test.id)) {
			console.log('Overriding significance from [' + test.significance + '] to [' + this.ruleset[test.id] + '] for [' + test.id + ']');
			test.significance = this.ruleset[test.id];
		}
		this.tests.push(test);
	}

	SAMLmetaJS.TestEngine.prototype.getResult = function() {
		return this.tests;
	}

	SAMLmetaJS.TestEngine.prototype.reset = function() {
		this.tests = [];
	}

	SAMLmetaJS.validatorManager = function (validationContext) {
		var
			hideErrors = function (element) {
				$(element).find('ul.errors').html('');
			},
			showErrors = function (element, errors) {
				var output = $.map(errors, function (e) {
					return '<li>' + e + '</li>';
				});
				$(element).find('ul.errors').html(output.join(''));
			};

		return function () {
			var errors = 0;

			$.each(validationContext, function (selector, validator) {
				$(selector).each(function (index, element) {
					var result = validator(element);
					hideErrors(element);
					if (result.errors.length > 0) {
						showErrors(element, result.errors);
						errors += result.errors.length;
					}
				});
			});

			return errors === 0;
		};
	};

	SAMLmetaJS.l10nValidator = function (element, errorMessage) {
		var value = null, lang = null, errors = [];
		value = $(element).children('input').attr('value');
		lang = $(element).children('select').val();

		if (!value) {
			errors.push(errorMessage);
		}
		return {
			value: value,
			lang: lang,
			errors: errors
		};
	};

	SAMLmetaJS.sync = function(node, options) {

		var
			currentTab = 'xml',
			mdreaderSetup = undefined,
			showValidation = true,
			showValidationLevel = {
				'info': true,
				'warning': true,
				'error': true,
				'ok': true
			};

		var setEntityID = function (entityid) {
			$("input#entityid").val(entityid);
		};

		var testEngine;


		var showTestResults = function(testEngine, showLevel) {
			var
				result = testEngine.getResult(),
				i = 0,
				testnode;

			testnode = $(node).parent().parent().find('div#samlmetajs_testresults');

			$(testnode).empty();

			for(i = 0; i < result.length; i ++) {
				if (showLevel[result[i].getLevel()]) {
					$(testnode).append(result[i].html() );
				}
			}

		}


		// This section extracts the information from the Metadata XML document,
		// and updates the UI elements to reflect that.
		var fromXML = function () {
			if (currentTab !== 'xml') return;
			currentTab = 'other';

			testEngine.reset();
			entitydescriptor = mdreader.parseFromString($(node).val());
			setEntityID(entitydescriptor.entityid);

			if (showValidation === true) {
				showTestResults(testEngine, showValidationLevel);
			}

			SAMLmetaJS.pluginEngine.execute('fromXML', [entitydescriptor]);
		};


		// This section extracts the information from the Metadata UI elements,
		// and applies this to the XML metadata document.
		var toXML = function() {
			if (currentTab !== 'other') return;

			currentTab = 'xml';
			console.log('toXML()');

			var entitydescriptor = new MDEntityDescriptor();

			entitydescriptor.entityid = $('input#entityid').val();

			SAMLmetaJS.pluginEngine.execute('toXML', [entitydescriptor]);

			//console.log(entitydescriptor);

			// ---
			// Now the JSON object is created, and now we will apply this to the Metadata XML document
			// in the textarea.

			var parser = SAMLmetaJS.xmlupdater($(node).val());
			parser.updateDocument(entitydescriptor);

			var xmlstring = parser.getXMLasString();
			xmlstring = SAMLmetaJS.XML.prettifyXML(xmlstring);
			$(node).val(xmlstring);

			/*
			 * Then parse the generated XML again, to perform the validation..
			 */
			if (showValidation === true) {
				testEngine.reset();
				entitydescriptor = mdreader.parseFromString($(node).val());
				setEntityID(entitydescriptor.entityid);
				showTestResults(testEngine, showValidationLevel);

				//console.log(entitydescriptor);
			}
			// ---

		};

		var selectTab = function (event, ui) {
            var
				isValid = true,
				$tabs = $(event.target),
				selected = $tabs.tabs("option", "selected"), //OK

//				tab = $tabs.find('.ui-tabs-panel').eq(selected).attr('id'), // Of by 1
                tab = $tabs.find('.tabContent').eq(selected).attr('id'),

//              nexttab = $tabs.find('.ui-tabs-panel').eq(ui.index).attr('id');
                nexttab = $tabs.find('.tabContent').eq(ui.index).attr('id');

//			console.log("just left tab id:" + selected);
//			console.log("just left tab name:" + tab);
//			console.log("newly selected tab id is:" + ui.index);
//			console.log("newly selected tab name is:" + nexttab);

			if (tab !== 'metadata') {
                console.log("Validating tabID: " + tab);

				// Validate the contents of the tab we just left
				isValid = SAMLmetaJS.pluginEngine.executeOne(tab, 'validate', []);

				if (typeof isValid === 'undefined') {
				    isValid = true;
				}
			}

			// If the content of the tab we just left is valid, move the contents to the XML
			if (isValid && ui.index === 7) {  // rawmetadata tab
				toXML();
			}
			return isValid;

		};


		// Add content
		var embrace = function () {
			//$(node).wrap('<div id="rawmetadata"></div>');
			//$(node).wrap('<div id="contentcontainer"></div>');
			$(node).parent().wrap('<div id="tabs" />');

			var metatab = $(node).parent();
			var tabnode = $(node).parent().parent();

			var pluginTabs = {'list': [], 'content': []};

			SAMLmetaJS.pluginEngine.execute('addTab', [pluginTabs]);
			
			tabnode.prepend('<ul>' + pluginTabs.list.join('') + '</ul>');
/*
			metatab.append('<div>' +
						   '<button class="prettify">Pretty format</button>' +
						   '<button class="wipe">Wipe</button>' +
						   '</div>');
*/
/*
			tabnode.prepend('<ul>' + pluginTabs.list.join('') +
							'<li><a href="#rawmetadata">Metadata</a></li>' +
							'</ul>');
*/
/*
			tabnode.prepend('<ul>' + pluginTabs.list.join('') +
							'<li><a href="#rawmetadata">Metadata</a></li>' +
							'</ul>');
*/
/*
			tabnode.prepend('<ul>' +
							'<li><a href="#conext">Conext</a></li><li><a href="#rawmetadata">Metadata</a></li>' +
							//'<li><a href="#rawmetadata">Metadata</a></li>' +
							pluginTabs.list.join('') +
							'</ul>');
*/							
		
			tabnode.prepend('<div id="samlmetajs_testresults"></div>');
			tabnode.append(pluginTabs.content.join(''));

			tabnode.tabs({select: selectTab});
		};


		embrace();

		if (options.ruleset) {
			mdreaderSetup = options.ruleset;
		}

		if (options.showValidation) {
			showValidation = options.showValidation;
		}
		if (options.showValidationLevel) {
			showValidationLevel = options.showValidationLevel;
		}

		testEngine = new SAMLmetaJS.TestEngine(mdreaderSetup);

		mdreader.setup({
			testProcessor: function(t) {
				testEngine.addTest(t);
			}
		});

		SAMLmetaJS.pluginEngine.execute('tabClick', [
			function(node) {
				$(node).click(fromXML);
			}
		]);

		if (options && options.savehook) {
			$(options.savehook).submit(toXML);
		}

		// Adding handlers to the other buttons.

		$("div#rawmetadata button.prettify").click(function(e) {
			e.preventDefault();
			$(node).val(SAMLmetaJS.XML.prettifyXML($(node).val()));
		});
		$("div#rawmetadata button.wipe").click(function(e) {
			e.preventDefault();
			$(node).val('');
		});

		SAMLmetaJS.pluginEngine.execute('setUp', []);
	};


	$.vari = "$.vari";
	$.fn.foo = "$.fn.vari";

	// $.fn is the object we add our custom functions to
	$.fn.SAMLmetaJS = function(options) {

		return this.each(function() {
			SAMLmetaJS.sync(this, options);
		});
	};
}(jQuery));

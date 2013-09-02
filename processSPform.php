<?php
/**
 * Created by JetBrains PhpStorm.
 * User: niels
 * Date: 8/30/13
 * Time: 3:14 PM
 * To change this template use File | Settings | File Templates.
 */

require_once('../../simplesamlphp/lib/_autoload.php');
include "functions.php";

$as = new SimpleSAML_Auth_Simple('default-sp');
$as->requireAuth();
$attributes = $as->getAttributes();

$to_email = "nidi+spform@surfnet.nl, niels@het.net.je";
$from_email = "surfconext-beheer@surfnet.nl";
$conextdataHTML = "";

$timestamp = date("d-m-Y H:i");
$ip = $_SERVER["REMOTE_ADDR"];
$user = $attributes["urn:mace:dir:attribute-def:displayName"][0];
$email = $attributes["urn:mace:dir:attribute-def:mail"][0];
$home_org = $attributes["urn:mace:terena.org:attribute-def:schacHomeOrganization"][0];;

$filename = "/tmp/".uniqid("spForm_").".xml";

//$tmpfname = tempnam("/tmp", "spFORM_");

$metadata = $_POST["metadata"];
$conextdata = $_POST["conextdata"];

// Fields are split by ;
// key value pairs by :

?>
<html>
<body>
<link type="text/css" href="samlmetajs/css/samlmetajs.css" rel="Stylesheet" />

<?php

$conextdata = explode(";",$conextdata);

$conextdataHTML .= "<h2>Thank you for your request to conext a new Servide Provider!</h2>";
$conextdataHTML .= "<div style='border-width: 1px;'><p><b>Date</b>: " . $timestamp ."</br>";
$conextdataHTML .= "<b>Request made by</b>: " .$user . "</br>";
$conextdataHTML .= "<b>From IP adress</b>: " .$ip . "</br>";
$conextdataHTML .= "<b>Email</b>: " .$email . "</br>";
$conextdataHTML .= "<b>Home Organisation</b>: " .$home_org . "</br></p></div>";

$conextdataHTML .= "<p>A copy of this information was forwarded to your email address.<br>";

$conextdataHTML .= "<p>We revieved the following information:<br>";
$conextdataHTML .= "<div style='border-width: 1px;'>";
foreach($conextdata as $conextdatavalue){
    $conextdatavalue = explode("::", $conextdatavalue);

    $conextdataHTML .= "<p><b>".$conextdatavalue[0]."</b>:</br>";
    $conextdataHTML .= $conextdatavalue[1]."</p>";
}
$conextdataHTML .= "</div>";

$conextdataHTML .= "<p>We revieved the following information:<br>";
$conextdataHTML .= "<div style='border-width: 1px;'><pre>";
$conextdataHTML .= htmlspecialchars($metadata);
$conextdataHTML .= "</pre></div>";

print($conextdataHTML);
//var_dump($conextdata);

writeFile($filename, $metadata);

$sendok = sendMail(	$to_email,
    $from_email,
    "SPform",
    "",
    "[SPform] New SP connection request",
    $conextdata,
    $conextdataHTML,
    $filename,
    "text/xml");

unlink($filename);

?>



</body>



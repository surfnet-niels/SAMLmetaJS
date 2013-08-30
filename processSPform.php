<?php
/**
 * Created by JetBrains PhpStorm.
 * User: niels
 * Date: 8/30/13
 * Time: 3:14 PM
 * To change this template use File | Settings | File Templates.
 */

include "functions.php";

$to_email = "nidi+spform@surfnet.nl";
$from_email = "nidi+spform@surfnet.nl";
$conextdataHTML = "";

$timestamp = date("d-m-Y H:i");
$ip = $_SERVER["REMOTE_ADDR"];
$user = "fed user";
$email = "feduser@email.org";
$home_org = "user home org";

$filename = "/tmp/".uniqid("spForm_").".xml";

//$tmpfname = tempnam("/tmp", "spFORM_");

$metadata = $_POST["metadata"];
$conextdata = $_POST["conextdata"];

// Fields are split by ;
// key value pairs by :


$conextdata = explode(";",$conextdata);

$conextdataHTML .= "<p>The following request to conext a Servide Provider was recieved on " . $timestamp . "<hr size='1%'>";
$conextdataHTML .= "<b>Request made by</b>: " .$user . "</br>";
$conextdataHTML .= "<b>From IP adress</b>: " .$ip . "</br>";
$conextdataHTML .= "<b>Email</b>: " .$email . "</br>";
$conextdataHTML .= "<b>Home Organisation</b>: " .$home_org . "</br>";


$conextdataHTML .= "<hr size='1%'>";
foreach($conextdata as $conextdatavalue){
    $conextdatavalue = explode("::", $conextdatavalue);

    $conextdataHTML .= "<p><b>".$conextdatavalue[0]."</b>:</br>";
    $conextdataHTML .= $conextdatavalue[1]."</p>";
}

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
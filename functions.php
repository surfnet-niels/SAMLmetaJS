<?php 

function doQuery($qryString, $dbuser, $dbpass, $dbhost) {

	// Make a MySQL Connection
	mysql_connect($dbhost, $dbuser, $dbpass) or die(mysql_error());

	// Retrieve the data
	$result = mysql_query($qryString) or die(mysql_error());
	
	return $result;
}

function mkJson($rset, $datasetname){
	
	$now = new DateTime("", new DateTimeZone('Europe/Amsterdam'));

	// Add query description and publish date
	$jsonheader = $datasetname;
	
	return $jsonresult;
}

function convertResult($rs, $type, $jsonmain="") {
	// receive a recordset and convert it to csv, json (default) or to xml based on "type" parameter.
	$jsonArray = array();
	$csvString = "";
	$csvcolumns = "";
	$count = 0;
	$returndata = "";
	while($r = mysql_fetch_row($rs)) {
		for($k = 0; $k < count($r); $k++) {
			$jsonArray[$count][mysql_field_name($rs, $k)] = $r[$k];
			$csvString.=",\"".$r[$k]."\"";
		}
		if (!$csvcolumns) for($k = 0; $k < count($r); $k++) $csvcolumns.=($csvcolumns?",":"").mysql_field_name($rs, $k);
		$csvString.="\n";
		$count++;
	}

	switch ($type) {
	    case "csv":
		// CSV
		$returndata = str_replace("\n,","\n",$csvcolumns."\n".$csvString);
	    break;
	    
	    case "xml":
		// XML
		// TODO
		break;

	    default:
		// JSON
		$returndata = "{\"$jsonmain\":".json_encode($jsonArray)."}";
        }

	return ($returndata);
}




function mkArray($rset, $datasetname){

	$rows = array();
	while($r = mysql_fetch_assoc($rset)) {
		$rows[] = $r;
	}

	return $rows;
}

function mkCSV($rset, $datasetname){
	return convertResult($rset, "csv");
}

function mkXML($rset, $datasetname, $depth = 0){
    
    $now = new DateTime("", new DateTimeZone('Europe/Amsterdam'));

    $rows = array();
	while($r = mysql_fetch_assoc($rset)) {
	$rows[] = $r;
    }
    return "<?xml version='1.0' ?>\n<DATA>\n" . ARRAYtoXML($rows) . "</DATA>";
}

function ARRAYtoXML($array, $depth = 0) {
    $indent = '';
    $return = '';
    for($i = 0; $i < $depth; $i++)
        $indent .= "\t";
    foreach($array as $key => $item){
	if(is_numeric($key)) $key = "ROW"; 

        if(is_array($item)) {
	    $return .= "{$indent}<{$key}>\n";
            $return .= ARRAYtoXML($item, $depth + 1);
            $return .= "{$indent}</{$key}>\n";
	}
        else {
            
	    if(strlen($item) != 0) {
		$return .= "{$indent}<{$key}>{$item}</{$key}>\n";
	    } else {
		$return .= "{$indent}<{$key}/>\n";
	    }
        }
    }	  
    return $return;
}

function csv_to_array($input, $delimiter='|')
{
    $header = null;
    $data = array();
    $csvData = str_getcsv($input, "\n");
   
    foreach($csvData as $csvLine){
        if(is_null($header)) $header = explode($delimiter, $csvLine);
        else{
           
            $items = explode($delimiter, $csvLine);
           
            for($n = 0, $m = count($header); $n < $m; $n++){
                $prepareData[trim($header[$n])] = trim($items[$n]);
            }
  
            $data[] = $prepareData;
        }
    }
   
    return $data;
} 


function cleanupJson($jsonString) {
	
	return str_replace('}]"', '}]', str_replace('"[{', '[{', str_replace('\"', '"', $jsonString)));
	
}

function writeFile($filepath, $content){
	// Let's make sure the file exists and is writable first.
	$handle = fopen($filepath, 'w+') or die("Cannot open file ($filepath)");
	fwrite($handle, $content) or die("Cannot write to file ($filepath)");
	fclose($handle);
}

function sendMail($to, $from_mail, $from_name, $replyto, $subject, $message, $htmlmessage, $file, $mimetype) {
	$mail_sent = false;
	
	if (strlen($file) != 0) {
    	$filestuff = "";
  
    	$arrStr = array_reverse(explode("/", $file ));
    	
    	$filename= $arrStr[0];

    	//define the receiver of the email
    	//$to = $mailto;
    	//define the subject of the email
    	//$subject = '[SURFconext][rapportage] SPs zonder login afgelopen maand';
    	//create a boundary string. It must be unique
    	//so we use the MD5 algorithm to generate a random hash
    	$random_hash = md5(date('r', time()));
    	//define the headers we want passed. Note that they are separated with \r\n
    	$headers = "From: ".$from_mail."\r\nReply-To: ".$replyto;
    	//add boundary string and mime type specification
    	$headers .= "\r\nContent-Type: multipart/mixed; boundary=\"PHP-mixed-".$random_hash."\"";
    	//read the atachment file contents into a string,
    	//encode it with MIME base64,
    	//and split it into smaller chunks
    	$attachment = chunk_split(base64_encode(file_get_contents($file)));
    	//define the body of the message.
    	ob_start(); //Turn on output buffering. WARN: NO TABS or SPACES or the encoding will break
    	?>
--PHP-mixed-<?php echo $random_hash; ?> 
Content-Type: multipart/alternative; boundary="PHP-alt-<?php echo $random_hash; ?>"

--PHP-alt-<?php echo $random_hash; ?> 
Content-Type: text/plain; charset="iso-8859-1"
Content-Transfer-Encoding: 7bit

<?php echo $message; ?> 

--PHP-alt-<?php echo $random_hash; ?> 
Content-Type: text/html; charset="iso-8859-1"
Content-Transfer-Encoding: 7bit

<?php echo $htmlmessage; ?> 

--PHP-alt-<?php echo $random_hash; ?>--

--PHP-mixed-<?php echo $random_hash; ?> 
Content-Type: <?php echo $mimetype; ?>; name="<?php echo $filename; ?>" 
Content-Transfer-Encoding: base64 
Content-Disposition: attachment 

<?php echo $attachment; ?>
--PHP-mixed-<?php echo $random_hash; ?>--

<?php
//copy current buffer contents into $message variable and delete current output buffer
$message = ob_get_clean();
//send the email
$mail_sent = @mail( $to, $subject, $message, $headers );
//if the message is sent successfully print "Mail sent". Otherwise print "Mail failed"
    	
    }
    return ($mail_sent ? "Mail sent" : "Mail failed"); 
    	
    	
}

?>

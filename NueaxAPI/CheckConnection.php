<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true ");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size,X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
   
    
    $server="localhost";
    $username="root";
    $password="password";
    $database= "nueax";
    $connection = new mysqli($server,$username,$password,$database);

    $Output = "";
    
    if($connection->connect_error)
	{
	    $Output = false;
    }
	else
	{
	    $Output = true;
    }

    echo(json_encode($Output));
    $connection->close();
?>
<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true ");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size,X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
   
   // $data = json_decode(file_get_contents("php://Input"));

   
    $server="localhost";
    $username="root";
    $password="password";
    $database= "nueax";
    $connection = new mysqli($server,$username,$password,$database);

    $Output = array();
    
    if($connection->connect_error)
	{
	   // $Output[0]="Mysqli Connect Error";
    }
	else
	{
	   // $Output[0]="Mysql connected sucessfully";
    }
                
    $sql_query = "Select EmailId,Password from signup"; 
    $result = $connection->query($sql_query);

    $i =0;
    {
        // output data of each row
      while($row = $result->fetch_assoc()) 
      {
        $Output[$i] = $row;
        $i = $i+1;
      }
      
    }

   
    echo(json_encode($Output));
    $connection->close();
?>
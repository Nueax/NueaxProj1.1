<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true ");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size,X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
   
    $data = json_decode(file_get_contents("php://Input"));
   
    $FirstName = $data->FirstName;
    $LastName = $data->LastName;
    $EmailId =  $data->EmailId;
    $Password = $data->Password;

   
    $server="localhost";
    $username="root";
    $password="password";
    $database= "nueax";
    $connection = new mysqli($server,$username,$password,$database);

    $Output = array();
    
    if($connection->connect_error)
	{
	    $Output[0]="Mysqli Connect Error";
    }
	else
	{
	    $Output[0]="Mysql connected sucessfully";
    }
                
    $sql_query = "replace into signup(FirstName,LastName,EmailId,Password)values('$FirstName','$LastName','$EmailId','$Password')"; 
    $result = $connection->query($sql_query);
    

    if($result==True)
    {
        $Output[1]="Statement executed sucessfully";
    }
    else
    {
        $Output[1] ="Error".$connection->error;
    }
    
    echo(json_encode($Output));
    $connection->close();
?>
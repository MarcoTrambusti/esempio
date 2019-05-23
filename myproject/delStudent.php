<?php
session_start();
include 'dbConn.php';
$data = json_decode(file_get_contents('php://input'));
if(isset($data))
{
    try{
        $dbh = new PDO($dsn,$user,$password);
    }catch(PDOException $e)
    {
        echo json_encode("error: ".$e->getMessage());
        exit;
    }

   $stm=$dbh->prepare("DELETE FROM studente WHERE STU_id = :id");
   $stm->bindvalue(":id",$data);
   try
   {
       if(!$stm->execute())
       {
            echo json_encode("error at execute ".$stm->errorinfo()[2]);
       }
       else
       {
           echo json_encode("ok");
       }               
    }
    catch(exception $e)
    {echo $e->getMessage();
        echo json_encode("error: ".$e->getMessage());
    exit();}
}
?>
<?php
session_start();
include 'dbConn.php';
$data = json_decode(file_get_contents('php://input'));
if(isset($data->nome) && isset($data->cognome)&& isset($data->username)&& isset($data->password)&& isset($data->idClass))
{
    try{
        $dbh = new PDO($dsn,$user,$password);
    }catch(PDOException $e)
    {
        echo json_encode("error: ".$e->getMessage());
        exit;
    }

   $stm=$dbh->prepare("INSERT INTO studente (STU_nome, STU_cognome, STU_username, STU_password, STU_CLA_id) VALUES (:nome, :cognome, :username, :password, :idClass)");
   $stm->bindvalue(":nome",$data->nome);
   $stm->bindvalue(":cognome",$data->cognome);
   $stm->bindvalue(":username",$data->username);
   $stm->bindvalue(":password",md5($data->password));
   $stm->bindvalue(":idClass",$data->idClass);
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
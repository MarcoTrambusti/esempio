<?php 
session_start();
include 'dbConn.php';
$data = json_decode(file_get_contents('php://input'));
if(isset($data->nome) && isset($data->cognome)&& isset($data->username)&& isset($data->password)&& isset($data->idClass) && isset($data->id))
{
    try{
        $dbh = new PDO($dsn,$user,$password);
    }catch(PDOException $e)
    {
        echo json_encode("error: ".$e->getMessage());
        exit;
    }

   $stm=$dbh->prepare("UPDATE studente SET STU_nome= :nome, STU_cognome=:cognome, STU_username=:username, STU_password=:password, STU_CLA_id=:idClass WHERE STU_id=:id");
   $stm->bindvalue(":nome",$data->nome);
   $stm->bindvalue(":cognome",$data->cognome);
   $stm->bindvalue(":username",$data->username);
   $stm->bindvalue(":password",md5($data->password));
   $stm->bindvalue(":idClass",$data->idClass);
   $stm->bindvalue(":id",$data->id);
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
<?php 
session_start();
include "dbConn.php";
$data=json_decode(file_get_contents("php://input"));
try{
$dbh=new PDO($dsn,$user,$password);
$stm=$dbh->prepare("DELETE FROM articolo WHERE idArticolo=:idArticolo");
$stm->bindvalue(":idArticolo", $data->idArticolo);
if($stm->execute()){
    echo json_encode("ok");
}
}catch(PDOException $e){
    echo json_encode($e->getMessage());
    exit;
}
?>
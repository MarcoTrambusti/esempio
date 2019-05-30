<?php 
session_start();
include "dbConn.php";
$data=json_decode(file_get_contents("php://input"));
try{
    $dbh=new PDO($dsn,$user,$password);
$stm=$dbh->prepare("UPDATE articolo SET nomeArticolo=:nomeArticolo,prezzoArticolo=:prezzoArticolo,idSport=:idSport WHERE idArticolo=:idArticolo");
$stm->bindvalue(":idArticolo", $data->idArticolo);
$stm->bindvalue(":nomeArticolo", $data->nomeArticolo);
$stm->bindvalue(":prezzoArticolo", $data->prezzoArticolo);
$stm->bindvalue(":idSport", $data->idSport);
if($stm->execute()){
    echo json_encode("ok");
}
}catch(PDOException $e){
    echo json_encode($e->getMessage());
    exit;
}
?>
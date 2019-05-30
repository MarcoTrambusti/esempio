<?php 
session_start();
include "dbConn.php";
$data=json_decode(file_get_contents("php://input"));
try{
    $dbh=new PDO($dsn,$user,$password);

$stm=$dbh->prepare("SELECT * FROM articolo WHERE idSport=:idSport");
$stm->bindvalue(":idSport", $data->idSport);
if($stm->execute()){
    echo json_encode($stm->fetchAll());
}
}catch(PDOException $e){
    echo json_encode($e->getMessage());
    exit;
}
?>
<?php 
session_start();
include "dbConn.php";
try{
$dbh=new PDO($dsn,$user,$password);
$stm=$dbh->prepare("SELECT * FROM  sport");
$stm->execute();
echo json_encode($stm->fetchAll());
}catch(PDOException $e){
    echo json_encode($e->getMessage());
    exit;
}
?>
<?php
session_start();
include 'dbConn.php';

try{
    $dbh=new PDO($dsn,$user,$password);
}catch(PDOException $e){
  echo"connessione fallita: ".$e->getMessage();
  exit;
}
$stm= $dbh->prepare("SELECT * from studente");
if(!$stm->execute()){
    echo "errore". $stm->errorinfo()[2];
}

//$array = ;
echo json_encode( $stm->fetchAll() );
//echo $json;
?>
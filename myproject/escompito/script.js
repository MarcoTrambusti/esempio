window.onload=function(){getArticles(),getSports()};
function showAdd(){
    document.getElementById("addForm").style.display="block";
    document.getElementById("table").style.display="none";
    document.getElementById("conferma").onclick=function(){addArticle()};
}
function showModify(id,nome,prezzo,idSport){
    document.getElementById("addForm").style.display="block";
    document.getElementById("table").style.display="none";
    document.getElementById("nome").value=nome;
    document.getElementById("prezzo").value=prezzo;
    document.getElementById("idSport").value=idSport;
    document.getElementById("conferma").onclick=function(){modArticle(id)};
}
function getArticles(){
    fetch("getArticoli.php").then(r=>r.json())
    .then(res=>loadTable(res));
}
function getSports(){
    fetch("getSport.php").then(r=>r.json()).then(res=>loadSelect(res));
}
function addArticle(){
    res={"nomeArticolo": document.getElementById("nome").value,"prezzoArticolo": document.getElementById("prezzo").value,"idSport": document.getElementById("idSport").value};
    fetch("addArticolo.php",{method: "post", body: JSON.stringify(res)}).then(r=>{return r.json()}).then(res2=>{if(res2=="ok"){getArticles()}});
}
function modArticle(id){
    res={"idArticolo":id,"nomeArticolo": document.getElementById("nome").value,"prezzoArticolo": document.getElementById("prezzo").value,"idSport": document.getElementById("idSport").value};
    fetch("editArticolo.php",{method: "post", body: JSON.stringify(res)}).then(r=> {return r.json()}).then(res2=>{if(res2=="ok"){getArticles()}});
}
function remArticle(id){
    res={"idArticolo":id};
    fetch("remArticolo.php",{method:"post", body:JSON.stringify(res)})
    .then(r=>{return r.json()})
    .then(res2=>{if(res2=="ok"){getArticles()}});
}
function filtArticle(){
    res={"idSport": document.getElementById("select").value};
    fetch("filtArticolo.php",{method:"post", body:JSON.stringify(res)}).then(r=>{return r.json()}).then(res2=>loadTable(res2));
}
function loadSelect(res){
    document.getElementById("select").innerHTML="";
    select=document.getElementById("select");
    res.forEach(x => {
    var option= document.createElement("option");
    option.textContent=x.nomeSport;
    option.value=x.idSport;
    select.appendChild(option);
    });
}
function loadTable(res){
    document.getElementById("body").innerHTML="";
    table=document.getElementById("body");
    res.forEach(x => {
        var row =document.createElement("tr");
        row.id=x.idArticolo;
        var col1 =document.createElement("td");
        var col2 =document.createElement("td");
        var col3 =document.createElement("td");
        var col4 =document.createElement("td");
        var content1= document.createTextNode(x.nomeArticolo);
        var content2= document.createTextNode(x.prezzoArticolo);
        var content3= document.createTextNode(x.idSport);
        var btnrem= document.createElement("button");
        btnrem.textContent="x";
        btnrem.onclick=function(){remArticle(row.id)};
        var btnmod= document.createElement("button");
        btnmod.textContent="modifica";
        btnmod.onclick=function(){showModify(row.id,x.nomeArticolo,x.prezzoArticolo,x.idSport)};
        col1.appendChild(content1);
        col2.appendChild(content2);
        col3.appendChild(content3);
        col4.appendChild(btnrem);
        col4.appendChild(btnmod);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        table.appendChild(row);
    });
}
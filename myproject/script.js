window.onload = function () { showHome() }
function showHome() {
  document.getElementById("head").style.display = "block";
  document.getElementById("body").style.display = "none";
}
function showClass() {
  document.getElementById("head").style.display = "none";
  document.getElementById("body").style.display = "block";
}
function showTeacher() {
  document.getElementById("head").style.display = "none";
  document.getElementById("body").style.display = "block";
}
function showStudent() {
  document.getElementById("head").style.display = "none";
  document.getElementById("body").style.display = "block";
  const table = document.getElementById("table");
  getData("getStudent.php");
}
function showSession() {
  document.getElementById("head").style.display = "none";
  document.getElementById("body").style.display = "block";
}

function getData(url) {
  fetch(url).then(res => res.json())
  .then(text => generateTable(text)) ; // then log it out
}
function generateTable(res) {
  document.getElementById('table').innerHTML = '';  
 
  var table = document.getElementById('table');
  table.setAttribute('class', 'table');
      {
        var tablerow=document.createElement('tr');
        var tablecol1=document.createElement('td');
        var tablecol2=document.createElement('td');
        var tablecol3=document.createElement('td');
        var tablecol4=document.createElement('td');
        var tablecol5=document.createElement('td');
        var tablecol6=document.createElement('td');
        var tablecol7=document.createElement('td');
        var cellcontent1 = document.createTextNode('ID');
        var cellcontent2 = document.createTextNode('Nome');
        var cellcontent3 = document.createTextNode('Cognome');
        var cellcontent4 = document.createTextNode('Username');
        var cellcontent5 = document.createTextNode('Password');
        var cellcontent6 = document.createTextNode('IdClasse');
        var cellcontent7 = document.createTextNode('azioni');
        tablecol1.appendChild(cellcontent1);
        tablecol2.appendChild(cellcontent2);
        tablecol3.appendChild(cellcontent3);
        tablecol4.appendChild(cellcontent4);
        tablecol5.appendChild(cellcontent5);
        tablecol4.appendChild(cellcontent4);
        tablecol5.appendChild(cellcontent5);
        tablecol6.appendChild(cellcontent6);
        tablecol7.appendChild(cellcontent7);
        tablerow.appendChild(tablecol1);
        tablerow.appendChild(tablecol2);
        tablerow.appendChild(tablecol3);
        tablerow.appendChild(tablecol4);
        tablerow.appendChild(tablecol5);
        tablerow.appendChild(tablecol6);
        tablerow.appendChild(tablecol7);
        table.appendChild(tablerow);
      }
  res.forEach((x) => {
    var tablerow = document.createElement('tr');
    tablerow.id=x.STU_id;
    var tablecol1 = document.createElement('td');
    var tablecol2 = document.createElement('td');
    var tablecol3 = document.createElement('td');
    var tablecol4 = document.createElement('td');
    var tablecol5 = document.createElement('td');
    var tablecol6 = document.createElement('td');
    var tablecol7 = document.createElement('td');
    var cellcontent1 = document.createTextNode(x.STU_id);
    var cellcontent2 = document.createTextNode(x.STU_nome);
    var cellcontent3 = document.createTextNode(x.STU_cognome);
    var cellcontent4 = document.createTextNode(x.STU_username);
    var cellcontent5 = document.createTextNode(x.STU_password);
    var cellcontent6 = document.createTextNode(x.STU_CLA_id);
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "modifica";
    btn.onclick=function(){showModify(tablerow.id)};
    btn.className="btn"
    var btn2 = document.createElement("BUTTON");
    btn2.innerHTML = "elimina";
    btn2.className="btn"
    btn2.onclick=function (){deleteUser(tablerow.id)};
    tablecol7.appendChild(btn);
    tablecol7.appendChild(btn2);
    tablecol1.appendChild(cellcontent1);
    tablecol2.appendChild(cellcontent2);
    tablecol3.appendChild(cellcontent3);
    tablecol4.appendChild(cellcontent4);
    tablecol5.appendChild(cellcontent5);
    tablecol6.appendChild(cellcontent6);
    tablerow.appendChild(tablecol1);
    tablerow.appendChild(tablecol2);
    tablerow.appendChild(tablecol3);
    tablerow.appendChild(tablecol4);
    tablerow.appendChild(tablecol5);
    tablerow.appendChild(tablecol6);
    tablerow.appendChild(tablecol7);
    table.appendChild(tablerow);
  });
  //target.appendChild(table);
}

 function showAdd(){
   document.getElementById("table-form").style.display="none";
   document.getElementById("addForm").style.display="block";
   document.getElementById("modForm").style.display="none";
 } 
 function showModify(id){
  document.getElementById("mId").innerHTML= id;
  document.getElementById("table-form").style.display="none";
  document.getElementById("addForm").style.display="none";
  document.getElementById("modForm").style.display="block";
} 
 function deleteUser(id){
  fetch("delStudent.php", { method: 'post', body: JSON.stringify(id)})
  .then((r2)=>{return r2.json();}).then((res2)=>{
    alert(res2);
    if(res2=="ok")
    {
        getData("getStudent.php");
    }
  });
}    
 function addStudente() {
  res = {"nome":document.getElementById("nome").value, "cognome":document.getElementById("cognome").value, "username":document.getElementById("username").value, "password":document.getElementById("password").value, "idClass": document.getElementById("idClass").value};
  fetch("addStudente.php", { method: 'post', body: JSON.stringify(res)})
  .then((r2)=>{return r2.json();}).then((res2)=>{
      alert(res2);
      if(res2=="ok")
      {
        getData("getStudent.php");
        document.getElementById("table-form").style.display="block";
        document.getElementById("addForm").style.display="none";
      }
    });  
 }
 
function modStudente(){ 
  res = {"nome":document.getElementById("mNome").value, "cognome":document.getElementById("mCognome").value, "username":document.getElementById("mUsername").value, "password":document.getElementById("mPassword").value, "idClass":document.getElementById("mIdClass").value, "id":document.getElementById("mId").textContent};
  fetch("modStudente.php", { method: 'post', body: JSON.stringify(res)})
      .then((r2)=>{return r2.json();}).then((res2)=>{alert(res2);
      if(res2=="ok")
      {
        getData("getStudent.php");
        document.getElementById("table-form").style.display="block";
        document.getElementById("modForm").style.display="none";
      }
    });
}
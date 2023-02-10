window.onload=principal;

function principal(){
    document.getElementById("btn_admin").addEventListener("click",ingresoAdmin)
}


let url = window.location.href;

localStorage.setItem("urlAdmin" , url);



 

var usuario = "lucasleiro"
var correo = "lucasleiroa@gmail.com"
var password = "lucas1248759"

function ingresoAdmin(){

    let input_usuario = document.getElementById("nombre_admin").value;
    let input_password = document.getElementById("contrasena_admin").value;

    if ((input_usuario == usuario || input_usuario == correo) && input_password == password) {
         window.location="./RegistrarStock.html";
    }else{
        alert("Usuario o Contraseña Incorrectos")
    }



}
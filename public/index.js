window.onload = principal;

function principal() {
  document
    .getElementById("btn_incio")
    .addEventListener("click", loginFormulario);
}

var var_usuario = "hotelmiami";
var var_contrasena = "hotel580";

let url = window.location.href;

localStorage.setItem("urlInicio", url);

async function loginFormulario() {
  usuario = document.getElementById("input_usuario").value;
  contrasena = document.getElementById("input_contrasena").value;

  try {
    if (usuario == var_usuario && contrasena == contrasena) {

        // el true el para esta logeado y el false cuando no lo estas
      // axios.put("http://localhost:3001/login/" + 1, {
      //        logeado: true,
      // });

      // alert("Dato Modificado Correctamente");
      window.location="./PantallaInicial/principal.html";

    } else {
      alert("Usuario o Contraseña Incorrectos");
    }
  } catch (err) {
    alert(err);
  }
}



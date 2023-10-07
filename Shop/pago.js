function validarPago() {
    
    var correo = document.getElementById("correo").value;
    var expiraMes = document.getElementById("expiraMes").value;
    var expiraAnio = document.getElementById("expiraAnio").value;
    var cvv = document.getElementById("cvv").value;
    var nombre = document.getElementById("nombre").value;
    var direccion = document.getElementById("direccion").value;
    var ciudad = document.getElementById("ciudad").value;
    var pais = document.getElementById("pais").value;

    
    if (!correo || !expiraMes || !expiraAnio || !cvv || !nombre || !direccion || !ciudad || !pais) {
        alert("Por favor, completa todos los campos.");
        return;
    }


    alert("Pago aceptado. Gracias por tu compra.");
}
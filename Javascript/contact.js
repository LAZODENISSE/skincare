
function handleSubmit(event) {
    event.preventDefault(); // Previene el envío real del formulario
    document.getElementById("confirmationMessage").style.display = "block";
    document.getElementById("contactForm").reset(); // Limpia el formulario
}


//On vient extraire l'URL
const query = window.location.search

//On va chercher le paramètre ID dans l'URL
const urlParams = new URLSearchParams(query)

//On stock l'ID du produit dans une variable
const orderId = urlParams.get('orderId');
const orderAmount = urlParams.get('orderAmount');

document.getElementById("confirmationId").innerText = orderId
document.getElementById("confirmationPrice").innerText = orderAmount
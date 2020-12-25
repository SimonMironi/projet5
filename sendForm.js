

document.getElementById('form').addEventListener('submit', function(e){
e.preventDefault();

//On récupère les champs
let mail = document.getElementById('mail');
let mailconf = document.getElementById('mail-confirmation');
let prenom = document.getElementById('firstname');
let nom = document.getElementById('lastname');
let adresse = document.getElementById('adress');
let ville = document.getElementById('city');

//Regex du mail
let regexMail = /\w+@\w+\.(net|com|org|fr)/;
let regexName = /^[A-Z][-'a-zA-Z]+$/;
let regexAdress = /[A-Za-z0-9'\.\-\s\,]/;

//On initialise les erreurs pour l'utilisateur
let error;

if(!prenom.value){
    error = "Veuillez renseigner un prénom"
}
if(!nom.value){
    error = "Veuillez renseigner un nom"
}
if(!adresse.value){
    error = "Veuillez renseigner une adresse"
}
if(!ville.value){
    error = "Veuillez renseigner une ville"
}
if(mail.value != mailconf.value){
    error = "Les mails renseignés ne correspondent pas"
}

//Regex
if(!regexName.test(prenom.value)){
    error = "Votre prénom est étrange"
}
if(!regexName.test(nom.value)){
    error = "Votre nom est étrange"
}
if(!regexName.test(ville.value)){
    error = "Votre nom est étrange"
}
if(!regexAdress.test(adresse.value)){
    error = "Votre adresse n'a pas un format correct"
}

if(error){
    e.preventDefault();
    document.getElementById("error").innerText = error;
    return false;
}

else{

    if(regexMail.test(mail.value)){

    //Tout est ok, on peut passer commande ! 

    //On récupère les produits du panier

    let idsArray = []

    for (let elem of cart){
        idsArray.push(elem.id)
    }

    

    //On récupère les données du formulaire saisies par l'utilisateur

    let requestObj = {
        contact: {
            firstName: prenom.value,
            lastName: nom.value,
            address: adresse.value,
            city: ville.value,
            email: mail.value
        },
        products: idsArray
    }

    //

    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(requestObj),
    }
    
    fetch('http://localhost:3000/api/cameras/order', options)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            sum = 0
            for (let elem of data.products){
                sum += elem.price
            }
            window.location.href = "confirmation.html?orderId=" + data.orderId + "&orderAmount=" + sum/100 
        })
    }
}    
});

    

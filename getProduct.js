//On vient extraire l'URL
const query = window.location.search

//On va chercher le paramètre ID dans l'URL
const urlParams = new URLSearchParams(query)

//On stock l'ID du produit dans une variable
const productId = urlParams.get('productId')

function displayChoosenProduct(camera){

    const productImg = document.getElementById('thumbnail')
    productImg.innerHTML = '<img src="' + camera.imageUrl + ' " alt="' + camera.name + '">'

    const productTitle = document.getElementById('product_title')
    productTitle.innerText = camera.name

    const productPrice = document.getElementById('product_price')
    productPrice.innerText = camera.price/100 + '€'

    const productDescr = document.getElementById('product_description')
    productDescr.innerText = camera.description

    const productOptions = document.getElementById('product_options')
    for (let elem of camera.lenses){
        productOptions.innerHTML += '<option value="' + elem + '">' + elem + '</option>'
    }
}

function optionExist(Array, valueToDetect){
    for (let elem of Array){
        if (elem.lense === valueToDetect){
            return true
        } 
    }
    return false
}

function incrQuantity(Array, valueToDetect){
    for (let elem of Array){
        if (elem.lense === valueToDetect){
            elem.quantity++
        }
    }
    return Array
}

function isInTheCart(valueToDetect){

    let selectOption = document.getElementById('product_options')
    let choosenOption = selectOption.options[selectOption.selectedIndex].text
    
    let productType = JSON.parse(localStorage.getItem(valueToDetect))

    cart = []

    console.log(cart)

    if (productType){

        if (optionExist(productType, choosenOption)){
            productType = incrQuantity(productType, choosenOption)
        }

        else{
            productType.push({
                lense: choosenOption,
                quantity: 1,
            })
        }
    
        window.localStorage.setItem(productId, JSON.stringify(productType))
    }

    
    else if (selectOption.options[selectOption.selectedIndex].value !== 'null'){

        const product = {
            lense: choosenOption,
            quantity: 1
        }

        window.localStorage.setItem(productId, JSON.stringify(cart[productId]=[product]))
    }

}

function addToCart(){

    let selectOption = document.getElementById('product_options')
    
    if (selectOption.options[selectOption.selectedIndex].value === 'null'){
        console.log('valeur nulle')
        return
    }
    
    isInTheCart(productId)
};


  
async function fillProducts() {
    await fetch('http://localhost:3000/api/cameras/'+ productId) // will return info, but in wrong format
    .then((response) => response.json()) // will return info, in json format
    .then((cameras) => {
        displayChoosenProduct(cameras);
        addToCart(cameras);
    });      
}
    
fillProducts();


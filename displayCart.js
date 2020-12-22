//Formatage du panier actuel 

function formatageDuPanier(){
    
    let finalArray = []

    for (elems of Object.keys(localStorage)){

        let cart = JSON.parse(localStorage.getItem(elems))
    
        for (elements of cart){
    
            let panier = {
                id: elems,
                lense: elements.lense,
                quantity: elements.quantity,
            }

            finalArray.push(panier)
        }
    }

    return finalArray
}

//On stock le resultat de cette fonction dans une variable

let cart = formatageDuPanier()

//On affiche le panier en bouclant dans l'API et dans la variable cart

function displayCart(AllProducts){

    for (let elem of cart){

        let productRow = document.getElementById('row')
        
        for (let product of AllProducts){

            if(elem.id === product._id){

                let container = document.createElement('div')
                
                let productImg = document.createElement('img')
                productImg.src = product.imageUrl   

                let productName = document.createElement('p')
                let productNameText = document.createTextNode(product.name)
                productName.appendChild(productNameText)
                productName.className = 'name'

                let productOption = document.createElement('p')
                let productOptionText = document.createTextNode(elem.lense)
                productOption.appendChild(productOptionText)
                productOption.className = 'option'

                let productQuantity = document.createElement('p')
                let productQuantityText = document.createTextNode(elem.quantity)
                productQuantity.appendChild(productQuantityText)
                productQuantity.className = 'quantity'

                let productPrice = document.createElement('p')
                let productPriceText = document.createTextNode((elem.quantity * product.price)/100 )
                productPrice.appendChild(productPriceText)
                productPrice.className = 'price'

                container.appendChild(productImg)
                container.appendChild(productName)
                container.appendChild(productOption)
                container.appendChild(productQuantity)
                container.appendChild(productPrice)

                productRow.appendChild(container)
            }
        }
    }
}

//Fonction pour afficher le prix total du panier

function totalAmountCart(){
    
    let sum = 0
    let test = document.getElementsByClassName("price")
    let testtwo = document.getElementById("priceDisplay")
    
    for (let elem of test){   
        sum += parseInt(elem.textContent)
    }

    let productsTotal = document.createElement('p')
    let productsTotalText = document.createTextNode(sum + ' €')
    productsTotal.appendChild(productsTotalText)

    testtwo.appendChild(productsTotal)
}


async function fillProducts() {
    await fetch('http://localhost:3000/api/cameras/') // will return info, but in wrong format
    .then((response) => response.json()) // will return info, in json format
    .then((cameras) => {
        displayCart(cameras);
        totalAmountCart(cameras);
    });      
}


  
fillProducts();





// AFFICHAGE DES PRODUITS

function displayProducts(cameras){
  
  const productsDiv = document.getElementById('products');

  for (let elem of cameras){

    let cards = document.createElement('div')
    cards.className = 'card'

    let productImg = document.createElement('img')
    productImg.src = elem.imageUrl
    productImg.className = 'thumbnail'

    let productLink = document.createElement('a')
    let productLinkText = document.createTextNode('Voir')
    let productLinkUrl = document.URL + 'produit.html?productId=' + elem._id 
    productLink.setAttribute('href', productLinkUrl)
    productLink.appendChild(productLinkText)
    productLink.className = 'btn'

    let productName = document.createElement('h2')
    let productNameText = document.createTextNode(elem.name)
    productName.appendChild(productNameText)

    let productOption = document.createElement('p')
    let productOptionText = document.createTextNode(elem.lenses.length + ' option(s) disponibles')
    productOption.appendChild(productOptionText)
    productOption.className = 'option'

    let productPrice = document.createElement('p')
    let productPriceText = document.createTextNode(elem.price/100 + '€')
    productPrice.appendChild(productPriceText)
    productPrice.className = 'price'

    cards.appendChild(productImg)
    cards.appendChild(productLink)
    cards.appendChild(productName)
    cards.appendChild(productOption)
    cards.appendChild(productPrice)
    
    productsDiv.appendChild(cards)
    //productsDiv.innerHTML += '<div class="product"> <div class="thumbnail"> <picture> <img src="' + elem.imageUrl + '"> </picture> </div> <div class="text"> <h2>' + elem.name + '</h2> <p> Disponible avec ' + elem.lenses.length + ' lentille(s)</p> <p> <strong> ' + elem.price/100 + ' € </strong> </p> <a href="http://127.0.0.1:5501/produit.html?productId=' + elem._id + '">Consulter</a> </div> </div>';
  }
}

//AFFICHAGE D'UN PRODUIT

async function fillProducts() {
  await fetch('http://localhost:3000/api/cameras') // will return info, but in wrong format
    .then((response) => response.json()) // will return info, in json format
    .then((cameras) => {
      displayProducts(cameras);
    });      
}

fillProducts()
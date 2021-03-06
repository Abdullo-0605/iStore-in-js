document.querySelector("#button").addEventListener("click", addProduct);

function addProduct() {
  const nameValue = document.querySelector("#name").value;
  const priceValue = document.querySelector("#price").value;
  const descriptionValue = document.querySelector("#description").value;

  if (nameValue !== "" && priceValue !== "" && descriptionValue !== "") {
    const product = {
      name: nameValue,
      price: priceValue,
      description: descriptionValue,
    };

    postMethod(product);
  }
}


function getMethod() {
  fetch("https://ibs-school.herokuapp.com/api/v1/for-developer/product")
    .then(
      (res) => {
        console.log("then", res);
        return res.json();
      }
    )
    .then(
      (res) => {
        console.log(res);
        loopCards(res)
      }
    )
    .catch(
      (err) => {
        console.log("error", err);
      }
    )
}
getMethod()

function loopCards(cardsData) {
  var cardText = "";



  cardsData.forEach((card, index) => {
    cardText += `
          <div class="card">
                    <p class="product-name">${card.name}</p>
                    <p class="price">${card.price}</p>
                    <p class="description">${card.description}</p>
                    <div class="buttons-wrapper">
                        <button class="update">update</button>
                        <button class="delete" onclick="deleteMethod(${card.id})">delete</button>
                    </div>
                </div>
     `;
  });
  document.querySelector(".cards-wrapper").innerHTML = cardText;
}

function postMethod(data) {
  fetch("https://ibs-school.herokuapp.com/api/v1/for-developer/product", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(
      (res) => {
        console.log("success", res);
      }
    )
    .catch(
      (err) => {
        console.log("error", err);
      }
    );
}


function deleteMethod() {
  fetch(`https://ibs-school.herokuapp.com/api/v1/for-developer/product/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      getMethod();
    })
    .catch ((err) => {
        console.log(err);
    })
}

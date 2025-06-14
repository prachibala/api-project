let dArray = [];
let cartItems = [];

function onLoading() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            dArray = data.drinks;
            displayData(data.drinks);
        });
}

function displayData(data) {
    const leftContainer = document.getElementById("left-container");
    leftContainer.innerHTML = "";
    console.log(data);
    if (!data) {
        leftContainer.innerHTML = `
        <h1 class="notFound">RESULT NOT FOUND</h1>
        `;
        return;
    }

    for (const d of data) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img
            src="${d.strDrinkThumb}"
            class="card-img"/>
                    <div class="card-body">
                        <h4>Name: ${d.strDrink}</h4>
                        <p><b>Category:</b> <small>${d.strCategory}</small></p>
                        <p class="text-ellipsis"><b>Instruction:</b> <small>${d.strInstructions}</small></p>
                        <span class="card-btns"
                            ><button class="card-btn" onclick="addToCart('${d.idDrink}')">Add to cart</button>
                            <button class="card-btn" onclick="singleproduct('${d.idDrink}')">Details</button>
                        </span>
                    </div>
                </div>
        
        `;
        leftContainer.appendChild(card);
    }
}
function addToCart(dataId) {
    if (cartItems.length >= 7) {
        alert("You can only add maximum 7 items.");
        return;
    }
    const singleData = dArray.find((d) => d.idDrink == dataId);
    if (singleData) {
        cartItems.push(singleData);

        updateCartDisplay();

        console.log("Total items in cart:", cartItems.length);
        const totaCart = document.getElementById("total-cart");
        totaCart.innerHTML = `
        <h2 style="padding-top: 10px; padding-bottom: 15px">
                        Total Count: ${cartItems.length}
                    </h2>
        `;
    }
}
function updateCartDisplay() {
    const cartTbody = document.getElementById("cart-tbody");
    cartTbody.innerHTML = "";

    cartItems.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td class="sl-number">${index + 1}</td>
                    <td>
                        <img src="${
                            item.strDrinkThumb
                        }" class="cart-img" alt="${item.strDrink}" />
                    </td>
                    <td class="name">${item.strGlass}</td>
                `;
        cartTbody.appendChild(row);
    });
}

// ....................single card details.....................
function singleproduct(id) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => singleCardDetails(data.drinks));
}

function singleCardDetails(data) {
    // console.log(data[0]);
    const drink = data[0];
    const modal = document.getElementById("myModal");
    modal.innerHTML = "";
    modal.style.display = "block";
    const div = document.createElement("div");
    div.classList.add("modal-content");
    div.innerHTML = `
        <div class="modal-header">
            <span class="close">&times;</span>
            <img src="${drink.strDrinkThumb}" class="modal-img"/>
        </div>
        <div id="m-bdy">
            <h3>Name:${drink.strGlass}</h3>
            <p><b>Alcoholic:</b> ${drink.strAlcoholic}</p>
            <p><b>Category:</b> ${drink.strCategory}</p>
            <p><b>Manufactured:</b> ${drink.dateModified}</p>
            <p><b>Instructions:</b> ${drink.strInstructions}</p>
        </div>
    `;
    modal.appendChild(div);

    // ..................Close modal ...........
    modal.querySelector(".close").onclick = function () {
        modal.style.display = "none";
    };
}
// search section
document.getElementById("serch-btn").addEventListener("click", () => {
    // console.log("button");

    const searchField = document.getElementById("input");
    const inputValue = searchField.value.trim();
    console.log(inputValue);
    if (inputValue) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => displayData(data.drinks));
    }
    searchField.value = "";
});

onLoading();

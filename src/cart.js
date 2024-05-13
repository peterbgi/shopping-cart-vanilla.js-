let label = document.getElementById("label");

let shoppingcart = document.getElementById("shopping-cart");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let icon = document.getElementById("cartAmount");
    icon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);

};
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
       return (shoppingcart.innerHTML = basket.map((x) => { 
    let { item, id } = x;
    let search = shopItemsData.find((y) => y.id === id) || [];
    let {img, name, price} = search;
        return `
        <div class="cart-items">
            <img width="90" src="${img}">
            <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="price">${price} FT</p>
                        </h4>
                    </div>
                    
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-shield-minus"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-cart-plus"></i>
                    </div>

                    <h3><i onclick="removeItem(${id})" class="bi bi-trash3"></i></h3>
            </div>
        </div>
        `
       }).join(""))
    }
    else {
        shoppingcart.innerHTML = ``
        label.innerHTML = `
        <h2>A kosár üres.</h2>
        <a href="index.html"><button class="button">Irány a bolt</button></a>
        `
    }
};
generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem)

    if (search === undefined)
        {
            basket.push({
                id: selectedItem,
                item: 1
            });
        }
        else
        {
            search.item += 1;
        }

        generateCartItems();

        update(selectedItem);

        localStorage.setItem("data", JSON.stringify(basket));
    
};


let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem)

    if (search === undefined) return;
    else if (search.item === 0) return;
        else
        {
            search.item -= 1;
        }

        update(selectedItem)


        basket = basket.filter((x) => x.item !== 0);
        generateCartItems();
        localStorage.setItem("data", JSON.stringify(basket));
      
};

let update = (id) => {
    let search = basket.find((x) => x.id === id );

    document.getElementById(id).innerHTML = search.item;
    calculation();
    total();
 
};

let removeItem = (id) => {
    let selectedItem = id;

    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems();
    total();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
   
};

let deleteAll = () => {
    basket = []
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    localStorage.setItem("data", JSON.stringify(basket));
};

let total = () => {
    if  (basket.length !== 0)
        {
            let amount = basket.map((x) => {
                let {item, id} = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return item * search.price
            }).reduce((x ,y) => x + y)
            label.innerHTML = `
            <h2>Fizetendő: ${amount} FT</h2>
           <button onclick="deleteAll()" class="clear">Kosár űrítés</button> 
            `
        }else return;   
};
total();


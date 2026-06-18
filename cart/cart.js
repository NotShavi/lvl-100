let logged = JSON.parse(localStorage.getItem("loggedin"))
const or = document.getElementById("loginlink")
const cartdiv = document.getElementById("cart")
let cart = JSON.parse(localStorage.getItem("Cart")) || []
const body = document.getElementById("container")


if (logged === null) {
  logged = false
  localStorage.setItem("loggedin", JSON.stringify(false))
}

if (logged === false){
    or.innerHTML = `
        <a href="../signup/signup.html">Sign up</a>/<a href="../login/login.html">Login</a>
    `
}else{
    or.innerHTML = `
        Hello ${logged[0][0].toUpperCase()}${logged[0].slice(1,)}
    `
    const logout = document.createElement("button")
    logout.id = "logoutb"
    logout.innerHTML = "Logout from your account"
    linkdiv.appendChild(logout)
    logout.addEventListener("click",()=>{
        localStorage.setItem("loggedin",false)
        logged = false
        logout.remove()
        or.innerHTML = `
        <a href="../signup/signup.html">Sign up</a>/<a href="../login/login.html">Login</a>
        `
        cartdiv.innerHTML = "Login to use the cart"
        cartdiv.style.color = "red"
        cartdiv.style.border = "0"
        cartdiv.style.backgroundColor = "white"
        cartdiv.style.fontSize = "20px"
    })
}

console.log(JSON.parse(localStorage.getItem("Cart")))

function renderCart(li){
    cartdiv.innerHTML = ""
    if (logged === false){
        cartdiv.innerHTML = "Login to use the cart"
        cartdiv.style.color = "red"
        cartdiv.style.fontSize = "20px"
        cartdiv.style.backgroundColor = "white"
        cartdiv.style.border = 0
    }
    else if (li.length === 0){
        cartdiv.innerHTML = "Your cart is empty"
        cartdiv.style.color = "red"
        cartdiv.style.fontSize = "20px"
        cartdiv.style.backgroundColor = "white"
        cartdiv.style.border = 0
    }else{
        if (window.innerWidth<376){
            li.forEach((element) => {
                const item = document.createElement("div")
                let itemsquantity = element.quantity
                item.className = "itemdiv"
                item.innerHTML = `
                    <div class="iteminfo">
                        <div id="imgd">
                            <img src=${element.image} class="itemimg">
                            <div class="itemquantity">
                                <button class="minus">-</button>
                                <i class="quantity">${itemsquantity}</i>
                                <button class="plus">+</button>
                            </div>
                        </div>
                        <div class="ininfo">
                            <h3 class="itemname">${element.name}</h3>
                            <p class="itemsize">Size: ${element.size}</p>
                            <b class="itemprice">Price: ${element.price}.00$</b>
                            
                        </div>
                    </div>
                    <h2 class="itemtotalprice">Full price: ${element.price*itemsquantity}.00$</h2>
                `
                cartdiv.appendChild(item)
                const hr1 = document.createElement("hr")
                cartdiv.appendChild(hr1)
                item.querySelector(".minus").addEventListener("click",()=>{
                    element.quantity--;
                    if (element.quantity <= 0) {
                        cart = cart.filter(
                            val => !(val.name === element.name && val.size === element.size)
                        );
                    }
                    localStorage.setItem("Cart", JSON.stringify(cart));
                    renderCart(cart);
                })
                item.querySelector(".plus").addEventListener("click",()=>{
                    element.quantity++
                    localStorage.setItem("Cart", JSON.stringify(cart))
                    renderCart(cart)
                })
            });
        }else{
            li.forEach((element) => {
                const item = document.createElement("div")
                let itemsquantity = element.quantity
                item.className = "itemdiv"
                item.innerHTML = `
                    <div class="iteminfo">
                        <img src=${element.image} class="itemimg">
                        <div class="ininfo">
                            <h3 class="itemname">${element.name}</h3>
                            <p class="itemsize">Size: ${element.size}</p>
                            <b class="itemprice">Price: ${element.price}.00$</b>
                            <div class="itemquantity">
                                <button class="minus">-</button>
                                <i class="quantity">${itemsquantity}</i>
                                <button class="plus">+</button>
                            </div>
                        </div>
                    </div>
                    <h2 class="itemtotalprice">Full price: ${element.price*itemsquantity}.00$</h2>
                `
                cartdiv.appendChild(item)
                const hr1 = document.createElement("hr")
                cartdiv.appendChild(hr1)
                item.querySelector(".minus").addEventListener("click",()=>{
                    element.quantity--;
                    if (element.quantity <= 0) {
                        cart = cart.filter(
                            val => !(val.name === element.name && val.size === element.size)
                        );
                    }
                    localStorage.setItem("Cart", JSON.stringify(cart));
                    renderCart(cart);
                })
                item.querySelector(".plus").addEventListener("click",()=>{
                    element.quantity++
                    localStorage.setItem("Cart", JSON.stringify(cart))
                    renderCart(cart)
                })
            });
        }
        cartdiv.style.border = "1px solid black"
        cartdiv.style.backgroundColor = "#f4f6f9"
        
        let totalprice = 0
        li.forEach((item)=>{
            totalprice+=item.price*item.quantity
        })
        console.log(totalprice)
        const totalpriceh2 = document.createElement("h2")
        totalpriceh2.innerHTML = `Total price of your cart: ${totalprice}.00$`
        cartdiv.appendChild(totalpriceh2)
        const hr = document.createElement("hr")
        cartdiv.appendChild(hr)

        const buttondiv = document.createElement("div")
        buttondiv.id = "buttondiv"
        buttondiv.innerHTML =`
            <button id="buy" class="buttondiv">Purchase the items</button>
            <button id="clear" class="buttondiv">Clear the cart</button>
        `
        if (li.length>0){
            cartdiv.appendChild(buttondiv)
        }

        document.getElementById("clear").addEventListener('click',()=>{
            cart = []
            localStorage.setItem("Cart", JSON.stringify(cart))
            renderCart(cart)
        })

        document.getElementById("buy").addEventListener("click",()=>{
            cart = []
            localStorage.setItem("Cart", JSON.stringify(cart))
            renderCart(cart)
            let quant = 0
            let fullprice = 0
            li.forEach((val)=>{
                quant+=val.quantity
                fullprice+=val.quantity*val.price
            })
            console.log(quant)
            console.log(fullprice)
            const message = document.createElement("div")
            message.id = "message"
            message.innerHTML = `
                <div id="messageh2">
                    <h2 id="h2">Successfully Purchased</h2>
                </div>
                <div id="messageinfo">
                    <b id="totalquant">Total items purchased: ${quant}</b>
                    <b id="fullprice">Total price payed: ${fullprice}.00$</b>
                </div>
                <div id="thanks">
                    <h2 id="lasth2">Thanks for choosing us</h2>
                    <p id="deliver">Ordered items will be delivered to you soon</p>
                    <button id="messagebutton"><a href="../index.html">Store page</a></button>
                </div>
                <button id="x">X</button>
            `
            body.appendChild(message)
            cart = []
            localStorage.setItem("Cart", JSON.stringify(cart))
            cartdiv.innerHTML = ""
            cartdiv.style.border = 0
            cartdiv.style.backgroundColor = "white"
            document.getElementById("x").addEventListener("click",()=>{
                message.remove()
                cartdiv.innerHTML = "Your cart is empty"
                // cartdiv.style.border = "1px solid black"
                // cartdiv.style.backgroundColor = "#f4f6f9"
            })
        })
    }
    
}

renderCart(cart)
window.addEventListener("resize", () => {
    renderCart(cart);
});
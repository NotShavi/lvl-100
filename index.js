import items from "./items/items.js"
// ინფორმაციის იმპორტი

// localstorage ში loggedin ის შექმნა თუ უკვე არ არის შექმნილი
let logged = JSON.parse(localStorage.getItem("loggedin"))

if (logged === null) {
  logged = false
  localStorage.setItem("loggedin", JSON.stringify(false))
}

// საჭირო ელემენტები

const clothes = items
const x = document.createElement('button')
const message = document.createElement("div")
const body = document.querySelector("body")
let cart = JSON.parse(localStorage.getItem("Cart")) || []
const or = document.getElementById("loginlink")
const linkdiv = document.getElementById("linkdiv")
const main = document.getElementById("right")
const form = document.getElementById("searchform")
const nofound = document.createElement("h2")
const filter = document.getElementById("filter")
const sorting = document.getElementById("sorting")

// თუ არარის რეგისტრირებული signup/login ლინკების გამოტანა სხვა შემთვევაში კი მისალმების და logout ის გამოტანა

if (logged === false){
    or.innerHTML = `
        <a href="signup/signup.html">Sign up</a>/<a href="login/login.html">Login</a>
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
        <a href="signup/signup.html">Sign up</a>/<a href="login/login.html">Login</a>
        `
    })
}


// render ფუნქციის შექმნა საიტზე ელემენტების გამოსატანად

function renderItems(li){

    // ვამოწმებთ გადაცემულ სიას,თუ მისი სიგრძე არის 0 გამოაქვს nofound მესიჯი

    if (!li.length){
        main.innerHTML = ''
        
        nofound.innerHTML="No item was found"
        nofound.id = "nofound"
        main.appendChild(nofound)
        nofound.style.color = "red"
        console.log("Hello")
    }else{
    // სხვა შემთხვევაში იწყება რენდერი foreach ის გამოყენებით
    
    li.forEach((item)=>{
        const newdiv = document.createElement("div")
        newdiv.className = "items"

        // იქმნება card-ები თითოეული ნივთისთვის

        newdiv.innerHTML = `
            <img src=${item.img} class="images">
            <p class="itemnames">${item.title}</p>
            <b class="prices">${item.price}.00 $</b>
            <p>Choose the size:</p>
            <form>
                <div class="inps">
                    <div class="inputs">
                        <input type="radio" name="size" value="S" required>
                        <label>S</label>
                    </div>
                    <div class="inputs">
                        <input type="radio" name="size" value="M">
                        <label>M</label>
                    </div>
                    <div class="inputs">
                        <input type="radio" name="size" value="L">
                        <label>L</label>
                    </div>
                    <div class="inputs">
                        <input type="radio" name="size" value="XL">
                        <label style="margin-right:2px;">XL</label>
                    </div>
                    <div class="inputs">
                        <input type="radio" name="size" value="XS">
                        <label>XS</label>
                    </div>
                </div>

                <div class="submitdiv">
                    <button class="submit">Add to Cart</button>
                </div>
            </form>
        `

        

        const form = newdiv.querySelector("form")
        
        // div-ებში შექმნილ radio-ების form-ს ვუმატებთ eventlistener-ს

        form.addEventListener("submit",(e)=>{
            e.preventDefault()

            // ვამოწმებთ მომხმარებელი შესულია თუ არა სისტემაში.თუ არა გამოგვაქვს მესიჯი თუ კი ვქმნით currentproduct ცვლადს სადაც არჩეული ნივთი ემატება

            if (!logged){
                message.id = "message"
                message.innerHTML = `
                    <div id="inmessage">
                    <h3 id="registered">You have to login in order to add items to the cart</h3>
                    <p><a href="signup/signup.html">Sign up</a>/<a href="login/login.html">Login</a></p>
                    </div>
                `
                body.appendChild(message)
                x.innerHTML = "X"
                x.id = "x"
                message.appendChild(x)
                form.reset()
            }
            else{
                const currentProduct = {
                name: newdiv.querySelector(".itemnames").textContent,
                price: Number(newdiv.querySelector(".prices").textContent.replace("$","")),
                image: newdiv.querySelector(".images").src,
                size: form.size.value,
                quantity: 1
            }

            // ვამოწმებთ არის თუ არა cart ში არჩეული ნივთი უკვე,თუ კი მაშინ quantity ს ვზრდით,თუ არა უბრალოდ ვამატებთ

            const exists = cart.find(p =>
                p.name === currentProduct.name &&
                p.size === currentProduct.size
            )

            if (exists){
                exists.quantity++
            } else {
                cart.push(currentProduct)
            }

            localStorage.setItem("Cart", JSON.stringify(cart))
            form.reset()
            }
            
        })

        main.appendChild(newdiv)
    })
}
}

// დარენდერება საიტზე
renderItems(clothes)


// message-ის გაქრობის eventlistener

x.addEventListener("click",()=>{
    message.remove()
})

// ფილტრის ფუნქცია
function updateItems() {

    // ახალი სიის შექმნა ფილტრისთვის
    let newlist = [...clothes];

    // input-ის მიხედვით ფილტრი
    if (form.text.value !== "") {
        newlist = newlist.filter(cloth =>
            cloth.title.toLowerCase().includes(form.text.value.toLowerCase())
        );
    }

    // ფილტრი კატეგორიების მიხედვით
    if (filter.check.value === "hoodies") {
        newlist = newlist.filter(cloth =>
            cloth.title.toLowerCase().includes("hoodie")
        );
    } else if (filter.check.value === "jackets") {
        newlist = newlist.filter(cloth =>
            cloth.title.toLowerCase().includes("jacket")
        );
    } else if (filter.check.value === "shirts") {
        newlist = newlist.filter(cloth =>
            cloth.title.toLowerCase().includes("shirt")
        );
    } else if (filter.check.value === "extras") {
        newlist = newlist.filter(cloth =>
            cloth.title.toLowerCase().includes("costume") ||
            cloth.title.toLowerCase().includes("santa")
        );
    }

    // სორტირება ფასის მიხედვით თუ მონიშნულია
    if (sorting.value === "pricedown") {
        newlist.sort((a, b) => b.price - a.price);
    } else if (sorting.value === "priceup") {
        newlist.sort((a, b) => a.price - b.price);
    }

    main.innerHTML = "";
    renderItems(newlist);
}



// eventlistener input-ზე

form.addEventListener("input",updateItems)

// eventlistener category-ზე

filter.addEventListener("change",updateItems)

// eventlistener selection-ზე

sorting.addEventListener("change",updateItems);
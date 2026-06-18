const form = document.querySelector("form")
const checkbox = document.getElementById("show")
const passwordinp = document.getElementById("password")
const body = document.querySelector("body")
const passdiv = document.getElementById("passdiv")
const emaildiv = document.getElementById("emaildiv")
const x = document.createElement('button')
const message = document.createElement("div")
let users = JSON.parse(localStorage.getItem("Users")) || []
localStorage.setItem("loggedin",JSON.stringify(false))
checkbox.addEventListener("change",()=>{
    if (checkbox.checked){
        passwordinp.type = "text"
    }else{
        passwordinp.type = "password"
    }
})

if (JSON.parse(localStorage.getItem("loggedin"))){
    console.log("Logged in")
}else{
    console.log("notlogged in")
}

class user{
    constructor(firstname,lastname,email,password){
        this.firstname = firstname,
        this.lastname = lastname,
        this.email = email
        this.password = password
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const name = e.target.firstname.value
    const lastname = e.target.lastname.value
    const email = e.target.email.value
    const password = e.target.password.value
    const info = new user(name,lastname,email,password)
    let passmessage = document.createElement("p")
    let emailmessage = document.createElement("p")
    let emailpassed = true
    let passpassed = true
    if (password.length<8){
        passdiv.innerHTML = ""
        passmessage.innerHTML = "Password's length should be more than 8"
        passmessage.style.color = "red"
        passdiv.appendChild(passmessage)
        localStorage.setItem("Users",JSON.stringify(users))
        passpassed = false 
    }
    else{
        passdiv.innerHTML = ""
        passpassed = true
    }
    if (users.some((value)=>{
        return info.email === value.email
    })){
        emaildiv.innerHTML = ""
        emailmessage.innerHTML = "Account with this email is already registered"
        emailmessage.style.color = "red"
        emailpassed = false 
        emaildiv.appendChild(emailmessage)
    }else{
        emaildiv.innerHTML = ""
        emailpassed = true
    }
    
    if (emailpassed && passpassed){
        users.push(info)
        localStorage.setItem("Users",JSON.stringify(users))
        
        message.id = "message"
        message.innerHTML = `
            <div id="inmessage">
            <h3 id="registered">You have successfully registered</h3>
            <a href="../login/login.html"><button id="log">Login</button></a>
            </div>
        `
        body.appendChild(message)
        x.innerHTML = "X"
        x.id = "x"
        message.appendChild(x)
        e.target.reset()
    }
    
})

x.addEventListener("click",()=>{
    message.remove()
})

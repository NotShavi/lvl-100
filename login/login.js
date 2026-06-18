// საჭირო ელემენტების წამოღება/შექმნა
const form = document.querySelector("form")
const div = document.getElementById("form")
const users = JSON.parse(localStorage.getItem("Users")) || []
const checkbox = document.getElementById("show")
const passwordinp = document.getElementById("password")
const failed = document.createElement("h3")
const x = document.createElement('button')
const message = document.createElement("div")
const body = document.querySelector("body")
failed.id = "failed"
failed.innerHTML = "Email or password is incorrect"
failed.style.color = "red"


// eventlistener პაროლის გამოსაჩენად
checkbox.addEventListener("change",()=>{
    if (checkbox.checked){
        passwordinp.type = "text"
    }else{
        passwordinp.type = "password"
    }
})


// eventlistener ფორმის გამოგზავნაზე
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const password = e.target.password.value
    const email = e.target.email.value

    // თუ ამ ემაილით და პაროლით ნამდვილად არის მომხმარებელი დარეგისტრირებული მაშინ გამოგვაქვს შესაბამისი მესიჯი
    if (users.some((value) => {
        return value.email === email && value.password === password
    })){
        let firstname = ""
        let lastname = ""
        users.forEach((val) => {
            if (val.email === email && val.password === password){
                firstname = val.firstname
                lastname = val.lastname
            } 
        });
        localStorage.setItem("loggedin",JSON.stringify([firstname,lastname]))
        e.target.reset()
        failed.remove()
        message.id = "message"
        message.innerHTML = `
            <div id="inmessage">
            <h3 id="registered">You have successfully logged in</h3>
            <a href="../index.html"><button id="log">Store page</button></a>
            </div>
        `
        body.appendChild(message)
        x.innerHTML = "X"
        x.id = "x"
        message.appendChild(x)
    }else{
        div.appendChild(failed)
    }
})


// მესიჯის წაშლის eventlistener
x.addEventListener("click",()=>{
    message.remove()
})
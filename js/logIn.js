let emailList = ['a@gmail.com', 's@gmail.com'];
let passwordList = ['asdf', 'sdfg'];
let form = document.querySelector("#form");
form.addEventListener("submit", checkUser);

function checkUser(e){
    e.preventDefault();
    let userEmail = document.querySelector("#email").value;
    let userPassword = document.querySelector("#password").value;

    if(emailList.indexOf(userEmail) !== -1 && passwordList.indexOf(userPassword) !== -1){
        console.log("Our user");
        window.location.href = "./exam.html";
    }
    else if(emailList.indexOf(userEmail) === -1){
        alert("This email does not belong to any of my Students!");
    }
    else{
        alert("Password chara exam hobe na!");
    }
}


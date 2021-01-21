let emailList = ['a@gmail.com', 'adi@student.com', 's@gmail.com'];
let passwordList = ['asdf', 'adi', 'sdfg'];
let todaysExam = "./examHSCPhysicsC3.1.html";
let form = document.querySelector("#form");
form.addEventListener("submit", checkUser);

function checkUser(e){
    e.preventDefault();
    let userEmail = document.querySelector("#email").value;
    let userPassword = document.querySelector("#password").value;

    if(emailList.indexOf(userEmail) !== -1 && passwordList.indexOf(userPassword) !== -1){
        console.log("Our user");
        window.location.href = todaysExam;
    }
    else if(emailList.indexOf(userEmail) === -1){
        alert("This email does not belong to any of my Students!");
    }
    else{
        alert("Password chara exam hobe na!");
    }
}


let questionsList = document.querySelector(".questions_list");
let questionBox = document.querySelectorAll(".question_box");
let correctAnswersList = [3,4,4,4,3,1,1,3,1,1,2,3,2,3,3,2,2,2,3,1];
let submitButton = document.querySelector("#submitButton"); 
let remainingTime = document.querySelector("#rTime"); 
let startButton = document.querySelector("#startButton"); 

// Exam Times
let examEndTime = new Date("Jan 21, 2021 16:55:00").getTime();
let currentTimeCheck = new Date().getTime();
let examDuration = (10) * 60 * 1000;

startButton.addEventListener("click", startExam);
submitButton.addEventListener("click", getMark);

//Calculate Marks
function getMark(){
    
    let userAnswersList = [];
    let mark = 0;
    
    for(let i = 0; i < correctAnswersList.length; i++){
        //User checked options
        let userInput = document.querySelector("input[name='q"+(i+1)+"_options']:checked");
        let userInputLabel = document.querySelector("input[name='q"+(i+1)+"_options']:checked" + " + label");
        //Correct answers label
        let correctAnswerLabel = document.querySelector("input[name='q"+(i+1)+"_options'][value='"+correctAnswersList[i]+"'] + label");

        if(userInput != null){
            userAnswersList.push(userInput.value);

            if(userAnswersList[i] == correctAnswersList[i]){
                mark++;
                questionBox[i].style.borderLeft = "2px solid green";
                userInputLabel.style.color = "green";

            }
            else{
                questionBox[i].style.borderLeft = "2px solid red";
                userInputLabel.style.color = "red";
                correctAnswerLabel.style.color = "green";
            }
        }
        else{
            userAnswersList.push("no answer");
            
            questionBox[i].style.borderLeft = "2px solid red";
            correctAnswerLabel.style.color = "green";
            }
        
}

    console.log(mark);
    console.log(userAnswersList);

    document.querySelector("label[for='mark']").style.display = "block";
    document.querySelector("#mark").value = mark + " / " + correctAnswersList.length;
    document.querySelector("#mark").style.display = "inline";
    startButton.style.display = "none";
    submitButton.style.display = "none";
    
    remainingTime.style.display = "none";
    // questionsList.style.display = "none";
 }





 function startExam(){
    let currentTimeCheck = new Date().getTime();
    
    //If exam started
    if(currentTimeCheck >= examEndTime - examDuration && currentTimeCheck <= examEndTime){

    questionsList.style.display = "block";
    submitButton.style.display = "block";
    startButton.style.display = "none";

    // let time = 60;
    // rTime = document.querySelector("#rTime");
    // rTime.innerHTML = "Time Remaining: " + "<span style='background-color: red; color: white; padding: .5rem;'>" + (time) + "</span>"  + " Seconds";
    // let timer = setInterval(function(){
    //     rTime.innerHTML = "Time Remaining: " + "<span style='background-color: red; color: white; padding: .5rem;'>" + (time - 1) + "</span>"  + " Seconds";
    //     time -= 1;
    //     if(time <= 0){
    //         getMark();
            
    //         submitButton.style.display = "none";
    //         clearInterval(timer);
    //     }
        
    // }, 1000);


// Update the count down every 1 second
let x = setInterval(function() {
  // Get today's date and time
  let now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = examEndTime - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result
  remainingTime.innerHTML = "Time Remaining: " + "<span style='background-color: red; color: white; padding: .5rem;'>" + hours + " h "
  + minutes + " m " + seconds + " s </span>";
    
  // If the count down is over
  if (distance < 0) {
    clearInterval(x);
    getMark();
    submitButton.style.display = "none";
    
  }
}, 1000);

    }
    //If exam time expired
    else if(currentTimeCheck >= examEndTime){
        remainingTime.innerHTML = "EXAM TIME EXPIRED! Going out in 3... 2... 1...";
        setTimeout(function(){ window.location.href = "./logIn.html"; }, 3000);
        
    }
    //If exam hasn't started yet
    else{
        var distance = examEndTime - currentTimeCheck - examDuration;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        remainingTime.innerHTML = "Exam will start in " + hours + " h " + minutes + " m ";
        
    }


 }

// if(currentTimeCheck >= examEndTime){
//         remainingTime.style.color = "red";
//         remainingTime.innerHTML = "EXAM TIME EXPIRED!";
        
//     }







// ----------Security----------------------

let reload = false;
if((currentTimeCheck < examEndTime - examDuration || currentTimeCheck >= examEndTime)){

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        if (mutationRecord.type === 'childList') {
            console.log('A child node has been added or removed.');
            reload = true;
        }
        if (mutationRecord.type === 'attributes') {
            console.log('The ' + mutationRecord.attributeName + ' attribute was modified.');
            reload = true;
        }

        if (mutationRecord.type === 'characterData') {
        if (mutationRecord.target.parentNode.tagName.toLowerCase() === 'style') {
          console.log('style contents changed');
          reload = true;
        }
      }

      mutationRecord.addedNodes.forEach(node => {
        if (node.matches &&
        node.matches('style:not([data-href]), link[rel="stylesheet"]')) {
          console.log('style added', node);
          reload = true;
        }
      });
        


      if(reload == true){
          window.location.reload(true);
      }

    });    
});


let target1 = questionsList;
let target2 = submitButton;

const config = { attributes: true,
    childList: false,
    subtree: true,
    attributeOldValue: true,
    characterData: true  };

// observer.observe(target1, config);
// observer.observe(target2, config);

observer.observe(document.documentElement, config);


}

//Disable right click
addEventListener('contextmenu', e => e.preventDefault(), false);

//Disable devtool shortcut, copy/paste
 addEventListener('keydown', e => {
  if(e.keyCode === 123 /* F12: Chrome, Edge dev tools */ || 
    (e.shiftKey && e.ctrlKey && (
     e.keyCode === 73 /* + I: Chrome, FF dev tools */ || 
     e.keyCode === 67 /* + C: Chrome, FF inspect el */ || 
     e.keyCode === 74 /* + J: Chrome, FF console */ || 
     e.keyCode === 75 /* + K: FF web console */ || 
     e.keyCode === 83 /* + S: FF debugger */ || 
     e.keyCode === 69 /* + E: FF network */ || 
     e.keyCode === 77 /* + M: FF responsive design mode */)) ||
    (e.shiftKey && (
     e.keyCode === 118 /* + F5: Firefox style editor */ || 
     e.keyCode === 116 /* + F5: Firefox performance */)) ||
    (e.ctrlKey && e.keyCode === 85 /* + U: Chrome, FF view source */) ||
    (e.ctrlKey && e.shiftKey && e.keyCode === 67) ||/* Opera, devtool*/ 
    (e.ctrlKey && e.keyCode === 67) ||/* copy */
    (e.ctrlKey && e.keyCode === 86)
    ) {
    e.preventDefault();
  }
}, false);

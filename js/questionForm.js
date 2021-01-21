let addQuestionButtton = document.querySelector("#addQuestionButtton");
let submitButton = document.querySelector("#submitButton");
let questionBox = document.querySelector(".questionBox");

addQuestionButtton.addEventListener("click", addQuestion);
let questionIdNumberIncrement = 0;
function addQuestion(){
    questionIdNumberIncrement++;

    //Creating question Label
    let newQuestionLabel = document.createElement("label");
    newQuestionLabel.setAttribute("for", "question" + questionIdNumberIncrement);
    labelText = document.createTextNode("Question" +questionIdNumberIncrement+ ": ");
    newQuestionLabel.appendChild(labelText);

    //Creating question
    let newQuestion = document.createElement("input");
    newQuestion.setAttribute("id", "question" + questionIdNumberIncrement);
    newQuestion.setAttribute("placeholder", "Your question here...")
    
    //Appending question and label to questionBox
    questionBox.appendChild(newQuestionLabel);
    questionBox.appendChild(newQuestion);

    //Creating 4 options
    for(let i=1;i<=4;i++){
        let newOption = document.createElement("input");
        newOption.setAttribute("class", "option" + i);
        newOption.setAttribute("placeholder", "Option " + i + " here...")
        questionBox.appendChild(newOption);
    }
    questionBox.appendChild(document.createElement("br"));

    console.log("Question added!");




}
window.addEventListener('DOMContentLoaded', () => {
  //Variables
  const submitButton = document.querySelector('#btnSubmit');
  const resetButton = document.querySelector('#btnReset');
  const start = document.querySelector('#start');
  const scoreElement = document.querySelector('#score');
  let sec = 59;

  //display timer
  function timer(){
    const timer = setInterval(function(){
        document.getElementById('time').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            checkScore();
        }
    }, 1000);
  }

  //start button event listener
  start.addEventListener('click', function () {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    timer();
  });

  // quizArray QUESTIONS & ANSWERS
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'Who is Pod Instructor for the legendary Code Busters?',
      o: ['Grace Hopper', 'Ada Lovelace', 'Lisa', 'Bill Gates'],
      a: 2,
    },
    {
      q: 'At what time did the JavaScript Assessment end?',
      o: ['3.00pm', '3.30am', '2.00pm', '3.30pm'],
      a: 3,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                    <p class="question"> Q - ${quizItem.q}</p>
                    <li class="list-group-item mt-2" id="li_${index}_0">
                      <input class="disable" type="radio" name="radio${index}" id="radio_${index}_0"> 
                      ${quizItem.o[0]}
                    </li>
                    <li class="list-group-item" id="li_${index}_1">
                      <input class="disable" type="radio" name="radio${index}" id="radio_${index}_1"> 
                      ${quizItem.o[1]}
                    </li>
                    <li class="list-group-item"  id="li_${index}_2">
                      <input class="disable" type="radio" name="radio${index}" id="radio_${index}_2"> 
                      ${quizItem.o[2]}
                    </li>
                    <li class="list-group-item"  id="li_${index}_3">
                      <input class="disable" type="radio" name="radio${index}" id="radio_${index}_3"> 
                      ${quizItem.o[3]}
                    </li>
                    </ul>
                    <div><br></div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // call the displayQuiz function
  displayQuiz();
  
  // Calculate the score
  checkScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer (supplied explanation)
        //naming the list item and radio button in simplified terms (my explanation)
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        //checking if the answer is the current li element
        if (quizItem.a == i) {
          //changes background colour of li element
          liElement.style.backgroundColor = '#c8d9df';
          //checks if corrosponding radio element is also checked
          if(radioElement.checked){
            score++;
            liElement.style.backgroundColor = '#87CEFA';
          }
        };
      }

      //disable the submit button and remove timer
      submitButton.disabled = true;
      submitButton.innerHTML = 'It is cast in stone'
      sec = 0;

      //disable radio buttons
      for(let i=0; i < 5; i++) {
        document.querySelector(`#radio_${i}_0`).disabled = true;
        document.querySelector(`#radio_${i}_1`).disabled = true;
        document.querySelector(`#radio_${i}_2`).disabled = true;
        document.querySelector(`#radio_${i}_3`).disabled = true;
      }
    });

    //display score result
    switch (score) {
      case 0: scoreElement.innerHTML= `Your result is: 0/5, You are a Muggle.`;
        break;
      case 1: scoreElement.innerHTML= `Your result is: 1/5, It's slightly Dreadful.`;
        break;
      case 2: scoreElement.innerHTML= `Your result is: 2/5, You have recieved 'Poor' for your exam results.`;
        break;
      case 3: scoreElement.innerHTML= `Your result is: 3/5, This is Acceptable. Somewhat.`;
        break;
      case 4: scoreElement.innerHTML= `Your result is: 4/5, You Exceed Expectations.`;
        break;
      case 5: scoreElement.innerHTML= `Your result is: 5/5, Hermione is proud of you.`;
        break;
      default: scoreElement.innerHTML= `Your result is: ${score}/5`;
    }
  }

  ////EVENT LISTENERS
  // submit button event listener (me)
  submitButton.addEventListener('click', checkScore); 
  
  //reset button;
  resetButton.addEventListener('click', function() {
    const webAddress = window.location.href;
    window.location.assign(`${webAddress}`);
  });
});





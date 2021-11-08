$(function () {
  //document ready

  // Questions array
  const questions = [
    {
      question:
        "What vehicles did the Empire use in its assault on the rebels’ Hoth base?",
      choices: ["Snowspeeders", "TIE Fighters ", "AT-ATs", "TIE Bombers"],
      answer: "option3",
    },
    {
      question: "Which one of these bounty hunters was a droid?",
      choices: ["Boba Fett", "IG-88", "Jango Fett", "Bossk"],
      answer: "option2",
    },
    {
      question:
        "Who infiltrated Jabba’s palace dressed as a bounty hunter named Boussh?",
      choices: [
        "Luke Skywalker",
        "Lando Calrissian",
        "Chewbacca",
        "Princess Leia",
      ],
      answer: "option4",
    },
    {
      question:
        "Which creatures helped the rebels to destroy the Imperial shield generator at the forest moon of Endor?",
      choices: ["Gungans", "Ewoks", "Jawas", "Wookiees"],
      answer: "option2",
    },
    {
      question:
        "Who first discovered stormtroopers on Cloud City but couldn’t tell his friends?",
      choices: ["R2-D2", "Chewbacca", "Han Solo", "C-3PO"],
      answer: "option4",
    },
    {
      question:
        "Before Princess Leia is captured she hides the Death Star plans in the memory of R2-D2. To which planet did R2-D2 flees with fellow droid C-3PO?",
      choices: ["Dagobah", "Anoat", "Tatooine", "Bespin"],
      answer: "option3",
    },
    {
      question: "How many forms of communication does C-3PO speak?",
      choices: [
        "Over 6 million",
        "Over 6,000",
        "Over 3 million ",
        "Over 3,000",
      ],
      answer: "option1",
    },
    {
      question: "What is the Rebel Alliance’s fastest starfighter?",
      choices: ["X Wing", "A Wing", "B Wing", "Y Wing "],
      answer: "option2",
    },
    {
      question:
        "What part of the pit droid did Jar Jar have to hit to get it to stop acting up?",
      choices: ["Head", "Belly", "Nose", "Back"],
      answer: "option3",
    },
    {
      question: "What terrible creature attacks Luke Skywalker on Hoth?",
      choices: ["Rancor", "Tauntaun", "Krayt dragon", "Wampa"],
      answer: "option4",
    },
    {
      question:
        "Which Republic Senator was also the leader of the rebellion against the Empire?",
      choices: [
        "Padmé Amidala",
        "Mon Mothma",
        "Toonbuck Toora",
        "Princess Leia",
      ],
      answer: "option2",
    },
    {
      question:
        "What did R2-D2 do that helped the Millennium Falcon escape from Darth Vader at Cloud City?",
      choices: [
        "He fixed the laser cannon",
        "He opened the door",
        "He repaired the shields",
        "He fixed the hyperdrive",
      ],
      answer: "option4",
    },
    {
      question:
        "Who said this quote? “I’m just a simple man, trying to make my way in the universe.”",
      choices: ["Dengar", "Jango Fet", "Boba Fett", "The Mandalorian"],
      answer: "option2",
    },
    {
      question: "What planet is Cad Bane from?",
      choices: ["Tatooine", "Coruscant", "Duro", "Trandoshan"],
      answer: "option3",
    },
    {
      question: "What is Asajj Ventress’s favorite animal?",
      choices: ["Dianoga", "Nexxu", "Snake", "Acklay"],
      answer: "option3",
    },
    {
      question: "What species is Bossk?",
      choices: ["Rodians", "Trandoshans", "Neimoidians", "Gungans"],
      answer: "option2",
    },
    {
      question:
        "Who successfully tracked the Millennium Falcon and brought Han Solo to Jabba the Hutt?",
      choices: ["Cad Bane", "Bossk", "Zam Wesell", "Boba Fett"],
      answer: "option4",
    },
    {
      question: "Bounty Hunter with a sield-hat.",
      choices: ["IG-88", "Aurra Sing", "Embo", "Dengar"],
      answer: "option3",
    },
    {
      question: "Female bounty hunter of same species (Zabrak) as Darth Maul.",
      choices: ["Jas Emari", "Sugi", "Embo", "Cad Bane"],
      answer: "option2",
    },
    {
      question: "Bounty Hunter known for hunting down Wookiees.",
      choices: ["Sugi", "Jas Emar", "Dengar", "Bossk"],
      answer: "option2",
    },
  ];

  // initial variables

  let questionCounter = 0;
  let score = 0;
  let timer = 0;
  let lastAnswer = true;
  let gradePercentage = 0;

  //global variables for visual/audio elements

  //emojis
  const correctEmoji = '<i class="fab fa-jedi-order">&nbsp;</i>';
  const wrongEmoji = '<i class="fab fa-galactic-republic">&nbsp;</i>';

  //screens
  const $previewContainer = $(".preview-container");
  const $questionsContainer = $(".question-container");
  const $scoreContainer = $(".score-container");

  //audio
  const $audioIntro = $("audio")[0];
  const $audioStart = $("audio")[1];
  const $audioBackground = $("audio")[2];
  const $audioCorrectAnswer = $("audio")[3];
  const $audioWrongAnswer = $("audio")[4];
  const $audioControlYourself = $("audio")[5];
  const $audioNextBtn = $("audio")[6];
  const $audioScoreBelow10 = $("audio")[7];
  const $audioScoreBelow30 = $("audio")[8];
  const $audioScoreBelow50 = $("audio")[9];
  const $audioScoreBelow80 = $("audio")[10];
  const $audioScoreBelow100 = $("audio")[11];
  const $audioPerfectScore = $("audio")[12];
  const $audioAlarm = $("audio")[13];

  /***************************/
  /***** Event Listeners *****/
  /***************************/

  // App Start event listener

  $(".go-btn").on("click", () => {
    const $introScreen = $(".intro-modal");
    $introScreen.addClass("disable"); //disable intro
    $previewContainer.removeClass("disable"); //show preview screen
    $audioIntro.play();
  });

  //Event listener to start quiz

  $(".start-quiz-btn").on("click", () => {
    //restart values
    timer = 60;
    score = 0;
    lastAnswer = true;
    questionCounter = 0;
    $(".counter").text(timer);
    $(".time-left").css("color", "inherit"); //reset counter color
    loadQuestion(questions[questionCounter]);
    $previewContainer.addClass("disable"); //disable preview screen
    $questionsContainer.removeClass("disable"); //show questions screen
    $audioIntro.load();
    $audioStart.play();
    $audioBackground.play();
  });

  //event listener for options

  $(".option").on("click", function () {
    //for some reason arrow funtions don't work here

    //This gets the id of the selected element ('this') to use it as an argument in the next function
    let userSelectedElementId = $(this).attr("id");

    //call the function to compare the selected element id vs the selected element stored answer
    compareSelection(userSelectedElementId, this);

    //Check if this is the last question in order to show the next button or the end screen
    if (questionCounter + 1 < questions.length) {
      //disable options and show the "next" button on click
      $(".option").addClass("disableClick");
      $(".next-btn").removeClass("disable");
    } else {
      $(".option").addClass("disableClick"); // disable click in options at the end

      //delay final results to avoid overlapping sounds
      setTimeout(function () {
        showResults();
      }, 2000);
    }
  });

  // event listener for next button

  $(".next-btn").on("click", () => {
    questionCounter++;
    //$audioCorrectAnswer.pause();
    //$audioWrongAnswer.pause();
    $audioNextBtn.play();
    loadQuestion(questions[questionCounter]);

    //enable options back and disable the "next" button on click
    $(".option").removeClass("disableClick");
    $(".next-btn").addClass("disable");
  });

  //event listener for restart

  $(".restart").on("click", () => {
    $audioNextBtn.play();
    $scoreContainer.addClass("disable"); //Hide the score screen
    $previewContainer.removeClass("disable"); //show preview screen
    $audioIntro.load(); //Restart intro audio
    $audioIntro.play();
    $(".option").removeClass("disableClick"); //enable click back in options
  });

  /***************************/
  /******** Functions ********/
  /***************************/

  //timer
  const gameTimer = setInterval(function () {
    timer--;

    //alarm and color for final seconds
    if (timer <= 10 && timer > 0) {
      $audioAlarm.play();
      $(".time-left").css("color", "red");
    }

    //Do not show negative numbers at the end transition if counter is zero at the end

    if (timer <= 0) {
      $(".counter").text("0");
    } else {
      $(".counter").text(timer);
    }
    if (timer === 0) {
      showResults();
    }
  }, 1000);

  //Compare choice vs correct answer

  const compareSelection = (selectorId, elementSelected) => {
    if (
      selectorId !== questions[questionCounter].answer &&
      lastAnswer === false &&
      questionCounter + 1 !== questions.length
    ) {//2 consecutive wrongs before the last question to avoid audio overlapping
      $audioControlYourself.play(); 
      lastAnswer = true; // restart for next iteration

      // print the corresponding emojis
      $("#" + questions[questionCounter].answer).prepend(correctEmoji);
      $(elementSelected).prepend(wrongEmoji).css("color", "red");

      $audioWrongAnswer.load(); //Resets the media to the beginning (it was paused if the button "Next" was clicked too fast at previous question)
      $audioWrongAnswer.play(); //play wrong answer sound
    } else if (selectorId === questions[questionCounter].answer) {// if answer is right
      lastAnswer = true;
      score++;
      $(elementSelected).prepend(correctEmoji);
      $(elementSelected).css("color", "greenyellow");
      //Resets the media to the beginning (it was paused if the button "Next" was clicked too fast at previous question)
      $audioCorrectAnswer.load();
      $audioCorrectAnswer.play(); //play correct answer sound
    } else {// if answer is wrong
      lastAnswer = false;
      $("#" + questions[questionCounter].answer).prepend(correctEmoji);
      $(elementSelected).prepend(wrongEmoji).css("color", "red");
      //Resets the media to the beginning (it was paused if the button "Next" was clicked too fast at previous question)
      $audioWrongAnswer.load();
      $audioWrongAnswer.play(); //play wrong answer sound
    }
  };

  // Load and present new questions in quiz

  const loadQuestion = (newQuestionObject) => {
    $(".question-number").text(questionCounter + 1); //Question number
    $(".questions-quantity").text(questions.length); //Questions quantity
    $(".question").text(newQuestionObject.question); //Actual question text
    //Set all options and reset colors
    $("#option1")
      .text(newQuestionObject.choices[0])
      .css("color", "currentcolor");
    $("#option2")
      .text(newQuestionObject.choices[1])
      .css("color", "currentcolor");
    $("#option3")
      .text(newQuestionObject.choices[2])
      .css("color", "currentcolor");
    $("#option4")
      .text(newQuestionObject.choices[3])
      .css("color", "currentcolor");
  };

  //End Screen

  const showResults = () => {
    timer = 0; // do not let timer get to zero again if game is over before counter or results will print twice

    //Stop sounds before showing results
    $audioControlYourself.pause();
    $audioAlarm.pause();
    $audioBackground.load();

    $questionsContainer.addClass("disable"); //disable the questions screen
    $scoreContainer.removeClass("disable"); //Show the score screen

    // check if there is only one correct answer for correct wording
    if (score === 1) {
      $(".word-answer").text("answer ");
    } else {
      $(".word-answer").text("answers "); //plural
    }
    $(".correct-answers").text(score); //Print score
    $(".total-questions").text(questions.length); // total of questions

    //calculate percentage of answers rigth
    gradePercentage = (score * 100) / questions.length;

    //wording according to results
    if (gradePercentage <= 10) {
      $(".result-message1").text("You're only a speck in the universe");
      $(".result-message2").text("You're not even a Padawan");
      $audioScoreBelow10.play();
    } else if (gradePercentage > 10 && gradePercentage <= 30) {
      $(".result-message1").text("You failed miserably!");
      $(".result-message2").text("I've got a bad feeling about this");
      $audioScoreBelow30.play();
    } else if (gradePercentage > 30 && gradePercentage <= 50) {
      $(".result-message1").text("You failed!");
      $(".result-message2").text("Yo need to keep listening to your master");
      $audioScoreBelow50.play();
    } else if (gradePercentage > 50 && gradePercentage <= 80) {
      $(".result-message1").text("You have a lot to learn about the force");
      $(".result-message2").text(
        "Keep feeling the force within you and you'll get better"
      );
      $audioScoreBelow80.play();
    } else if (gradePercentage > 80 && gradePercentage < 100) {
      $(".result-message1").text("Great!, You got");
      $(".result-message2").text(
        "You can do even better if you let go of fear"
      );
      $audioScoreBelow100.play();
    } else {
      // perfect score
      $(".result-message1").text("Master!...Strong is the force with you");
      $(".result-message2").text("You might even turn to the dark side!");
      $audioPerfectScore.play();
    }
  };
}); //Document ready end

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDfyw9W-HEx13bZjiXPxP9n6DveG5dthhw",
    authDomain: "train-schedule-4d053.firebaseapp.com",
    databaseURL: "https://train-schedule-4d053.firebaseio.com",
    projectId: "train-schedule-4d053",
    storageBucket: "",
    messagingSenderId: "1057712051880"
  };
 firebase.initializeApp(config);

  var database = firebase.database();

  $(document).on("click","#submit", function() {

    // verifying that the onclick submit button works
    console.log("clicking submit button");

    // Grabbing the values for the train fields
    var newtrainName = $("#trainName").val().trim();
    var newdestination = $("#destination").val().trim();
    var newtrainStart = $("#trainStart").val().trim();
    var newfrequency = $("#frequency").val().trim();

    function trainData (trainName, destination, trainStart, frequency){
        database.ref().push({

            train: trainName,
            destination: destination,
            trainStart: trainStart,
            frequency: frequency

        });
        
    };

    trainData (newtrainName, newdestination, newtrainStart, newfrequency);
    
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainStart").val("");
    $("#frequency").val("");
    
  });

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

  //Moment Variables
  // var randomTime = "08:00";
  // var randTime2 = "18:00";
  // var randomFormat = "HH:mm";
  // var convertedDate = moment(randomTime,randomFormat).format('hh:mm a');
  // var convertedDate2 = moment(randTime2,randomFormat).format('hh:mm a');
  // var newTime = moment().subtract(convertedDate,convertedDate2).format('hh:mm a');

  //console.log(convertedDate);
  // console.log(convertedDate);
  // console.log(convertedDate2);
  // console.log(newTime);

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

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
  console.log(snapshot);
  var trainTable = $("<tr>");
  var trainNameRow = $("<td>");
  var destinationRow = $("<td>");
  var nextArrivalRow = $("<td>");
  var frequencyRow = $("<td>");
  var minutesAway = $("<td>");

  //Adding the Train Names to the page on load
  trainNameRow.text(snapshot.val().train);
  trainTable.append(trainNameRow);
  $("#train-table").append(trainTable);

  //Adding the destination
  destinationRow.text(snapshot.val().destination);
  trainTable.append(destinationRow);

  //adding frequency
  frequencyRow.text(snapshot.val().frequency);
  trainTable.append(frequencyRow);

  //Moment for time converstion
  var firstTimeConverted = moment(snapshot.val().trainStart,"HH:mm");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tFrequency = parseInt(snapshot.val().frequency);
  var timeRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - timeRemainder;
  console.log("Minutes til Train " + tMinutesTillTrain);
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival Time " + moment(nextTrain).format("hh:mm"));
  
  //Adding Next Arrival
  nextArrivalRow.text(moment(nextTrain).format("hh:mm"));
  trainTable.append(nextArrivalRow);

  //Minutes Away
  minutesAway.text(tMinutesTillTrain);
  trainTable.append(minutesAway);


})
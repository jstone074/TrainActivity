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

$(document).on("click", "#submit", function () {

  // verifying that the onclick submit button works
  console.log("clicking submit button");
  // Grabbing the values for the train fields
  var newtrainName = $("#trainName").val().trim();
  var newdestination = $("#destination").val().trim();
  var newtrainStart = $("#trainStart").val().trim();
  var newfrequency = $("#frequency").val().trim();

  function trainData(trainName, destination, trainStart, frequency) {
    database.ref().push({

      train: trainName,
      destination: destination,
      trainStart: trainStart,
      frequency: frequency

    });

  };

  trainData(newtrainName, newdestination, newtrainStart, newfrequency);

  $("#trainName").val("");
  $("#destination").val("");
  $("#trainStart").val("");
  $("#frequency").val("");

});

$(document).on("click", ".btn-danger", function () {

  // var key = $(this).attr("data-id");
  console.log($(this).attr("data-id"));
  
  firebase.database().ref().child($(this).attr("data-id")).remove();

});

//Setting up an interval to refresh the page every second so no user interaction is needed
setInterval(function () {

  //Clears the table for the interval
  $("#train-table").empty();

  //New variables to setup the tables
  var trainTableHeader = $("<tr>");
  var trainNameHeader = $("<th>");
  var destinationHeader = $("<th>");
  var nextArrivalHeader = $("<th>");
  var frequencyeader = $("<th>");
  var minutesHeader = $("<th>");
  var removeButtonHeader = $("<th>");

  //Adds the table headers back after the interval clears the existing headers
  trainNameHeader.text("Train Name");
  trainTableHeader.append(trainNameHeader);
  $("#train-table").append(trainTableHeader);

  destinationHeader.text("Destination");
  trainTableHeader.append(destinationHeader);

  frequencyeader.text("Frequency");
  trainTableHeader.append(frequencyeader);

  nextArrivalHeader.text("Next Arrival");
  trainTableHeader.append(nextArrivalHeader);

  minutesHeader.text("Minutes Away");
  trainTableHeader.append(minutesHeader);

  trainTableHeader.append(removeButtonHeader);

  database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    console.log(snapshot.key);

    var trainTable = $("<tr>");
    var trainNameRow = $("<td>");
    var destinationRow = $("<td>");
    var nextArrivalRow = $("<td>");
    var frequencyRow = $("<td>");
    var minutesAway = $("<td>");
    var removeButtonRow = $("<td>");

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
    var firstTimeConverted = moment(snapshot.val().trainStart, "HH:mm");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //var tFrequency = parseInt(snapshot.val().frequency);
    var timeRemainder = diffTime % snapshot.val().frequency;
    var tMinutesTillTrain = snapshot.val().frequency - timeRemainder;
    console.log("Minutes til Train " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival Time " + moment(nextTrain).format("hh:mm"));

    //Adding Next Arrival
    nextArrivalRow.text(moment(nextTrain).format("hh:mm"));
    trainTable.append(nextArrivalRow);

    //Minutes Away
    minutesAway.text(tMinutesTillTrain);
    trainTable.append(minutesAway);

    //Adding Remove Button
    trainTable.append(removeButtonRow);
    $(removeButtonRow).addClass("btn btn-danger");
    $(removeButtonRow).attr("data-id",snapshot.key);
    $(removeButtonRow).text("Remove");


  })
}, 1000);
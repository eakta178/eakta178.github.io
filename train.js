
    var config = {
      apiKey: "AIzaSyChLt1tVa0Y0uWeXVHvHlxuR1-vnADXHe8",
      authDomain: "fourth-flag-167303.firebaseapp.com",
      databaseURL: "https://fourth-flag-167303.firebaseio.com",
      projectId: "fourth-flag-167303",
      storageBucket: "fourth-flag-167303.appspot.com",
      messagingSenderId: "73572389528"
      };
  
      firebase.initializeApp(config);
  
      // Create a variable to reference the database
      var database = firebase.database();
  
      // Initial Values
      var trainName = "";
      var destination = "";
      var startTime;
      var frequency = "";
  
  
  $(document).on("click", "#addrow", function() {

    event.preventDefault();
    
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    startTime = $("#start-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    //to DB
    database.ref().push({
      trainName: trainName,
      destination: destination,
      startTime: startTime,
      frequency: frequency
      });
    });

    database.ref().on("child_added", function(childSnapshot) {
      //create html
    var newRow = $("<tr class='item'>");
    var newTrainName = $("<td class='trainName'>");
    newTrainName.text(childSnapshot.val().trainName);
    var newDestination = $("<td class='destination'>");
    newDestination.text(childSnapshot.val().destination);
    var newFrequency = $("<td class='frequency'>");
    newFrequency.text(childSnapshot.val().frequency)
    var newNextArrival = $("<td class='nextArrival'>");
    //calculate time diff between first time and current time 
    var startFirstTime = childSnapshot.val().startTime;
    // // -------------------------------------just commented
    var endTime = Math.round((new Date()).getTime() / 1000); 
    console.log('current time: '+ moment(endTime, "X").format("HH:mm"));
    var currentTime = moment(endTime, "X").format("HH:mm");
    var timeDiff = moment.duration(moment().diff(moment(startFirstTime, "HH:mm")), 'milliseconds').asMinutes();
    console.log('time diff: '+ timeDiff);
    var freq = childSnapshot.val().frequency;
    console.log('frequency: '+freq);
    //divide timeDiff by frequency if no remainder next arrival is current time .
    //if remainder is > 0 then ArrivalMin=frequency-remainder
    //next arrival = current time + ArrivalMin
     
    var nextArrival;
    var rem =timeDiff % freq;
    console.log('remainder: '+ rem)
    var ArrivalMin = 0;
    
    if(rem === 0)
    {
      nextArrival = currentTime;
    }
    else{
      ArrivalMin = Math.ceil(freq-rem);
     
      nextArrival = timeDiff > 0 ? moment().add(ArrivalMin, 'minutes' ) : moment(startFirstTime, "HH:mm")
     
  
    } 

    var nextArrivalpretty= moment(nextArrival).format("HH:mm");

    newNextArrival.text(nextArrivalpretty);
    var newArrivalMin =$("<td class='nextArrivalMin'>");
    newArrivalMin.text(ArrivalMin);
  
    newRow.append(newTrainName);
    newRow.append(newDestination);
    newRow.append(newFrequency);
    newRow.append(newNextArrival);
    newRow.append(newArrivalMin);
    $('#addData').append(newRow);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
     
      // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
 
    });

    


           
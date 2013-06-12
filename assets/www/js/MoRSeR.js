 unit=333;

function signal(){
    setTimeout(signalAsync, 1000);
    $("#sendMessages").append('<div class="sendMessage">'+$("#textToMorse").val()+'</div>');
}

function signalAsync(){

   var SPACE = " ";
   var textToSend = $("#textToMorse").val();
   console.log(textToSend);

    for(var i = 0; i < textToSend.length; i++){
        var charEncoded = encode(textToSend.charAt(i));
        console.log(textToSend.charAt(i) + " => " + charEncoded);
        if(charEncoded === SPACE){
            pause(unit*7);
        } else {
            if(i != 0 && encode(textToSend.charAt(i-1))!==SPACE){
                pause(unit *3);
            }
            sendChar(charEncoded);
        }
    }
}

function sendChar(charEncoded){
    var SHORT = "s";
    var LONG = "l";
    console.log("sending " + charEncoded);

    for(var j = 0; j < charEncoded.length; j ++){
         if(j!=0){
             pause(unit);
         }
         turnOn();
         if(charEncoded.charAt(j) === SHORT){
             console.log("short");
             pause(unit);
         }
         if(charEncoded.charAt(j) === LONG){
             console.log("long");
             pause(3*unit);
         }
         turnOff();

    }
}

function turnOn(){
  window.plugins.Torch.turnOn(
        function() { },
        function() { console.log( "error" ); }
    );
}
function turnOff(){
      window.plugins.Torch.turnOff(
             function() { },
             function() { console.log( "error" ); }
         );
}

function pause(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}
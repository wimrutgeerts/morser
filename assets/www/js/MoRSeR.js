unit=333;

function signal(){
    $("#sendButton").html('Sending');
    $("#sendButton").attr('disabled', 'disabled');
    encodeAndStartSignaling();
    $("#sendMessages").append('<div class="sendMessage">'+$("#textToMorse").val()+'</div>');
}

function encodeAndStartSignaling(){
    var SPACE = " ";
    var NEW_WORD = "n";
    var textToSend = $("#textToMorse").val();
    var encodedText="";

    for(var i = 0; i < textToSend.length; i++){
        var encodedChar = encode(textToSend.charAt(i));
        encodedChar = prepareChar(encodedChar);
        encodedText = encodedText + encodedChar;
        if(encodedChar === SPACE){
            encodedText = encodedText + NEW_WORD;
        }
    }
    console.log("sending " + encodedText);
    signalSingleCharAndScheduleNext(encodedText);
}

function prepareChar(encodedChar){
    var NEW_CHAR = "p" ;
    var result ="";
    for(var i = 0; i < encodedChar.length; i++){
        result += encodedChar.charAt(i) + NEW_CHAR;
    }
    return result;
}

function signalSingleCharAndScheduleNext(encodedText){
    console.log("sending " + encodedText);
    var SHORT = "s";
    var LONG = "l";

    var characterToSend = encodedText.charAt(0);
    var remainingText = encodedText.substring(1, encodedText.length);

    if(characterToSend === SHORT || characterToSend === LONG){
        turnOn();
    }

    var waitTime = determineWaitTime(characterToSend);

    console.log("remaining " + encodedText);
    console.log("over" + waitTime * unit);
    setTimeout(function(){ continueSending(remainingText)}, waitTime*unit);

}
function continueSending(remainingText){

    turnOff();
    if(remainingText.length !== 0){

        signalSingleCharAndScheduleNext(remainingText);
    } else {
         $("#sendButton").html('Morse it');
         $("#sendButton").removeAttr('disabled');
    }
}
function determineWaitTime(characterToSend){
    var SPACE = " ";
    var NEW_WORD = "n";
    var NEW_CHAR = "p" ;
    var SHORT = "s";
    var LONG = "l";

    if(characterToSend === SPACE){
        return 7;
    }
    if(characterToSend === NEW_WORD){
        return 3;
    }
    if(characterToSend === NEW_CHAR){
        return 1;
    }
    if(characterToSend === SHORT){
        return 1;
    }
    if(characterToSend === LONG){
        return 3;
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
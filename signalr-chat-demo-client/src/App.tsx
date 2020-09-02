import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as signalR from '@microsoft/signalr';

function App() {

  React.useEffect(() => {
    var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44331/chatHub").build();

    //Disable send button until connection is established
    // document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveMessage", function (user, message) {
        var encodedMsg = user + " says " + message;
        console.log(encodedMsg);
    });

    connection.start().then(function () {
        // document.getElementById("sendButton").disabled = false;
        connection
            .invoke("SendMessage", "a", "bb")
            .catch(function (err) {
                return console.error(err.toString());
          });
    }).catch(function (err) {
        return console.error(err.toString());
    });

 
   }, []);

  return (
    <>
    See console.log()
      </>
  );
}

export default App;

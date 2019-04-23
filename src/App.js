import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";

class App extends Component {
  handleListenMic() {
    fetch("http://localhost:3002/api/speech-to-text/token")
      .then(function(response) {
        return response.text();
      })
      .then(function(token) {
        console.log("token", token);
        var stream = recognizeMic({
          // eslint-disable-line
          token: token, // use `access_token` as the parameter name if using an RC service
          outputElement: "#output" // CSS selector or DOM Element
        });
        stream.on("error", function(err) {
          console.log(err);
        });
        document.querySelector("#stop").onclick = function() {
          stream.stop();
        };
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.handleListenMic}>Listen to Mic</button>
        </header>
      </div>
    );
  }
}

export default App;

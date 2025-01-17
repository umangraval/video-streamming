import React, { Component } from "react";
// import QrReader from "react-qr-reader";

export default class Test extends Component {
  state = {
    result: "No result"
  };

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      });
    }
  };
  handleError = err => {
    console.error(err);
  };
  render() {
    return (
      <div>
        {/* <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        /> */}
         {/* <iframe src="https://www.the-qrcode-generator.com/scan" height="400" width="400" /> */}
        <p>{this.state.result}</p>
      </div>
    );
  }
}

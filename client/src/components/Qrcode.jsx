import React, { Component } from 'react';
import QRCode from "qrcode.react";


export default class Qrcode extends Component {
    constructor(props) {
        super(props);
        this.state = 
            props;
        this.download = this.download.bind(this);
    }
    download() {
        // console.log(this.props.pname);
        const canvas = document.getElementsByClassName("QRCode");
        canvas[0].toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.download = `qrcode_${this.state.pname}`;
        link.href = document.getElementsByClassName("QRCode")[0].toDataURL();
        link.click();
      }
    render() {
        // const url = `http://192.168.0.104:3000`;
        const url = `${process.env.REACT_APP_CLIENT_URL}${this.state.url}`;
        return (
            <div>
                <QRCode
                  size={250}
                  value={url}
                  className="QRCode"
                />
      <p>
        <button type="button" onClick={this.download}>
          Download QR Code
        </button>
      </p>
        </div>
        )
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";

export default class Qrcode extends Component {
    render() {
        // const url = `http://192.168.0.104:3000`;
        const url = `http://192.168.0.104:3000${this.props.url}`;
        return (
            <div>
                {/* <div className="container" style={{ padding: '100px' }}> */}
                    <QRCode value={url} />
                {/* </div> */}
                {/* <Link to="/">Home</Link> */}
            </div>
        )
    }
}
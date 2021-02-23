import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {}
        };
    }
    async componentDidMount() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/video/${this.state.videoId}/data`);
            const data = await res.json();
            this.setState({ videoData: data });
        } catch (error) {
            console.log(error);
        }
    }
    
    
    render() {
    
        return (
            <div className="App">
                <header className="App-header">
                    <video controls autoPlay controlsList="nodownload" >
                        <source src={`${process.env.REACT_APP_BASE_URL}/video/${this.state.videoId}`} type="video/mp4"></source>
                    </video>
                    <h1>{ this.state.videoData.name }</h1>
                    <button  onClick={() => { this.props.history.goBack() }}>Back</button>
                </header>
                
            </div>
        )
    }
}

export default withRouter(Player);
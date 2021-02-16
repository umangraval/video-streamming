import axios from 'axios';
 
import React,{Component} from 'react';
 
class App extends Component {
    state = {
      selectedFile: null
    };
    
    onFileChange = event => {
      this.setState({ selectedFile: event.target.files[0] });
    };
    
    onFileUpload = () => {
      const formData = new FormData();
    
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      console.log(this.state.selectedFile);
      axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData);
    };
    
    render() {
    
      return (
        <div>
            <h3>
              File Upload
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload
                </button>
            </div>
        </div>
      );
    }
  }
 
  export default App;
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
}


    
  fileUpload(file){
    const url = 'http://localhost:8080/up';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData,config)
}

  render() {
    return (
 
<form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" name="fileUp" onChange={this.onChange} />
        <button type="submit">Upload</button>
</form>
    );
  }
}

export default App;

     /*
     
     https://react-dropzone.js.org/
     
     
       onDrop(files) {
    this.setState({
      files
    });
  }
     
     
     <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>*/
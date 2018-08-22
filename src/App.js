import React, { Component } from 'react';
import Navigation from './components/Navigation.js'
import Logo from './components/Logo.js'
import ImageLinkForm from './ImageLinkForm.js'
import Rank from './components/Rank.js'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRegon from './FaceRegon.js'

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: '7551ceb8ae854fcab4ae5ecddcb62dac'
});

// You can also use the SDK by adding this script to your HTML:


/*
particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }


*/
class App extends Component {
	constructor(){
		super();
		this.state = {
			input:'',
			imageUrl: '',
		}
	}
onInputChange = (event) => {
		this.setState({input: event.target.value});
	}
	onSubmit = () => {
		console.log('click');
		this.setState({imageUrl: this.state.input})
		app.models.predict(Clarifai.COLOR_MODEL, this.state.input).then(
    function(response) {
    	console.log(response);
      // do something with response
    },
    function(err) {
    	console.log("DUMBASS");
      // there was an error
    }
  );
	}
  render() { 
    return (
      <div className = "App">
         <Particles className='particles'
              params={{
            particles: {
            number: {
      		value: 30,
      		density: {
       	    enable: true,
       	     value_area: 800
      }
    }
            		}
            	}}
            
            />
      <Navigation />
       <Logo />
        <Rank/>
       <ImageLinkForm onInputChange={this.onInputChange} onSubmit = {this.onSubmit}/>
       <FaceRegon imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}
/*7551ceb8ae854fcab4ae5ecddcb62dac*/
export default App;

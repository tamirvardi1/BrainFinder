import React, { Component } from 'react';
import Navigation from './components/Navigation.js'
import SignIn from './components/SignIn.js'
import Register from './components/Register.js'
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
      box:{},
      route:"signin",
      isSignedIn:false,
      user:{
        id:'124',
        name:'',
        email:'',
        entries:'0',
        joined : ''

      }

		}
	}


  loadUser = (data) => {
    this.setState({user: {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined : data.joined




    }})
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
onInputChange = (event) => {
		this.setState({input: event.target.value});
	}
	onSubmit = () => {
		console.log('click');
		this.setState({imageUrl: this.state.input})
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response=> this.displayFaceBox(this.calculateFaceLocation(response)).catch(err => console.log(err)));  // there was an error
    }
displayFaceBox = (box) =>{
     console.log(box);
    this.setState({box:box});
   
}
onRouteChange =(route) => {
  if(route ==='signout'){
    this.setState({isSignedIn:false})
  }
  else if (route === 'home'){
    this.setState({isSignedIn:true})
  }
   
  this.setState({route: route});

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
          
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
       {this.state.route ==='home'?
       <div>
       <Logo />
        <Rank/>
       <ImageLinkForm onInputChange={this.onInputChange} onSubmit = {this.onSubmit}/>
       <FaceRegon  box={this.state.box} imageUrl={this.state.imageUrl}/> 
       </div>
       : (this.state.route==='signin'
       ? <SignIn onRouteChange={this.onRouteChange}/>
      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       )

     }
     </div>
    );
  }
}
/*7551ceb8ae854fcab4ae5ecddcb62dac*/
export default App;

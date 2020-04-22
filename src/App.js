import React, {Component} from 'react';
import './App.css';
import Store from './components';

class App extends Component {

    render(){
      return (
        <div className = "App">
            {/* NAVIGATION*/}
          <nav className= "light-blue darken-4">
            <div className =  "container">
              <a className="brand-logo" href="/">
                Tienda Konecta
                </a>            
            </div>
          </nav>
          <Store/>
        </div>
        
        )
    }

}

export default App;

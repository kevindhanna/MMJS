import React from 'react';
import Nexus from 'nexusui'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarMain from './components/navbar/navbar.jsx';
import OptionsBar from './components/options/optionsBar.jsx';
import SequencerContainer from './components/SequencerContainer/SequencerContainer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.storedSequencers = []
  }
  render() {
    return (
      <div className="App">
        <NavbarMain/>
        <SequencerContainer storedSequencers={this.storedSequencers}/>
        <OptionsBar storedSequencers={this.storedSequencers}/>
      </div>
    );
  }
}

export default App;

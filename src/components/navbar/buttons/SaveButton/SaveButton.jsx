import React, {Component} from "react"
import Button from "react-bootstrap/Button";
// import {CopyToClipboard} from 'react-copy-to-clipboard';
import './SaveButton.css';
import Modal, {closeStyle} from 'simple-react-modal';
import LZString from "lz-string";

class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copied: false,
    }
    this.show.bind(this)
    this.close.bind(this)

    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };
  }

  show = () => {
    this.setState({show: true})
  }

  close = () => {
    this.setState({show: false})
  }

  seqState = (sequencers) => {
    let state = []
    sequencers.forEach((sequencer)=>{
      state.push(sequencer.matrix.pattern)
    })
    state = this.stringify(state)
    return this.compress(state)
  }

  stringify(array) {
    return array.flat()
                .join('')
                .replaceAll('false', '0')
                .replaceAll('true', '1')
                .replaceAll(',','')
  }

  compress(string) {
    return LZString.compressToBase64(string)
                   .replace(/\+/g, `-`)
                   .replace(/\//g, `_`)
                   .replace(/=/g, `~`);
  }

  constructUrl = () => {
    let instrumentState = this.compress(this.props.storedInstrument.toString())
    console.log("stored it is", this.props.storedInstrument, instrumentState)
    let pianoState = this.seqState(this.props.storedSequencers)
    let drumState = this.seqState(this.props.storedPercussion)
    return window.location.href + `?0=${pianoState}&1=${drumState}&2=${instrumentState}`
  }

  render() {
    let self = this
    return (
      <div className = 'save-wrapper'>
        <Button variant='outline-light' className = 'save-button pull-right' onClick={this.show}>Save</Button>
        <Modal
          className="Modal-wrapper"
          containerClassName="Modal"
          closeOnOuterClick={true}
          show={this.state.show}>
          <a style={closeStyle} onClick={this.close}>X</a>
          <div>Save your song!</div>
          {this.state.show ? <div className='url'>{self.constructUrl()}</div> : null }
        </Modal>
      </div>
    );
  }
}
export default SaveButton

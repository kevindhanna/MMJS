import React from 'react'
import { Sequencer } from 'react-nexusui'
import { Container, Row, Card, Col } from 'react-bootstrap'
import './SequencerComponent.css'

export default class SequencerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0
    }
    this.ready = false
    this.myInput = React.createRef()
    this.render = this.render.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUpdate() {
    if (this.sequencer) {
      this.props.tempStorage[this.props.octave] = this.sequencer.matrix.pattern
    }
  }

  updateWindowDimensions = () => {
    this.setState({ width: this.myInput.current.offsetWidth });
    if (this.sequencer){
      let self = this
      setTimeout(function() {
        self.sequencer.colorInterface()
      }, 0)
    }
  }

  handleChange = (change) => {
    if(change.state && this.ready) {
      let triggers = new Array(this.props.scale.length)
      triggers[triggers.length - change.row - 1] = 1
      this.props.playNote(triggers, this.props.octave, this.props.instrument)
    }
  }

  handleOnReady = (sequencer) => {
    this.ready = false
    this.props.onReady(sequencer)
    var self = this
    if (this.props.tempStorage[this.props.octave]) {
      setTimeout(function() {
        sequencer.matrix.set.all(self.props.tempStorage[self.props.octave])
        sequencer.colorInterface()
        self.ready = true
      }, 0)
    } else if (this.props.matrix) {
      setTimeout(function() {
        sequencer.matrix.set.all(self.props.matrix)
        sequencer.colorInterface()
        self.props.tempStorage[self.props.octave] = self.props.matrix
        self.ready = true
      }, 0)
    } else {
      this.ready = true
    }
    this.sequencer = sequencer
  }

  renderNoteNames = () => {
    let noteNames = []
    for(let i = 0; i < this.props.scale.length; i++){
      noteNames.unshift(
        <Card
          key={i + 15 * this.props.octave}
          className={`note-card ${this.props.noteNameClass}-notes justify-content-center border-0`}>
          {"" + this.props.scale[i].letter + (this.props.octave || "") }
        </Card>
      )
    }
    return noteNames
  }

  render() {
      return (
        <Container>
          <Row key={this.props.octave + 10}>
            <Col sm={1} className='no-gutters'>
              {this.renderNoteNames()}
            </Col>
            <Col sm={11} className='no-gutters'>
              <Container className='sequencer-component' id="notes" ref={this.myInput}>
                {this.state.width ? <Sequencer
                  key={this.props.octave + 12}
                  rows={this.props.rows || 7}
                  columns={32}
                  size={[this.state.width*0.9412, this.state.width*0.54]}
                  onReady={this.handleOnReady}
                  onChange={this.handleChange}
                  onStep={(state)=>{this.props.playNote(state, this.props.octave, this.props.instrument)}}/> : <div>Loading....</div>}
              </Container>
            </Col>
            <hr></hr>
          </Row>
      </Container>
    )
  }
}

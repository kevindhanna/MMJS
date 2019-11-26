import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";

class NavbarMain extends Component {
  render() {
    return (
     <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
        alt="logo"
        src= "cat_dj.jpeg"
        width="80"
        height="80"
        className="d-inline-block align-top"
        id='logo'
      />{' '}
      </Navbar.Brand>
      <Navbar.Text className='Nav-title'>
        Synesthesia
      </Navbar.Text>
      </Navbar>
    )
  }
}
export default NavbarMain;

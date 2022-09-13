import React from "react";
import { Container, Nav, Navbar, NavDropdown, Alert, Button } from "react-bootstrap";

export default function Topbar() {
  const [show, setShow] = React.useState(true);

  return (
    <>
    <Navbar className="bgNav" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Random Memes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
                

          </Nav>
          <Nav className="navbar-nav">
    

      {!show && <Nav.Link onClick={() => setShow(true)}>Show Instructions</Nav.Link>}
            <Nav.Link href="https://krishanthaudayakumara.github.io" target="_blank">Developer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
              <div className="alertBox">

    <Alert show={show} variant="success">
        {/* <Alert.Heading>How's it going?!</Alert.Heading> */}
        <p>
          <ul>
            <li>Please remember to type something in the text box to get the ourput meme</li>
            <li>You can download the generated meme by clicking Download Meme Button</li>
          </ul>
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Got it!
          </Button>
        </div>
      </Alert>
      </div>

    </>
  );
}

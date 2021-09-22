import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
const links = [
  { href: "/", text: "Home" },
  { href: "/news", text: "News" },
  { href: "/my-marks", text: "My Marks" },
  { href: "/generate-exam-table", text: "Generate Exam Table" },
  { href: "/about", text: "About" },
  { href: "/me", text: "Profile" },
];

const createNavItem = ({ href, text, className }) => (
  <NavItem>
    <Link
      style={{
        color: "#000",
        textDecoration: "none",
        margin: "0.6rem 1rem ",
      }}
      to={href}
      className={className}
    >
      {text}
    </Link>
  </NavItem>
);

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Container>
            <NavbarBrand href="/">ALAMATIE</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {links.map(createNavItem)}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

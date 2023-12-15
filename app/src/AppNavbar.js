import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarToggler onClick={() => {
        setIsOpen(!isOpen)
      }}/>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-end" style={{ width: "100%" }} navbar>
          <NavItem>
            <NavLink tag={Link} to="/register">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/Prash15/spring-react-mini-project-challenge">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;

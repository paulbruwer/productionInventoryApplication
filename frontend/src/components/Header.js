import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {

  const loginButton = () => {
    if (localStorage.getItem("jwt")){
      return (
        <Link className="header-link" to={"/"}>
              Logout
        </Link>
      )
    }
  }

  return(
  <div style={{ padding: "10px" }}>
    <div className="navbar-border">
      <Navbar className="navbar" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link className="header-link" to={"/"}>
              Production Inventory Application
            </Link>
          </Navbar.Brand>
          <Nav>
            <Link className="header-link" to={"/receiving"}>
              Receiving
            </Link>
            <Link className="header-link" to={"/production"}>
              Production
            </Link>
            <Link className="header-link" to={"/dispatch"}>
              Dispatch
            </Link>
            <Link className="header-link" to={"/admin"}>
              Admin
            </Link>
            {loginButton()}
          </Nav>
        </Container>
      </Navbar>
    </div>
    <style>{`
            .navbar-border{
                border: solid 1px #0063a3;
                border-radius: 10px;
            }
            .navbar{
                background-color: #0e416c !important;
                border-radius: 10px !important;
            }
            .header-link {
                color: rgb(255,255,255,0.7);
                text-decoration: none;
                padding-left: 5%;
                font-weight: 600;
            }
        `}</style>
  </div>
  )
};

export default Header;

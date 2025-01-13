import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { useRef } from "react";

function NavBar({
  loggedIn,
  setLoggedIn,
}: {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  
  const navigate = useNavigate();
  const navRef = useRef<HTMLButtonElement>(null);

  const logout = () => {
    Auth.logout();
    setLoggedIn(false);
    close()
    navigate("/");
  };

  const close = () => {
    console.log(navRef.current);
    navRef.current?.click();

  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2 ">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <h1> Tech Blog</h1>
        </Navbar.Brand>
        <Navbar.Toggle ref={navRef} aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto align-items-end mx-4 justify-content-end" >
            <Nav.Link as={NavLink} to="/" onClick={close}>
              Home
            </Nav.Link>
            {loggedIn ? (
              <>
                <Nav.Link as={NavLink} to={`/profile`} onClick={close}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" onClick={close}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

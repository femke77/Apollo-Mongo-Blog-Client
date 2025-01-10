import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

function NavBar({
  loggedIn,
  setLoggedIn,
}: {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const logout = () => {
    Auth.logout();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2 ">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
         <h1> Tech Blog</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto align-items-end mx-4 justify-content-end">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {loggedIn ? (
              <>
                <Nav.Link as={NavLink} to={`/profile`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login">
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

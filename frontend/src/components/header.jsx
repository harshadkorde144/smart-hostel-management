import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaMoon, FaUserGraduate } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <Navbar expand="lg" variant="dark" className="shadow-lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <FaUserGraduate style={{ marginRight: "10px" }} />
            SmartNest AI
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center">

            {userInfo && (
              <>
                <LinkContainer to="/">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/attendance">
                  <Nav.Link>Attendance</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/analysis">
                  <Nav.Link>Analytics</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/addStudent">
                  <Nav.Link>Add Student</Nav.Link>
                </LinkContainer>

                <NavDropdown title={userInfo.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  {userInfo.isAdmin && (
                    <LinkContainer to="/userList">
                      <NavDropdown.Item>
                        Users
                      </NavDropdown.Item>
                    </LinkContainer>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            <Nav.Link>
              <FaMoon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
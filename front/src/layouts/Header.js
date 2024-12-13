import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/adminprowhite.svg";
import user1 from "../assets/images/users/user4.jpg";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null); 
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate(); 
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  useEffect(() => {
    client.get("/api/user")
      .then(function (res) {
        console.log("User data:", res.data); 
        setCurrentUser(res.data.user); 
      })
      .catch(function (error) {
        console.error("Error fetching user info:", error.response ? error.response.data : error.message);
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    const handleTabClose = (event) => {
      // Use performance API to check if it's a reload (TYPE_RELOAD = 1)
      if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
        // If not a reload, proceed with logout
        client.post("/api/logout", {})
          .then(function (res) {
            setCurrentUser(null);
          }).catch(error => {
            console.error("Logout error:", error);
          });
      }
    };

    // Add event listener for tab close
    window.addEventListener("beforeunload", handleTabClose);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout", {})
      .then(function (res) {
        setCurrentUser(null);
        navigate('/login'); 
      }).catch(error => {
        console.error("Logout error:", error);
      });
  }

  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <NavbarBrand href="/">
          <LogoWhite className="d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <UncontrolledDropdown inNavbar nav>
            
            <DropdownMenu end>
              <DropdownItem></DropdownItem>
              <DropdownItem></DropdownItem>
              <DropdownItem divider />
              <DropdownItem></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{currentUser ? `Salut, ${currentUser.username}` : 'Guest'}</DropdownItem>
            <DropdownItem onClick={() => navigate('/profile')}>
  Mon Compte
</DropdownItem>
            <DropdownItem divider />
            <form onSubmit={submitLogout}>
              <Button type="submit" variant="light">Se déconnecter</Button>
            </form>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;

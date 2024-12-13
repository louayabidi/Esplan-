import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const navigation = [
  {
    title: "Acceuil",
    href: "/starter",
    icon: "bi bi-speedometer2",
    roles: ["employe", "enseignant"],
  },
  {
    title: "Gestion des utilisateurs",
    href: "/user-list",
    icon: "bi bi-person-heart",
    roles: ["employe"],
  },
  {
    title: "Gestion des contraintes",
    href: "/ContrainteList",
    icon: "bi bi-exclamation-diamond-fill",
    roles: ["enseignant", "employe"],
  },
  {
    title: "Gestion des examens",
    href: "/boxComponent",
    icon: "bi bi-newspaper",
    roles: ["employe"],
  },
  {
    title: "Gestion des salles",
    href: "/boxComponentBl",
    icon: "bi bi-buildings",
    roles: ["employe"],
  },
  {
    title: "Affectation salle-examens",
    href: "/Salle_examen-list",
    icon: "bi bi-building-add",
    roles: ["employe"],
  },
  {
    title: "Affectation niveaux-modules",
    href: "/Module_niveau-list",
    icon: "bi bi-border-style",
    roles: ["employe"],
  },
  {
    title: "Gestion des classes",
    href: "/boxComponentCl",
    icon: "bi bi-person-video2",
    roles: ["employe"],
  },

  {
    title: "Gestion des surveillances",
    href: "/SurveillanceList",
    icon: "bi bi-eye-fill",
    roles: ["enseignant", "employe"],
  },
  {
    title: "Gestion des UPs",
    href: "/BoxComponentUp",
    icon: "bi bi-mortarboard-fill",
    roles: ["employe"],
  },
];

const Sidebar = () => {
  const [role, setRole] = useState(null);  // Stocke le rôle de l'utilisateur
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis l'API
    client.get("/api/user")
      .then((res) => {
        const user = res.data.user;
        setCurrentUser(user);
        
        // Vérifiez si l'utilisateur est un enseignant avec roleRes = 'directeur'
        if (user.role === "enseignant" && user.roleRes === "directeur") {
          setRole("employe");  // Donnez-lui les mêmes droits qu'un employé
        } else {
          setRole(user.role);  // Sinon, utilisez le rôle de l'utilisateur
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error.response ? error.response.data : error.message);
        setCurrentUser(null);
      });
  }, []);

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation
            .filter(navi => navi.roles.includes(role))  // Filtrer selon le rôle
            .map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "active nav-link py-3"
                      : "nav-link py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              </NavItem>
            ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
